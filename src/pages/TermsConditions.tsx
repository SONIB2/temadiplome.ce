import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  FileCheck,
  GraduationCap,
  Mail,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { SITE_CONFIG } from "../lib/supabase";

const sections = [
  {
    title: "1. Pranimi i kushteve",
    text: "Duke përdorur platformën temadiplome.ce, ju pranoni këto Kushte Përdorimi. Nëse nuk pajtoheni me to, ju lutemi mos përdorni shërbimet tona.",
  },
  {
    title: "2. Shërbimet",
    text: "Platforma ofron asistencë akademike si strukturim punimesh, formatim, analiza statistikore, referenca APA, prezantime PowerPoint dhe konsultim akademik.",
  },
  {
    title: "3. Përgjegjësia e klientit",
    text: "Klienti është përgjegjës për saktësinë e informacionit që dërgon dhe për sigurimin që tema ose materiali i kërkuar respekton rregullat e institucionit të tij.",
  },
  {
    title: "4. Pagesat",
    text: "Pagesat kryhen sipas marrëveshjes së arritur me klientin. Në shumicën e rasteve përdoret sistemi me dy këste. Puna fillon vetëm pasi konfirmohet pagesa e parë.",
  },
  {
    title: "5. Afatet",
    text: "Afatet e dorëzimit përcaktohen gjatë porosisë. Në rast se klienti ndryshon kërkesën gjatë procesit, afati mund të rishikohet.",
  },
  {
    title: "6. Ndryshimet",
    text: "Klienti ka të drejtë të kërkojë korrigjime sipas marrëveshjes së bashkëpunimit. Këto ndryshime nuk përfshijnë ndryshimin e plotë të temës pas fillimit të punës.",
  },
  {
    title: "7. Konfidencialiteti",
    text: "Të gjitha të dhënat, dokumentet dhe komunikimet trajtohen me konfidencialitet të plotë dhe nuk shpërndahen tek palë të treta pa bazë ligjore.",
  },
  {
    title: "8. Kufizimi i përgjegjësisë",
    text: "Platforma ofron asistencë akademike dhe materiale mbështetëse. Përgjegjësia për dorëzimin dhe përdorimin e materialeve sipas rregullave të universitetit mbetet tek studenti.",
  },
  {
    title: "9. Ndryshimi i kushteve",
    text: "Këto kushte mund të përditësohen në çdo kohë. Versioni më i fundit publikohet gjithmonë në këtë faqe.",
  },
];

export default function TermsConditions() {
  return (
    <main className="bg-zinc-50 pt-24 pb-16">
      <div className="container-academic max-w-6xl">

        {/* HERO */}

        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-950 via-[#1b1038] to-[#5b21b6] text-white p-10 shadow-xl">

          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-violet-200 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Kthehu në Home
          </Link>

          <div className="mt-8 flex items-center gap-5">

            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur">

              <Scale className="w-8 h-8 text-amber-300" />

            </div>

            <div>

              <p className="uppercase tracking-[0.25em] text-xs text-violet-300 font-bold">
                Kushtet Ligjore
              </p>

              <h1 className="font-serif text-5xl font-bold mt-2">
                Terms & Conditions
              </h1>

              <p className="text-zinc-300 mt-4 max-w-3xl">
                Këto kushte rregullojnë përdorimin e platformës
                <strong> temadiplome.ce</strong>, procesin e porosive,
                pagesave dhe marrëdhënien ndërmjet platformës dhe klientit.
              </p>

            </div>

          </div>

        </section>

        {/* INFO */}

        <section className="grid lg:grid-cols-3 gap-5 mt-8">

          <div className="bg-white rounded-2xl p-6 shadow-sm border">

            <ShieldCheck className="w-10 h-10 text-violet-600 mb-4"/>

            <h3 className="font-bold text-lg">
              Konfidencialitet
            </h3>

            <p className="text-sm text-zinc-500 mt-2">
              Informacioni juaj ruhet me siguri dhe përdoret vetëm për
              realizimin e shërbimit.
            </p>

          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border">

            <GraduationCap className="w-10 h-10 text-violet-600 mb-4"/>

            <h3 className="font-bold text-lg">
              Asistencë Akademike
            </h3>

            <p className="text-sm text-zinc-500 mt-2">
              Platforma ofron asistencë akademike profesionale dhe jo
              zëvendësim të procesit arsimor.
            </p>

          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border">

            <FileCheck className="w-10 h-10 text-violet-600 mb-4"/>

            <h3 className="font-bold text-lg">
              Marrëveshje e qartë
            </h3>

            <p className="text-sm text-zinc-500 mt-2">
              Çdo porosi realizohet sipas marrëveshjes së bashkëpunimit të
              pranuar nga klienti.
            </p>

          </div>

        </section>

        {/* TERMS */}

        <section className="space-y-5 mt-10">

          {sections.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl border p-7 shadow-sm hover:shadow-md transition"
            >

              <div className="flex items-start gap-4">

                <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">

                  <CheckCircle2 className="w-6 h-6 text-violet-600"/>

                </div>

                <div>

                  <h2 className="font-serif text-2xl font-bold mb-3">
                    {item.title}
                  </h2>

                  <p className="text-zinc-600 leading-8">
                    {item.text}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </section>

      </div>
    </main>
  );
}