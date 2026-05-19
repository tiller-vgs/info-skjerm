// Used for all APIs that don't need authentication

import dotenv from "dotenv";
import express from "express";
import * as controller from "@controllers";
import { auth } from "@lib/auth";
import { toNodeHandler } from "better-auth/node";

// dotenv.config({ path: "./.env", override: true, debug: true });

const PORT = process.env.PORT || "3000";
const app = express();

// Better Auth handler must be mounted before express.json() // IDK if it needs to be here or what FIX ask martin
app.all("/api/auth/*splat", toNodeHandler(auth));

app.get("/api/health", async (req, res) => {
  res.json({ message: "Server is running!" });
});

app.use(express.json());

app.use("/api/weather", controller.WeatherController);
app.use("/api/busdepartures", controller.BusController);
app.use("/api/announcements", controller.AnnouncementsController);
app.use("/api/test", controller.test);

app.use("/api/tqleaderboard", controller.TQLeaderboardController);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
