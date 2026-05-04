"use client";

import { useState } from "react";
import { DeleteComment } from "../actions/DeleteComment";

const DeleteCommentButton = ({ commentID }: { commentID: string }) => {
  const [deleting, setDeleting] = useState(false);

  async function submitDeletion() {
    setDeleting(true);
    await DeleteComment(commentID);
    setDeleting(false);
  }

  return (
    <button
      onClick={() => {
        submitDeletion();
      }}
      disabled={deleting}
      className="btn bg-red-500! w-full sm:w-30 disabled:cursor-not-allowed!"
    >
      Izbriši
    </button>
  );
};
export default DeleteCommentButton;
