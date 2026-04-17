"use client";

import { useState } from "react";
import ImageInput from "./ImageInput";
import { publishBook } from "../(root)/new-book/actions";

const PublishBookForm = () => {
  const [response, setResponse] = useState<string>();
  const [responseColor, setResponseColor] = useState<string>();
  const [resetImages, setResetImages] = useState(false);

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

  async function handleSubmit(formData: FormData) {
    const publish = await publishBook(formData);

    if (publish.success) {
      setResponse("Knjiga uspešno objavljena!");
      setResponseColor("text-green-500");
      setResetImages(true);
    } else {
      setResponse("Knjigo s tem naslovom ste že objavili!");
      setResponseColor("text-red-500");
    }
  }

  return (
    <form
      action={(formData) => handleSubmit(formData)}
      className="flex flex-col space-y-5"
    >
      <div className="form-new-book-inputs">
        <div className="flex flex-col space-y-5">
          <div className="flex flex-col">
            <label htmlFor="title">Naslov knjige</label>
            <input
              id="title"
              name="title"
              type="text"
              required
              className="form-text-input"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="author">Avtor knjige</label>
            <input
              id="author"
              name="author"
              type="text"
              className="form-text-input"
            />
            <p>* Če avtor ni znan, ga ni potrebno vnesti</p>
          </div>

          <div className="flex flex-col">
            <label htmlFor="publishmentYear">Leto izdaje</label>
            <input
              id="publishmentYear"
              name="publishmentYear"
              type="number"
              className="form-text-input"
              defaultValue={new Date().getFullYear()}
              max={new Date().getFullYear()}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="condition">Stanje knjige</label>
            <select
              name="condition"
              id="condition"
              required
              className="form-text-input"
            >
              <option value=""></option>
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
              className="form-text-input"
            >
              <option value=""></option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <ImageInput reset={resetImages} />
      </div>

      <div className={`text-center ${responseColor}`}>
        {response && <p>{response}</p>}
        <button className="btn w-full sm:w-50">Objavi knjigo</button>
      </div>
    </form>
  );
};
export default PublishBookForm;
