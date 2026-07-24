import SEO from "../components/SEO";
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
  <>
    <SEO
      title="Shërbimet e Asistencës Akademike"
      description="Shërbime për strukturim dhe organizim, referenca APA, analizë SPSS, PowerPoint, konsultim dhe orientim akademik."
      path="/sherbimet"
    />

    <main className="w-full max-w-full overflow-x-hidden bg-white pb-6 pt-24 lg:pt-28">
      <section className="px-4 sm:px-5 lg:px-10">
        <div className="mx-auto max-w-[1440px] text-center">
          <p className="section-label">Shërbimet</p>

          <h1 className="section-title mt-2">
            Shërbimet tona akademike
          </h1>

          <p className="section-subtitle mt-3">
            Çmime të qarta, proces transparent dhe konsultim fillestar falas.
          </p>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-5 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
            {services.map((service) => {
              const Icon = service.icon;
              const isFree = service.price_note === "Falas";
              const isWhatsApp =
                service.price_note === "Diskutohet në WhatsApp";

              return (
                <article
                  key={service.id}
                  className={`flex min-w-0 flex-col rounded-[18px] border bg-white p-3.5 shadow-sm sm:rounded-[22px] sm:p-5 ${
                    isFree
                      ? "border-emerald-200"
                      : "border-zinc-100"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        isFree
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-violet-50 text-violet-700"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <span
                      className={`max-w-[95px] rounded-xl px-2 py-1.5 text-center text-[9px] font-bold leading-tight sm:max-w-none sm:px-3 sm:text-xs ${getPriceClasses(
                        service.price_note,
                      )}`}
                    >
                      {service.price_note}
                    </span>
                  </div>

                  <h2 className="mt-4 font-serif text-sm font-bold text-zinc-950 sm:text-xl">
                    {service.title}
                  </h2>

                  <p className="mt-2 text-[10px] leading-4 text-zinc-500 sm:text-sm sm:leading-6">
                    {service.description}
                  </p>

                  <ul className="mt-4 hidden space-y-2 sm:block">
                    {service.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-xs text-zinc-600"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-4">
                    {isWhatsApp ? (
                      <a
                        href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                          whatsappMessage,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-2 py-2.5 text-[10px] font-bold text-white sm:text-sm"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Diskuto çmimin
                      </a>
                    ) : (
                      <Link
                        to={isFree ? "/kontakt" : "/zgjidh-punimin"}
                        className={`flex w-full items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-[10px] font-bold sm:text-sm ${
                          isFree
                            ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "bg-gradient-to-r from-violet-700 to-purple-600 text-white"
                        }`}
                      >
                        {isFree ? "Kërko konsultim falas" : "Porosit tani"}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
        </main>
  </>
);
}