import { useEffect, useState } from "react";
import type { ElementType, FormEvent } from "react";
import {
  BookOpen,
  CreditCard,
  GraduationCap,
  LayoutDashboard,
  Loader2,
  LockKeyhole,
  LogOut,
  Mail,
  Menu,
  ShieldCheck,
  ShoppingCart,
  Users,
  X,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import AdminOrders from "../components/admin/AdminOrders";
import AdminPayments from "../components/admin/AdminPayments";
import AdminCourses from "../components/admin/AdminCourses";
import AdminMessages from "../components/admin/AdminMessages";
import AdminNewsletter from "../components/admin/AdminNewsletter";

const ADMIN_EMAIL = "temadiplome.ce@gmail.com";

type Tab =
  | "orders"
  | "payments"
  | "courses"
  | "messages"
  | "newsletter";

type AdminTab = {
  id: Tab;
  label: string;
  description: string;
  icon: ElementType;
};

const tabs: AdminTab[] = [
  {
    id: "orders",
    label: "Porositë",
    description: "Menaxho kërkesat dhe statuset",
    icon: ShoppingCart,
  },
  {
    id: "payments",
    label: "Pagesat",
    description: "Kontrollo pagesat e porosive",
    icon: CreditCard,
  },
  {
    id: "courses",
    label: "Kursi PDF",
    description: "Menaxho materialet PDF",
    icon: BookOpen,
  },
  {
    id: "messages",
    label: "Mesazhet",
    description: "Shiko mesazhet e kontaktit",
    icon: Mail,
  },
  {
    id: "newsletter",
    label: "Newsletter",
    description: "Menaxho abonentët",
    icon: Users,
  },
];

export default function Admin() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [tab, setTab] = useState<Tab>("orders");
  const [error, setError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
        setLoading(false);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setLoginLoading(true);

    const cleanEmail = email.trim().toLowerCase();

    if (cleanEmail !== ADMIN_EMAIL) {
      setError("Ky panel është vetëm për administratorin.");
      setLoginLoading(false);
      return;
    }

    const { error: loginError } =
      await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

    if (loginError) {
      setError("Email ose fjalëkalim i pasaktë.");
    }

    setLoginLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");

    window.location.href = "/";
  };

  const changeTab = (selectedTab: Tab) => {
    setTab(selectedTab);
    setMobileMenuOpen(false);
  };

  const activeTab =
    tabs.find((item) => item.id === tab) ?? tabs[0];

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>

          <p className="mt-4 text-sm font-medium text-zinc-500">
            Duke ngarkuar Admin Panel-in...
          </p>
        </div>
      </main>
    );
  }

  if (
    session &&
    session.user.email?.toLowerCase() !== ADMIN_EMAIL
  ) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-20">
        <div className="w-full max-w-md rounded-[26px] border border-red-100 bg-white p-7 text-center shadow-[0_24px_70px_rgba(24,24,27,0.1)] sm:p-9">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <LockKeyhole className="h-7 w-7" />
          </div>

          <h1 className="mt-5 font-serif text-3xl font-bold text-zinc-950">
            Akses i paautorizuar
          </h1>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            Kjo faqe është e rezervuar vetëm për administratorin e
            platformës.
          </p>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-7 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700"
          >
            <LogOut className="h-4 w-4" />
            Dil nga llogaria
          </button>
        </div>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center overflow-hidden bg-[#090714] px-4 py-20">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-700/25 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-purple-700/20 blur-3xl" />

        <div className="relative grid w-full max-w-[980px] overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-[0_32px_100px_rgba(0,0,0,0.35)] lg:grid-cols-[0.9fr_1.1fr]">
          <section className="relative hidden min-h-[610px] overflow-hidden bg-[#0b0718] p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-600/30 blur-3xl" />

            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-700 to-purple-500 text-white shadow-xl shadow-violet-950/30">
                <GraduationCap className="h-7 w-7" />
              </div>

              <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.24em] text-violet-300">
                temadiplome.ce
              </p>

              <h1 className="mt-3 max-w-md font-serif text-4xl font-bold leading-tight">
                Menaxho platformën nga një vend i vetëm.
              </h1>

              <p className="mt-5 max-w-md text-sm leading-7 text-zinc-300">
                Kontrollo porositë, statuset, pagesat, materialet
                përfundimtare dhe komunikimin me studentët.
              </p>
            </div>

            <div className="relative space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-violet-300">
                  <ShieldCheck className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-sm font-bold">
                    Akses i mbrojtur
                  </p>

                  <p className="mt-1 text-xs leading-5 text-zinc-400">
                    Paneli është i kufizuar vetëm për llogarinë e
                    administratorit.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-violet-300">
                  <LayoutDashboard className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-sm font-bold">
                    Kontroll i plotë
                  </p>

                  <p className="mt-1 text-xs leading-5 text-zinc-400">
                    Ndrysho statuset dhe ngarko materialet finale për
                    studentët.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="flex min-h-[610px] items-center px-5 py-9 sm:px-10 lg:px-12">
            <div className="w-full">
              <div className="text-center lg:text-left">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 lg:mx-0">
                  <LockKeyhole className="h-6 w-6" />
                </div>

                <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.24em] text-violet-600">
                  Admin access
                </p>

                <h2 className="mt-2 font-serif text-3xl font-bold text-zinc-950 sm:text-4xl">
                  Hyr në Admin Panel
                </h2>

                <p className="mt-3 text-sm leading-6 text-zinc-500">
                  Vendos kredencialet e administratorit për të
                  vazhduar.
                </p>
              </div>

              <form onSubmit={signIn} className="mt-8 space-y-4">
                <div>
                  <label
                    htmlFor="admin-email"
                    className="mb-1.5 block text-xs font-bold text-zinc-800"
                  >
                    Email
                  </label>

                  <input
                    id="admin-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Email admin"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setError("");
                    }}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3.5 text-sm text-zinc-900 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="admin-password"
                    className="mb-1.5 block text-xs font-bold text-zinc-800"
                  >
                    Fjalëkalimi
                  </label>

                  <input
                    id="admin-password"
                    type="password"
                    required
                    autoComplete="current-password"
                    placeholder="Shkruani fjalëkalimin"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setError("");
                    }}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3.5 text-sm text-zinc-900 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                  />
                </div>

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-purple-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-200/70 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loginLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Duke hyrë...
                    </>
                  ) : (
                    <>
                      <LockKeyhole className="h-4 w-4" />
                      Hyr si administrator
                    </>
                  )}
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-zinc-50 pb-10 pt-6">
      <div className="px-4 sm:px-5 lg:px-8 xl:px-10">
        <div className="mx-auto max-w-[1600px]">
          {/* TOP HEADER */}
          <header className="relative overflow-hidden rounded-[26px] bg-[#0b0718] px-5 py-6 text-white shadow-[0_20px_60px_rgba(7,9,21,0.16)] sm:px-8 lg:flex lg:items-center lg:justify-between lg:gap-8 lg:px-10">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-600/30 blur-3xl" />
            <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-purple-700/20 blur-3xl" />

            <div className="relative">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-violet-300">
                temadiplome.ce
              </p>

              <h1 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">
                Admin Panel
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-300">
                Menaxho porositë, statuset, pagesat, mesazhet dhe
                materialet finale.
              </p>
            </div>

            <div className="relative mt-5 flex items-center gap-3 lg:mt-0">
              <div className="hidden rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-right sm:block">
                <p className="text-[10px] text-zinc-400">
                  Administrator
                </p>

                <p className="mt-0.5 text-xs font-semibold text-white">
                  {session.user.email}
                </p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-500/10 px-5 py-3 text-sm font-bold text-red-300 transition hover:bg-red-500/20 sm:flex-none"
              >
                <LogOut className="h-4 w-4" />
                Dilni
              </button>
            </div>
          </header>

          {/* MOBILE ACTIVE TAB */}
          <div className="mt-5 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="flex w-full items-center justify-between rounded-[18px] border border-zinc-100 bg-white px-4 py-3.5 shadow-[0_10px_30px_rgba(24,24,27,0.05)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                  <activeTab.icon className="h-5 w-5" />
                </div>

                <div className="text-left">
                  <p className="text-sm font-bold text-zinc-950">
                    {activeTab.label}
                  </p>

                  <p className="text-[10px] text-zinc-500">
                    {activeTab.description}
                  </p>
                </div>
              </div>

              <Menu className="h-5 w-5 text-zinc-500" />
            </button>
          </div>

          {/* PAGE LAYOUT */}
          <div className="mt-5 flex gap-6">
            {/* SIDEBAR */}
            <aside className="hidden w-[260px] shrink-0 lg:block">
              <div className="sticky top-6 rounded-[22px] border border-zinc-100 bg-white p-4 shadow-[0_14px_44px_rgba(24,24,27,0.05)]">
                <div className="flex items-center gap-3 border-b border-zinc-100 px-2 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                    <LayoutDashboard className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-serif text-lg font-bold text-zinc-950">
                      Dashboard
                    </p>

                    <p className="text-[10px] text-zinc-400">
                      Menaxhimi i platformës
                    </p>
                  </div>
                </div>

                <nav className="mt-4 space-y-2">
                  {tabs.map((item) => {
                    const Icon = item.icon;
                    const active = tab === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => changeTab(item.id)}
                        className={`group flex w-full items-center gap-3 rounded-[14px] px-3 py-3 text-left transition ${
                          active
                            ? "bg-gradient-to-r from-violet-700 to-purple-600 text-white shadow-lg shadow-violet-200/60"
                            : "text-zinc-600 hover:bg-violet-50 hover:text-violet-700"
                        }`}
                      >
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                            active
                              ? "bg-white/15"
                              : "bg-zinc-100 text-zinc-600 group-hover:bg-violet-100 group-hover:text-violet-700"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-bold">
                            {item.label}
                          </p>

                          <p
                            className={`mt-0.5 truncate text-[10px] ${
                              active
                                ? "text-white/70"
                                : "text-zinc-400"
                            }`}
                          >
                            {item.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* CONTENT */}
            <section className="min-w-0 flex-1">
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-600">
                    Administrim
                  </p>

                  <h2 className="mt-1 font-serif text-2xl font-bold text-zinc-950 sm:text-3xl">
                    {activeTab.label}
                  </h2>

                  <p className="mt-1 text-sm text-zinc-500">
                    {activeTab.description}
                  </p>
                </div>
              </div>

              {tab === "orders" && <AdminOrders />}
              {tab === "payments" && <AdminPayments />}
              {tab === "courses" && <AdminCourses />}
              {tab === "messages" && <AdminMessages />}
              {tab === "newsletter" && <AdminNewsletter />}
            </section>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <button
            type="button"
            aria-label="Mbyll menunë"
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-zinc-950/50 backdrop-blur-sm"
          />

          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-[28px] bg-white p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-600">
                  Admin menu
                </p>

                <h2 className="mt-1 font-serif text-2xl font-bold text-zinc-950">
                  Zgjidh seksionin
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-6 space-y-2">
              {tabs.map((item) => {
                const Icon = item.icon;
                const active = tab === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => changeTab(item.id)}
                    className={`flex w-full items-center gap-3 rounded-[16px] border p-3.5 text-left transition ${
                      active
                        ? "border-violet-700 bg-violet-50 text-violet-700"
                        : "border-zinc-100 bg-white text-zinc-600"
                    }`}
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        active
                          ? "bg-violet-700 text-white"
                          : "bg-zinc-100 text-zinc-600"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-bold">
                        {item.label}
                      </p>

                      <p className="mt-0.5 text-[10px] text-zinc-400">
                        {item.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </main>
  );
}