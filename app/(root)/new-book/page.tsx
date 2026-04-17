import PublishBookForm from "@/app/components/PublishBookForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const newBook = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <div className="main">
      <h1>Objavi novo knjigo</h1>

      <div className="section-primary mt-10">
        <PublishBookForm />
      </div>
    </div>
  );
};
export default newBook;
