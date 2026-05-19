import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { haveIBeenPwned, username } from "better-auth/plugins";
import { prisma } from "./prisma";
import { hashPassword, verifyPassword } from "./password";
// If your Prisma file is located elsewhere, you can change the path

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL:
    process.env.BETTER_AUTH_URL ||
    `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
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
    useSecureCookies: process.env.NODE_ENV === "production",
  },
  plugins: [
    username(),
    haveIBeenPwned({
      customPasswordCompromisedMessage: "Please choose a more secure password.",
    }),
  ],
});
