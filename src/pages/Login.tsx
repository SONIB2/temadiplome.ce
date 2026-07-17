import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Lock, UserPlus } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const savedUser = localStorage.getItem("currentUser");

    if (!savedUser) {
      setMessage(
        "Nuk u gjet asnjë llogari me këto të dhëna. Ju lutemi regjistrohuni fillimisht."
      );
      return;
    }

    const user = JSON.parse(savedUser);

    if (user.email?.toLowerCase() !== email.toLowerCase()) {
      setMessage(
        "Email-i nuk përputhet me llogarinë e regjistruar. Kontrolloni email-in ose regjistrohuni."
      );
      return;
    }

    localStorage.setItem("isLoggedIn", "true");

    // Pas login, përdoruesi shkon direkt te forma e porosisë
    window.location.href = "/zgjidh-punimin";
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-6 py-16">
      <div className="max-w-5xl w-full grid lg:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Left side */}
        <div className="bg-zinc-950 text-white p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
          <div>
            <p className="text-amber-400 text-xs font-bold uppercase tracking-[0.25em] mb-5">
              temadiplome.ce
            </p>

            <h1 className="font-serif text-4xl sm:text-5xl font-bold leading-tight mb-5">
              Hyr në llogari për të bërë porosi.
            </h1>

            <p className="text-zinc-300 leading-relaxed mb-8">
              Për të porositur një shërbim, për të ndjekur statusin e punimit
              ose për të parë dashboard-in personal, duhet të hysh në llogarinë
              tënde.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-zinc-950 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-5 h-5" />
                </div>

                <div>
                  <h3 className="font-semibold">Akses i sigurt</h3>
                  <p className="text-sm text-zinc-400">
                    Të dhënat dhe kërkesat tuaja ruhen vetëm për menaxhimin e
                    porosisë.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-zinc-950 flex items-center justify-center flex-shrink-0">
                  <UserPlus className="w-5 h-5" />
                </div>

                <div>
                  <h3 className="font-semibold">Nuk ke llogari?</h3>
                  <p className="text-sm text-zinc-400">
                    Regjistrohu falas dhe prano kushtet për të vazhduar me
                    porosinë.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white mt-10"
          >
            ← Kthehu në faqen kryesore
          </Link>
        </div>

        {/* Right side */}
        <div className="p-8 sm:p-10 lg:p-12">
          <h2 className="text-3xl font-bold text-zinc-950 mb-3">
            Login
          </h2>

          <p className="text-zinc-600 mb-8">
            Vendos email-in me të cilin je regjistruar për të vazhduar.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setMessage("");
                }}
                required
                className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {message && (
              <div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl px-4 py-3">
                {message}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-amber-400 hover:bg-amber-500 text-zinc-950 rounded-xl py-3.5 font-bold transition-colors inline-flex items-center justify-center gap-2"
            >
              Hyr dhe vazhdo me porosinë
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 border-t border-zinc-100 pt-6">
            <p className="text-sm text-zinc-600 mb-3">
              Nuk keni ende llogari?
            </p>

            <Link
              to="/register"
              className="w-full inline-flex items-center justify-center gap-2 border border-zinc-200 rounded-xl py-3.5 font-semibold text-zinc-800 hover:bg-zinc-50 transition-colors"
            >
              Regjistrohu këtu
              <UserPlus className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-xs text-zinc-400 mt-6 leading-relaxed">
            Duke hyrë në llogari, ju mund të bëni porosi, të ndiqni statusin e
            punimit dhe të aksesoni dashboard-in tuaj personal.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;