"use client";

import { useState } from "react";
import {
  changeBook,
  deleteBook,
} from "../(root)/book-details-owner/[bookID]/actions";
import { redirect } from "next/navigation";

const EditBookDetails = ({
  book,
}: {
  book: {
    id: string;
    author: string;
    publishmentYear: number;
    condition: string;
    genre: string;
  };
}) => {
  const [modifying, setModifying] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<string>();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleting, setDeleting] = useState<string>();

  const genres = [
    "Biografije",
    "Družbeni romani",
    "Ekonomija in pravo",
    "Etnologija",
    "Fantastika",
    "Filozofija in religija",
    "Hobiji",
    "Igroknjige",
    "Kratka proza in eseji",
    "Kriminalni in pustolovski romani",
    "Kulinarika",
    "Literarna teorija, jezikoslovje",
    "Naravoslovje",
    "Poezija in dramatika",
    "Politologija",
    "Popotništvo",
    "Psihologija in vzgoja",
    "Slikanice",
    "Sociologija",
    "Spomini",
    "Stripi",
    "Šport",
    "Umetnost",
    "Zbirke pravljic",
    "Zdravje",
    "Zgodbice",
    "Zgodovina",
    "Zgodovinski romani",
  ];

  async function submitChanges(formData: FormData) {
    formData.append("id", book.id);

    setDeleteConfirmation(false);

    setModifying(true);
    const update = await changeBook(formData);
    setModifying(false);

    setUpdateStatus(update);
  }

  async function deleteCurrentBook(status: string) {
    switch (status) {
      case "delete":
        setUpdateStatus("");
        setDeleteConfirmation(true);
        break;
      case "cancel":
        setDeleteConfirmation(false);
        break;
      case "confirm":
        setDeleteConfirmation(false);
        setDeleting("Brišem knjigo...");

        await deleteBook(book.id);

        redirect("/profile");
        break;
    }
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        submitChanges(formData);
      }}
      className="book-details-text-owner mt-0!"
    >
      <div className="book-details-text space-y-2 w-full!">
        <div className="flex flex-col">
          <label htmlFor="author">Avtor knjige</label>
          <input
            type="text"
            name="author"
            id="author"
            defaultValue={book.author}
            className="form-text-input"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="publishmentYear">Leto izdaje</label>
          <input
            id="publishmentYear"
            name="publishmentYear"
            type="number"
            className="form-text-input"
            defaultValue={book.publishmentYear}
            max={new Date().getFullYear()}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="condition">Stanje knjige</label>
          <select
            name="condition"
            id="condition"
            required
            defaultValue={book.condition}
            className="form-text-input h-10.5"
          >
            <option value="slabo">slabo</option>
            <option value="dobro">dobro</option>
            <option value="odlično">odlično</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="genre">Zvrst knjige</label>
          <select
            name="genre"
            id="genre"
            required
            defaultValue={book.genre}
            className="form-text-input h-10.5"
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="book-details-owner flex-col! sm:flex-row! gap-2">
        <button
          disabled={modifying}
          className="btn w-full sm:w-fit disabled:cursor-not-allowed!"
        >
          {modifying ? "Spreminjam..." : "Potrdi spremembe"}
        </button>

        {updateStatus && <p className="text-green-500">{updateStatus}</p>}

        <div className="flex items-center gap-1">
          {deleteConfirmation ? (
            <div className="flex gap-2 items-center">
              <p className="text-red-500">Želite res izbrisati knjigo?</p>
              <input
                type="button"
                value="Da"
                onClick={() => deleteCurrentBook("confirm")}
                className="btn bg-red-500! w-full sm:w-fit"
              />
              <input
                type="button"
                value="Ne"
                onClick={() => deleteCurrentBook("cancel")}
                className="btn"
              />
            </div>
          ) : (
            <input
              type="button"
              value={deleting || "Izbriši knjigo"}
              disabled={!!deleting}
              onClick={() => deleteCurrentBook("delete")}
              className="btn bg-red-500! w-full sm:w-fit disabled:cursor-not-allowed!"
            />
          )}
        </div>
      </div>
    </form>
  );
};
export default EditBookDetails;
