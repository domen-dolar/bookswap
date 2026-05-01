import BookImageSwiper from "@/app/components/BookImageSwiper";
import CurrentRating from "@/app/components/CurrentRating";
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

  if (book.owner !== session?.user?.name) redirect("/");

  const genres = [
    "Biografije",
    "Družbeni romani",
    "Ekonomija in pravo",
    "Etnologija",
    "Fantastika",
    "Filozofija in religija",
    "Hobiji",
    "Igroknjige",
    "Kratka proza in eseji",
    "Kriminalni in pustolovski romani",
    "Kulinarika",
    "Literarna teorija, jezikoslovje",
    "Naravoslovje",
    "Poezija in dramatika",
    "Politologija",
    "Popotništvo",
    "Psihologija in vzgoja",
    "Slikanice",
    "Sociologija",
    "Spomini",
    "Stripi",
    "Šport",
    "Umetnost",
    "Zbirke pravljic",
    "Zdravje",
    "Zgodbice",
    "Zgodovina",
    "Zgodovinski romani",
  ];

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

          <form className="book-details-text-owner mt-0!">
            <div className="book-details-text space-y-2 w-full!">
              <div className="flex flex-col">
                <label htmlFor="author">Avtor knjige</label>
                <input
                  type="text"
                  name="author"
                  id="author"
                  defaultValue={book.author}
                  className="form-text-input"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="publishmentYear">Leto izdaje</label>
                <input
                  id="publishmentYear"
                  name="publishmentYear"
                  type="number"
                  className="form-text-input"
                  defaultValue={book.publishmentYear}
                  max={new Date().getFullYear()}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="condition">Stanje knjige</label>
                <select
                  name="condition"
                  id="condition"
                  required
                  defaultValue={book.condition}
                  className="form-text-input h-10.5"
                >
                  <option value="slabo">slabo</option>
                  <option value="dobro">dobro</option>
                  <option value="odlično">odlično</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="genre">Zvrst knjige</label>
                <select
                  name="genre"
                  id="genre"
                  required
                  defaultValue={book.genre}
                  className="form-text-input h-10.5"
                >
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="book-details-owner flex-col! sm:flex-row! gap-2">
              <button className="btn w-full sm:w-fit">Potrdi spremembe</button>
              <button className="btn bg-red-500! w-full sm:w-fit">
                Izbriši knjigo
              </button>
            </div>
          </form>
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
