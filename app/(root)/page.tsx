import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import Image from "next/image";
import GenreFilter from "../components/GenreFilter";
import Link from "next/link";

export const revalidate = 0;

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ genre?: string }>;
}) => {
  const params = await searchParams;

  const genre = params.genre || null;

  const { data: books } = await sanityFetch({
    query: `*[_type == "books" && (!defined($genre) || genre match $genre)] | order(_updatedAt desc)`,
    params: { genre },
  });

  return (
    <div className="main">
      <h1>BookSwap, spletna menjalnica knjig</h1>

      <GenreFilter />

      <div className="section-primary">
        <h2>Knjige, na voljo za menjavo</h2>

        {books.length > 0 ? (
          <ul className="space-y-3">
            {books.map(
              (book: {
                title: string;
                images: [{ url: string }];
                author?: string;
                publishmentYear: number;
                publishedAt: string;
                genre: string;
                _id: string;
              }) => (
                <li key={book.title} className="section-secondary book">
                  <Image
                    src={book.images[0].url}
                    alt="bookimage"
                    width={300}
                    height={300}
                    className="book-image"
                  />

                  <div className="book-info">
                    <p className="text-lg text-center">{book.title}</p>
                    <p>Avtor: {book.author}</p>
                    <p>Leto izdaje: {book.publishmentYear}</p>
                    <p>Zvrst: {book.genre}</p>
                  </div>

                  <div className="flex sm:items-center justify-center">
                    <Link href={`/book-details/${book._id}`}>
                      <button className="btn w-full sm:w-50">
                        Podrobnosti
                      </button>
                    </Link>
                  </div>
                </li>
              ),
            )}
          </ul>
        ) : (
          <p>Trenutno ni na voljo knjig.</p>
        )}
      </div>
      <SanityLive />
    </div>
  );
};
export default Home;
