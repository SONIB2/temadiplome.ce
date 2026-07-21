import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  FileText,
  GraduationCap,
  Instagram,
  Lock,
  Mail,
  MessageCircle,
  Phone,
  Presentation,
  Quote,
  Send,
  Star,
  UserRound,
} from "lucide-react";
import { SITE_CONFIG } from "../lib/supabase";

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
  {
    value: "500+",
    label: "punime të realizuara",
    icon: GraduationCap,
  },
  {
    value: "4.9/5",
    label: "vlerësim mesatar",
    icon: Star,
  },
  {
    value: "98%",
    label: "studentë të kënaqur",
    icon: CheckCircle2,
  },
  {
    value: "100%",
    label: "konfidencialitet",
    icon: Lock,
  },
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

  return (
    <main className="overflow-hidden bg-white text-zinc-950">
      <style>{`
        @keyframes reviewMarquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .review-marquee {
          animation: reviewMarquee 28s linear infinite;
        }

        .review-marquee:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .review-marquee {
            animation: none;
          }
        }
      `}</style>

      {/* HERO */}
      <section className="relative pt-20 pb-4 lg:pt-24 lg:pb-6">
        <div className="relative mx-auto max-w-[1440px] px-5 lg:px-10">
          <div className="relative overflow-hidden rounded-b-[28px] pb-1">            <div className="absolute inset-0">
              <img
                src="/images/home/hero-graduate.jpg"
                alt="Studente në ceremoninë e diplomimit"
                className="h-full w-full object-cover object-center brightness-[0.92] contrast-[1.08] saturate-[1.08]"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent" />
<div className="absolute inset-0 bg-gradient-to-t from-white/35 via-transparent to-white/5" />
            </div>

            <div className="relative grid min-h-[570px] items-center gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-16">
              <div className="max-w-xl">
                <p className="mb-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-violet-700">
                  <span className="h-px w-6 bg-violet-600" />
                  Asistencë akademike profesionale
                </p>

                <h1 className="max-w-[620px] font-serif text-4xl font-bold leading-[1.08] tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl">
                  Asistencë akademike për një punim{" "}
                  <span className="text-violet-700">më të mirë.</span>
                </h1>

                <p className="mt-6 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
                  Nga struktura e temës, referencat APA dhe analiza SPSS, deri te
                  PowerPoint-i për mbrojtje. Proces i qartë, komunikim i shpejtë
                  dhe konfidencialitet.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to={orderPath}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-purple-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5"
                  >
                    Porosit tani
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                      whatsappMessage
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

    <div className="mt-5 space-y-3">
      <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3.5">
        <Mail className="h-4 w-4 shrink-0 text-violet-600" />

        <input
          type="email"
          placeholder="Email"
          className="w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
        />
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3.5">
        <Lock className="h-4 w-4 shrink-0 text-violet-600" />

        <input
          type="password"
          placeholder="Password"
          className="w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
        />
      </div>

      <Link
        to="/auth"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-purple-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-200/50 transition hover:-translate-y-0.5"
      >
        Hyr
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>

    <div className="my-5 flex items-center gap-3">
      <div className="h-px flex-1 bg-zinc-200" />

      <span className="text-[11px] text-zinc-400">
        ose
      </span>

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
<div className="relative z-10 mx-4 -mt-1 mb-4 grid grid-cols-2 overflow-hidden rounded-[22px] border border-white/80 bg-white/95 shadow-xl shadow-zinc-900/10 backdrop-blur-md lg:mx-12 lg:mb-5 lg:grid-cols-4">
  {stats.map((item, index) => {
    const Icon = item.icon;

    return (
      <div
        key={item.label}
        className={`flex min-h-[86px] items-center gap-3 px-4 py-4 sm:px-6 ${
          index % 2 === 0 ? "border-r border-zinc-100" : ""
        } ${
          index < 2 ? "border-b border-zinc-100 lg:border-b-0" : ""
        } ${
          index > 0 ? "lg:border-l lg:border-zinc-100" : ""
        }`}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-700">
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <p className="text-lg font-bold leading-none text-zinc-950">
            {item.value}
          </p>

          <p className="mt-1 text-[11px] leading-4 text-zinc-500">
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
      <section className="py-6 lg:py-8">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-600">
              Shërbimet tona
            </p>

            <h2 className="mt-2 font-serif text-3xl font-bold">
              Çfarë ofrojmë
            </h2>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className="group rounded-[20px] border border-zinc-100 bg-white p-4 text-center shadow-[0_10px_35px_rgba(24,24,27,0.05)] transition hover:-translate-y-1 hover:border-violet-200 sm:p-6"
                >
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-violet-50 text-violet-700 transition group-hover:bg-violet-100">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-4 text-sm font-bold text-zinc-950">
                    {service.title}
                  </h3>

                  <p className="mt-2 hidden text-xs leading-5 text-zinc-500 sm:block">
                    {service.description}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/sherbimet"
              className="inline-flex items-center gap-2 rounded-xl border border-violet-200 px-6 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
            >
              Shiko të gjitha shërbimet
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CONSULTATION */}
      <section className="px-5 pt-4 pb-5 lg:px-10 lg:pt-5 lg:pb-6">
        <div className="relative mx-auto grid max-w-[1340px] overflow-hidden rounded-[24px] bg-[#0d0920] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[270px] overflow-hidden p-7 sm:p-10">
            <img
              src="/images/home/consultation-laptop.jpg"
              alt="Konsultim akademik online"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-[#100928]/85 to-[#100928]" />

            <div className="relative max-w-md text-white">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300">
                Konsultim falas
              </p>

              <h2 className="mt-3 font-serif text-3xl font-bold">
                Konsultim falas para porosisë
              </h2>

              <p className="mt-4 text-sm leading-6 text-zinc-300">
                Na shkruani për temën, afatin, strukturën dhe dokumentet që ju
                nevojiten. Përgjigjemi gjatë orarit të punës.
              </p>

              <div className="mt-6 flex flex-wrap gap-4 text-xs text-zinc-300">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-violet-400" />
                  Përgjigje e shpejtë
                </span>

                <span className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-violet-400" />
                  WhatsApp
                </span>

                <span className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-violet-400" />
                  Konfidencialitet
                </span>
              </div>
            </div>
          </div>

       <div className="flex items-center p-5 sm:p-7 lg:p-8">
  <div className="w-full rounded-[18px] border border-white/10 bg-white/[0.05] p-6 text-center backdrop-blur">
    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300">
      Konsultim në WhatsApp
    </p>

    <h3 className="mt-3 font-serif text-2xl font-bold text-white">
      Na dërgo një mesazh
    </h3>

    <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-300">
      Na shkruaj temën, afatin dhe shërbimin që të nevojitet. Do të të
      përgjigjemi me informacionin dhe hapat e radhës.
    </p>

    <a
      href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
        "Përshëndetje! Dëshiroj një konsultim falas. Tema/shërbimi që më nevojitet është:"
      )}`}
      target="_blank"
      rel="noreferrer"
      className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-purple-600 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-violet-950/30 transition hover:-translate-y-0.5"
    >
      <MessageCircle className="h-5 w-5" />
      Shkruaj në WhatsApp
      <ArrowRight className="h-4 w-4" />
    </a>

    <p className="mt-3 text-[10px] text-zinc-500">
      Hapet direkt biseda në WhatsApp
    </p>
  </div>
</div>
          </div>
      </section>

     {/* PROCESS */}
<section className="px-5 py-5 lg:px-10 lg:py-7">
  <div className="mx-auto max-w-[1440px] rounded-[24px] border border-violet-100 bg-gradient-to-br from-violet-50/70 via-white to-zinc-50 px-5 py-8 shadow-[0_18px_50px_rgba(76,29,149,0.08)] sm:px-8 lg:px-10">
    <div className="text-center">
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-600">
        Si funksionon
      </p>

      <h2 className="mt-2 font-serif text-2xl font-bold text-zinc-950 sm:text-3xl lg:text-4xl">
        Procesi i thjeshtë në 3 hapa
      </h2>
    </div>

    <div className="mt-8 grid gap-4 md:grid-cols-3 md:gap-6">
      {steps.map((step, index) => {
        const Icon = step.icon;

        return (
          <article
            key={step.number}
            className="relative min-h-[190px] rounded-[20px] border border-violet-100 bg-white px-5 py-6 text-center shadow-[0_10px_30px_rgba(24,24,27,0.05)] transition hover:-translate-y-1 hover:border-violet-200"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-violet-50 text-sm font-bold text-violet-700">
              {step.number}
            </div>

            <div className="mx-auto -mt-2 flex h-8 w-8 items-center justify-center rounded-full bg-violet-700 text-white shadow-md">
              <Icon className="h-4 w-4" />
            </div>

            <h3 className="mt-4 font-serif text-lg font-bold text-zinc-950">
              {step.title}
            </h3>

            <p className="mx-auto mt-2 max-w-[320px] text-xs leading-5 text-zinc-500">
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
<section className="px-5 py-5 lg:px-10 lg:py-7">
  <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[24px] bg-[#17100f] py-9">
    <img
      src="/images/home/testimonials-background.jpg"
      alt="Studentë duke bashkëpunuar"
      className="absolute inset-0 h-full w-full object-cover object-center opacity-80 brightness-[0.82] contrast-[1.05] saturate-[1.05]"
    />

    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-black/60" />
    <div className="absolute inset-0 bg-violet-950/10" />

    <div className="relative">
      <p className="mb-5 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-violet-200">
        Studentët tanë
      </p>

      <div className="overflow-hidden">
        <div className="review-marquee flex w-max gap-4 px-4">
          {[...reviews, ...reviews].map((review, index) => (
            <article
              key={`${review.name}-${index}`}
              className="flex w-[285px] shrink-0 items-center gap-4 rounded-[18px] border border-white/25 bg-black/40 p-4 shadow-2xl shadow-black/20 backdrop-blur-md sm:w-[330px]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-violet-300 text-sm font-bold text-violet-900">
                {review.avatar}
              </div>

              <div className="min-w-0">
                <p className="line-clamp-2 text-sm font-medium text-white">
                  {review.text}
                </p>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-white">
                      {review.name}
                    </p>

                    <p className="text-[10px] text-zinc-300">
                      {review.study}
                    </p>
                  </div>

                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className="h-3.5 w-3.5 fill-current"
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
            whatsappMessage
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
  );
}