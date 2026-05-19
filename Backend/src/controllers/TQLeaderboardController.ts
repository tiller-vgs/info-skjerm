import { Router, Request, Response } from "express";
import crypto from "crypto";

const router = Router();

interface TQUser {
  xp: number;
  title: string;
  titleRarity: string;
  name: string;
  username: string;
  lastname: string;
  image: string;
  level: number;
  class: string;
  guildName: string;
  schoolClass: string;
}

interface TQLeaderboardResponse {
  users: TQUser[];
}

// The TQ backend mounts the leaderboard router at /api/public/v1, so Express
// strips that prefix and req.path becomes /leaderboard/vg1 inside the router.
// Signature formula: METHOD|/api{req.path}|timestamp|nonce
function buildAuthHeaders(
  method: string,
  tqRouterPath: string,
): Record<string, string> {
  const apiKey = process.env.TQ_API_KEY;
  const apiSecret = process.env.TQ_API_SECRET;
  if (!apiKey || !apiSecret)
    throw new Error("TQ_API_KEY / TQ_API_SECRET not set");

  const timestamp = Date.now().toString();
  const nonce = crypto.randomBytes(16).toString("hex"); // 32 hex chars — satisfies ≥16 requirement
  const stringToSign = `${method}|/api${tqRouterPath}|${timestamp}|${nonce}`;
  const signature = crypto
    .createHmac("sha256", apiSecret)
    .update(stringToSign)
    .digest("hex");

  return {
    "x-api-key": apiKey,
    "x-signature": signature,
    "x-timestamp": timestamp,
    "x-nonce": nonce,
  };
}

async function fetchLeaderboard(
  tqRouterPath: string,
): Promise<TQLeaderboardResponse> {
  const baseUrl = process.env.TQ_API_URL;
  if (!baseUrl) throw new Error("TQ_API_URL not set");

  const headers = buildAuthHeaders("GET", tqRouterPath);
  const response = await fetch(`${baseUrl}/api/public/v1${tqRouterPath}`, {
    headers,
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`TQ API responded ${response.status}: ${body}`);
  }

  return response.json() as Promise<TQLeaderboardResponse>;
}

// Prisma enum values use "Class_1IM1" format; strip the prefix for the frontend
function normalizeUsers(users: TQUser[]): TQUser[] {
  return users.map((u) => ({
    ...u,
    schoolClass: u.schoolClass.replace(/^Class_/, ""),
  }));
}

// GET /api/tqleaderboard/vg1
router.get("/vg1", async (_req: Request, res: Response) => {
  try {
    const data = await fetchLeaderboard("/leaderboard/vg1");
    return res.json({ users: normalizeUsers(data.users) });
  } catch (err) {
    console.error("TQ leaderboard vg1 error:", err);
    return res.status(503).json({ error: "TQ leaderboard unavailable" });
  }
});

// GET /api/tqleaderboard/vg2
router.get("/vg2", async (_req: Request, res: Response) => {
  try {
    const data = await fetchLeaderboard("/leaderboard/vg2");
    return res.json({ users: normalizeUsers(data.users) });
  } catch (err) {
    console.error("TQ leaderboard vg2 error:", err);
    return res.status(503).json({ error: "TQ leaderboard unavailable" });
  }
});

// GET /api/tqleaderboard/all
// Returns: [{ users, title: "VG1" }, { users, title: "VG2" }]
router.get("/all", async (_req: Request, res: Response) => {
  try {
    const [vg1, vg2] = await Promise.all([
      fetchLeaderboard("/leaderboard/vg1"),
      fetchLeaderboard("/leaderboard/vg2"),
    ]);
    return res.json([
      { users: normalizeUsers(vg1.users), title: "VG1" },
      { users: normalizeUsers(vg2.users), title: "VG2" },
    ]);
  } catch (err) {
    console.error("TQ leaderboard all error:", err);
    return res.status(503).json({ error: "TQ leaderboard unavailable" });
  }
});

export default router;
