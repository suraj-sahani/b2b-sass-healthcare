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

export const ENV = z.object({
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string({
    error: "Firebase API key is required",
  }),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string({
    error: "Firebase auth domain is required",
  }),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string({
    error: "Firebase project id is required",
  }),
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string({
    error: "Firebase storage bucket is required",
  }),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string({
    error: "Firebase messaging sender id is required",
  }),
  NEXT_PUBLIC_FIREBASE_APP_ID: z.string({
    error: "Firebase app id is required",
  }),
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: z.string({
    error: "Firebase measurement id is required",
  }),
});
