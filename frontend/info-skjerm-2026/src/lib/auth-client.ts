import { createAuthClient } from "better-auth/react";
import {
  inferAdditionalFields,
  usernameClient,
} from "better-auth/client/plugins";
import { auth } from "./auth";
export const { signIn, signOut, signUp, useSession, getSession } =
  createAuthClient({
    baseURL: "http://localhost:3000", // The base URL of your auth server
    plugins: [usernameClient(), inferAdditionalFields<typeof auth>()],
  });
