"use server";
import { signOut } from "firebase/auth";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "../constants";
import { auth } from "./client";

export const getSession = async (): Promise<
  { success: true } | { success: false }
> => {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_COOKIE_NAME);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/session/verify`,
      {
        headers: {
          [SESSION_COOKIE_NAME]: session?.value || "",
        },
      },
    );

    const isVerified: { success: boolean } = await res.json();
    console.log(isVerified);
    if (!isVerified.success) {
      // await deleteSession();
      return isVerified;
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

export const deleteSession = async () => {
  const cookieStore = await cookies();
  await signOut(auth);
  cookieStore.delete(SESSION_COOKIE_NAME);
};
