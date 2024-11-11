import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Middleware function with proper error handling and redirects
export default withAuth(
  async function middleware(req) {
    const token = req.nextauth?.token;

    // If no token and not on login page, redirect to login
    if (!token && !req.nextUrl.pathname.startsWith("/login")) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", req.url);
      return NextResponse.redirect(loginUrl);
    }

    // If has token but wrong role, redirect to error page
    if (token && !["admin", "superAdmin"].includes(token.user?.role!)) {
      return NextResponse.redirect(new URL("/error", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // We'll handle authorization in the middleware function
        return true;
      },
    },
    pages: {
      signIn: "/login",
      error: "/error",
    },
  }
);

// Update matcher to be more specific and include error page
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next (Next.js internals)
     * - Public files
     * - Auth-related pages
     */
    "/((?!api|_next|.*\\..*|login|register|error|forgotPassword).*)",
  ],
};
