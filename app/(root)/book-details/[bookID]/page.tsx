import BookImageSwiper from "@/app/components/BookImageSwiper";
import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";

const BookDetails = async ({
  params,
}: {
  params: Promise<{ bookID: string }>;
}) => {
  const session = await auth();
  const email = session?.user?.email;

  const user = await client.fetch(
    `*[_type == "users" && email == $email][0]{
        _id
    }`,
    { email },
  );
  const userID = user._id;

  const { bookID } = await params;

  const book = await client.fetch(`*[_type == "books" && _id == $bookID][0]`, {
    bookID,
  });

  const ownerID = book.owner._ref;

  const owner = await client.fetch(
    `*[_type == "users" && _id == $ownerID][0]`,
    { ownerID },
  );

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
              <div>
                <button className="btn">Piši lastniku</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-primary">
        <h2>Ocena in komentarji knjige</h2>
      </div>
    </div>
  );
};
export default BookDetails;
