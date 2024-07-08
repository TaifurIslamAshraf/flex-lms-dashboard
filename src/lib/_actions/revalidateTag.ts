"use server";

import config from "@/config/config";
import { revalidateTag } from "next/cache";

const serverApi = config.clientApi;

export const customRevalidateTag = async (tag: string) => {
  revalidateTag(tag);
};

export const handleRevalidation = async (tag: string) => {
  await customRevalidateTag(tag);
  try {
    const res = await fetch(`${serverApi}/revalidate`, {
      method: "POST",
      body: JSON.stringify({ tag }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.json();
  } catch (error) {
    console.log(error);
  }
};
