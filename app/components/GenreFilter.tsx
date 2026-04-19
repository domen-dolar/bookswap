"use client";

const GenreFilter = () => {
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
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
      }}
    >
      <label htmlFor="genre" className="text-xl">
        Zvrst
      </label>
      <div className="genre-filter">
        <select name="genre" id="genre" className="form-text-input">
          <option value=""></option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <button className="btn">Potrdi filter</button>
      </div>
    </form>
  );
};
export default GenreFilter;
