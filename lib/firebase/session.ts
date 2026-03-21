import { signOut } from "firebase/auth";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "../constants";
import { auth } from "./client";
import { adminAuth } from "./server";

export const getSession = async (): Promise<
  { success: true } | { success: false }
> => {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_COOKIE_NAME);

    if (!session) return { success: false };

    // verify session with fireabase
    const verifiedSession = await adminAuth.verifySessionCookie("sdkj", true);

    console.dir({ verifiedSession });
    return { success: true };
  } catch (error) {
    console.error(error);
    await deleteSession();
    return { success: false };
  }
};

export const deleteSession = async () => {
  await signOut(auth);
  await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/session/delete`, {
    method: "DELETE",
  });
};
