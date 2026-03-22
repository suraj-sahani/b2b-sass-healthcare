import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/server";
import { SESSION_COOKIE_NAME, SESSION_DURATION_MS } from "@/lib/constants";

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json({ error: "Missing idToken" }, { status: 400 });
    }

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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Session creation error:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
