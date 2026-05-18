import { Router, Request, Response } from "express";

const crypto = require("crypto");

const router = Router();

const TQ_BACKEND_URL = process.env.TQ_BACKEND_URL || "http://localhost:8080";
const API_KEY = process.env.TQ_API_KEY;
const API_SECRET = process.env.TQ_API_SECRET;

const generateNonce = (): string => {
  return crypto.randomBytes(16).toString("hex");
};

const createSignature = (
  method: string,
  path: string,
  timestamp: number,
  nonce: string,
): string => {
  const stringToSign = `${method}|${path}|${timestamp}|${nonce}`;

  return crypto
    .createHmac("sha256", API_SECRET || "")
    .update(stringToSign)
    .digest("hex");
};

const queryTQ = async (endpoint: string) => {
  const timestamp = Date.now();
  const nonce = generateNonce();
  const method = "GET";

  // Validate environment variables
  if (!API_KEY) {
    throw new Error("API_KEY is not configured");
  }
  if (!API_SECRET) {
    throw new Error("API_SECRET is not configured");
  }

  const signature = createSignature(
    method,
    endpoint,

    timestamp,
    nonce,
  );

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
    "x-signature": signature,
    "x-timestamp": timestamp.toString(),
    "x-nonce": nonce,
  };

  try {
    const response = await fetch(`${TQ_BACKEND_URL}${endpoint}`, {
      method,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      // Handle specific authentication errors
      if (response.status === 401) {
        throw new Error(
          `Authentication failed: ${errorData.error || "Invalid credentials"}`,
        );
      }

      throw new Error(
        `API request failed: ${response.status} - ${
          errorData.error || response.statusText
        }`,
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
};

router.get("/", async (req: Request, res: Response) => {
  const leaderboardDataVG1 = await queryTQ("/api/v1/vg1/leadersboards");
  console.log("Leaderboard Data VG1: ", leaderboardDataVG1);
  const leaderboardDataVG2 = await queryTQ("/api/v1/vg2/leadersboards");
  console.log("Leaderboard Data VG2: ", leaderboardDataVG2);

  res.json({ message: "TQLeaderboardController is working!" });
});
export default router;
