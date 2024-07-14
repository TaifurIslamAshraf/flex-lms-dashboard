import { customRevalidateTag } from "@/lib/_actions/revalidateTag";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { tag } = await req.json();

  await customRevalidateTag(tag);

  return Response.json({
    message: `${tag} Validate successfully`,
  });
}
