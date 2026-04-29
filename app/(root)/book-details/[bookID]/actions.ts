"use server";

import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";

export async function commentBook(bookID: string, comment: string) {
  const session = await auth();

  if (!session) return { error: "Za komentiranje se prijavite!" };

  const email = session?.user?.email;

  const user = await client.fetch(
    `*[_type == "users" && email == $email][0]{
          _id
      }`,
    { email },
  );
  const userID = user._id;

  await client.create({
    _type: "comments",
    comment,
    timestamp: new Date().toISOString(),
    commentator: { _type: "reference", _ref: userID },
    book: { _type: "reference", _ref: bookID },
  });

  return { success: "Komentar objavljen!" };
}
