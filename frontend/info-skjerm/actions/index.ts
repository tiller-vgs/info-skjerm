"use server";

import { EventsValues, RegisterValue } from "@/types";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { auth, signOut } from "@/auth";

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
  let eventdata: EventsValues[] = []
  await fetch("http://localhost:5237/GetEvents/todaysevents")
    .then((response) => response.json())
    .then((data) => {
      eventdata = data;
    })
    .catch((error) => console.error("Error:", error));
  return eventdata;
};
export async function getTodayWeather() {
  let weatherdata: any
  await fetch("http://localhost:5237/WeatherForecast/Today")
        .then((response) => response.json())
        .then((data) => weatherdata = data)
        .catch((error) => console.error("Error:", error));
  return weatherdata;
};
export async function getWeekWeather() {
  let weatherdata: any
  await fetch("http://localhost:5237/WeatherForecast/NextDays")
        .then((response) => response.json())
        .then((data) => weatherdata = data)
        .catch((error) => console.error("Error:", error));
  return weatherdata;
};
export async function getBus() {
  let busdata: any
  await fetch("http://localhost:5237/BusTimes/departures?num=15")
        .then((response) => response.json())
        .then((data) => busdata = data)
        .catch((error) => console.error("Error:", error));
  return busdata;
};