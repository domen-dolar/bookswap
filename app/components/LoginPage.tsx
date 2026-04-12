"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { logIn } from "../(root)/login/actions";
import Link from "next/link";
import Image from "next/image";

const LoginPage = () => {
  const [error, setError] = useState<string>();
  const router = useRouter();

  const params = useSearchParams();
  const signInError = params.get("error");

  useEffect(() => {
    if (signInError === "googleLogin")
      setError("Poskusite se prijaviti drugače kot z Googlom!");
  }, [signInError]);

  async function handleLogin(provider: string, formData?: FormData) {
    const signIn = await logIn(provider, formData);

    if (signIn?.error) {
      setError(signIn.error);
    } else {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-outer-div">
        <h1 className="text-3xl text-center">Prijava</h1>

        <div className="auth-form-div">
          <form
            action={(formData) => handleLogin("credentials", formData)}
            className="space-y-5"
          >
            <div className="flex flex-col">
              <label htmlFor="identifier">Uporabniško ime ali e-pošta</label>
              <input
                type="text"
                id="identifier"
                name="identifier"
                className="form-text-input"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Geslo</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-text-input"
                required
              />
            </div>
            {error && (
              <div>
                <p className="text-red-500 text-center">{error}</p>
              </div>
            )}
            <div className="flex justify-center">
              <button className="btn min-w-30">Prijavi se</button>
            </div>
          </form>

          <div className="flex justify-center">
            <Link href="/register" className="hover:underline">
              Še nimate računa? Registrirajte se.
            </Link>
          </div>

          <div className="flex flex-col space-y-5 justify-center">
            <div className="w-full relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-black"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-primary">Ali</span>
              </div>
            </div>
            <form action={() => handleLogin("google")}>
              <button className="btn flex items-center mx-auto space-x-2">
                <Image src="/google.png" alt="google" width={24} height={24} />
                <div>Prijavi se z Googlom</div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
