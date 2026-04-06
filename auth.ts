import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { client } from "./sanity/lib/client";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      authorize: async (credentials) => {
        const identifier = credentials.email;

        const user = await client.fetch(
          `*[_type == "users" && (email == $identifier || name == $identifier)][0]{
            _id, name, email, password
          }`,
          { identifier },
        );
        if (!user) return null;

        const validPassword = await bcrypt.compare(
          <string>credentials.password,
          user.password,
        );
        if (!validPassword) return null;

        return {
          id: user._id,
          name: user.name,
          email: user.email,
        };
      },
    }),
    Google,
  ],
});
