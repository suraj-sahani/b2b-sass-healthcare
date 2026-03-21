import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase/server";
import { SESSION_COOKIE_NAME } from "@/lib/constants";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify session and get user
    const decodedClaims = await adminAuth.verifySessionCookie(
      sessionCookie,
      true,
    );

    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "Missing FCM token" }, { status: 400 });
    }

    // Store FCM token in Firestore under the user's document
    await adminDb
      .collection("users")
      .doc(decodedClaims.uid)
      .collection("fcmTokens")
      .doc(token)
      .set({
        token,
        createdAt: new Date().toISOString(),
        userAgent: req.headers.get("user-agent") ?? "unknown",
      });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("FCM token save error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
