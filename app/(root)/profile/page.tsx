import EditUserProfileInfo from "@/app/components/EditUserProfileInfo";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Profile = async () => {
  const session = await auth();

  if (!session) redirect("/");

  const isGoogleUser = !!session.user?.image;

  const hasBooks = false;

  const hasMessages = false;

  return (
    <SessionProvider session={session}>
      <div className="main">
        <h1>Moj profil</h1>

        {!isGoogleUser && <EditUserProfileInfo user={session.user} />}

        <div
          className={
            !isGoogleUser ? "section-primary" : "section-primary mt-10"
          }
        >
          <h2>Moje knjige</h2>

          <div className="space-y-5">
            {hasBooks ? (
              <ul className="space-y-5">
                <li className="section-secondary my-book">
                  <div className="my-book-inner sm:flex-row-reverse">
                    <p className="my-book-title">{}</p>
                    <Image
                      src={""}
                      alt="bookimage"
                      width={300}
                      height={300}
                      className="my-book-image"
                    />
                  </div>

                  <div className="my-book-inner sm:items-center">
                    <div className="space-y-3 text-center sm:text-left">
                      <p className="text-lg">Avtor: {}</p>

                      <p className="text-lg">Leto izdaje: {}</p>
                    </div>

                    <button className="btn w-full sm:w-50">Podrobnosti</button>
                  </div>
                </li>
              </ul>
            ) : (
              <p>Nimate knjig.</p>
            )}

            <div className="flex justify-center">
              <Link href="/new-book" className="w-full sm:w-fit">
                <button className="btn w-full sm:w-50">
                  Objavi novo knjigo
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="section-primary">
          <h2>Sporočila</h2>

          {hasMessages ? (
            <ul className="space-y-5">
              <li className="section-secondary my-message">
                <p className="text-lg h-fit">Od: {}</p>

                <p className="text-lg h-fit">Knjiga: {}</p>

                <Link href={`/reply`} className="sm:flex sm:justify-end">
                  <button className="btn w-full sm:w-50">Odgovori</button>
                </Link>
              </li>
            </ul>
          ) : (
            <p>Nimate sporočil.</p>
          )}
        </div>
      </div>
    </SessionProvider>
  );
};
export default Profile;
