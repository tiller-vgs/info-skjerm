"use server";

import { LoginValue } from "@/types";
import { LoginSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { auth, signIn, signOut } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

// export const login = async (values: LoginValue) => {
//   const validatedFields = LoginSchema.safeParse(values);

//   if (!validatedFields) {
//     return { error: "Invalid fields" };
//   }

//   const { email, password } = validatedFields.success
//     ? validatedFields.data
//     : { email: "", password: "" };

//   try {
//     await signIn("credentials", {
//       email,
//       password,
//       redirectTo: DEFAULT_LOGIN_REDIRECT,
//     });
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case "CredentialsSignin": {
//           return { error: "Invalid credentials" };
//         }
//         default: {
//           return { error: "Something went wrong" };
//         }
//       }
//     }
//     throw error;
//   }
// };

// export const register = async (values: RegisterValue) => {
//   const validatedFields = RegisterSchema.safeParse(values);

//   if (!validatedFields.success) {
//     return { error: "Invalid fields" };
//   }

//   const { email, password, name } = validatedFields.success
//     ? validatedFields.data
//     : { email: "", password: "", name: "" };

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const existingUser = await db.user.findUnique({
//     where: {
//       email,
//     },
//   });

//   if (existingUser) {
//     return { error: "Email already in use!" };
//   }

//   await db.user.create({
//     data: {
//       name,
//       email,
//       password: hashedPassword,
//     },
//   });

//   return { success: "User created!" };
// };

export const handleSignOut = async () => {
  return await signOut();
};

export const getUser = async () => {
  const session = await auth();
  return session;
};