import { auth } from "@/auth";
import { redirect } from "next/navigation";

const newBook = async () => {
  const session = await auth();

  if (!session) redirect("/");

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
    <div className="main">
      <h1>Objavi novo knjigo</h1>

      <div className="section-primary mt-10">
        <form action="" className="flex flex-col space-y-5">
          <div className="form-new-book-inputs">
            <div className="flex flex-col space-y-5">
              <div className="flex flex-col">
                <label htmlFor="title">Naslov knjige</label>
                <input
                  id="title"
                  name="title"
                  type="text"
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
              </div>

              <div className="flex flex-col">
                <label htmlFor="publishmentYear">Leto izdaje</label>
                <input
                  id="publishmentYear"
                  name="publishmentYear"
                  type="number"
                  className="form-text-input"
                  defaultValue={new Date().getFullYear()}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="condition">Stanje knjige</label>
                <select
                  name="condition"
                  id="condition"
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
                <select name="genre" id="genre" className="form-text-input">
                  <option value=""></option>
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col">
              <p>Slike knjige</p>
              <label htmlFor="image" className="btn text-center">
                Naloži slike
              </label>
              <input type="file" name="image" id="image" className="hidden" />
            </div>
          </div>

          <button className="btn">Objavi knjigo</button>
        </form>
      </div>
    </div>
  );
};
export default newBook;
