import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { faArrowAltCircleUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { redirect } from "next/navigation";

const Message = async ({ params }: { params: Promise<{ bookID: string }> }) => {
  const session = await auth();
  if (!session) redirect("/");

  const { bookID } = await params;

  const book = await client.fetch(
    `*[_type == "books" && _id == $bookID][0]{
        title,
        "owner": owner->name
    }`,
    { bookID },
  );

  if (!book) redirect("/");

  return (
    <div className="main h-full min-h-0">
      <h1>Piši lastniku</h1>

      <div className="section-primary section-messaging">
        <h2>
          {book.owner}: {book.title}
        </h2>

        <div className="section-messaging-inner">
          <div className="section-messaging-scrollable">
            <ul className="space-y-3 flex flex-col">
              <li className="flex flex-col items-end">
                <p>jaz</p>
                <div className="section-secondary message">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Magnam ut eos deserunt id et incidunt fugit fugiat atque
                  commodi, nulla aliquam recusandae nemo laboriosam blanditiis
                  voluptatem corporis! Et, natus quis.
                </div>
              </li>
              <li>
                <p>{book.owner}</p>
                <div className="section-secondary message">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Neque repellat exercitationem eaque autem in ab repudiandae
                  temporibus similique culpa sunt ipsa debitis quaerat
                  perferendis ad eos necessitatibus consectetur, aperiam
                  molestiae.
                </div>
              </li>
            </ul>
          </div>
          <div className="flex justify-center mt-5">
            <form action="" className="new-message">
              <input
                type="text"
                name="message"
                id="message"
                className="message-input"
              />
              <button className="px-1">
                <FontAwesomeIcon
                  icon={faArrowAltCircleUp}
                  className="submit-message"
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Message;
