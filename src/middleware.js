// middleware.js
import { NextResponse } from "next/server";




export function middleware(request) {
  console.log("\n=== MIDDLEWARE TRIGGERED ===");
  console.log("Request URL:", request.url);
  console.log("Pathname762746724:", request.nextUrl.pathname);

  

  // 1. Check for token
  const token = request.cookies.get("connect.sid")?.value;
  console.log("Token exists:", !!token);

  // Public routes (no token needed)
  const publicRoutes = ["/auth", "/verify", "/"];

const isPublic = publicRoutes.some(route => 
  request.nextUrl.pathname.startsWith(route)
);

console.log(isPublic);

  // 2. Block protected routes if no token
  if (!token && !isPublic) {

    console.log("🔒 Redirecting to /login (no token)");
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // 3. Redirect logged-in users away from auth pages
  if (
    token &&
    (request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/register")
  ) {
    console.log("➡️ Redirecting to /dashboard (already logged in)");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  console.log("✅ Allowing request to proceed");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
