import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Cookie,
  Database,
  FileText,
  LockKeyhole,
  Mail,
  Server,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { SITE_CONFIG } from "../lib/supabase";

const sections = [
  {
    id: "mbledhja",
    number: "01",
    title: "Të dhënat që mbledhim",
    icon: Database,
    content: (
      <>
        <p>
          Kur regjistroheni, dërgoni një kërkesë ose na kontaktoni, mund të
          mbledhim të dhënat e mëposhtme:
        </p>

        <ul>
          <li>emrin dhe mbiemrin;</li>
          <li>adresën e email-it;</li>
          <li>numrin e telefonit ose WhatsApp-it;</li>
          <li>universitetin dhe degën e studimit;</li>
          <li>temën, afatin dhe përshkrimin e kërkesës;</li>
          <li>dokumentet që ngarkoni vullnetarisht;</li>
          <li>informacionin mbi porositë dhe statusin e pagesës;</li>
          <li>
            pranimin e kushteve, politikave dhe integritetit akademik.
          </li>
        </ul>

        <p>
          Ne ju kërkojmë të mos ngarkoni të dhëna personale që nuk janë të
          nevojshme për realizimin e shërbimit.
        </p>
      </>
    ),
  },
  {
    id: "perdorimi",
    number: "02",
    title: "Si i përdorim të dhënat",
    icon: UserCheck,
    content: (
      <>
        <p>Të dhënat përdoren për qëllimet e mëposhtme:</p>

        <ul>
          <li>krijimin dhe menaxhimin e llogarisë tuaj;</li>
          <li>pranimin dhe përpunimin e kërkesave;</li>
          <li>komunikimin përmes email-it ose WhatsApp-it;</li>
          <li>ndjekjen e statusit të porosisë në dashboard;</li>
          <li>dërgimin e materialeve përfundimtare;</li>
          <li>menaxhimin dhe konfirmimin e pagesave;</li>
          <li>sigurinë dhe përmirësimin e platformës;</li>
          <li>përmbushjen e detyrimeve ligjore dhe administrative.</li>
        </ul>

        <p>
          Të dhënat nuk përdoren për qëllime të papajtueshme me arsyen për të
          cilën janë mbledhur.
        </p>
      </>
    ),
  },
  {
    id: "baza-ligjore",
    number: "03",
    title: "Baza e përpunimit",
    icon: FileText,
    content: (
      <>
        <p>
          Përpunimi i të dhënave mund të mbështetet në një ose më shumë nga
          bazat e mëposhtme:
        </p>

        <ul>
          <li>pëlqimi juaj;</li>
          <li>realizimi i një shërbimi ose marrëveshjeje;</li>
          <li>përmbushja e një detyrimi ligjor;</li>
          <li>
            interesi legjitim për sigurinë, administrimin dhe përmirësimin e
            platformës.
          </li>
        </ul>

        <p>
          Kur përpunimi mbështetet te pëlqimi, ju mund ta tërhiqni atë duke na
          kontaktuar.
        </p>
      </>
    ),
  },
  {
    id: "sherbimet",
    number: "04",
    title: "Ofruesit teknikë",
    icon: Server,
    content: (
      <>
        <p>
          Për funksionimin e platformës mund të përdorim shërbime teknike të
          jashtme, për shembull:
        </p>

        <ul>
          <li>
            Supabase për autentikimin, databazën dhe ruajtjen e dokumenteve;
          </li>
          <li>shërbime email-i për dërgimin e njoftimeve;</li>
          <li>WhatsApp për komunikimin e kërkuar nga përdoruesi;</li>
          <li>platforma hosting-u për publikimin e website-it.</li>
        </ul>

        <p>
          Këta ofrues mund të përpunojnë vetëm informacionin e nevojshëm për
          funksionin që ofrojnë dhe sipas kushteve të tyre të privatësisë.
        </p>
      </>
    ),
  },
  {
    id: "ruajtja",
    number: "05",
    title: "Ruajtja e të dhënave",
    icon: CalendarDays,
    content: (
      <>
        <p>
          Të dhënat ruhen vetëm për aq kohë sa janë të nevojshme për ofrimin e
          shërbimit, menaxhimin e llogarisë, trajtimin e kërkesave dhe
          përmbushjen e detyrimeve ligjore.
        </p>

        <p>
          Kur të dhënat nuk janë më të nevojshme, ato mund të fshihen,
          anonimizohen ose arkivohen në përputhje me kërkesat ligjore.
        </p>

        <p>
          Dokumentet e ngarkuara nga klienti duhet të përmbajnë vetëm
          informacionin që lidhet drejtpërdrejt me shërbimin e kërkuar.
        </p>
      </>
    ),
  },
  {
    id: "siguria",
    number: "06",
    title: "Siguria e informacionit",
    icon: LockKeyhole,
    content: (
      <>
        <p>
          Marrim masa të arsyeshme teknike dhe organizative për të mbrojtur të
          dhënat nga:
        </p>

        <ul>
          <li>aksesi i paautorizuar;</li>
          <li>humbja ose dëmtimi;</li>
          <li>ndryshimi i paautorizuar;</li>
          <li>publikimi ose shpërndarja e paautorizuar.</li>
        </ul>

        <p>
          Megjithatë, asnjë sistem elektronik nuk mund të garantojë siguri
          absolute. Përdoruesi është gjithashtu përgjegjës për ruajtjen e
          fjalëkalimit dhe sigurinë e pajisjes së tij.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    number: "07",
    title: "Cookies dhe local storage",
    icon: Cookie,
    content: (
      <>
        <p>
          Platforma mund të përdorë cookies ose ruajtjen lokale të browser-it
          për funksione të nevojshme, si:
        </p>

        <ul>
          <li>ruajtja e statusit të hyrjes në llogari;</li>
          <li>ruajtja e informacionit bazë të sesionit;</li>
          <li>regjistrimi i pranimit të marrëveshjes;</li>
          <li>funksionimi i sigurt i platformës.</li>
        </ul>

        <p>
          Mund t’i fshini këto të dhëna nga cilësimet e browser-it, por disa
          funksione të website-it mund të mos punojnë siç duhet.
        </p>
      </>
    ),
  },
  {
    id: "te-drejtat",
    number: "08",
    title: "Të drejtat tuaja",
    icon: ShieldCheck,
    content: (
      <>
        <p>
          Në varësi të legjislacionit të zbatueshëm, ju mund të kërkoni:
        </p>

        <ul>
          <li>informacion mbi të dhënat që përpunojmë;</li>
          <li>akses në të dhënat tuaja;</li>
          <li>korrigjimin e të dhënave të pasakta;</li>
          <li>fshirjen e të dhënave, kur lejohet ligjërisht;</li>
          <li>kufizimin ose kundërshtimin e përpunimit;</li>
          <li>tërheqjen e pëlqimit;</li>
          <li>marrjen e një kopjeje të të dhënave tuaja.</li>
        </ul>

        <p>
          Për ushtrimin e këtyre të drejtave, mund të na kontaktoni në adresën
          e email-it të shënuar më poshtë.
        </p>
      </>
    ),
  },
  {
    id: "te-miturit",
    number: "09",
    title: "Të dhënat e të miturve",
    icon: UserCheck,
    content: (
      <>
        <p>
          Platforma nuk synon të mbledhë me vetëdije të dhëna personale nga
          persona që nuk kanë kapacitetin ligjor për të pranuar kushtet e
          shërbimit.
        </p>

        <p>
          Kur kërkohet nga ligji, përdorimi i platformës nga një i mitur duhet
          të bëhet me dijeninë ose autorizimin e prindit apo kujdestarit
          ligjor.
        </p>
      </>
    ),
  },
  {
    id: "ndryshimet",
    number: "10",
    title: "Ndryshimet e kësaj politike",
    icon: FileText,
    content: (
      <>
        <p>
          Kjo politikë mund të përditësohet për shkak të ndryshimeve ligjore,
          teknike ose organizative.
        </p>

        <p>
          Versioni më i fundit do të publikohet gjithmonë në këtë faqe, së
          bashku me datën e përditësimit.
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <main className="w-full max-w-full overflow-x-hidden bg-zinc-50 pb-10 pt-24 lg:pt-28">
      <div className="px-4 sm:px-5 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          {/* HERO */}
          <section className="relative overflow-hidden rounded-[26px] bg-[#0b0718] px-5 py-8 text-white shadow-[0_24px_70px_rgba(7,9,21,0.16)] sm:px-8 sm:py-10 lg:px-12">
            <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-violet-600/30 blur-3xl" />
            <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-purple-700/20 blur-3xl" />

            <div className="relative">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-xs font-semibold text-violet-200 transition hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Kthehu në faqen kryesore
              </Link>

              <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-700 to-purple-500 text-white shadow-lg shadow-violet-950/30">
                  <ShieldCheck className="h-7 w-7" />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-300">
                    Mbrojtja e të dhënave
                  </p>

                  <h1 className="mt-2 font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">
                    Politika e Privatësisë
                  </h1>

                  <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-300 sm:text-base">
                    Kjo politikë shpjegon se çfarë të dhënash mbledhim, si i
                    përdorim, si i mbrojmë dhe çfarë të drejtash keni.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-300">
                  <CalendarDays className="h-4 w-4 text-violet-300" />
                  Përditësuar më 22 korrik 2026
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-300">
                  <ShieldCheck className="h-4 w-4 text-violet-300" />
                  temadiplome.ce
                </span>
              </div>
            </div>
          </section>

          {/* INTRO */}
          <section className="mt-6 rounded-[22px] border border-violet-100 bg-white p-5 shadow-[0_14px_44px_rgba(24,24,27,0.05)] sm:p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-zinc-950 sm:text-2xl">
                  Privatësia juaj është e rëndësishme
                </h2>

                <p className="mt-2 text-sm leading-7 text-zinc-600">
                  temadiplome.ce përpunon vetëm informacionin e nevojshëm për
                  krijimin e llogarisë, komunikimin, menaxhimin e porosive dhe
                  ofrimin e shërbimeve të kërkuara.
                </p>
              </div>
            </div>
          </section>

          <div className="mt-6 grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
            {/* TABLE OF CONTENTS */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 rounded-[22px] border border-zinc-100 bg-white p-4 shadow-[0_14px_44px_rgba(24,24,27,0.05)]">
                <p className="px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-600">
                  Përmbajtja
                </p>

                <nav className="mt-4 space-y-1">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-zinc-600 transition hover:bg-violet-50 hover:text-violet-700"
                    >
                      <span className="font-serif text-[10px] font-bold text-violet-500">
                        {section.number}
                      </span>

                      <span>{section.title}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* POLICY CONTENT */}
            <section className="space-y-4">
              {sections.map((section) => {
                const Icon = section.icon;

                return (
                  <article
                    id={section.id}
                    key={section.id}
                    className="scroll-mt-28 rounded-[22px] border border-zinc-100 bg-white p-5 shadow-[0_12px_36px_rgba(24,24,27,0.045)] sm:p-7"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-serif text-sm font-bold text-violet-500">
                            {section.number}
                          </span>

                          <h2 className="font-serif text-xl font-bold text-zinc-950 sm:text-2xl">
                            {section.title}
                          </h2>
                        </div>

                        <div className="privacy-content mt-4 space-y-4 text-sm leading-7 text-zinc-600">
                          {section.content}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}