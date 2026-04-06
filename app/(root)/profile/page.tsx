import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Profile = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return <div className="main">Moj profil</div>;
};
export default Profile;
