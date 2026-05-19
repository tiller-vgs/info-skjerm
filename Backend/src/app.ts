import dotenv from "dotenv";
import express from "express";
import * as controller from "@controllers";
import cors from "cors";
import { auth } from "@lib/auth";
import { toNodeHandler } from "better-auth/node";

// dotenv.config({ path: "./.env", override: true, debug: true });

const app = express();

app.use(cors());
const PORT = process.env.PORT || 3000;

// Better Auth handler must be mounted before express.json()
app.all("/api/auth/*splat", toNodeHandler(auth));

app.get("/api/health", async (req, res) => {
  res.json({ message: "Server is running!" });
});

app.use(express.json());

app.use("/api/weather", controller.WeatherController);
app.use("/api/database", controller.DatabaseController);
app.use("/api/busdepartures", controller.BusController);
app.use("/api/tqleaderboard", controller.TQLeaderboardController);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
