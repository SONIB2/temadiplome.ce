import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BookOpenCheck,
  CheckCircle2,
  GraduationCap,
  Lightbulb,
  Mail,
  Scale,
  ShieldCheck,
  UserCheck,
  XCircle,
} from "lucide-react";
import { SITE_CONFIG } from "../lib/supabase";

const principles = [
  {
    title: "Qëllim edukativ dhe orientues",
    description:
      "Materialet dhe shërbimet tona synojnë të ndihmojnë studentin të kuptojë më mirë strukturën, metodologjinë, analizën dhe kërkesat akademike.",
    icon: Lightbulb,
  },
  {
    title: "Përgjegjësia e studentit",
    description:
      "Studenti mbetet përgjegjës për leximin, kuptimin, verifikimin dhe përdorimin e materialit në përputhje me rregullat e institucionit të tij.",
    icon: UserCheck,
  },
  {
    title: "Respektimi i burimeve",
    description:
      "Burimet duhet të citohen dhe referencohen saktë. Platforma mbështet përdorimin korrekt të stileve akademike, përfshirë APA.",
    icon: BookOpenCheck,
  },
  {
    title: "Pa plagjiaturë dhe mashtrim",
    description:
      "Platforma nuk mbështet paraqitjen e punës së një personi tjetër si punë personale dhe nuk ofron ndihmë për mashtrim akademik.",
    icon: ShieldCheck,
  },
];

const allowed = [
  "Orientim për zgjedhjen dhe fokusimin e temës.",
  "Ndihmë për strukturën dhe organizimin e kapitujve.",
  "Shpjegim të metodologjisë dhe të koncepteve akademike.",
  "Formatim të citimeve dhe referencave.",
  "Asistencë për analizën statistikore dhe interpretimin.",
  "Përgatitje të prezantimeve dhe materialeve ndihmëse.",
  "Rishikim të gjuhës, qartësisë dhe formatimit.",
];

const notAllowed = [
  "Kopjim ose riprodhim të materialeve pa citim.",
  "Paraqitje të një materiali të marrë si punë tërësisht personale.",
  "Falsifikim të të dhënave, rezultateve ose burimeve.",
  "Ndihmë për të anashkaluar rregullat e universitetit.",
  "Përdorim të materialit në kundërshtim me udhëzimet e pedagogut.",
];

export default function AcademicIntegrity() {
  return (
    <main className="w-full max-w-full overflow-x-hidden bg-zinc-50 pb-12 pt-24 lg:pt-28">
      <div className="px-4 sm:px-5 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          {/* HERO */}
          <section className="relative overflow-hidden rounded-[26px] bg-[#0b0718] px-5 py-8 text-white shadow-[0_24px_70px_rgba(7,9,21,0.16)] sm:px-8 sm:py-10 lg:px-12">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-600/30 blur-3xl" />
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
                  <Scale className="h-7 w-7" />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-300">
                    Standardet akademike
                  </p>

                  <h1 className="mt-2 font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">
                    Integriteti Akademik
                  </h1>

                  <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-300 sm:text-base">
                    Shërbimet e temadiplome.ce kanë qëllim edukativ, orientues
                    dhe mbështetës. Platforma nuk mbështet plagjiaturën,
                    falsifikimin ose mashtrimin akademik.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* INTRO */}
          <section className="mt-6 rounded-[22px] border border-violet-100 bg-white p-5 shadow-[0_14px_44px_rgba(24,24,27,0.05)] sm:p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                <GraduationCap className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-zinc-950 sm:text-2xl">
                  Si e kuptojmë asistencën akademike
                </h2>

                <p className="mt-2 text-sm leading-7 text-zinc-600">
                  Qëllimi ynë është t&apos;i ndihmojmë studentët të kuptojnë,
                  organizojnë dhe zhvillojnë më mirë punën e tyre akademike.
                  Materialet e ofruara duhet të përdoren si mbështetje për
                  të mësuar, jo si mënyrë për të shmangur përgjegjësinë
                  personale.
                </p>
              </div>
            </div>
          </section>

          {/* PRINCIPLES */}
          <section className="mt-6 grid gap-4 sm:grid-cols-2">
            {principles.map((principle) => {
              const Icon = principle.icon;

              return (
                <article
                  key={principle.title}
                  className="rounded-[22px] border border-zinc-100 bg-white p-5 shadow-[0_12px_36px_rgba(24,24,27,0.05)] sm:p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h2 className="mt-4 font-serif text-xl font-bold text-zinc-950">
                    {principle.title}
                  </h2>

                  <p className="mt-2 text-sm leading-7 text-zinc-600">
                    {principle.description}
                  </p>
                </article>
              );
            })}
          </section>

          {/* ALLOWED / NOT ALLOWED */}
          <section className="mt-6 grid gap-5 lg:grid-cols-2">
            <article className="rounded-[24px] border border-emerald-100 bg-emerald-50/50 p-5 shadow-[0_12px_36px_rgba(16,185,129,0.05)] sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700">
                    E lejuar
                  </p>

                  <h2 className="font-serif text-2xl font-bold text-zinc-950">
                    Si mund të ndihmojmë
                  </h2>
                </div>
              </div>

              <ul className="mt-5 space-y-3">
                {allowed.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-6 text-zinc-700"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-[24px] border border-red-100 bg-red-50/45 p-5 shadow-[0_12px_36px_rgba(239,68,68,0.05)] sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-700">
                  <XCircle className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-red-700">
                    Nuk lejohet
                  </p>

                  <h2 className="font-serif text-2xl font-bold text-zinc-950">
                    Çfarë nuk mbështesim
                  </h2>
                </div>
              </div>

              <ul className="mt-5 space-y-3">
                {notAllowed.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-6 text-zinc-700"
                  >
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </section>

          {/* RESPONSIBILITY */}
          <section className="mt-6 overflow-hidden rounded-[24px] bg-[#0b0718] px-5 py-7 text-white shadow-[0_20px_60px_rgba(7,9,21,0.16)] sm:px-8">
            <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-start">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-violet-300">
                <UserCheck className="h-6 w-6" />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300">
                  Përgjegjësia
                </p>

                <h2 className="mt-2 font-serif text-2xl font-bold sm:text-3xl">
                  Studenti mbetet përgjegjës për përdorimin e materialit
                </h2>

                <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-300">
                  Çdo student duhet të sigurohet që përdorimi i materialeve,
                  analizave, strukturave dhe sugjerimeve respekton rregulloren
                  e universitetit, kërkesat e pedagogut dhe standardet e
                  institucionit të tij.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}