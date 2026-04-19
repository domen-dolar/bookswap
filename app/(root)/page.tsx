import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import Image from "next/image";
import GenreFilter from "../components/GenreFilter";

const Home = async () => {
  const { data: books } = await sanityFetch({ query: `*[_type == "books"]` });

  return (
    <div className="main">
      <h1>BookSwap, spletna menjalnica knjig</h1>

      <GenreFilter />

      <div className="section-primary">
        <h2>Knjige, na voljo za menjavo</h2>

        {books ? (
          <ul className="space-y-3">
            {books.map(
              (book: {
                title: string;
                images: [{ url: string }];
                author?: string;
                publishmentYear: number;
                publishedAt: string;
                genre: string;
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
                    <button className="btn w-full sm:w-50">Podrobnosti</button>
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
