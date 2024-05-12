import { NextRequest, NextResponse } from "next/server";
import decodeJWT from "./utilities/decodeJWT";
import { TUser } from "./redux/features/auth/interface";
import getAccessToken from "./lib/getAccessToken";
import con from "@/config/config";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value || "";
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (!refreshToken) {
    return Response.redirect(new URL("/login", request.url));
  }

  if (!accessToken) {
    try {
      const token = await getAccessToken(refreshToken);
      const cookieOption = {
        domain: con.env === "production" ? `.${con.main_domain}` : "localhost",
        httpOnly: con.env === "production",
        secure: con.env === "production",
        sameSite: "lax" as const,
        maxAge: Number(con.token_data.access_token_cookie_expires),
      };
      const response = NextResponse.next();
      response.cookies.set("accessToken", token, cookieOption);
      return response;
    } catch (error) {
      return Response.redirect(new URL("/login", request.url));
    }
  }
  const currentUser = decodeJWT(accessToken as string) as TUser; // Decode the JWT
  if (currentUser.role !== "admin") {
    return Response.redirect(new URL("/error", request.url));
  }
  if (!request.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/dashboard", request.url));
  }
  // if (currentUser.role === "staff" && request.nextUrl.pathname.startsWith("/dashboard/orders")) {
  //   console.log(currentUser)
  //   return NextResponse.rewrite(new URL("/dashboard/orders", request.url));
  // }

  return null;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|login|registration|error).*)",
  ],
};
