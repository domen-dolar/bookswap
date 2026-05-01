import EditUserProfileInfo from "@/app/components/EditUserProfileInfo";
import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export const revalidate = 0;

const Profile = async () => {
  const session = await auth();

  if (!session) redirect("/");

  const isGoogleUser = !!session.user?.image;

  const email = session?.user?.email;
  const user = await client.fetch(
    `*[_type == "users" && email == $email][0]{
        _id,
        name
    }`,
    { email },
  );
  const ownerID = user._id;

  const books = await client.fetch(
    `*[_type == "books" && owner._ref == $ownerID]`,
    { ownerID },
  );

  const { data: chats } = await sanityFetch({
    query: `*[_type == "chats" && (receiver._ref == $ownerID || messenger._ref == $ownerID)] | order(_updatedAt desc) {
      _id,
      _updatedAt,
      "messenger": messenger->name,
      "receiver": receiver->name,
      "book": book->{ _id, title}
    }`,
    params: { ownerID },
  });

  const messages = Array.from(
    new Map(
      chats.map((chat: any) => {
        const [a, b] = [chat.messenger, chat.receiver].sort();

        const key = `${a}-${b}-${chat.book._id}`;
        return [key, chat];
      }),
    ).values(),
  );

  return (
    <SessionProvider session={session}>
      <div className="main">
        <h1>Moj profil</h1>

        <EditUserProfileInfo user={session.user} />

        <div className="section-primary">
          <h2>Moje knjige</h2>

          <div className="space-y-5">
            {books.length > 0 ? (
              <ul className="space-y-3">
                {books.map(
                  (book: {
                    title: string;
                    images: [{ url: string }];
                    author?: string;
                    publishmentYear: number;
                  }) => (
                    <li key={book.title} className="section-secondary my-book">
                      <div className="my-book-inner sm:flex-row-reverse sm:max-h-30">
                        <p className="my-book-title">{book.title}</p>
                        <Image
                          src={book.images[0].url}
                          alt="bookimage"
                          width={300}
                          height={300}
                          className="my-book-image"
                        />
                      </div>

                      <div className="my-book-inner sm:items-center">
                        <div className="space-y-3 text-center sm:text-left">
                          <p className="text-lg">Avtor: {book.author}</p>

                          <p className="text-lg">
                            Leto izdaje: {book.publishmentYear}
                          </p>
                        </div>

                        <button className="btn w-full sm:w-50">
                          Podrobnosti
                        </button>
                      </div>
                    </li>
                  ),
                )}
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

          {messages ? (
            <ul className="space-y-5">
              {messages.map((message: any) => (
                <li key={message._id} className="section-secondary my-message">
                  <p className="text-lg h-fit">
                    {message.messenger === user.name
                      ? `Za: ${message.receiver}`
                      : `Od: ${message.messenger}`}
                  </p>

                  <p className="text-lg h-fit">Knjiga: {message.book.title}</p>

                  <Link
                    href={
                      message.messenger === user.name
                        ? `/book-details/${message.book._id}/message`
                        : `/reply/${message.book._id}`
                    }
                    className="sm:flex sm:justify-end"
                  >
                    <button className="btn w-full sm:w-50">Piši</button>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nimate sporočil.</p>
          )}
        </div>
        <SanityLive />
      </div>
    </SessionProvider>
  );
};
export default Profile;
