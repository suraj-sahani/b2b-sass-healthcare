"use server";

import { cookies, headers } from "next/headers";
import { SESSION_COOKIE_NAME } from "../constants";
import { adminAuth, adminDb } from "./server";

type FCMRes =
  | { success: true; message: string }
  | { success: false; error: string };

export const fcmSubscribe = async (token: string): Promise<FCMRes> => {
  try {
    const headersStore = await headers();
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionCookie) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    const decodedClaims = await adminAuth.verifySessionCookie(
      sessionCookie,
      true,
    );

    // Store FCM token in Firestore under the user's document
    await adminDb
      .collection("users")
      .doc(decodedClaims.uid)
      .collection("fcmTokens")
      .doc(token)
      .set({
        token,
        createdAt: new Date().toISOString(),
        userAgent: headersStore.get("user-agent") ?? "unknown",
      });

    return {
      success: true,
      message: "FCM token stored successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to store FCM token",
    };
  }
};

export const fcmUnsubscribe = async (token: string): Promise<FCMRes> => {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionCookie) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }
    const { uid } = await adminAuth.verifySessionCookie(sessionCookie, true);

    await adminDb
      .collection("users")
      .doc(uid)
      .collection("fcmTokens")
      .doc(token)
      .delete();

    return {
      success: true,
      message: "FCM token deleted successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to delete FCM token",
    };
  }
};
