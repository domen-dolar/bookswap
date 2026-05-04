import BookImageSwiper from "@/app/components/BookImageSwiper";
import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import CommentAndRate from "@/app/components/CommentAndRate";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import CurrentRating from "@/app/components/CurrentRating";
import { redirect } from "next/navigation";
import MessageOwner from "@/app/components/MessageOwner";
import DeleteCommentButton from "@/app/components/DeleteCommentButton";

export const revalidate = 0;

const BookDetails = async ({
  params,
}: {
  params: Promise<{ bookID: string }>;
}) => {
  const session = await auth();
  let userID = null;
  if (session) {
    const email = session?.user?.email;

    const user = await client.fetch(
      `*[_type == "users" && email == $email][0]{
        _id
    }`,
      { email },
    );
    userID = user._id;
  }

  const { bookID } = await params;

  const book = await client.fetch(`*[_type == "books" && _id == $bookID][0]`, {
    bookID,
  });

  if (!book) redirect("/");

  const ownerID = book.owner._ref;

  const owner = await client.fetch(
    `*[_type == "users" && _id == $ownerID][0]`,
    { ownerID },
  );

  const { data: comments } = await sanityFetch({
    query: `*[_type == "comments" && book._ref == $bookID] | order(timestamp desc) {
      "commentator": commentator->name,
      comment,
      timestamp,
      _id
    }`,
    params: { bookID },
  });

  const { data: ratings } = await sanityFetch({
    query: `*[_type == "ratings" && book._ref == $bookID]{
      rating
    }`,
    params: { bookID },
  });

  let sumOfRatings = 0;
  ratings.map((rating: { rating: number }) => (sumOfRatings += rating.rating));
  const averageRating = Math.round((sumOfRatings / ratings.length) * 2) / 2;

  return (
    <div className="main">
      <h1>{book.title}</h1>

      <div className="section-primary mt-10">
        <h2>Podrobnosti knjige</h2>

        <div className="book-details">
          <BookImageSwiper images={book.images} />

          <div className="book-details-text-owner">
            <div className="book-details-text">
              <div className="flex justify-between">
                <div>Avtor: </div>
                <div>{book.author}</div>
              </div>
              <div className="flex justify-between">
                <div>Leto izdaje: </div>
                <div>{book.publishmentYear}</div>
              </div>
              <div className="flex justify-between">
                <div>Stanje knjige: </div>
                <div>{book.condition}</div>
              </div>
              <div className="flex justify-between">
                <div>Zvrst: </div>
                <div>{book.genre}</div>
              </div>
            </div>

            <div className="book-details-owner">
              <div>
                Lastnik: {owner.name}
                {userID === ownerID && " (Vi)"}
              </div>

              <MessageOwner bookID={bookID} userID={userID} ownerID={ownerID} />
            </div>
          </div>
        </div>
      </div>

      <div className="section-primary">
        <h2>Ocena in komentarji knjige</h2>

        <div className="space-y-10">
          <CommentAndRate bookID={bookID} />

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
                      <div className="comment">
                        <div className="w-full">
                          <div className="flex justify-between">
                            <p>{comment.commentator}</p>
                            <p>
                              {new Date(comment.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <div className="section-secondary bg-tertiary/60!">
                            {comment.comment}
                          </div>
                        </div>

                        {comment.commentator === session?.user?.name && (
                          <div className="w-full sm:w-fit">
                            <DeleteCommentButton commentID={comment._id} />
                          </div>
                        )}
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
export default BookDetails;
