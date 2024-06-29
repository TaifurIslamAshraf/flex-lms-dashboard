"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export const getAccessToken = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  return session.accessToken;
};
