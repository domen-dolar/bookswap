import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import ProfileOrLogoutButton from "./ProfileOrLogoutButton";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="header">
      <nav className="flex justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="logo" width={64} height={64} />
          <span className="ml-3 hidden sm:inline text-xl">BookSwap</span>
        </Link>

        <div className="flex items-center gap-5">
          {session ? (
            <ProfileOrLogoutButton />
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
