"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const MessageOwner = ({
  bookID,
  userID,
  ownerID,
}: {
  bookID: string;
  userID: string | null;
  ownerID: string;
}) => {
  const [error, setError] = useState<string>();

  const router = useRouter();

  function message() {
    if (!userID) {
      setError("Najprej se prijavite!");
      return;
    }
    if (userID === ownerID) {
      setError("Ne morete pisati sebi!");
      return;
    }

    router.push(`/book-details/${bookID}/message`);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        message();
      }}
      className="message-button"
    >
      {error && <p className="text-red-500">{error}</p>}
      <button className="btn">Piši lastniku</button>
    </form>
  );
};
export default MessageOwner;
