"use server";

import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function logIn(type: string, formData?: FormData) {
  if (type === "credentials") {
    const identifier = formData?.get("identifier");
    const password = formData?.get("password");

    try {
      await signIn("credentials", {
        email: identifier,
        password,
      });
    } catch (err) {
      if (!isRedirectError(err)) return { error: "Napačni podatki!" };
    }
  } else {
    await signIn(type, { formData, redirect: true, redirectTo: "/" });
  }
}

export async function logOut() {
  await signOut();
}
