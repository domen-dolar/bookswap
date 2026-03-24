import Link from "next/link";

const Register = () => {
  return (
    <div className="authPage">
      <div className="authOuterDiv">
        <h1 className="text-3xl text-center">Registracija</h1>

        <div className="authFormDiv">
          <form className="space-y-5">
            <div className="flex flex-col">
              <label htmlFor="username">Uporabniško ime</label>
              <input
                type="text"
                id="username"
                name="username"
                className="formTextInput"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">E - pošta</label>
              <input
                type="email"
                id="email"
                name="email"
                className="formTextInput"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Geslo</label>
              <input
                type="password"
                id="password"
                name="password"
                className="formTextInput"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="repeatPassword">Ponovite geslo</label>
              <input
                type="password"
                id="repeatPassword"
                name="repeatPassword"
                className="formTextInput"
              />
            </div>
            <div className="flex justify-center">
              <button className="btn min-w-30">Registriraj se</button>
            </div>
          </form>

          <div className="flex justify-center">
            <Link href="/login" className="hover:underline">
              Že imate račun? Prijavite se.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
