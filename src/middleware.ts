import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Supabase auth middleware is disabled while Supabase integration is not configured.
  return NextResponse.next({ request });
}

export const config = {
  matcher: ["/admin/:path*"],
};
