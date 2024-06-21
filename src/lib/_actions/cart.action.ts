"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { serverApi } from "../utils";

export const getAllCartItems = async () => {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${serverApi}/cart/cart-items`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${session?.accessToken!}`,
    },
    next: { tags: ["Cart"] },
  });

  const cart = await res.json();

  return cart;
};
