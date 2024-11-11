import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    // Optional: Add logging to debug
    console.log("Middleware running, token:", req.nextauth.token);
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Add logging to debug
        console.log("Checking authorization, token:", token);
        return (
          !!token &&
          (token.user.role === "admin" || token.user.role === "superAdmin")
        );
      },
    },
    pages: {
      signIn: "/login",
      error: "/error",
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - /api routes
     * - /login
     * - /register
     * - /forgotPassword
     * - /_next/static (static files)
     * - /_next/image (image optimization files)
     * - /favicon.ico (favicon file)
     */
    "/((?!api|login|register|forgotPassword|_next/static|_next/image|favicon.ico).*)",
  ],
};
