import { SESSION_COOKIE_NAME } from "@/lib/constants";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get(SESSION_COOKIE_NAME);
    console.dir({ sessionCookie, has: req.cookies.has(SESSION_COOKIE_NAME) });
    if (!sessionCookie) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Session veirifcation error:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
