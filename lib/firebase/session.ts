import { cookies } from "next/headers";
import z from "zod";
import { SESSION_COOKIE_NAME } from "../constants";

export const getSession = async (): Promise<
  { success: true } | { success: false }
> => {
  const cookieStore = await cookies();
  const session = await cookieStore.get(SESSION_COOKIE_NAME);

  if (session) return { success: true };
  return { success: false };
  // try {
  //   const verify = await fetch(
  //     `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/session/verify`,
  //   );

  //   const data = await verify.json();
  //   const validator = z.object({ success: z.literal(true) }).parse(data);
  //   console.log("validator", validator);
  //   return validator;
  // } catch (error) {
  //   console.error(error);
  //   return { success: false };
  // }
};
