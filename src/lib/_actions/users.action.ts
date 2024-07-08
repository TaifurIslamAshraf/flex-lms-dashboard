"use server";

import config from "@/config/config";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

const serverApi = config.serverApi;

export const getAllUsers = async () => {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${serverApi}/users/getAllUsers`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session?.accessToken}`,
    },
    next: { tags: ["User"] },
  });

  const users = await res.json();

  return users;
};
