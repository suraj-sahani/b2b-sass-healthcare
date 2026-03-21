import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase/server";
import { SESSION_COOKIE_NAME } from "@/lib/constants";

export async function POST(req: NextRequest) {
  const session = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { uid } = await adminAuth.verifySessionCookie(session, true);
    const { token } = await req.json();

    await adminDb
      .collection("users")
      .doc(uid)
      .collection("fcmTokens")
      .doc(token)
      .delete();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Unsubscribe error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
