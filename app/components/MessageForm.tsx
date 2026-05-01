"use client";

import { faArrowAltCircleUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { messageOwner } from "../(root)/book-details/[bookID]/message/actions";

const MessageForm = ({
  bookID,
  ownerID,
}: {
  bookID: string;
  ownerID: string;
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const message = formData.get("message") as string;

        messageOwner(message, bookID, ownerID);

        e.currentTarget.reset();
      }}
      className="new-message"
    >
      <input
        type="text"
        name="message"
        id="message"
        className="message-input"
      />
      <button className="px-1">
        <FontAwesomeIcon icon={faArrowAltCircleUp} className="submit-message" />
      </button>
    </form>
  );
};
export default MessageForm;
