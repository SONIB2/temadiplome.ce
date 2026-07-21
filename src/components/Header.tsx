import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const ADMIN_EMAIL = "temadiplome.ce@gmail.com";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Shërbimet", path: "/sherbimet" },
  { label: "Si funksionon", path: "/si-funksionon" },
  { label: "Portofoli", path: "/portofoli" },
  { label: "Universitetet", path: "/universitetet" },
  { label: "Blog", path: "/blog" },
  { label: "Rreth Nesh", path: "/rreth-nesh" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  let currentUser: { email?: string } | null = null;

  try {
    currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );
  } catch {
    currentUser = null;
  }

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const isAdmin =
    currentUser?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  const dashboardPath = isAdmin ? "/admin" : "/dashboard";
  const dashboardLabel = isAdmin ? "Admin Panel" : "Dashboard";

  const orderPath = !isLoggedIn
    ? "/auth"
    : isAdmin
      ? "/admin"
      : "/zgjidh-punimin";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");

    window.location.href = "/";
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-zinc-200/80 bg-white/95 shadow-[0_8px_30px_rgba(24,24,27,0.06)] backdrop-blur-xl"
            : "border-transparent bg-white/90 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-[70px] w-full max-w-[1440px] items-center justify-between px-5 lg:px-10">
          {/* Logo */}
         <Link
  to="/"
  className="flex shrink-0 items-center"
  aria-label="temadiplome.ce"
>
  <img
    src="/images/home/logo.png"
    alt="temadiplome.ce"
    className="h-[38px] w-auto object-contain sm:h-[42px]"
  />
</Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-7 xl:flex">
            {navLinks.map((link) => {
              const active = isActive(link.path);

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative py-6 text-[13px] font-medium transition-colors ${
                    active
                      ? "text-violet-700"
                      : "text-zinc-700 hover:text-violet-700"
                  }`}
                >
                  {link.label}

                  <span
                    className={`absolute bottom-[15px] left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-violet-600 transition-all duration-200 ${
                      active ? "w-6 opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 xl:flex">
            <Link
              to="/kontakt"
              className="px-2 py-2 text-[13px] font-medium text-zinc-700 transition hover:text-violet-700"
            >
              Kontakt
            </Link>

            {!isLoggedIn ? (
              <Link
                to={orderPath}
                className="inline-flex items-center gap-2 rounded-xl border border-violet-500 bg-white px-5 py-2.5 text-[13px] font-bold text-violet-700 shadow-[0_8px_24px_rgba(124,58,237,0.10)] transition hover:-translate-y-0.5 hover:bg-violet-50"
              >
                Porosit tani
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <>
                <Link
                  to={dashboardPath}
                  className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-4 py-2.5 text-[13px] font-bold text-violet-700 transition hover:bg-violet-100"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  {dashboardLabel}
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-[13px] font-medium text-zinc-600 transition hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  Dil
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-800 shadow-sm transition active:scale-95 xl:hidden"
            aria-label={isOpen ? "Mbyll menunë" : "Hap menunë"}
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 xl:hidden ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <button
          type="button"
          aria-label="Mbyll menunë"
          onClick={() => setIsOpen(false)}
          className={`absolute inset-0 bg-zinc-950/40 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Mobile drawer */}
        <aside
          className={`absolute right-0 top-0 flex h-full w-[290px] flex-col bg-white shadow-2xl transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-[70px] items-center justify-between border-b border-zinc-100 px-5">
            <Link to="/" className="flex items-center">
  <img
    src="/images/home/logo.png"
    alt="temadiplome.ce"
    className="h-9 w-auto object-contain"
  />

              <p className="font-serif text-base font-bold text-zinc-950">
                temadiplome
                <span className="text-violet-600">.ce</span>
              </p>
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100"
              aria-label="Mbyll menunë"
            >
              <X className="h-5 w-5 text-zinc-700" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-5">
            {navLinks.map((link) => {
              const active = isActive(link.path);

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-violet-50 text-violet-700"
                      : "text-zinc-700 hover:bg-zinc-50"
                  }`}
                >
                  {link.label}

                  {active && (
                    <span className="h-2 w-2 rounded-full bg-violet-600" />
                  )}
                </Link>
              );
            })}

            <Link
              to="/kontakt"
              className={`flex items-center rounded-xl px-4 py-3 text-sm font-medium ${
                isActive("/kontakt")
                  ? "bg-violet-50 text-violet-700"
                  : "text-zinc-700 hover:bg-zinc-50"
              }`}
            >
              Kontakt
            </Link>
          </nav>

          <div className="space-y-2 border-t border-zinc-100 p-4">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/auth"
                  className="flex w-full items-center justify-center rounded-xl border border-zinc-200 px-4 py-3 text-sm font-semibold text-zinc-800"
                >
                  Login / Regjistrohu
                </Link>

                <Link
                  to={orderPath}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-purple-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-violet-200"
                >
                  Porosit tani
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={dashboardPath}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-50 px-4 py-3 text-sm font-bold text-violet-700"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  {dashboardLabel}
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  Dil nga llogaria
                </button>
              </>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}