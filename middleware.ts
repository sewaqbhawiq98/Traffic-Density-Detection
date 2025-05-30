import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if the request is for protected pages
  if (
    request.nextUrl.pathname === "/admin" ||
    request.nextUrl.pathname === "/dashboard" ||
    request.nextUrl.pathname === "/cameras" ||
    request.nextUrl.pathname === "/analytics"
  ) {
    // Check if the user is authenticated via cookie
    const isAuthenticated = request.cookies.get("isAuthenticated")?.value

    // If not authenticated, redirect to login page
    if (isAuthenticated !== "true") {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // For admin page, check admin authentication
    if (request.nextUrl.pathname === "/admin") {
      const adminAuthenticated = request.cookies.get("adminAuthenticated")?.value

      if (adminAuthenticated !== "true") {
        return NextResponse.redirect(new URL("/admin/auth", request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin", "/dashboard", "/cameras", "/analytics"],
}

