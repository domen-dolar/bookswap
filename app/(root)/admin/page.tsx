import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
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
                  <div className="flex flex-col sm:flex-row items-center gap-3">
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
