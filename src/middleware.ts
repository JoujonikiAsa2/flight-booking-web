import { NextRequest, NextResponse } from "next/server";
import getUser from "./helpers/getUser";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const currentRoute = request.nextUrl.pathname;
  // Run the NextAuth.js middleware first
  const token = (await cookies()).get("accessToken")?.value as string;
  console.log(token)
  const user = await getUser()
  const isPublicRoute =
    currentRoute === "/login";
  if (!token && !user && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (user && isPublicRoute) {
    return NextResponse.redirect(
      new URL(
        `/`,
        request.url
      )
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/flight-booking/:path*", "/login"],
};
