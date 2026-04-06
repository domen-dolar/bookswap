"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logOut } from "../(root)/login/actions";

const ProfileOrLogoutButton = () => {
  const currentPath = usePathname();

  if (currentPath === "/profile") {
    return (
      <form action={logOut}>
        <button className="btn min-w-30">Odjava</button>
      </form>
    );
  } else {
    return (
      <Link href="/profile">
        <button className="btn min-w-30">Moj Profil</button>
      </Link>
    );
  }
};
export default ProfileOrLogoutButton;
