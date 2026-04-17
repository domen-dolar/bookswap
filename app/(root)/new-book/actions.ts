"use server";

import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";

export async function publishBook(formData: FormData) {
  const title = formData.get("title") as string;
  let author = formData.get("author") as string | undefined;
  if (!author) author = "Neznan";

  const publishmentYear = Number(formData.get("publishmentYear"));
  const condition = formData.get("condition") as string;
  const genre = formData.get("genre") as string;
  const images = formData.getAll("images") as File[];

  const imageAssets = await Promise.all(
    images.map((image) =>
      client.assets.upload("image", image, {
        filename: image.name,
      }),
    ),
  );

  const imageRefs = imageAssets.map((asset) => ({
    _key: crypto.randomUUID(),
    _type: "image",
    asset: {
      _type: "reference",
      _ref: asset._id,
    },
  }));

  const session = await auth();
  const email = session?.user?.email;

  const user = await client.fetch(
    `*[_type == "users" && email == $email][0]{
        _id
    }`,
    { email },
  );
  const userID = user._id;

  const bookExists = await client.fetch(
    `*[_type == "books" && title == $title && owner._ref == $userID][0]`,
    { title, userID },
  );

  if (bookExists) return { success: false };

  await client.create({
    _type: "books",
    title,
    images: imageRefs,
    author,
    publishmentYear,
    condition,
    publishedAt: new Date().toISOString(),
    genre,
    owner: { _type: "reference", _ref: userID },
  });

  return { success: true };
}
