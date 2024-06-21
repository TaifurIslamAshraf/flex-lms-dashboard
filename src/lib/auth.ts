import config from "@/config/config";
import { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

const serverApi = config.serverApi;

const refreshToken = async (token: JWT): Promise<JWT> => {
  const res = await fetch(`${serverApi}/auth/refresh`, {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.refreshToken}`,
    },
    cache: "no-store",
  });

  const { data } = await res.json();

  return { ...token, ...data };
};

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
    error: "/not-found",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const { email, password } = credentials;
        const res = await fetch(`${serverApi}/auth/login`, {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        if (res.status === 401) {
          return null;
        }

        const user = await res.json();

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      if (new Date().getTime() < token.expireIn) return token;

      return await refreshToken(token);
    },

    async session({ token, session }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;

      return session;
    },
  },
};
