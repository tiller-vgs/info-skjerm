import { auth } from "../server.ts"; // path to your Better Auth server instance

const response = await auth.api.signInEmail({
  body: {
    email,
    password,
  },
  asResponse: true, // returns a response object instead of data
});
