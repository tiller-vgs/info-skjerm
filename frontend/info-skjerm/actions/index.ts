"use server";

import { EventsValues, LeaderboardData, RegisterValue } from "@/types";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { auth, signOut } from "@/auth";
import crypto from "crypto";

export const register = async (values: RegisterValue) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Ugyldige felt" };
  }

  const { email, password, name } = validatedFields.success
    ? validatedFields.data
    : { email: "", password: "", name: "" };

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.users.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return { error: "Epost allerede i bruk!" };
  }

  await db.users.create({
    data: {
      fullname: name,
      email,
      password: hashedPassword,
    },
  });

  return { success: "Bruker opprettet, vennligst logg inn" };
};

export const handleSignOut = async () => {
  return await signOut();
};

export const getUser = async () => {
  const session = await auth();
  return session;
};

export const createEvent = async (values: EventsValues) => {
  try {
    const res = await fetch("http://localhost:5237/PostEvents/createevent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      return { success: "Event opprettet!" };
    } else {
      return { error: "En feil oppstod, venligst prøv igjen" };
    }
  } catch (error) {
    return { error: `En feil oppstod, venligst prøv igjen: ${error}` };
  }
};
export async function getEvent() {
  let eventdata: EventsValues[] = [];
  await fetch("http://localhost:5237/GetEvents/todaysevents")
    .then((response) => response.json())
    .then((data) => {
      eventdata = data;
    })
    .catch((error) => console.error("Error:", error));
  return eventdata;
}
export async function getTodayWeather() {
  let weatherdata: any;
  await fetch("http://localhost:5237/WeatherForecast/Today")
    .then((response) => response.json())
    .then((data) => (weatherdata = data))
    .catch((error) => console.error("Error:", error));
  return weatherdata;
}
export async function getWeekWeather() {
  let weatherdata: any;
  await fetch("http://localhost:5237/WeatherForecast/NextDays")
    .then((response) => response.json())
    .then((data) => (weatherdata = data))
    .catch((error) => console.error("Error:", error));
  return weatherdata;
}
export async function getBus() {
  let busdata: any;
  await fetch("http://localhost:5237/BusTimes/departures?num=15")
    .then((response) => response.json())
    .then((data) => (busdata = data))
    .catch((error) => console.error("Error:", error));
  return busdata;
}

// ----------- TQ Leaderboard Fetching Logic -----------
const generateNonce = (): string => {
  return crypto.randomBytes(16).toString("hex");
};

const createSignature = (
  method: string,
  path: string,
  timestamp: number,
  nonce: string
): string => {
  const stringToSign = `${method}|${path}|${timestamp}|${nonce}`;

  return crypto
    .createHmac("sha256", process.env.API_SECRET || "")
    .update(stringToSign)
    .digest("hex");
};

const TQ_BACKEND_URL = process.env.TQ_BACKEND_URL || "http://localhost:8080";
const API_KEY = process.env.API_KEY;

export async function getTQLeaderboard(
  endpoint: string
): Promise<LeaderboardData> {
  const timestamp = Date.now();
  const nonce = generateNonce();
  const method = "GET";

  // Validate environment variables
  if (!API_KEY) {
    throw new Error("API_KEY is not configured");
  }
  if (!process.env.API_SECRET) {
    throw new Error("API_SECRET is not configured");
  }

  const signature = createSignature(
    method,
    `/api/leaderboard/${endpoint}`,

    timestamp,
    nonce
  );

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
    "x-signature": signature,
    "x-timestamp": timestamp.toString(),
    "x-nonce": nonce,
  };

  try {
    const response = await fetch(
      `${TQ_BACKEND_URL}/api/leaderboard/${endpoint}`,
      {
        method,
        headers,
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      // Handle specific authentication errors
      if (response.status === 401) {
        throw new Error(
          `Authentication failed: ${errorData.error || "Invalid credentials"}`
        );
      }

      throw new Error(
        `API request failed: ${response.status} - ${
          errorData.error || response.statusText
        }`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Network error: ${error}`);
  }
}
