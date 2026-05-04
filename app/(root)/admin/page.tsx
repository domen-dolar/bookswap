import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export const revalidate = 0;

const Admin = async () => {
  const session = await auth();

  if (!session) redirect("/");

  const email = session?.user?.email;

  const user = await client.fetch(
    `*[_type == "users" && email == $email][0]{
            role
        }`,
    { email },
  );
  const role = user.role;

  if (role !== "admin") redirect("/");

  const { data: books } = await sanityFetch({
    query: `*[_type == "books"] | order(publishedAt desc){
      _id,
      author,
      title,
      publishmentYear,
      "image": images[0].url,
      "owner": owner->name,
      publishedAt
    }`,
  });

  const { data: comments } = await sanityFetch({
    query: `*[_type == "comments"] | order(timestamp desc){
        comment,
        timestamp,
        "book": book->title,
        "commentator": commentator->name
    }`,
  });

  return (
    <div className="main">
      <h1>Nadzorna stran</h1>

      <div className="section-primary mt-10">
        <h2>Najnovejše objavljene knjige</h2>

        {books.length > 0 ? (
          <ul className="space-y-5">
            {books.map(
              (book: {
                _id: string;
                author: string;
                title: string;
                publishmentYear: string;
                image: string;
                owner: string;
                publishedAt: string;
              }) => (
                <li
                  key={book._id}
                  className="section-secondary flex flex-col sm:flex-row"
                >
                  <Image
                    src={book.image}
                    alt="bookimage"
                    width={300}
                    height={300}
                    className="book-image w-full sm:w-1/3!"
                  />

                  <div className="admin-book-details">
                    <div className="admin-book-details-details-button">
                      <div className="admin-book-details-details">
                        <p className="text-lg">
                          <span className="text-base hidden sm:inline">
                            Avtor:{" "}
                          </span>
                          {book.author}
                        </p>
                        <p className="text-lg">
                          <span className="text-base hidden sm:inline">
                            Naslov:{" "}
                          </span>
                          {book.title}
                        </p>
                        <p className="text-lg">
                          <span className="text-base hidden sm:inline">
                            Leto izdaje:{" "}
                          </span>
                          {book.publishmentYear}
                        </p>
                      </div>
                      <div className="admin-book-details-button">
                        <Link
                          href={`/book-details-owner/${book._id}`}
                          className="btn w-full sm:w-50 text-center"
                        >
                          Podrobnosti
                        </Link>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-lg pl-10">Objavil: {book.owner}</p>
                      <p className="text-lg">
                        {new Date(book.publishedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </li>
              ),
            )}
          </ul>
        ) : (
          <p>Trenutno ni objavljenih knjig.</p>
        )}
      </div>

      <div className="section-primary">
        <h2>Najnovejši komentarji</h2>

        {comments.length > 0 ? (
          <ul className="space-y-5">
            {comments.map(
              (comment: {
                comment: string;
                timestamp: string;
                book: string;
                commentator: string;
              }) => (
                <li key={comment.timestamp}>
                  <div className="admin-comment">
                    <div className="w-full">
                      <div className="flex justify-between">
                        <p>
                          {comment.book} - {comment.commentator}
                        </p>
                        <p>{new Date(comment.timestamp).toLocaleString()}</p>
                      </div>
                      <div className="section-secondary bg-tertiary/60! min-h-30">
                        {comment.comment}
                      </div>
                    </div>

                    <button className="btn bg-red-500! w-full sm:w-30">
                      Izbriši
                    </button>
                  </div>
                </li>
              ),
            )}
          </ul>
        ) : (
          <p>Nobena knjiga nima komentarjev.</p>
        )}
      </div>
      <SanityLive />
    </div>
  );
};
export default Admin;
