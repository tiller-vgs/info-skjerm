import express from "express";
import { auth } from "@lib/auth";
import cors from "cors"; // Import the CORS middleware
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import * as controller from "@controllers";

const app = express();
const port = 3005;

app.all("/api/auth/*splat", toNodeHandler(auth)); // For ExpressJS v4
// app.all("/api/auth/*splat", toNodeHandler(auth)); For ExpressJS v5

// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth

// Configure CORS middleware
app.use(
  cors({
    origin: "http://localhost:5174", // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  }),
);
async function requireLogin(req, res, next) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    return res.status(401).json({ message: "Logg inn, hmph." });
  }

  req.session = session;

  next();
}

app.get("/api/auth", requireLogin, async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});

app.get("/api/const first = useRef(second)", async (req, res) => {});

// app.get("/api/database", async (req, res) => {
//   const ControllerResponse = controller.DatabaseController;
// 	return res.json(ControllerResponse);
// });
app.get("/api/AdminTable", requireLogin, async (req, res) => {
  // Sjekker session før vi returnerer database-svar
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const ControllerResponse = controller.DatabaseController;
  return res.json(ControllerResponse);
});
app.post("/api/AdminTable", requireLogin, async (req, res) => {
  // Sjekker session før vi returnerer database-svar
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const ControllerResponse = controller.DatabaseController;
  return res.json(ControllerResponse);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
