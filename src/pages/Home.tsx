import SEO from "../components/SEO";
import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  FileText,
  GraduationCap,
  Lock,
  Mail,
  MessageCircle,
  Presentation,
  Send,
  Star,
} from "lucide-react";
import { SITE_CONFIG, supabase } from "../lib/supabase";

const services = [
  {
    title: "Punime Diplome",
    description: "Bachelor & Master, strukturim dhe asistencë akademike.",
    icon: GraduationCap,
  },
  {
    title: "Strukturim Punimi",
    description: "Objektiva, kapituj, metodologji dhe organizim.",
    icon: FileText,
  },
  {
    title: "Referenca APA",
    description: "Citime, bibliografi dhe formatim akademik.",
    icon: BookOpen,
  },
  {
    title: "Analizë SPSS",
    description: "Tabela, grafikë dhe interpretim statistikor.",
    icon: BarChart3,
  },
  {
    title: "PowerPoint",
    description: "Prezantim profesional dhe i qartë për mbrojtje.",
    icon: Presentation,
  },
];

const stats = [
  { value: "500+", label: "punime të realizuara", icon: GraduationCap },
  { value: "4.9/5", label: "vlerësim mesatar", icon: Star },
  { value: "98%", label: "studentë të kënaqur", icon: CheckCircle2 },
  { value: "100%", label: "konfidencialitet", icon: Lock },
];

const steps = [
  {
    number: "01",
    title: "Zgjidh shërbimin",
    description:
      "Zgjidh asistencën që të nevojitet: diplomë, SPSS, APA, PowerPoint ose detyrë kursi.",
    icon: FileText,
  },
  {
    number: "02",
    title: "Dërgo kërkesën",
    description:
      "Plotëso formularin me temën, universitetin, afatin dhe detajet e punimit.",
    icon: Send,
  },
  {
    number: "03",
    title: "Merr konfirmimin",
    description:
      "Të kontaktojmë në WhatsApp për afatin, shërbimin dhe hapat e radhës.",
    icon: CheckCircle2,
  },
];

const reviews = [
  {
    name: "M. Krasniqi",
    study: "Master",
    text: "Analiza SPSS ishte e qartë dhe shumë profesionale.",
    avatar: "MK",
  },
  {
    name: "A. Leka",
    study: "Bachelor",
    text: "Materiali u organizua qartë dhe komunikimi ishte korrekt.",
    avatar: "AL",
  },
  {
    name: "E. Gashi",
    study: "Master",
    text: "Komunikim i shpejtë dhe shumë korrekt gjatë gjithë procesit.",
    avatar: "EG",
  },
  {
    name: "J. Dervishi",
    study: "Bachelor",
    text: "Prezantimi ishte i rregullt dhe shumë i përshtatshëm për mbrojtje.",
    avatar: "JD",
  },
];

export default function Home() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const currentUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser") || "null");
    } catch {
      return null;
    }
  }, []);

  const isAdmin =
    currentUser?.email?.toLowerCase() === "temadiplome.ce@gmail.com";

  const orderPath = !isLoggedIn
    ? "/auth"
    : isAdmin
      ? "/admin"
      : "/zgjidh-punimin";

  const whatsappMessage =
    "Përshëndetje! Dëshiroj një konsultim për një shërbim akademik.";

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleHomeLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    const cleanEmail = loginEmail.trim().toLowerCase();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password: loginPassword,
    });

    if (error || !data.user) {
      setLoginLoading(false);
      setLoginError("Email ose fjalëkalim i pasaktë.");
      return;
    }

    if (cleanEmail === "temadiplome.ce@gmail.com") {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("currentUser");
      setLoginLoading(false);
      window.location.href = "/admin";
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("user_agreements")
      .select(
        "auth_user_id, full_name, first_name, last_name, email, phone, country_code, university, study_field",
      )
      .eq("auth_user_id", data.user.id)
      .maybeSingle();

    if (profileError) {
      console.error("Profile error:", profileError);
    }

    const loggedUser = profile || {
      auth_user_id: data.user.id,
      full_name:
        data.user.user_metadata?.full_name ||
        data.user.email?.split("@")[0] ||
        "Student",
      email: data.user.email || cleanEmail,
    };

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(loggedUser));

    setLoginLoading(false);
    window.location.href = "/dashboard";
  };

return (
  <>
    <SEO
      title="Asistencë Akademike, SPSS, APA dhe PowerPoint"
      description="Asistencë akademike profesionale për strukturimin e temave, analizë SPSS, referenca APA, PowerPoint, konsultim dhe materiale falas."
      path="/"
    />

    <main className="w-full max-w-full overflow-x-hidden bg-white text-zinc-950">
      <style>{`
        @keyframes reviewMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .review-marquee {
          animation: reviewMarquee 28s linear infinite;
        }

        .review-marquee:hover {
          animation-play-state: paused;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .review-marquee {
            animation: none;
          }
        }
      `}</style>

      {/* HERO */}
      <section className="relative pb-3 pt-20 lg:pb-5 lg:pt-24">
        <div className="relative mx-auto max-w-[1440px] px-4 sm:px-5 lg:px-10">
          <div className="relative overflow-hidden rounded-[24px] lg:rounded-[28px]">
            <div className="absolute inset-0">
              <img
                src="/images/home/hero-graduate.jpg"
                alt="Studentë në ceremoninë e diplomimit"
                className="h-full w-full object-cover object-[55%_center] brightness-[0.94] contrast-[1.05] saturate-[1.05] sm:object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/30 to-white/5 lg:bg-gradient-to-r lg:from-white/95 lg:via-white/58 lg:to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/5" />
            </div>

            <div className="relative grid items-center gap-6 px-5 pb-6 pt-8 sm:px-8 sm:py-10 lg:min-h-[570px] lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:px-16 lg:py-12">
              <div className="max-w-xl text-center lg:text-left">
                <p className="mb-3 flex items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-violet-700 sm:text-[11px] lg:justify-start">
                  <span className="h-px w-5 bg-violet-600" />
                  Asistencë akademike profesionale
                </p>

                <h1 className="font-serif text-[34px] font-bold leading-[1.08] tracking-tight text-zinc-950 sm:text-5xl lg:max-w-[620px] lg:text-6xl">
                  Asistencë akademike për një punim{" "}
                  <span className="text-violet-700">më të mirë.</span>
                </h1>

                <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-zinc-600 sm:mt-5 sm:text-base sm:leading-7 lg:mx-0">
                  Nga struktura e temës, referencat APA dhe analiza SPSS, deri
                  te PowerPoint-i për mbrojtje. Proces i qartë, komunikim i
                  shpejtë dhe konfidencialitet.
                </p>

                <div className="mt-5 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:justify-center lg:justify-start">
                  <Link
                    to={orderPath}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-purple-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5"
                  >
                    Porosit tani
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                      whatsappMessage,
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white/90 px-6 py-3.5 text-sm font-semibold text-zinc-900 transition hover:border-violet-400"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Konsultim falas
                  </a>
                </div>
              </div>

              {/* Desktop login card */}
              <div className="hidden justify-end lg:flex">
                <div className="w-full max-w-[390px] rounded-[24px] border border-white/80 bg-white/82 p-6 shadow-2xl shadow-zinc-900/15 backdrop-blur-xl">
                  <h2 className="font-serif text-2xl font-bold text-zinc-950">
                    Login
                  </h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    Hyr në llogarinë tënde për të vazhduar me porosinë.
                  </p>

                  <form onSubmit={handleHomeLogin} className="mt-5 space-y-3">
                    <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3.5 transition focus-within:border-violet-400 focus-within:ring-4 focus-within:ring-violet-100">
                      <Mail className="h-4 w-4 shrink-0 text-violet-600" />
                      <input
                        type="email"
                        required
                        autoComplete="email"
                        value={loginEmail}
                        onChange={(event) => {
                          setLoginEmail(event.target.value);
                          setLoginError("");
                        }}
                        placeholder="Email"
                        className="w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
                      />
                    </div>

                    <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3.5 transition focus-within:border-violet-400 focus-within:ring-4 focus-within:ring-violet-100">
                      <Lock className="h-4 w-4 shrink-0 text-violet-600" />
                      <input
                        type="password"
                        required
                        autoComplete="current-password"
                        value={loginPassword}
                        onChange={(event) => {
                          setLoginPassword(event.target.value);
                          setLoginError("");
                        }}
                        placeholder="Password"
                        className="w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
                      />
                    </div>

                    {loginError && (
                      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
                        {loginError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loginLoading}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-purple-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-200/50 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loginLoading ? "Duke hyrë..." : "Hyr"}
                      {!loginLoading && <ArrowRight className="h-4 w-4" />}
                    </button>
                  </form>

                  <div className="my-5 flex items-center gap-3">
                    <div className="h-px flex-1 bg-zinc-200" />
                    <span className="text-[11px] text-zinc-400">ose</span>
                    <div className="h-px flex-1 bg-zinc-200" />
                  </div>

                  <p className="text-center text-sm text-zinc-500">
                    Nuk ke ende një llogari?
                  </p>
                  <Link
                    to="/auth"
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-5 py-3.5 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
                  >
                    Regjistrohu
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* STATS */}
            <div className="relative z-10 mx-3 mb-3 grid grid-cols-2 overflow-hidden rounded-[20px] border border-white/80 bg-white/95 shadow-xl shadow-zinc-900/10 backdrop-blur-md sm:mx-5 lg:mx-10 lg:grid-cols-4">
              {stats.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className={`flex min-h-[72px] items-center gap-2.5 px-3 py-3 sm:min-h-[82px] sm:px-5 ${
                      index % 2 === 0 ? "border-r border-zinc-100" : ""
                    } ${
                      index < 2 ? "border-b border-zinc-100 lg:border-b-0" : ""
                    } ${index > 0 ? "lg:border-l lg:border-zinc-100" : ""}`}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-700 sm:h-10 sm:w-10">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-base font-bold leading-none text-zinc-950 sm:text-lg">
                        {item.value}
                      </p>
                      <p className="mt-1 text-[9px] leading-3 text-zinc-500 sm:text-[11px] sm:leading-4">
                        {item.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-5 lg:py-7">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-5 lg:px-10">
          <div className="text-center">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-violet-600 sm:text-[10px]">
              Shërbimet tona
            </p>
            <h2 className="mt-1.5 font-serif text-2xl font-bold sm:text-3xl">
              Çfarë ofrojmë
            </h2>
          </div>

          <div className="scrollbar-hide mt-5 flex w-full max-w-full snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible lg:grid-cols-5 lg:gap-5">  {services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className="group min-w-[145px] snap-start rounded-[18px] border border-zinc-100 bg-white px-3 py-4 text-center shadow-[0_8px_24px_rgba(24,24,27,0.05)] transition hover:-translate-y-1 hover:border-violet-200 sm:min-w-0 sm:px-4 sm:py-5"
                >
                  <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-violet-50 text-violet-700 sm:h-10 sm:w-10">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <h3 className="mt-2.5 text-[12px] font-bold text-zinc-950 sm:text-[13px]">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 hidden text-[11px] leading-4 text-zinc-500 sm:block">
                    {service.description}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-4 text-center sm:mt-6">
            <Link
              to="/sherbimet"
              className="inline-flex items-center gap-2 rounded-xl border border-violet-200 px-5 py-2.5 text-xs font-semibold text-violet-700 transition hover:bg-violet-50 sm:px-6 sm:py-3 sm:text-sm"
            >
              Shiko të gjitha shërbimet
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CONSULTATION */}
      <section className="px-4 py-4 sm:px-5 lg:px-10 lg:py-6">
        <div className="relative mx-auto grid max-w-[1440px] overflow-hidden rounded-[24px] bg-[#0d0920] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[235px] overflow-hidden p-6 sm:min-h-[270px] sm:p-9">
            <img
              src="/images/home/consultation-laptop.jpg"
              alt="Konsultim akademik online"
              className="absolute inset-0 h-full w-full object-cover brightness-[0.55] contrast-[1.08] saturate-[0.85]"            />
           <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-[#0d0920]/95" />
<div className="absolute inset-0 bg-[#0d0920]/35" />
            <div className="relative mx-auto max-w-md text-center text-white lg:mx-0 lg:text-left">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-violet-300 sm:text-[10px]">
                Konsultim falas
              </p>
              <h2 className="mt-2 font-serif text-2xl font-bold sm:mt-3 sm:text-3xl">
                Konsultim falas para porosisë
              </h2>
              <p className="mt-4 text-sm font-medium leading-6 text-white/90">
                Na shkruani për temën, afatin, strukturën dhe dokumentet që ju
                nevojiten. Përgjigjemi gjatë orarit të punës.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-3 text-[11px] text-zinc-300 sm:mt-5 sm:gap-4 sm:text-xs lg:justify-start">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-violet-400" />
                  Përgjigje e shpejtë
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageCircle className="h-4 w-4 text-violet-400" />
                  WhatsApp
                </span>
                <span className="flex items-center gap-1.5">
                  <Lock className="h-4 w-4 text-violet-400" />
                  Konfidencialitet
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center p-4 sm:p-6 lg:p-8">
            <div className="w-full rounded-[18px] border border-white/10 bg-white/[0.05] p-5 text-center backdrop-blur sm:p-6">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-violet-300 sm:text-[10px]">
                Konsultim në WhatsApp
              </p>
              <h3 className="mt-2 font-serif text-xl font-bold text-white sm:mt-3 sm:text-2xl">
                Na dërgo një mesazh
              </h3>
              <p className="mx-auto mt-2.5 max-w-md text-xs leading-5 text-zinc-300 sm:mt-3 sm:text-sm sm:leading-6">
                Na shkruaj temën, afatin dhe shërbimin që të nevojitet. Do të të
                përgjigjemi me informacionin dhe hapat e radhës.
              </p>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                  "Përshëndetje! Dëshiroj një konsultim falas. Tema/shërbimi që më nevojitet është:",
                )}`}
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-purple-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-950/30 transition hover:-translate-y-0.5 sm:mt-6 sm:py-4"
              >
                <MessageCircle className="h-5 w-5" />
                Shkruaj në WhatsApp
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-4 py-4 sm:px-5 lg:px-10 lg:py-6">
        <div className="mx-auto max-w-[1440px] rounded-[22px] border border-violet-100 bg-gradient-to-br from-violet-50/60 via-white to-zinc-50 px-4 py-5 shadow-[0_14px_40px_rgba(76,29,149,0.07)] sm:px-8 sm:py-7 lg:px-10">
          <div className="text-center">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-violet-600 sm:text-[10px]">
              Si funksionon
            </p>
            <h2 className="mt-1.5 font-serif text-xl font-bold text-zinc-950 sm:text-3xl">
              Procesi i thjeshtë në 3 hapa
            </h2>
          </div>

          <div className="scrollbar-hide mt-5 flex w-full max-w-full snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-2 md:grid md:grid-cols-3 md:overflow-visible md:gap-5">  {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <article
                  key={step.number}
                  className="relative min-w-[82%] snap-center rounded-[18px] border border-violet-100 bg-white px-4 py-4 text-center shadow-[0_8px_24px_rgba(24,24,27,0.05)] sm:min-w-[55%] sm:px-5 sm:py-5 md:min-w-0"
                >
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-violet-50 text-xs font-bold text-violet-700">
                    {step.number}
                  </div>
                  <div className="mx-auto -mt-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-violet-700 text-white">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <h3 className="mt-3 font-serif text-base font-bold text-zinc-950">
                    {step.title}
                  </h3>
                  <p className="mx-auto mt-1.5 max-w-[280px] text-[11px] leading-4 text-zinc-500">
                    {step.description}
                  </p>
                  {index < steps.length - 1 && (
                    <ArrowRight className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-violet-300 md:block" />
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-4 py-4 sm:px-5 lg:px-10 lg:py-6">
        <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[24px] bg-[#17100f] py-7 sm:py-9">
          <img
            src="/images/home/testimonials-background.jpg"
            alt="Studentë duke bashkëpunuar"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-80 brightness-[0.82] contrast-[1.05] saturate-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-black/60" />
          <div className="absolute inset-0 bg-violet-950/10" />

          <div className="relative">
            <p className="mb-4 text-center text-[9px] font-bold uppercase tracking-[0.2em] text-violet-200 sm:mb-5 sm:text-[10px]">
              Studentët tanë
            </p>
            <div className="overflow-hidden">
              <div className="review-marquee flex w-max gap-3 px-3 sm:gap-4 sm:px-4">
                {[...reviews, ...reviews].map((review, index) => (
                  <article
                    key={`${review.name}-${index}`}
                    className="flex w-[255px] shrink-0 items-center gap-3 rounded-[16px] border border-white/25 bg-black/40 p-3.5 shadow-2xl shadow-black/20 backdrop-blur-md sm:w-[330px] sm:gap-4 sm:rounded-[18px] sm:p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-violet-300 text-xs font-bold text-violet-900 sm:h-12 sm:w-12 sm:text-sm">
                      {review.avatar}
                    </div>
                    <div className="min-w-0">
                      <p className="line-clamp-2 text-xs font-medium text-white sm:text-sm">
                        {review.text}
                      </p>
                      <div className="mt-2.5 flex items-center justify-between gap-3 sm:mt-3">
                        <div>
                          <p className="text-[11px] font-bold text-white sm:text-xs">
                            {review.name}
                          </p>
                          <p className="text-[9px] text-zinc-300 sm:text-[10px]">
                            {review.study}
                          </p>
                        </div>
                        <div className="flex text-amber-400">
                          {Array.from({ length: 5 }).map((_, starIndex) => (
                            <Star
                              key={starIndex}
                              className="h-3 w-3 fill-current sm:h-3.5 sm:w-3.5"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE STICKY ACTIONS */}
      <div className="fixed bottom-3 left-3 right-3 z-40 grid grid-cols-2 gap-2 rounded-2xl border border-white/60 bg-zinc-950/95 p-2 shadow-2xl backdrop-blur lg:hidden">
        <a
          href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
            whatsappMessage,
          )}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl bg-green-500 px-3 py-3 text-xs font-bold text-white"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
        <Link
          to={orderPath}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-purple-600 px-3 py-3 text-xs font-bold text-white"
        >
          Porosit tani
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      </main>
  </>
);
}