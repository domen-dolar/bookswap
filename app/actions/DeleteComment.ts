import { client } from "@/sanity/lib/client";

export async function DeleteComment(commentID: string) {
  await client.delete(commentID);
}
