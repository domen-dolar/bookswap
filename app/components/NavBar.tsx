import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import ProfileOrLogoutButton from "./ProfileOrLogoutButton";
import { client } from "@/sanity/lib/client";

const Navbar = async () => {
  const session = await auth();

  let user: { role: string | null } = { role: null };

  if (session) {
    const email = session.user?.email;
    user = await client.fetch(
      `*[_type == "users" && email == $email][0]{
        role
      }`,
      { email },
    );
  }

  return (
    <header className="header">
      <nav className="flex justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="logo" width={64} height={64} />
          <span className="ml-3 hidden sm:inline text-xl">BookSwap</span>
        </Link>

        <div className="flex items-center gap-5">
          {session ? (
            <>
              {user.role === "admin" && (
                <Link href="/admin">
                  <button className="btn bg-red-500! min-w-30">
                    Nadzorna stran
                  </button>
                </Link>
              )}
              <ProfileOrLogoutButton />
            </>
          ) : (
            <>
              <Link href="/register">
                <button className="btn min-w-30">Registracija</button>
              </Link>
              <Link href="/login">
                <button className="btn min-w-30">Prijava</button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
