import { auth } from "lib/auth";

auth.api.signUpEmail({
  body: {
    email: "testuser@example.com",
    name: "Test User",
    username: "testuser",
    password: "infoskjermtiller",
  },
});

console.log(
  "Test user created successfully! Username: testuser, Password: infoskjermtiller",
);
