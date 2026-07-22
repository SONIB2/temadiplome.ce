import { useEffect, useState } from "react";
import {
  BookOpen,
  CreditCard,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Mail,
  ShoppingCart,
  Users,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import AdminOrders from "../components/admin/AdminOrders";
import AdminPayments from "../components/admin/AdminPayments";
import AdminMessages from "../components/admin/AdminMessages";

const ADMIN_EMAIL = "temadiplome.ce@gmail.com";

type Tab = "orders" | "payments" | "messages";

export default function Admin() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<Tab>("orders");
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setLoading(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    const cleanEmail = email.trim().toLowerCase();

    if (cleanEmail !== ADMIN_EMAIL) {
      setError("Ky panel është vetëm për administratorin.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

    if (error) {
      setError("Email ose password i pasaktë.");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="pt-24 pb-20 container-academic text-center text-zinc-400 text-sm">
        Duke ngarkuar...
      </div>
    );
  }

  if (session && session.user.email?.toLowerCase() !== ADMIN_EMAIL) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center bg-zinc-50 px-6">
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-zinc-100 max-w-md text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
            <LogOut className="w-7 h-7 text-red-600" />
          </div>

          <h1 className="font-serif text-2xl font-bold text-zinc-900 mb-3">
            Akses i paautorizuar
          </h1>

          <p className="text-sm text-zinc-500 mb-6">
            Kjo faqe është vetëm për administratorin e platformës.
          </p>

          <button
            onClick={handleLogout}
            className="bg-amber-400 hover:bg-amber-500 text-zinc-950 rounded-xl px-5 py-3 text-sm font-bold w-full"
          >
            Dil nga llogaria
          </button>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center bg-zinc-50 px-6">
        <div className="container-academic max-w-sm">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-zinc-100">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="w-7 h-7 text-amber-400" />
              </div>

              <h1 className="font-serif text-2xl font-bold text-zinc-900">
                Admin Panel
              </h1>

              <p className="text-sm text-zinc-400 mt-1">
                Hyr për të menaxhuar platformën.
              </p>
            </div>

            <form onSubmit={signIn} className="space-y-3">
              <input
                type="email"
                required
                placeholder="Email admin"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-amber-400 text-sm bg-zinc-50 focus:bg-white"
              />

              <input
                type="password"
                required
                placeholder="Fjalëkalimi"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-amber-400 text-sm bg-zinc-50 focus:bg-white"
              />

              {error && <p className="text-red-500 text-xs">{error}</p>}

              <button
                type="submit"
                className="bg-amber-400 hover:bg-amber-500 text-zinc-950 rounded-xl px-5 py-3.5 text-sm font-bold w-full"
              >
                Hyr si Admin
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: "orders", label: "Porositë", icon: ShoppingCart },
    { id: "payments", label: "Pagesat", icon: CreditCard },
    { id: "messages", label: "Mesazhet", icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="container-academic py-8">
        <div className="mb-6 bg-white rounded-2xl border border-zinc-100 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600 mb-2">
              temadiplome.ce
            </p>

            <h1 className="font-serif text-3xl font-bold text-zinc-950">
              Admin Panel
            </h1>

            <p className="text-sm text-zinc-500 mt-1">
              Menaxho porositë, statuset, pagesat dhe materialet finale.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100"
          >
            <LogOut className="w-4 h-4" />
            Dilni
          </button>
        </div>

        <div className="flex gap-6">
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl p-4 border border-zinc-100 sticky top-8">
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-zinc-100">
                <LayoutDashboard className="w-4 h-4 text-amber-500" />
                <span className="font-serif text-base font-bold text-zinc-900">
                  Dashboard
                </span>
              </div>

              <nav className="space-y-1">
                {tabs.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setTab(item.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        tab === item.id
                          ? "bg-amber-400 text-zinc-900"
                          : "text-zinc-600 hover:bg-zinc-50"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="flex gap-2 overflow-x-auto pb-2 mb-5 lg:hidden">
              {tabs.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    onClick={() => setTab(item.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      tab === item.id
                        ? "bg-zinc-900 text-white"
                        : "bg-white text-zinc-600 border border-zinc-200"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {tab === "orders" && <AdminOrders />}
            {tab === "payments" && <AdminPayments />}
            {tab === "messages" && <AdminMessages />}
          </main>
        </div>
      </div>
    </div>
  );
}