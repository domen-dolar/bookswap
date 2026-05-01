"use server";

import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";

export async function messageOwner(
  message: string,
  bookID: string,
  ownerID: string,
) {
  const session = await auth();
  const email = session?.user?.email;

  const user = await client.fetch(
    `*[_type == "users" && email == $email][0]{ _id }`,
    {
      email,
    },
  );

  await client.create({
    _type: "chats",
    message,
    timestamp: new Date().toISOString(),
    book: { _type: "reference", _ref: bookID },
    messenger: { _type: "reference", _ref: user._id },
    receiver: { _type: "reference", _ref: ownerID },
  });
}
