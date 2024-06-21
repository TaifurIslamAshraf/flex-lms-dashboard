"use server";

import { serverApi } from "../utils";

export const getAllCategory = async () => {
  const res = await fetch(`${serverApi}/category/get-all-category`, {
    next: { tags: ["Category"] },
  });

  const category = await res.json();

  return category;
};
