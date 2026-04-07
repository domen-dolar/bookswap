"use server";

import { signIn, signOut } from "@/auth";
import { client } from "@/sanity/lib/client";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function logIn(type: string, formData?: FormData) {
  if (type === "credentials") {
    const identifier = formData?.get("identifier");
    const password = formData?.get("password");

    const googleUserExists = await client.fetch(
      `*[_type == "users" && (name == $identifier || email == $identifier) && provider == "google"][0]`,
      { identifier },
    );

    if (googleUserExists) return { error: "Poskusite se prijaviti z Googlom!" };

    try {
      await signIn("credentials", {
        email: identifier,
        password,
      });
    } catch (err) {
      if (!isRedirectError(err)) return { error: "Napačni podatki!" };
    }
  } else {
    await signIn(type, { formData, redirectTo: "/" });
  }
}

export async function logOut() {
  await signOut();
}
