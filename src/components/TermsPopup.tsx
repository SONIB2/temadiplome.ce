import { useEffect, useState } from "react";
import type { ElementType } from "react";
import {
  Check,
  CheckCircle2,
  ChevronDown,
  FileCheck2,
  FileText,
  HandCoins,
  RefreshCw,
  Scale,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";

interface Props {
  inline?: boolean;
  onAccept?: () => void;
  clientName?: string;
}

interface AgreementSection {
  id: string;
  title: string;
  description: string;
  icon: ElementType;
}

const STORAGE_KEY = "tdc_terms_agreed";

const agreementSections: AgreementSection[] = [
  {
    id: "object",
    title: "Objekti i marrëveshjes",
    icon: FileText,
    description:
      "Kjo marrëveshje përcakton kushtet e asistencës akademike, strukturimit, analizës, formatimit dhe shërbimeve të tjera të dakorduara me Klientin. Detajet e shërbimit, tema, afati dhe materialet përcaktohen gjatë komunikimit dhe konfirmimit të porosisë.",
  },
  {
    id: "changes",
    title: "Ndryshimet dhe afatet",
    icon: RefreshCw,
    description:
      "Klienti mund të kërkojë ndryshime brenda një muaji nga dorëzimi. Përfshihen deri në 3–4 raunde ndryshimesh që lidhen me kërkesën fillestare. Ndryshimet e plota të temës ose kërkesave pas nisjes së punës mund të kërkojnë rivlerësim të afatit dhe çmimit.",
  },
  {
    id: "payment",
    title: "Pagesa dhe këstet",
    icon: HandCoins,
    description:
      "Pagesa kryhet zakonisht në dy këste, sipas dakordësimit me Klientin. Metodat e pagesës përfshijnë Bank Transfer, MoneyGram, Ria dhe Western Union. Detajet e pagesës konfirmohen përpara fillimit të shërbimit.",
  },
  {
    id: "topic",
    title: "Konfirmimi i temës",
    icon: FileCheck2,
    description:
      "Titulli dhe drejtimi i temës duhet të jenë të miratuara nga pedagogu përpara fillimit të punës. Ndryshimi i plotë i temës pas dorëzimit të pjesës së parë nuk konsiderohet korrigjim i zakonshëm dhe mund të trajtohet si kërkesë e re.",
  },
  {
    id: "privacy",
    title: "Konfidencialiteti",
    icon: ShieldCheck,
    description:
      "Të dhënat personale, dokumentet dhe informacionet e Klientit trajtohen në mënyrë konfidenciale dhe nuk u shpërndahen palëve të treta, përveç rasteve kur kjo kërkohet me ligj.",
  },
  {
    id: "integrity",
    title: "Integriteti akademik",
    icon: Scale,
    description:
      "Shërbimi ofron orientim dhe asistencë akademike. Klienti mbetet përgjegjës për përdorimin e materialit, respektimin e rregullores së institucionit dhe paraqitjen e punës në përputhje me standardet e integritetit akademik.",
  },
];

function AgreementSectionItem({
  section,
  isOpen,
  onToggle,
}: {
  section: AgreementSection;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = section.icon;

  return (
    <article
      className={`overflow-hidden rounded-[16px] border transition-all duration-200 ${
        isOpen
          ? "border-violet-200 bg-violet-50/50 shadow-[0_8px_24px_rgba(109,40,217,0.06)]"
          : "border-zinc-100 bg-white hover:border-violet-100"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
      >
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
            isOpen
              ? "bg-violet-700 text-white"
              : "bg-violet-50 text-violet-700"
          }`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <span className="min-w-0 flex-1 text-sm font-bold text-zinc-900">
          {section.title}
        </span>

        <ChevronDown
          className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-violet-700" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="animate-fade-in px-4 pb-4 pl-[64px]">
          <p className="text-xs leading-6 text-zinc-600 sm:text-sm">
            {section.description}
          </p>
        </div>
      )}
    </article>
  );
}

function TermsContent({
  clientName,
  openSection,
  setOpenSection,
}: {
  clientName?: string;
  openSection: string | null;
  setOpenSection: (section: string | null) => void;
}) {
  const resolvedClientName =
    clientName?.trim() || "Plotësohet automatikisht nga profili juaj";

  return (
    <div>
      {/* PARTIES */}
      <section className="rounded-[20px] border border-violet-100 bg-gradient-to-br from-violet-50/80 via-white to-purple-50/40 p-4 sm:p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-600">
          Palët e marrëveshjes
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="flex min-w-0 items-center gap-3 rounded-[15px] border border-white bg-white/90 p-3 shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
              <FileCheck2 className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] text-zinc-400">Përfaqësuesi</p>
              <p className="truncate text-sm font-bold text-zinc-950">
                temadiplome.ce
              </p>
            </div>
          </div>

          <div className="flex min-w-0 items-center gap-3 rounded-[15px] border border-white bg-white/90 p-3 shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <UserRound className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] text-zinc-400">Klienti</p>
              <p className="break-words text-sm font-bold text-zinc-950">
                {resolvedClientName}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AGREEMENT SECTIONS */}
      <section className="mt-4 space-y-2.5">
        {agreementSections.map((section) => (
          <AgreementSectionItem
            key={section.id}
            section={section}
            isOpen={openSection === section.id}
            onToggle={() =>
              setOpenSection(
                openSection === section.id ? null : section.id
              )
            }
          />
        ))}
      </section>

      {/* VALIDITY */}
      <section className="mt-4 rounded-[16px] border border-emerald-100 bg-emerald-50/70 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <ShieldCheck className="h-4 w-4" />
          </div>

          <div>
            <p className="text-sm font-bold text-emerald-900">
              Konfidencialitet dhe siguri
            </p>

            <p className="mt-1 text-xs leading-5 text-emerald-800">
              Informacionet dhe dokumentet e dërguara ruhen me
              konfidencialitet dhe përdoren vetëm për realizimin e shërbimit
              të konfirmuar.
            </p>
          </div>
        </div>
      </section>

      <p className="mt-4 text-center text-[10px] leading-4 text-zinc-400">
        Marrëveshja bëhet aktive pas pranimit elektronik nga Klienti dhe
        konfirmimit të shërbimit nga temadiplome.ce.
      </p>
    </div>
  );
}

export default function TermsPopup({
  inline = false,
  onAccept,
  clientName,
}: Props) {
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  const [shake, setShake] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>("object");

  useEffect(() => {
    if (inline) return;

    if (!localStorage.getItem(STORAGE_KEY)) {
      const timer = window.setTimeout(() => {
        setVisible(true);
      }, 700);

      return () => window.clearTimeout(timer);
    }
  }, [inline]);

  const handleCheck = () => {
    setChecked((previous) => {
      const nextValue = !previous;

      if (nextValue) {
        setShake(false);
        onAccept?.();
      }

      return nextValue;
    });
  };

  const agree = () => {
    if (!checked) {
      setShake(true);

      window.setTimeout(() => {
        setShake(false);
      }, 500);

      return;
    }

    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
    onAccept?.();
  };

  const acceptanceControl = (
    <div>
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={handleCheck}
        className={`flex w-full items-start gap-3 rounded-[16px] border p-4 text-left transition-all ${
          checked
            ? "border-violet-200 bg-violet-50"
            : shake
              ? "border-red-300 bg-red-50"
              : "border-zinc-200 bg-white hover:border-violet-200"
        }`}
      >
        <span
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
            checked
              ? "border-violet-700 bg-violet-700"
              : shake
                ? "border-red-400 bg-white"
                : "border-zinc-300 bg-white"
          }`}
        >
          {checked && <Check className="h-3.5 w-3.5 text-white" />}
        </span>

        <span
          className={`text-xs leading-5 sm:text-sm sm:leading-6 ${
            shake && !checked ? "text-red-700" : "text-zinc-700"
          }`}
        >
          Kam lexuar, kuptuar dhe pranoj{" "}
          <strong className="text-zinc-950">
            Marrëveshjen e Bashkëpunimit
          </strong>{" "}
          me temadiplome.ce.
        </span>
      </button>

      {shake && !checked && (
        <p className="mt-2 text-xs font-medium text-red-600">
          Duhet të pranosh marrëveshjen për të vazhduar.
        </p>
      )}
    </div>
  );

  // VERSIONI BRENDA FORMULARIT
  if (inline) {
    return (
      <section className="overflow-hidden rounded-[22px] border border-violet-100 bg-white shadow-[0_12px_36px_rgba(76,29,149,0.05)]">
        <header className="flex items-center gap-3 border-b border-violet-100 bg-gradient-to-r from-violet-50/80 to-white px-4 py-4 sm:px-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-700 to-purple-500 text-white shadow-lg shadow-violet-200">
            <FileText className="h-5 w-5" />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-600">
              Konfirmimi
            </p>

            <h2 className="font-serif text-lg font-bold text-zinc-950">
              Marrëveshja e Bashkëpunimit
            </h2>
          </div>
        </header>

        <div className="p-4 sm:p-5">
          <TermsContent
            clientName={clientName}
            openSection={openSection}
            setOpenSection={setOpenSection}
          />

          <div className="mt-5">{acceptanceControl}</div>
        </div>
      </section>
    );
  }

  if (!visible) return null;

  // POPUP
  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center bg-zinc-950/65 backdrop-blur-sm sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Mbyll marrëveshjen"
        onClick={() => setVisible(false)}
        className="absolute inset-0"
      />

      <section className="animate-slide-up relative flex max-h-[94svh] w-full flex-col overflow-hidden rounded-t-[28px] bg-white shadow-2xl sm:max-w-[680px] sm:rounded-[26px]">
        {/* HEADER */}
        <header className="shrink-0 border-b border-violet-100 bg-gradient-to-r from-violet-50 via-white to-purple-50 px-5 py-4 sm:px-6 sm:py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-700 to-purple-500 text-white shadow-lg shadow-violet-200">
                <FileCheck2 className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-violet-600 sm:text-[10px]">
                  Konfirmim elektronik
                </p>

                <h2 className="truncate font-serif text-lg font-bold text-zinc-950 sm:text-xl">
                  Marrëveshja e Bashkëpunimit
                </h2>

                <p className="mt-0.5 text-[10px] text-zinc-500 sm:text-xs">
                  Lexoje përpara se të vazhdosh.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setVisible(false)}
              aria-label="Mbyll"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5">
          <TermsContent
            clientName={clientName}
            openSection={openSection}
            setOpenSection={setOpenSection}
          />
        </div>

        {/* STICKY FOOTER */}
        <footer className="shrink-0 border-t border-zinc-100 bg-white px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-4 shadow-[0_-14px_36px_rgba(24,24,27,0.07)] sm:px-6 sm:pb-5">
          {acceptanceControl}

          <button
            type="button"
            onClick={agree}
            disabled={!checked}
            className={`mt-3 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition-all ${
              checked
                ? "bg-gradient-to-r from-violet-700 to-purple-600 text-white shadow-lg shadow-violet-200/70 hover:-translate-y-0.5"
                : "cursor-not-allowed bg-zinc-100 text-zinc-400"
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            Pranoj dhe vazhdoj
          </button>

          <button
            type="button"
            onClick={() => setVisible(false)}
            className="mt-2 w-full py-1.5 text-xs font-medium text-zinc-400 transition hover:text-zinc-700"
          >
            Mbyll pa pranuar
          </button>
        </footer>
      </section>
    </div>
  );
}