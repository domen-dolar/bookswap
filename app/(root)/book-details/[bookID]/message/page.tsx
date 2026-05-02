import MessageForm from "@/app/components/MessageForm";
import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { redirect } from "next/navigation";

export const revalidate = 0;

const Message = async ({ params }: { params: Promise<{ bookID: string }> }) => {
  const session = await auth();
  if (!session) redirect("/");

  const { bookID } = await params;

  const book = await client.fetch(
    `*[_type == "books" && _id == $bookID][0]{
        title,
        "owner": owner->{ 
          name,
          _id
        },
    }`,
    { bookID },
  );

  if (!book) redirect("/");

  const { data: messages } = await sanityFetch({
    query: `*[_type == "chats" && book._ref == $bookID] | order(_updatedAt){
      _id,
      message,
      "messenger": messenger->name,
      timestamp
    }`,
    params: { bookID },
  });

  return (
    <div className="main h-full min-h-0">
      <h1>Piši lastniku</h1>

      <div className="section-primary section-messaging">
        <h2>
          {book.owner.name}: {book.title}
        </h2>

        <div className="section-messaging-inner">
          <div className="section-messaging-scrollable">
            <ul className="space-y-3 flex flex-col">
              {messages.map(
                (message: {
                  message: string;
                  messenger: string;
                  timestamp: string;
                  _id: string;
                }) =>
                  message.messenger == session.user?.name ? (
                    <li key={message._id}>
                      <p className="text-center">
                        {new Date(message.timestamp).toLocaleString()}
                      </p>
                      <div className="flex flex-col items-end">
                        <p>{message.messenger}</p>
                        <div className="section-secondary message">
                          {message.message}
                        </div>
                      </div>
                    </li>
                  ) : (
                    <li key={message._id}>
                      <p className="text-center">
                        {new Date(message.timestamp).toLocaleString()}
                      </p>
                      <p>{book.owner.name}</p>
                      <div className="section-secondary message">
                        {message.message}
                      </div>
                    </li>
                  ),
              )}
            </ul>
          </div>
          <div className="flex justify-center mt-5">
            <MessageForm bookID={bookID} receiverID={book.owner._id} />
          </div>
        </div>
      </div>
      <SanityLive />
    </div>
  );
};
export default Message;
