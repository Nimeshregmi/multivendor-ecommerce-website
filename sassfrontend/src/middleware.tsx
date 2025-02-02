import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { refreshAccessToken } from "./utils/verifyToken";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get access and refresh tokens from cookies
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  // If there is no access token but a refresh token exists, try to refresh the access token
  if (!accessToken && refreshToken && !pathname.startsWith("/auth")) {
    try {
      const newAccessToken = await refreshAccessToken(refreshToken);

      if (newAccessToken) {
        // Save the new access token in cookies
        const response = NextResponse.next();
        response.cookies.set("access_token", newAccessToken, {
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        });
        return response;
      } else {
        // If refreshing the token fails, delete both tokens and redirect to login
        const response = NextResponse.redirect(new URL("/auth/login", request.url));
        response.cookies.delete("access_token");
        response.cookies.delete("refresh_token");
        return response;
      }
    } catch (error) {
      // If there's an error refreshing the token, delete both tokens and redirect to login
      const response = NextResponse.redirect(new URL("/auth/login", request.url));
      response.cookies.delete("access_token");
      response.cookies.delete("refresh_token");
      return response;
    }
  }

  // Protect dashboard routes
  if (pathname.startsWith("/dashboard")) {
    // If both tokens are missing, redirect to login
    if (!accessToken && !refreshToken) {
      const response = NextResponse.redirect(new URL("/auth/login", request.url));
      response.cookies.delete("access_token");
      response.cookies.delete("refresh_token");
      return response;
    }
  }

  // Protect auth routes (login and registration)
  if (pathname.startsWith("/auth")) {
    // If either token is present, redirect to dashboard
    if (accessToken || refreshToken) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Middleware configuration
export const config = {
  matcher: [
    "/dashboard/:path*", // Protect all dashboard routes
    "/auth/:path*", // Protect all auth routes
  ],
};