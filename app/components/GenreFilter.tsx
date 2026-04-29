"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const GenreFilter = () => {
  const router = useRouter();
  const params = useSearchParams();
  const genre = params.get("genre");

  let genreSubmitted = false;

  genre && (genreSubmitted = true);

  const [genreSelected, setGenreSelected] = useState(genreSubmitted);

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

  return (
    <form
      onSubmit={(e) => {
        const formData = new FormData(e.currentTarget);
        const genre = formData.get("genre");

        if (genre === "") e.preventDefault();
      }}
      onReset={() => {
        setGenreSelected(false);
        router.push("/");
      }}
    >
      <label htmlFor="genre" className="text-xl">
        Zvrst
      </label>
      <div className="genre-filter">
        <select
          onChange={(e) => {
            if (
              e.currentTarget.value === "" ||
              e.currentTarget.value === undefined
            ) {
              setGenreSelected(false);
            } else {
              setGenreSelected(true);
            }
          }}
          name="genre"
          id="genre"
          required
          className="form-text-input"
        >
          {genre ? <option value={genre}>{genre}</option> : <option></option>}
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
          {genre && <option></option>}
        </select>

        <div className="flex flex-col sm:flex-row gap-3">
          <button className="btn">Potrdi filter</button>
          {genreSelected && (
            <button type="reset" className="btn">
              Počisti filter
            </button>
          )}
        </div>
      </div>
    </form>
  );
};
export default GenreFilter;
