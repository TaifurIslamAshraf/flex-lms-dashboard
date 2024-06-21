import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      // Allow access if the user has the admin role

      return !!token && token.user.role === "admin";
    },
  },
  pages: {
    signIn: "/login", // Redirect to this page if not authenticated
  },
});

export const config = {
  matcher: ["/((?!api|login|register|forgotpassword).*)"],
};
