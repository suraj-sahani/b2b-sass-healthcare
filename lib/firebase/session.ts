"use server";
import { signOut } from "firebase/auth";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, SESSION_DURATION_MS } from "../constants";
import { auth } from "./client";
import { adminAuth } from "./server";

export const getSession = async (): Promise<
  { success: true } | { success: false }
> => {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_COOKIE_NAME);

    if (!session?.value) return { success: false };

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

export const createSession = async (idToken: string) => {
  try {
    // Verify the ID token and create a session cookie
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: SESSION_DURATION_MS,
    });

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_DURATION_MS / 1000,
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

export const deleteSession = async () => {
  await signOut(auth);
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
};
