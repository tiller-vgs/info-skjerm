import dotenv from "dotenv";
import express from "express";
import * as controller from "@controllers";
import { auth } from "@lib/auth";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";

dotenv.config({ path: "./.env", override: true, debug: true });

declare global {
  var test: string;
}
global.test = "test";
console.log("Global.test:  ", global.test);

const app = express();
const PORT = process.env.PORT || 3000;

// Better Auth handler must be mounted before express.json()
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.use("/weather", controller.WeatherController);
app.use("/database", controller.DatabaseController);
app.use("/busdepartures", controller.BusController);
app.use("/test", controller.test);
app.use("/test2", controller.test2);

app.get("/api/auth", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});

app.get("/api/AdminTable", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const ControllerResponse = controller.DatabaseController;
  return res.json(ControllerResponse);
});

app.post("/api/AdminTable", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const ControllerResponse = controller.DatabaseController;
  return res.json(ControllerResponse);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
