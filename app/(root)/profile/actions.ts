"use server";

import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import bcrypt from "bcryptjs";

export default async function updateUserData(formData: FormData) {
  const session = await auth();

  const sessionEmail = session?.user?.email;

  const formUsername = formData.get("username") as string;
  const formEmail = formData.get("email") as string;
  const formOldpass = formData.get("oldPassword") as string;
  const formNewpass = formData.get("newPassword") as string;

  const databaseUser = await client.fetch(
    `*[_type == "users" && email == $sessionEmail][0]{
      _id, name, email, password
    }`,
    {
      sessionEmail,
    },
  );

  const isOldPasswordValid = await bcrypt.compare(
    formOldpass,
    databaseUser.password,
  );

  if (!isOldPasswordValid)
    return { message: "Napačno trenutno geslo!", color: "text-red-500" };

  let updatedUsername = databaseUser.name;
  let updatedEmail = databaseUser.email;
  let updatedPassword = databaseUser.password;

  if (formUsername && formUsername !== databaseUser.name) {
    updatedUsername = formUsername;
  }
  if (formEmail && formEmail !== databaseUser.email) {
    updatedEmail = formEmail;
  }
  if (formNewpass && formNewpass !== formOldpass) {
    updatedPassword = await bcrypt.hash(formNewpass, 10);
  }

  await client
    .patch(databaseUser._id)
    .set({
      name: updatedUsername,
      email: updatedEmail,
      password: updatedPassword,
    })
    .commit();

  return {
    message: "Podatki uspešno posodobljeni!",
    color: "text-green-500",
    user: {
      name: updatedUsername,
      email: updatedEmail,
    },
  };
}
