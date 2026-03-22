import { SESSION_COOKIE_NAME } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const sessionCookie = req.headers.get(SESSION_COOKIE_NAME);

    if (!sessionCookie) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Session veirifcation error:", error);
    return NextResponse.json({ success: false }, { status: 401 });
  }
}
