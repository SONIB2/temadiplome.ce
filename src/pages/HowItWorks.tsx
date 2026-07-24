import SEO from "../components/SEO";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  GraduationCap,
  MessageCircle,
  PenLine,
  ShieldCheck,
} from "lucide-react";
import { SITE_CONFIG } from "../lib/supabase";

const steps = [
  {
    number: "01",
    title: "Projekt Proposal",
    description:
      "Pas konfirmimit të temës dhe nënshkrimit të marrëveshjes, dorëzojmë Projekt Propozalin. Këtu kryhet kësti i parë i pagesës.",
    icon: PenLine,
  },
 {
  number: "02",
  title: "Gjysma e diplomës",
  description:
    "Ju sjellim gjysmën e diplomës të punuar plotësisht. Gjatë kësaj kohe jeni në kontakt me ne për çdo ndryshim të nevojshëm.",
  icon: MessageCircle,
},
  {
    number: "03",
    title: "Diploma e përfunduar",
    description:
      "Ju njoftojmë kur puna ka përfunduar. Kryhet kësti i fundit dhe ju sjellim diplomën e përfunduar plotësisht.",
    icon: GraduationCap,
  },
];

const paymentMethods = [
  {
    name: "BKT",
    logo: "/images/payments/bkt.png",
    description: "Transfer bankar kombëtar ose ndërkombëtar",
  },
  {
    name: "MoneyGram",
    logo: "/images/payments/moneygram.png",
    description: "Transfer i shpejtë ndërkombëtar",
  },
  {
    name: "Ria Money Transfer",
    logo: "/images/payments/ria.png",
    description: "Transfer ndërkombëtar",
  },
  {
    name: "Western Union",
    logo: "/images/payments/western-union.png",
    description: "Transfer i sigurt ndërkombëtar",
  },
];

export default function HowItWorks() {
  const whatsappMessage =
    "Përshëndetje! Dëshiroj një konsultim falas dhe më shumë informacion për procesin.";

  return (
  <>
    <SEO
      title="Si Funksionon"
      description="Shiko hapat e procesit të asistencës akademike, nga konsultimi fillestar deri te strukturimi, analiza dhe dorëzimi i materialeve."
      path="/si-funksionon"
    />

    <main className="w-full max-w-full overflow-x-hidden bg-white pb-0 pt-20 sm:pt-24">
      {/* PROCESS */}
      <section className="px-4 sm:px-5 lg:px-10">
        <div className="relative mx-auto w-full max-w-[1440px] overflow-hidden rounded-[24px] bg-gradient-to-br from-violet-700 via-purple-700 to-violet-950 px-5 py-10 text-white shadow-[0_24px_70px_rgba(76,29,149,0.20)] sm:px-8 sm:py-12 lg:px-12 lg:py-14">
          {/* DECORATION */}
          <div className="pointer-events-none absolute inset-0 opacity-25">
            <div className="absolute -left-20 top-8 h-72 w-72 rounded-full border border-white/20" />
            <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full border border-white/20" />
            <div className="absolute left-1/3 top-1/2 h-px w-96 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>

          <div className="relative">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-violet-200">
                Procesi
              </p>

              <h1 className="mt-3 font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Si funksionon
              </h1>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
                Punën e sjellim në 3 faza, me komunikim të vazhdueshëm gjatë
                gjithë procesit.
              </p>
            </div>

            {/* DESKTOP */}
            <div className="mt-10 hidden grid-cols-3 gap-7 md:grid">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <article
                    key={step.number}
                    className="relative min-w-0 text-center"
                  >
                    <div className="relative mx-auto flex h-[92px] w-[92px] items-center justify-center rounded-full border border-white/20 bg-white text-violet-700 shadow-xl shadow-violet-950/20">
                      <Icon className="h-10 w-10" />

                      <span className="absolute -left-12 text-6xl font-bold text-white/15">
                        {index + 1}
                      </span>
                    </div>

                    {index < steps.length - 1 && (
                      <div className="absolute left-[66%] top-11 flex w-[74%] items-center">
                        <div className="h-px flex-1 bg-white/30" />
                        <ArrowRight className="h-5 w-5 text-white/50" />
                      </div>
                    )}

                    <h2 className="mt-5 font-serif text-xl font-bold">
                      {step.title}
                    </h2>

                    <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/75">
                      {step.description}
                    </p>
                  </article>
                );
              })}
            </div>

            {/* MOBILE */}
            <div className="mt-8 space-y-1 md:hidden">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <article
                    key={step.number}
                    className="relative grid min-w-0 grid-cols-[58px_1fr] gap-4"
                  >
                    <div className="relative flex flex-col items-center">
                      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white text-violet-700 shadow-lg">
                        <Icon className="h-6 w-6" />
                      </div>

                      {index < steps.length - 1 && (
                        <div className="h-full min-h-[80px] border-l border-dashed border-white/40" />
                      )}
                    </div>

                    <div className="min-w-0 pb-7">
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-4xl font-bold text-white/20">
                          {index + 1}
                        </span>

                        <h2 className="font-serif text-lg font-bold text-white">
                          {step.title}
                        </h2>
                      </div>

                      <p className="mt-2 text-xs leading-5 text-white/75">
                        {step.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS NOTE */}
      <section className="px-4 pt-5 sm:px-5 lg:px-10">
        <div className="mx-auto flex w-full max-w-[1100px] items-start gap-3 rounded-[18px] border border-violet-100 bg-gradient-to-r from-violet-50/80 to-white px-4 py-4 shadow-[0_10px_30px_rgba(76,29,149,0.05)] sm:px-6 sm:py-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-violet-700 shadow-sm">
            <ShieldCheck className="h-5 w-5" />
          </div>

          <p className="text-xs leading-5 text-zinc-600 sm:text-sm sm:leading-6">
            <strong className="text-zinc-900">
              Gjatë gjithë procesit dhe pas përfundimit
            </strong>{" "}
            — jeni në kontakt të vazhdueshëm me ekipin tonë për çdo ndryshim
            të nevojshëm. Ndryshimet kryhen deri në 3 herë, brenda 1 muaji nga
            dorëzimi.
          </p>
        </div>
      </section>

      {/* PAYMENTS */}
      <section className="px-4 py-8 sm:px-5 sm:py-10 lg:px-10">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-600">
              Mënyrat e pagesës
            </p>

            <h2 className="mt-2 font-serif text-3xl font-bold text-zinc-950 sm:text-4xl">
              Metodat e pagesës
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Detajet dërgohen pas konfirmimit të porosisë.
            </p>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {paymentMethods.map((method) => (
              <article
                key={method.name}
                className="flex min-w-0 flex-col items-center justify-center rounded-[20px] border border-zinc-100 bg-white px-3 py-5 text-center shadow-[0_12px_34px_rgba(24,24,27,0.06)] transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_18px_44px_rgba(76,29,149,0.09)] sm:px-5 sm:py-7"
              >
                <div className="flex h-12 w-full items-center justify-center sm:h-14">
                  <img
                    src={method.logo}
                    alt={method.name}
                    className="max-h-9 max-w-[105px] object-contain sm:max-h-11 sm:max-w-[135px]"
                  />
                </div>

                <h3 className="mt-3 text-[12px] font-bold leading-4 text-zinc-950 sm:text-sm">
                  {method.name}
                </h3>

                <p className="mt-2 hidden max-w-[170px] text-xs leading-5 text-zinc-500 sm:block">
                  {method.description}
                </p>
              </article>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/zgjidh-punimin"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-purple-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-200/60 transition hover:-translate-y-0.5"
            >
              Porosit tani
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                whatsappMessage,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#25D366] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-100 transition hover:-translate-y-0.5 hover:bg-[#20bd5a]"
            >
              <MessageCircle className="h-4 w-4" />
              Konsultim falas në WhatsApp
            </a>
          </div>
        </div>
          </section>
    </main>
  </>
);
}