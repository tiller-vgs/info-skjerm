import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  // Leave unset (or set VITE_API_BASE_URL="") to use the current origin —
  // the Vite proxy or nginx will forward /api/auth/* to the backend.
  baseURL: import.meta.env.VITE_API_BASE_URL || undefined,
  plugins: [usernameClient()],
});
