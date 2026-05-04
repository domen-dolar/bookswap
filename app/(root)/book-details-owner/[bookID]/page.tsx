import BookImageSwiper from "@/app/components/BookImageSwiper";
import CurrentRating from "@/app/components/CurrentRating";
import EditBookDetails from "@/app/components/EditBookDetails";
import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { redirect } from "next/navigation";

export const revalidate = 0;

const BookDetailsOwner = async ({
  params,
}: {
  params: Promise<{ bookID: string }>;
}) => {
  const { bookID } = await params;

  const book = await client.fetch(
    `*[_type == "books" && _id == $bookID][0]{
        "id": _id,
        title,
        author,
        publishmentYear,
        condition,
        genre,
        "images": images[],
        "owner": owner->name
    }`,
    { bookID },
  );

  if (!book) redirect("/");

  const session = await auth();

  const email = session?.user?.email;

  const user = await client.fetch(
    `*[_type == "users" && email == $email][0]{
            role
        }`,
    { email },
  );
  const role = user.role;

  if (role !== "admin") {
    if (book.owner !== session?.user?.name) redirect("/");
  }

  const { data: ratings } = await sanityFetch({
    query: `*[_type == "ratings" && book._ref == $bookID]{
        rating
      }`,
    params: { bookID },
  });

  const { data: comments } = await sanityFetch({
    query: `*[_type == "comments" && book._ref == $bookID] | order(timestamp desc) {
      "commentator": commentator->name,
      comment,
      timestamp,
      _id
    }`,
    params: { bookID },
  });

  let sumOfRatings = 0;
  ratings.map((rating: { rating: number }) => (sumOfRatings += rating.rating));
  const averageRating = Math.round((sumOfRatings / ratings.length) * 2) / 2;

  return (
    <div className="main">
      <h1>Podrobnosti knjige</h1>

      <div className="section-primary mt-10">
        <h2>{book.title}</h2>

        <div className="book-details items-center! text-base! text-start!">
          <BookImageSwiper images={book.images} />

          <EditBookDetails book={book} />
        </div>
      </div>

      <div className="section-primary">
        <h2>Ocena in komentarji knjige</h2>

        <div className="space-y-10">
          <div className="sm:flex">
            <h2 className="current-rating">
              Trenutna ocena knjige ({ratings.length} ocen):
            </h2>

            <CurrentRating averageRating={averageRating} />
          </div>

          <div>
            <h2>Komentarji:</h2>

            <ul className="space-y-5">
              {comments.length > 0 ? (
                comments.map(
                  (comment: {
                    commentator: string;
                    comment: string;
                    timestamp: string;
                    _id: string;
                  }) => (
                    <li key={comment._id}>
                      <div className="flex justify-between">
                        <p>{comment.commentator}</p>
                        <p>{new Date(comment.timestamp).toLocaleString()}</p>
                      </div>
                      <div className="section-secondary bg-tertiary/60!">
                        {comment.comment}
                      </div>
                    </li>
                  ),
                )
              ) : (
                <p>Ta knjiga še nima komentarjev.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
      <SanityLive />
    </div>
  );
};
export default BookDetailsOwner;
