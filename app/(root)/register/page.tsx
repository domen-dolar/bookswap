"use client";

import Link from "next/link";
import { registerUser } from "./actions";
import { useState } from "react";

const Register = () => {
  const [error, setError] = useState<string>();

  async function handleSubmit(formData: FormData) {
    const registration = await registerUser(formData);

    if (registration?.error) setError(registration.error);
  }

  return (
    <div className="auth-page">
      <div className="auth-outer-div">
        <h1>Registracija</h1>

        <div className="auth-form-div">
          <form
            action={(FormData) => handleSubmit(FormData)}
            className="space-y-5"
          >
            <div className="flex flex-col">
              <label htmlFor="username">Uporabniško ime</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-text-input"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">E - pošta</label>
              <input
                type="email"
                id="email"
                name="email"
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
            <div className="flex flex-col">
              <label htmlFor="repeatPassword">Ponovite geslo</label>
              <input
                type="password"
                id="repeatPassword"
                name="repeatPassword"
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
              <button className="btn min-w-30">Registriraj se</button>
            </div>
          </form>

          <div className="flex justify-center">
            <Link href="/login" className="hover:underline">
              Že imate račun? Prijavite se.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
