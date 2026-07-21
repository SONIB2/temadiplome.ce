import type { ElementType } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  CheckCircle2,
  FileText,
  Globe,
  GraduationCap,
  Landmark,
  ListChecks,
  MessageCircle,
  Presentation,
  ShieldCheck,
} from "lucide-react";
import { SITE_CONFIG } from "../lib/supabase";

interface Service {
  id: string;
  title: string;
  description: string;
  includes: string[];
  price_note: string;
  icon: ElementType;
}

const services: Service[] = [
  {
    id: "1",
    title: "Konsultim Falas",
    description:
      "Diskutim fillestar për temën, kërkesat, afatin dhe mënyrën e organizimit.",
    price_note: "Falas",
    icon: MessageCircle,
    includes: [
      "Analizë fillestare e kërkesës",
      "Orientim për strukturën",
      "Sugjerime për hapat e radhës",
    ],
  },
  {
    id: "2",
    title: "Strukturim dhe Organizim",
    description:
      "Ndihmë për strukturën, ndarjen e kapitujve dhe organizimin akademik.",
    price_note: "1 000 L",
    icon: ListChecks,
    includes: [
      "Ndarje kapitujsh",
      "Objektiva dhe metodologji",
      "Plan pune i qartë",
    ],
  },
  {
    id: "3",
    title: "Referenca APA",
    description:
      "Rregullim dhe formatim i citimeve dhe referencave sipas stilit APA.",
    price_note: "2 000 L",
    icon: BookOpen,
    includes: [
      "Citimet në tekst",
      "Lista e referencave",
      "Formatim sipas APA",
    ],
  },
  {
    id: "4",
    title: "Analizë SPSS",
    description:
      "Përpunim të dhënash, tabela, grafikë dhe interpretim statistikor.",
    price_note: "5 000 L",
    icon: BarChart3,
    includes: [
      "Statistika përshkruese",
      "Korrelacion ose regresion",
      "Interpretim akademik",
    ],
  },
  {
    id: "5",
    title: "PowerPoint",
    description:
      "Prezantim profesional për mbrojtje diplome, detyrë kursi ose projekt.",
    price_note: "3 500 L",
    icon: Presentation,
    includes: [
      "Dizajn profesional",
      "Slide të qarta",
      "Përmbledhje e strukturuar",
    ],
  },
  {
    id: "6",
    title: "Diplomë Bachelor",
    description:
      "Asistencë akademike për strukturim, analizë, formatim dhe përgatitje.",
    price_note: "18 500 L",
    icon: GraduationCap,
    includes: [
      "Strukturim i plotë",
      "Orientim për kapitujt",
      "Formatim përfundimtar",
    ],
  },
  {
    id: "7",
    title: "Diplomë Master",
    description:
      "Asistencë akademike e avancuar për strukturim, analizë dhe përgatitje.",
    price_note: "25 500 L",
    icon: Award,
    includes: [
      "Strukturë akademike",
      "Orientim për literaturën",
      "Përgatitje përfundimtare",
    ],
  },
  {
    id: "8",
    title: "Detyrë Kursi",
    description:
      "Asistencë sipas lëndës, volumit, afatit dhe kërkesave specifike.",
    price_note: "Diskutohet në WhatsApp",
    icon: FileText,
    includes: [
      "Çmim sipas volumit",
      "Afat sipas kërkesës",
      "Komunikim në WhatsApp",
    ],
  },
];

const payMethods = [
  {
    icon: Landmark,
    label: "Bank Transfer",
    desc: "Transfer bankar kombëtar ose ndërkombëtar",
  },
  {
    icon: Globe,
    label: "MoneyGram",
    desc: "Transfer i shpejtë ndërkombëtar",
  },
  {
    icon: Globe,
    label: "Ria Money Transfer",
    desc: "Transfer ndërkombëtar",
  },
  {
    icon: Globe,
    label: "Western Union",
    desc: "Transfer i sigurt ndërkombëtar",
  },
];

export default function Services() {
  const whatsappMessage =
    "Përshëndetje! Dëshiroj informacion për shërbimet dhe çmimet.";

  const getPriceClasses = (price: string) => {
    if (price === "Falas") {
      return "border border-emerald-200 bg-emerald-50 text-emerald-700";
    }

    if (price === "Diskutohet në WhatsApp") {
      return "border border-violet-200 bg-violet-50 text-violet-700";
    }

    return "border border-violet-200 bg-white text-violet-700";
  };

  return (
    <main className="w-full max-w-full overflow-x-hidden bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.08),transparent_28%),#ffffff] pb-0 pt-24 lg:pt-28">
      <section className="px-4 sm:px-5 lg:px-10">
        <div className="mx-auto max-w-[1440px] text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-600">
            Shërbimet
          </p>

          <h1 className="mt-2 font-serif text-3xl font-bold text-zinc-950 sm:text-4xl lg:text-5xl">
            Shërbimet tona akademike
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-500 sm:text-base">
            Çmime të qarta, proces transparent dhe konsultim fillestar falas.
          </p>
        </div>
      </section>

      <section className="px-4 py-7 sm:px-5 sm:py-9 lg:px-10">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="grid w-full min-w-0 grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {services.map((service) => {
              const Icon = service.icon;
              const isFree = service.price_note === "Falas";
              const isWhatsApp =
                service.price_note === "Diskutohet në WhatsApp";

              return (
                <article
                  key={service.id}
                  className={` h-full min-w-0 flex-col overflow-hidden rounded-[18px] border bg-white p-3.5 shadow-[0_10px_28px_rgba(24,24,27,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(76,29,149,0.10)] sm:rounded-[22px] sm:p-5 lg:p-6 ${
                    isFree
                      ? "border-emerald-200 ring-1 ring-emerald-100"
                      : "border-zinc-100 hover:border-violet-200"
                  }`}
                >
                  <div className="flex min-w-0 items-start justify-between gap-2 sm:gap-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition sm:h-11 sm:w-11 ${
                        isFree
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-violet-50 text-violet-700 group-hover:bg-violet-100"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <span
                      className={`max-w-[112px] truncate rounded-xl px-2 py-1.5 text-[10px] font-bold sm:max-w-none sm:px-3 sm:text-xs ${getPriceClasses(
                        service.price_note,
                      )}`}
                      title={service.price_note}
                    >
                      {service.price_note}
                    </span>
                  </div>

                  <h2 className="mt-4 break-words font-serif text-[14px] font-bold leading-snug text-zinc-950 sm:mt-5 sm:text-xl">
                    {service.title}
                  </h2>

                  <p className="mt-2 break-words text-[10px] leading-4 text-zinc-500 sm:text-sm sm:leading-6">
                    {service.description}
                  </p>

                  <ul className="mt-4 hidden space-y-2 sm:block">
                    {service.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-xs leading-5 text-zinc-600"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto border-t border-zinc-100 pt-4 sm:pt-5">
                    {isWhatsApp ? (
                      <a
                        href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                          whatsappMessage,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-w-0 w-full items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-2 py-2.5 text-center text-[10px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#20bd5a] sm:gap-2 sm:px-4 sm:py-3 sm:text-sm"
                      >
                        <MessageCircle className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                        <span className="truncate">Diskuto çmimin</span>
                      </a>
                    ) : (
                      <Link
                        to={isFree ? "/kontakt" : "/zgjidh-punimin"}
                        className={`flex min-w-0 w-full items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-center text-[10px] font-bold transition hover:-translate-y-0.5 sm:gap-2 sm:px-4 sm:py-3 sm:text-sm ${
                          isFree
                            ? "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "bg-gradient-to-r from-violet-700 to-purple-600 text-white shadow-lg shadow-violet-200/50"
                        }`}
                      >
                        <span className="truncate">
                          {isFree ? "Kërko konsultim falas" : "Porosit tani"}
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 pb-0 sm:px-5 lg:px-10">
        <div className="relative mx-auto w-full max-w-[1440px] overflow-hidden rounded-[24px] bg-[#080815] px-5 py-7 text-white shadow-[0_24px_70px_rgba(7,9,21,0.18)] sm:px-8 sm:py-9 lg:px-10">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-purple-700/10 blur-3xl" />

          <div className="relative">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-300/20 bg-violet-500/15 text-violet-300">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold sm:text-3xl">
                  Mënyrat e pagesës
                </h2>

                <p className="mt-1 text-sm leading-6 text-zinc-400">
                  Pagesat kryhen përmes metodave të sigurta dhe të besueshme.
                </p>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {payMethods.map((method) => {
                const Icon = method.icon;

                return (
                  <article
                    key={method.label}
                    className="min-w-0 rounded-[18px] border border-white/10 bg-white/[0.04] p-3 text-center backdrop-blur transition hover:border-violet-400/30 hover:bg-white/[0.07] sm:p-4"
                  >
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                      <Icon className="h-4 w-4" />
                    </div>

                    <h3 className="mt-3 break-words text-[12px] font-bold text-white sm:text-sm">
                      {method.label}
                    </h3>

                    <p className="mt-1 hidden text-[10px] leading-4 text-zinc-500 sm:block sm:text-xs">
                      {method.desc}
                    </p>
                  </article>
                );
              })}
            </div>

            <p className="mx-auto mt-5 max-w-3xl text-center text-[10px] leading-5 text-zinc-500 sm:mt-6 sm:text-[11px]">
              Detajet e pagesës dërgohen pas konfirmimit të porosisë në
              WhatsApp ose email.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}