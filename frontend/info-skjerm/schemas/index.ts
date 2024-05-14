import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Passord kan ikke være tomt" }),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Name is requierd!" }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password need to be more than 6 caracters" }),
});
