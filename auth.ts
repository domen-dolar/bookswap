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

      //  custom authorize logic:
      authorize: async (credentials) => {
        const identifier = credentials.email;

        //  search for identifier (which can either be an email or username) in the DB
        const user = await client.fetch(
          `*[_type == "users" && (email == $identifier || name == $identifier)][0]{
            _id, name, email, password, provider
          }`,
          { identifier },
        );
        if (!user) return null;

        if (user.provider === "credentials") {
          //  compare password entered by user to a password in the DB
          const validPassword = await bcrypt.compare(
            <string>credentials.password,
            user.password,
          );
          if (!validPassword) return null;
        }

        return {
          id: user._id,
          name: user.name,
          email: user.email,
        };
      },
    }),
    Google,
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const email = user.email;
        const credentialsUserExists = await client.fetch(
          `*[_type == "users" && email == $email && provider == "credentials"][0]`,
          { email },
        );

        if (credentialsUserExists) {
          return "/login?error=googleLogin";
        } else {
          const googleUserExists = await client.fetch(
            `*[_type == "users" && email == $email && provider == "google"][0]`,
            { email },
          );

          if (googleUserExists) {
            //sign the user in
            return true;
          } else {
            //make a new user in DB and sign them in
            await client.create({
              _type: "users",
              name: user.name,
              email,
              provider: "google",
            });

            return true;
          }
        }
      }

      return true;
    },
    async jwt({ token, trigger, session }) {
      if (trigger === "update" && session?.user) {
        token.name = session.user.name;
        token.email = session.user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    error: "/login",
  },
});
