import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Download,
  Eye,
  GraduationCap,
  MessageCircle,
  MonitorPlay,
  ShieldCheck,
} from "lucide-react";
import { SITE_CONFIG } from "../lib/supabase";

type TemplateItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  details: string;
  fileUrl: string;
  icon: React.ElementType;
  theme: "violet" | "amber" | "green";
};

const templates: TemplateItem[] = [
  {
    id: "bachelor",
    title: "Template Bachelor",
    category: "Bachelor",
    description:
      "Strukturë standarde për punim Bachelor: faqe titullore, abstrakt, lista e figurave, kapituj, referenca APA dhe shtojca.",
    details: "30–50 faqe",
    fileUrl: "/files/template-bachelor.pdf",
    icon: BookOpen,
    theme: "violet",
  },
  {
    id: "master",
    title: "Template Master",
    category: "Master",
    description:
      "Strukturë e plotë për tezë Master me literaturë, metodologji, analizë, rezultate, diskutim, përfundime dhe shtojca.",
    details: "50–65 faqe",
    fileUrl: "/files/template-master.pdf",
    icon: GraduationCap,
    theme: "amber",
  },
  {
    id: "powerpoint",
    title: "Template PowerPoint Mbrojtje",
    category: "Prezantim",
    description:
      "Template profesional për prezantimin e diplomës: hyrje, qëllimet, metodologjia, rezultatet, përfundimet dhe rekomandimet.",
    details: "12–15 slide",
    fileUrl: "/files/template-powerpoint.pptx",
    icon: MonitorPlay,
    theme: "green",
  },
];

const qualityPoints = [
  {
    title: "Origjinale 100%",
    description:
      "Çdo strukturë përgatitet nga e para, me burime dhe referenca të përshtatura.",
    icon: Award,
  },
  {
    title: "Standard Akademik",
    description:
      "Ndiqet stili APA ose formati specifik që kërkon universiteti juaj.",
    icon: GraduationCap,
  },
  {
    title: "Kontroll i Cilësisë",
    description:
      "Para dorëzimit, materiali kontrollohet për strukturën, formatimin dhe qartësinë.",
    icon: ShieldCheck,
  },
];

const themeClasses = {
  violet: {
    card: "border-violet-100 bg-gradient-to-br from-violet-50/80 to-white",
    icon: "bg-violet-100 text-violet-700",
    badge: "border-violet-200 bg-violet-50 text-violet-700",
    button:
      "border-violet-300 text-violet-700 hover:bg-violet-700 hover:text-white",
  },
  amber: {
    card: "border-amber-100 bg-gradient-to-br from-amber-50/80 to-white",
    icon: "bg-amber-100 text-amber-600",
    badge: "border-amber-200 bg-amber-50 text-amber-700",
    button:
      "border-amber-300 text-amber-700 hover:bg-amber-500 hover:text-zinc-950",
  },
  green: {
    card: "border-emerald-100 bg-gradient-to-br from-emerald-50/80 to-white",
    icon: "bg-emerald-100 text-emerald-700",
    badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
    button:
      "border-emerald-300 text-emerald-700 hover:bg-emerald-600 hover:text-white",
  },
};

export default function Portfolio() {
  const whatsappMessage =
    "Përshëndetje! Dëshiroj një template të personalizuar sipas kërkesave të universitetit tim.";

  return (
    <main className="w-full max-w-full overflow-x-hidden bg-white pb-0 pt-24 lg:pt-28">
      {/* INTRO */}
      <section className="px-4 sm:px-5 lg:px-10">
        <div className="mx-auto max-w-[1440px] text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-violet-600">
            Shembuj strukturash
          </p>

          <h1 className="mt-3 font-serif text-3xl font-bold text-zinc-950 sm:text-4xl lg:text-5xl">
            Template Universitare
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-500 sm:text-base">
            Struktura profesionale, të hartuara sipas standardeve akademike
            dhe udhëzimeve më të përdorura.
          </p>
        </div>
      </section>

      {/* TEMPLATE CARDS */}
      <section className="px-4 py-8 sm:px-5 sm:py-10 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-4 md:grid-cols-3 lg:gap-5">
            {templates.map((template) => {
              const Icon = template.icon;
              const theme = themeClasses[template.theme];

              return (
              <article
  key={template.id}
  className={`flex h-full min-w-0 flex-col rounded-[22px] border p-5 shadow-[0_12px_34px_rgba(24,24,27,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(76,29,149,0.08)] sm:p-6 ${theme.card}`}
>
  <div className="flex items-start justify-between gap-3">
    <div
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${theme.icon}`}
    >
      <Icon className="h-5 w-5" />
    </div>

    <span
      className={`rounded-full border px-3 py-1 text-[10px] font-bold ${theme.badge}`}
    >
      {template.category}
    </span>
  </div>

  <h2 className="mt-5 font-serif text-xl font-bold text-zinc-950">
    {template.title}
  </h2>

  <p className="mt-2 text-sm leading-6 text-zinc-600">
    {template.description}
  </p>

  <div className="mt-auto pt-5">
    <div className="flex items-center gap-2 border-t border-zinc-200/70 pt-4 text-xs text-zinc-500">
      <Eye className="h-4 w-4" />
      {template.details}
    </div>

    <a
      href={template.fileUrl}
      download
      className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition ${theme.button}`}
    >
      <Download className="h-4 w-4" />
      Shkarko template
    </a>
  </div>
</article>
              );
            })}
          </div>
        </div>
      </section>

      {/* QUALITY — DISTINCT LIGHT SECTION */}
      <section className="border-y border-violet-100 bg-gradient-to-b from-violet-50/45 to-white px-4 py-10 sm:px-5 sm:py-12 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-600">
              Pse Ne?
            </p>

            <h2 className="mt-2 font-serif text-3xl font-bold text-zinc-950 sm:text-4xl">
              Punime Premium, të përgatitura nga ekspertë akademikë
            </h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {qualityPoints.map((point) => {
              const Icon = point.icon;

              return (
                <article
                  key={point.title}
                  className="flex items-start gap-4 rounded-[20px] border border-white bg-white/80 p-5 shadow-[0_10px_30px_rgba(76,29,149,0.05)] backdrop-blur"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-700">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-bold text-zinc-950">
                      {point.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                      {point.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
    <section className="px-4 py-8 sm:px-5 lg:px-10">
  <div className="mx-auto max-w-[1440px]">
    <div className="relative overflow-hidden rounded-[28px] border border-violet-100 bg-gradient-to-br from-white via-violet-50/60 to-purple-100/40 px-5 py-7 shadow-[0_20px_60px_rgba(76,29,149,0.10)] sm:px-8 sm:py-9 lg:px-10">
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-violet-300/20 blur-3xl" />
      <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-purple-400/20 blur-3xl" />

      <div className="relative grid items-center gap-7 lg:grid-cols-[1fr_auto]">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-700 to-purple-500 text-white shadow-lg shadow-violet-200">
            <MessageCircle className="h-6 w-6" />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-600">
              Hapi i radhës
            </p>

            <h2 className="mt-2 font-serif text-2xl font-bold leading-tight text-zinc-950 sm:text-3xl">
              Gati të fillojmë punimin tuaj?
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
              Konsultimi është falas. Na tregoni temën, afatin dhe kërkesat
              tuaja, dhe ju japim orientimin për hapat e parë.
            </p>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-zinc-500">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-violet-600" />
                Përgjigje e shpejtë
              </span>

              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-violet-600" />
                Konfidencialitet
              </span>

              <span className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-violet-600" />
                Komunikim në WhatsApp
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <Link
            to="/zgjidh-punimin"
            className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-purple-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5"
          >
            Porosit tani
            <ArrowRight className="h-4 w-4" />
          </Link>

          <a
            href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
              whatsappMessage
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white px-7 py-3.5 text-sm font-bold text-emerald-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-50"
          >
            <MessageCircle className="h-4 w-4" />
            Konsultim falas
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
    </main>
  );
}