import z from "zod";

export const SIGN_UP_SCHEMA = z
  .object({
    email: z.email({ error: "Please enter a valid email" }),
    password: z
      .string({ error: "Password is required" })
      .min(6, { error: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string({ error: "Password is required." })
      .min(6, { error: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });

export const LOGIN_SCHEMA = z.object({
  email: z.email({ error: "Please enter a valid email" }),
  password: z
    .string({ error: "Password is required" })
    .nonempty({ error: "Password is required" }),
});
