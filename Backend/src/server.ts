import express from "express";
import { auth } from "./auth";
import cors from "cors"; // Import the CORS middleware
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";

const app = express();
const port = 3005;

app.all("/api/auth/*splat", toNodeHandler(auth)); // For ExpressJS v4
// app.all("/api/auth/*splat", toNodeHandler(auth)); For ExpressJS v5

// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth

// Configure CORS middleware
app.use(
  cors({
    origin: "http://your-frontend-domain.com", // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  }),
);

app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
