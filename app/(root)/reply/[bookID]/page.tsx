import MessageForm from "@/app/components/MessageForm";
import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { redirect } from "next/navigation";

export const revalidate = 0;

const Reply = async ({ params }: { params: Promise<{ bookID: string }> }) => {
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

  const { data: messages } = await sanityFetch({
    query: `*[_type == "chats" && book._ref == $bookID]{
      _id,
      message,
      "messenger": messenger->{ _id, name },
      timestamp
    }`,
    params: { bookID },
  });

  return (
    <div className="main h-full min-h-0">
      <h1>Odgovori</h1>
      <div className="section-primary section-messaging">
        <h2>
          {book.owner}: {book.title}
        </h2>
        <div className="section-messaging-inner">
          <div className="section-messaging-scrollable">
            <ul className="space-y-3 flex flex-col">
              {messages.map(
                (message: {
                  message: string;
                  messenger: { name: string };
                  timestamp: string;
                  _id: string;
                }) =>
                  message.messenger.name === session.user?.name ? (
                    <li key={message._id}>
                      <p className="text-center">
                        {new Date(message.timestamp).toLocaleString()}
                      </p>
                      <div className="flex flex-col items-end">
                        <p>{message.messenger.name}</p>
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
                      <p>{message.messenger.name}</p>
                      <div className="section-secondary message">
                        {message.message}
                      </div>
                    </li>
                  ),
              )}
            </ul>
          </div>
          <div className="flex justify-center mt-5">
            <MessageForm
              bookID={bookID}
              receiverID={messages[0].messenger._id}
            />
          </div>
        </div>
      </div>
      <SanityLive />
    </div>
  );
};
export default Reply;
