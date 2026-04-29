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

export async function rateBook(bookID: string, rating: number) {
  const session = await auth();

  if (!session) return { error: "Za ocenjevanje knjige se prijavite!" };

  const email = session?.user?.email;

  const user = await client.fetch(
    `*[_type == "users" && email == $email][0]{
          _id
      }`,
    { email },
  );
  const userID = user._id;

  const alreadyRated = await client.fetch(
    `*[_type == "ratings" && user._ref == $userID][0]`,
    { userID },
  );

  if (alreadyRated) return { error: "To knjigo ste že ocenili!" };

  if (rating === 0) return { error: "Najprej izberite stopnjo ocene!" };

  await client.create({
    _type: "ratings",
    rating,
    book: { _type: "reference", _ref: bookID },
    user: { _type: "reference", _ref: userID },
  });

  return { success: "Knjiga ocenjena!" };
}
