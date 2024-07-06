"use server";

import config from "@/config/config";
import { ILayoutData } from "@/types/layout";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

const serverApi = config.serverApi;

export const getLayouts = async (): Promise<ILayoutData[]> => {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${serverApi}/layout/all-layout`, {
    headers: {
      authorization: `Bearer ${session?.accessToken}`,
    },
    next: { tags: ["Layout"] },
  });

  const layouts = await res.json();

  return layouts.data as ILayoutData[];
};

export const updateLayout = async (
  payload: Partial<ILayoutData>,
  id: string
) => {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${serverApi}/layout/update-layout/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: {
      authorization: `Bearer ${session?.accessToken}`,
    },
    next: { tags: ["Layout"] },
  });

  const layouts = await res.json();

  return layouts;
};
