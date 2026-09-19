import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const protectedRoutes = ["/cart", "/checkout", "/profile"];

const authRoutes = ["/login", "/register"];

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const token = request.cookies.get("auth_token")?.value;

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  // =====================================================
  // PROTECTED ROUTES
  // =====================================================

  if (isProtectedRoute) {
    if (!token || !process.env.JWT_SECRET) {
      const loginUrl = new URL("/login", request.url);

      loginUrl.searchParams.set("redirect", `${pathname}${search}`);

      return NextResponse.redirect(loginUrl);
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET);

      return NextResponse.next();
    } catch {
      const loginUrl = new URL("/login", request.url);

      loginUrl.searchParams.set("redirect", `${pathname}${search}`);

      const response = NextResponse.redirect(loginUrl);

      response.cookies.delete("auth_token");

      return response;
    }
  }

  // =====================================================
  // LOGIN / REGISTER ROUTES
  // =====================================================

  if (isAuthRoute && token && process.env.JWT_SECRET) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);

      return NextResponse.redirect(new URL("/profile", request.url));
    } catch {
      const response = NextResponse.next();

      response.cookies.delete("auth_token");

      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart/:path*",
    "/checkout/:path*",
    "/profile/:path*",
    "/login/:path*",
    "/register/:path*",
  ],
};
