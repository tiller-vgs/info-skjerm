import { createAuthClient } from "better-auth/react";
import {
  inferAdditionalFields,
  usernameClient,
} from "better-auth/client/plugins";

export const authClient = createAuthClient({
  // Leave unset (or set VITE_API_BASE_URL="") to use the current origin —
  // the Vite proxy or nginx will forward /api/auth/* to the backend.
  baseURL: import.meta.env.VITE_API_BASE_URL || undefined,
  plugins: [
    usernameClient(),
    inferAdditionalFields({
      user: {
        role: {
          type: "string",
          default: "MODERATOR",
          enum: ["ADMIN", "MODERATOR"],
        },
        username: {
          type: "string",
          unique: true,
        },
      },
    }),
  ],
});
