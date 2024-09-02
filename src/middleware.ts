import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      // Allow access if the user has the admin role

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
});

export const config = {
  matcher: ["/((?!api|login|register|forgotPassword).*)"],
};
