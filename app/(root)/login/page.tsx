import Link from "next/link";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col space-y-10 max-w-9/10 sm:min-w-1/3">
        <h1 className="text-3xl text-center">Prijava</h1>

        <div className="p-10 rounded-lg bg-primary shadow-xl">
          <div className="space-y-5">
            <form className="space-y-5">
              <div className="flex flex-col">
                <label htmlFor="identifier">Uporabniško ime ali e-pošta</label>
                <input
                  type="text"
                  id="identifier"
                  name="identifier"
                  className="bg-white p-2 rounded-md border border-tertiary focus:outline-tertiary"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password">Geslo</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="bg-white p-2 rounded-md border border-tertiary focus:outline-tertiary"
                />
              </div>
              <div className="flex justify-center">
                <button className="btn min-w-30">Prijavi se</button>
              </div>
            </form>

            <div className="flex justify-center">
              <Link href="/register" className="hover:underline">
                Še nimate računa? Registrirajte se.
              </Link>
            </div>

            <div className="flex flex-col space-y-5 justify-center">
              <div className="w-full relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-black"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-primary">Ali</span>
                </div>
              </div>
              <button className="btn">Prijavi se z Googlom</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
