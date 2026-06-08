import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  // Set VITE_API_BASE_URL=http://localhost:3000 for local dev.
  // Leave unset in production — better-auth defaults to the current origin.
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5173",
  plugins: [usernameClient()],
});
