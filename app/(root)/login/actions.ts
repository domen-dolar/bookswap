"use server";

import { signIn } from "@/auth";

export async function logIn(type: string, formData?: FormData) {
  await signIn(type, { redirect: true, redirectTo: "/" });
}
