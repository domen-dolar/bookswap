"use server";

import { signIn } from "@/auth";
import { client } from "@/sanity/lib/client";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const repeatPassword = formData.get("repeatPassword") as string;

  if (repeatPassword !== password) return { error: "Gesli se morata ujemati!" };

  const userExists = await client.fetch(
    `*[_type == "users" && (email == $email || name == $username)][0]`,
    { email, username },
  );

  if (userExists)
    return {
      error: "Uporabnik s to e - pošto ali uporabniškim imenom že obstaja!",
    };

  const hashedPassword = await bcrypt.hash(password, 10);

  await client.create({
    _type: "users",
    name: username,
    email,
    password: hashedPassword,
    provider: "credentials",
    role: "user",
  });

  await signIn("credentials", {
    email,
    password,
    redirect: true,
    redirectTo: "/",
  });
}
