import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: "http://localhost:3000" // The base URL of your auth server
})
// https://better-auth.com/docs/concepts/client