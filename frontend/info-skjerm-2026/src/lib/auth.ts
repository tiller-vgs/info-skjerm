import { betterAuth } from "better-auth";
import { haveIBeenPwned, username } from "better-auth/plugins";
import { hashPassword, verifyPassword } from "./password";
// If your Prisma file is located elsewhere, you can change the path

export const auth = betterAuth({
  baseURL: "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
  },
  user: {
    additionalFields: {
      username: {
        type: "string",
        unique: true,
      },
    },
  },
  advanced: {
    useSecureCookies: false, // Set to true in production
  },
  plugins: [
    username(),
    haveIBeenPwned({
      customPasswordCompromisedMessage: "Please choose a more secure password.",
    }),
  ],
});
