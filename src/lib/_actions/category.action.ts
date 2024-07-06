"use server";

import config from "@/config/config";

const serverApi = config.serverApi;

export const getAllCategory = async () => {
  const res = await fetch(`${serverApi}/category/get-all-category`, {
    next: { tags: ["Category"] },
  });

  const category = await res.json();

  return category;
};
