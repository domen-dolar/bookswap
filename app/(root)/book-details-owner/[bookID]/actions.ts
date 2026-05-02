"use server";

import { client } from "@/sanity/lib/client";

export async function changeBook(formData: FormData) {
  const id = formData.get("id") as string;
  const author = formData.get("author") as string;
  const publishmentYear = Number(formData.get("publishmentYear"));
  const condition = formData.get("condition") as string;
  const genre = formData.get("genre") as string;

  await client
    .patch(id)
    .set({ author, publishmentYear, condition, genre })
    .commit();

  return "Podatki spremenjeni!";
}

export async function deleteBook(bookID: string) {
  const documentIDs: string[] = [];

  const chats = await client.fetch(
    `*[_type == "chats" && book._ref == $bookID]{ _id }`,
    { bookID },
  );

  chats.map((chat: { _id: string }) => documentIDs.push(chat._id));

  const comments = await client.fetch(
    `*[_type == "comments" && book._ref == $bookID]{ _id }`,
    { bookID },
  );

  comments.map((comment: { _id: string }) => documentIDs.push(comment._id));

  const ratings = await client.fetch(
    `*[_type == "ratings" && book._ref == $bookID]{ _id }`,
    { bookID },
  );

  ratings.map((rating: { _id: string }) => documentIDs.push(rating._id));

  await Promise.all(
    documentIDs.map(async (documentID) => await client.delete(documentID)),
  );

  await client.delete(bookID);
}
