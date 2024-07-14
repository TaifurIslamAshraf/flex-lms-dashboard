"use server";

import config from "@/config/config";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

const serverApi = config.serverApi;

export const getOrderTrends = async () => {
  const session = await getServerSession(authOptions);

  try {
    const res = await fetch(`${serverApi}/chart/order-trends`, {
      headers: {
        "Content-Type": "Application/json",
        authorization: `Bearer ${session?.accessToken}`,
      },
      next: { tags: ["Order_Update"] },
    });

    const data = res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getOverView = async () => {
  const session = await getServerSession(authOptions);

  try {
    const res = await fetch(`${serverApi}/chart/overview`, {
      headers: {
        "Content-Type": "Application/json",
        authorization: `Bearer ${session?.accessToken}`,
      },
      next: { tags: ["Order_Update", "Course", "User"] },
    });

    const data = res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrderStatus = async () => {
  const session = await getServerSession(authOptions);

  try {
    const res = await fetch(`${serverApi}/chart/order-status`, {
      headers: {
        "Content-Type": "Application/json",
        authorization: `Bearer ${session?.accessToken}`,
      },
      next: { tags: ["Order_Update", "Order"] },
    });

    const data = res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
