import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  CalendarDays,
  GraduationCap,
  Languages,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Users,
} from "lucide-react";
import { SITE_CONFIG } from "../lib/supabase";

const stats = [
  {
    value: "+400",
    label: "Studentë të ndihmuar",
    icon: GraduationCap,
  },
  {
    value: "30+",
    label: "Universitete",
    icon: Building2,
  },
  {
    value: "4",
    label: "Shtete",
    icon: MapPin,
  },
  {
    value: "2022",
    label: "Aktiv",
    icon: CalendarDays,
  },
];

const countries = [
  { code: "AL", name: "Shqipëri" },
  { code: "XK", name: "Kosovë" },
  { code: "MK", name: "Maqedoni e Veriut" },
  { code: "ME", name: "Mali i Zi" },
];

const languages = [
  {
    code: "SQ",
    name: "Shqip",
    description: "Gjuha kryesore",
  },
  {
    code: "EN",
    name: "Anglisht",
    description: "Academic writing",
  },
  {
    code: "IT",
    name: "Italisht",
    description: "Scrittura accademica italiana",
  },
];

const values = [
  {
    title: "Orientim akademik",
    description:
      "Ndihmojmë studentët të kuptojnë dhe realizojnë punimet akademike me qartësi.",
    icon: BookOpen,
  },
  {
    title: "Mbështetje praktike",
    description:
      "Konsultime dhe mbështetje për çdo fazë të punimit, nga ideja te dorëzimi.",
    icon: Users,
  },
  {
    title: "Konfidencialitet total",
    description:
      "Informacioni juaj trajtohet në mënyrë konfidenciale dhe nuk ndahet me palë të treta.",
    icon: ShieldCheck,
  },
  {
    title: "Standarde të larta",
    description:
      "Çdo shërbim përshtatet me kërkesat dhe udhëzimet akademike të universitetit.",
    icon: Award,
  },
];

export default function About() {
  const whatsappMessage =
    "Përshëndetje! Dëshiroj më shumë informacion për temadiplome.ce dhe shërbimet tuaja.";

  return (
    <main className="w-full max-w-full overflow-x-hidden bg-white pb-0 pt-24 lg:pt-28">
      {/* HERO */}
      <section className="px-4 sm:px-5 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid items-center gap-7 lg:grid-cols-2 lg:gap-12">
            {/* IMAGE */}
            <div className="relative min-w-0">
              <div className="relative overflow-hidden rounded-[24px] shadow-[0_24px_70px_rgba(24,24,27,0.12)]">
                <img
                  src="https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=1400"
                  alt="Ambient akademik me libra dhe laptop"
                  className="h-[280px] w-full object-cover sm:h-[420px] lg:h-[520px]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                <div className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-violet-700 to-purple-600 px-3 py-1.5 text-[10px] font-bold text-white shadow-lg sm:right-5 sm:top-5 sm:text-xs">
                  Aktiv nga 2022
                </div>

                <div className="absolute bottom-4 left-4 rounded-[18px] border border-white/70 bg-white/95 px-4 py-3 shadow-xl backdrop-blur sm:bottom-6 sm:left-6 sm:px-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                      <Users className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="font-serif text-lg font-bold text-zinc-950">
                        +400
                      </p>
                      <p className="text-[10px] text-zinc-500 sm:text-xs">
                        studentë të ndihmuar
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* TEXT */}
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-violet-600">
                Rreth nesh
              </p>

              <h1 className="mt-3 font-serif text-3xl font-bold leading-tight text-zinc-950 sm:text-4xl lg:text-5xl">
                Kush jemi ne
              </h1>

              <div className="mt-4 h-0.5 w-10 rounded-full bg-violet-600" />

              <div className="mt-6 space-y-4 text-sm leading-7 text-zinc-600 sm:text-base">
                <p>
                  <strong className="text-zinc-950">temadiplome.ce</strong> është
                  një platformë akademike profesionale, aktive që nga viti
                  2022, e krijuar për të ndihmuar studentët të realizojnë
                  punimet e tyre akademike me qartësi, cilësi dhe standard.
                </p>

                <p>
                  Ofrojmë mbështetje nga strukturimi fillestar dhe orientimi për
                  temën, deri te analiza SPSS, referencat APA, prezantimet dhe
                  formatimi përfundimtar.
                </p>

                <p>
                  Punojmë me studentë nga Shqipëria, Kosova, Maqedonia e Veriut
                  dhe Mali i Zi, në gjuhën shqipe, angleze dhe italiane.
                </p>
              </div>

              <div className="mt-6 rounded-[18px] border border-violet-100 bg-gradient-to-br from-violet-50/80 to-white p-4 shadow-[0_10px_30px_rgba(76,29,149,0.05)] sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                    <ShieldCheck className="h-4 w-4" />
                  </div>

                  <p className="text-xs leading-5 text-zinc-600 sm:text-sm sm:leading-6">
                    <strong className="text-zinc-950">E rëndësishme:</strong>{" "}
                    Platforma ofron asistencë dhe orientim akademik. Ne nuk
                    zëvendësojmë përgjegjësinë akademike të studentit dhe
                    respektojmë integritetin akademik.
                  </p>
                </div>
              </div>

              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                  whatsappMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-purple-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-200/70 transition hover:-translate-y-0.5 sm:w-auto"
              >
                Na kontaktoni
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="px-4 py-8 sm:px-5 sm:py-10 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <article
                  key={stat.label}
                  className="flex min-w-0 items-center justify-center gap-3 rounded-[18px] border border-violet-100 bg-gradient-to-br from-violet-50/70 to-white px-3 py-4 text-center shadow-[0_10px_30px_rgba(76,29,149,0.05)] sm:px-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 text-left">
                    <p className="font-serif text-lg font-bold leading-none text-zinc-950">
                      {stat.value}
                    </p>

                    <p className="mt-1 text-[10px] leading-4 text-zinc-500 sm:text-xs">
                      {stat.label}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="px-4 pb-8 sm:px-5 sm:pb-10 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="relative grid overflow-hidden rounded-[24px] bg-[#0b0718] text-white shadow-[0_24px_70px_rgba(7,9,21,0.18)] lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative flex min-w-0 flex-col justify-center p-6 sm:p-8 lg:p-10">
              <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-violet-600/25 blur-3xl" />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-700 to-purple-500 text-white">
                  <GraduationCap className="h-6 w-6" />
                </div>

                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.22em] text-violet-300">
                  Qëllimi ynë
                </p>

                <h2 className="mt-2 font-serif text-2xl font-bold sm:text-3xl">
                  Misioni ynë
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-300 sm:text-base">
                  Çdo student meriton mbështetje cilësore. Që nga viti 2022,
                  kemi ndërtuar një platformë që ofron orientim, qartësi dhe
                  mbështetje praktike për realizimin e punimeve akademike.
                </p>
              </div>
            </div>

            <div className="relative min-h-[230px] overflow-hidden sm:min-h-[320px]">
              <img
                src="https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg?auto=compress&cs=tinysrgb&w=1400"
                alt="Bibliotekë moderne"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-[#0b0718] via-[#0b0718]/20 to-transparent lg:block" />
            </div>
          </div>
        </div>
      </section>

      {/* COUNTRIES + LANGUAGES */}
      <section className="px-4 pb-8 sm:px-5 sm:pb-10 lg:px-10">
        <div className="mx-auto grid max-w-[1440px] gap-5 lg:grid-cols-2">
          {/* COUNTRIES */}
          <article className="rounded-[22px] border border-zinc-100 bg-white p-5 shadow-[0_12px_36px_rgba(24,24,27,0.05)] sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                <MapPin className="h-5 w-5" />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-600">
                  Mbulimi
                </p>

                <h2 className="font-serif text-xl font-bold text-zinc-950">
                  Shtetet ku punojmë
                </h2>
              </div>
            </div>

            <div className="mt-5 space-y-2">
              {countries.map((country) => (
                <div
                  key={country.code}
                  className="flex items-center gap-3 rounded-xl bg-zinc-50 px-4 py-3"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-[10px] font-bold text-violet-700">
                    {country.code}
                  </span>

                  <span className="text-sm font-medium text-zinc-800">
                    {country.name}
                  </span>
                </div>
              ))}
            </div>

            <Link
              to="/universitetet"
              className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-violet-700 sm:text-sm"
            >
              Shiko të gjitha universitetet
              <ArrowRight className="h-4 w-4" />
            </Link>
          </article>

          {/* LANGUAGES */}
          <article className="rounded-[22px] border border-zinc-100 bg-white p-5 shadow-[0_12px_36px_rgba(24,24,27,0.05)] sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                <Languages className="h-5 w-5" />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-600">
                  Komunikimi
                </p>

                <h2 className="font-serif text-xl font-bold text-zinc-950">
                  Gjuhët e punimit
                </h2>
              </div>
            </div>

            <div className="mt-5 space-y-2">
              {languages.map((language) => (
                <div
                  key={language.code}
                  className="flex items-center gap-3 rounded-xl bg-zinc-50 px-4 py-3"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-[10px] font-bold text-violet-700">
                    {language.code}
                  </span>

                  <div>
                    <p className="text-sm font-bold text-zinc-900">
                      {language.name}
                    </p>

                    <p className="text-[10px] text-zinc-500 sm:text-xs">
                      {language.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* VALUES */}
      <section className="border-y border-violet-100 bg-gradient-to-b from-violet-50/35 to-white px-4 py-8 sm:px-5 sm:py-10 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="flex min-w-0 flex-col items-center rounded-[20px] border border-white bg-white/90 p-4 text-center shadow-[0_10px_30px_rgba(76,29,149,0.05)] sm:p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-4 font-serif text-sm font-bold text-zinc-950 sm:text-lg">
                    {value.title}
                  </h3>

                  <p className="mt-2 text-[10px] leading-4 text-zinc-500 sm:text-xs sm:leading-5">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMPANY INFO */}
      <section className="px-4 py-8 sm:px-5 sm:py-10 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-3 rounded-[22px] border border-zinc-100 bg-white p-4 shadow-[0_12px_36px_rgba(24,24,27,0.05)] sm:grid-cols-3 sm:p-5">
            <div className="flex items-center gap-3 rounded-xl bg-zinc-50 px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
                <Building2 className="h-4 w-4" />
              </div>

              <div>
                <p className="text-[10px] text-zinc-500">Emri i subjektit</p>
                <p className="text-sm font-bold text-zinc-950">
                  temadiplome.ce
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-zinc-50 px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
                <BookOpen className="h-4 w-4" />
              </div>

              <div>
                <p className="text-[10px] text-zinc-500">NIPT</p>
                <p className="text-sm font-bold text-zinc-950">M51607036D</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-zinc-50 px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
                <CalendarDays className="h-4 w-4" />
              </div>

              <div>
                <p className="text-[10px] text-zinc-500">Aktiv nga</p>
                <p className="text-sm font-bold text-zinc-950">2022</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-4 pb-8 sm:px-5 sm:pb-10 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="relative overflow-hidden rounded-[24px] border border-violet-100 bg-gradient-to-r from-violet-50 via-white to-purple-50 px-5 py-7 shadow-[0_16px_44px_rgba(76,29,149,0.08)] sm:px-8 lg:flex lg:items-center lg:justify-between lg:gap-8 lg:px-10">
            <div className="absolute -left-16 -top-20 h-56 w-56 rounded-full bg-violet-300/20 blur-3xl" />

            <div className="relative">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-600">
                Kontakto me ne
              </p>

              <h2 className="mt-2 font-serif text-2xl font-bold text-zinc-950 sm:text-3xl">
                Ke nevojë për orientim akademik?
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
                Na shkruaj për temën, strukturën, analizën ose shërbimin që të
                nevojitet.
              </p>
            </div>

            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                whatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-purple-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-200/70 transition hover:-translate-y-0.5 lg:mt-0 lg:w-auto"
            >
              <MessageCircle className="h-4 w-4" />
              Na kontaktoni
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}