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
  { value: "+400", label: "Studentë", icon: GraduationCap },
  { value: "30+", label: "Universitete", icon: Building2 },
  { value: "4", label: "Shtete", icon: MapPin },
  { value: "2022", label: "Aktiv që nga", icon: CalendarDays },
];

const countries = [
  { code: "AL", name: "Shqipëri" },
  { code: "XK", name: "Kosovë" },
  { code: "MK", name: "Maqedoni e Veriut" },
  { code: "ME", name: "Mali i Zi" },
];

const languages = [
  { code: "SQ", name: "Shqip", description: "Gjuha kryesore" },
  { code: "EN", name: "Anglisht", description: "Academic writing" },
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
      "Ndihmojmë studentët të kuptojnë strukturën dhe kërkesat e punimit me qartësi.",
    icon: BookOpen,
  },
  {
    title: "Mbështetje praktike",
    description:
      "Konsultime dhe mbështetje për çdo fazë, nga ideja fillestare te dorëzimi.",
    icon: Users,
  },
  {
    title: "Konfidencialitet",
    description:
      "Të dhënat dhe materialet trajtohen në mënyrë konfidenciale.",
    icon: ShieldCheck,
  },
  {
    title: "Standarde të larta",
    description:
      "Çdo shërbim përshtatet me udhëzimet dhe formatin e universitetit.",
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
          <div className="grid items-center gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
            <div className="relative min-w-0">
              <div className="relative overflow-hidden rounded-[26px] shadow-[0_24px_70px_rgba(24,24,27,0.12)]">
                <img
                  src="https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=1400"
                  alt="Ambient akademik me libra"
                  className="h-[300px] w-full object-cover sm:h-[420px] lg:h-[500px]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/55 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-950/10 to-transparent" />

                <div className="absolute right-4 top-4 rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-[10px] font-bold text-violet-700 shadow-lg backdrop-blur sm:right-5 sm:top-5 sm:text-xs">
                  Aktiv nga 2022
                </div>

                <div className="absolute bottom-4 left-4 rounded-[18px] border border-white/70 bg-white/95 px-4 py-3 shadow-xl backdrop-blur sm:bottom-6 sm:left-6 sm:px-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                      <Users className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="font-serif text-lg font-bold leading-none text-zinc-950">
                        +400
                      </p>
                      <p className="mt-1 text-[10px] text-zinc-500 sm:text-xs">
                        studentë të mbështetur
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-violet-600">
                Rreth nesh
              </p>

              <h1 className="mt-3 font-serif text-3xl font-bold leading-tight text-zinc-950 sm:text-4xl lg:text-5xl">
                Mbështetje akademike me proces të qartë
              </h1>

              <div className="mt-4 h-0.5 w-10 rounded-full bg-violet-600" />

              <div className="mt-6 space-y-4 text-sm leading-7 text-zinc-600 sm:text-base">
                <p>
                  <strong className="text-zinc-950">temadiplome.ce</strong> është
                  një platformë e fokusuar në orientim, strukturim, analizë,
                  formatim dhe përgatitje akademike.
                </p>

                <p>
                  Mbështesim studentët në organizimin e punimit, referencat APA,
                  analizën SPSS, prezantimet dhe përgatitjen përfundimtare sipas
                  kërkesave të universitetit.
                </p>

                <p>
                  Punojmë me studentë nga Shqipëria, Kosova, Maqedonia e Veriut
                  dhe Mali i Zi, në shqip, anglisht dhe italisht.
                </p>
              </div>

              <div className="mt-6 rounded-[18px] border border-violet-100 bg-gradient-to-br from-violet-50/80 to-white p-4 shadow-[0_10px_30px_rgba(76,29,149,0.05)] sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                    <ShieldCheck className="h-4 w-4" />
                  </div>

                  <p className="text-xs leading-5 text-zinc-600 sm:text-sm sm:leading-6">
                    <strong className="text-zinc-950">E rëndësishme:</strong>{" "}
                    Platforma ofron asistencë dhe orientim akademik. Studenti
                    mbetet përgjegjës për përdorimin e materialit dhe respektimin
                    e integritetit akademik.
                  </p>
                </div>
              </div>

              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                  whatsappMessage,
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
        <div className="mx-auto grid max-w-[1080px] grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.label}
                className="flex min-h-[84px] items-center justify-center gap-3 rounded-[18px] border border-violet-100 bg-white px-4 py-4 shadow-[0_10px_28px_rgba(76,29,149,0.05)]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                  <Icon className="h-5 w-5" />
                </div>

                <div className="flex min-w-0 items-baseline gap-2 whitespace-nowrap">
                  <span className="font-serif text-lg font-bold leading-none text-zinc-950 sm:text-xl">
                    {stat.value}
                  </span>
                  <span className="text-xs text-zinc-500 sm:text-sm">
                    {stat.label}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* MISSION */}
      <section className="px-4 pb-8 sm:px-5 sm:pb-10 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="relative grid overflow-hidden rounded-[26px] bg-[#0b0718] text-white shadow-[0_24px_70px_rgba(7,9,21,0.18)] lg:grid-cols-[0.92fr_1.08fr]">
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
                  Qartësi në çdo hap
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-300 sm:text-base">
                  Synimi ynë është që studenti ta kuptojë më mirë procesin,
                  strukturën dhe kërkesat e punimit. Çdo shërbim organizohet me
                  komunikim të qartë dhe përshtatet sipas udhëzimeve akademike.
                </p>
              </div>
            </div>

            <div className="relative min-h-[230px] overflow-hidden sm:min-h-[320px]">
              <img
                src="https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg?auto=compress&cs=tinysrgb&w=1400"
                alt="Bibliotekë moderne"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b0718] via-[#0b0718]/25 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* COUNTRIES + LANGUAGES */}
      <section className="px-4 pb-8 sm:px-5 sm:pb-10 lg:px-10">
        <div className="mx-auto grid max-w-[1440px] gap-5 lg:grid-cols-2">
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

            <div className="mt-5 grid grid-cols-2 gap-2.5">
              {countries.map((country) => (
                <div
                  key={country.code}
                  className="flex min-w-0 items-center gap-3 rounded-xl bg-zinc-50 px-3 py-3 sm:px-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-[10px] font-bold text-violet-700">
                    {country.code}
                  </span>
                  <span className="truncate text-xs font-medium text-zinc-800 sm:text-sm">
                    {country.name}
                  </span>
                </div>
              ))}
            </div>

            <Link
              to="/universitetet"
              className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-violet-700 sm:text-sm"
            >
              Shiko universitetet
              <ArrowRight className="h-4 w-4" />
            </Link>
          </article>

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

            <div className="mt-5 space-y-2.5">
              {languages.map((language) => (
                <div
                  key={language.code}
                  className="flex items-center gap-3 rounded-xl bg-zinc-50 px-4 py-3"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-[10px] font-bold text-violet-700">
                    {language.code}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-zinc-900">
                      {language.name}
                    </p>
                    <p className="truncate text-[10px] text-zinc-500 sm:text-xs">
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
          <div className="mb-6 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-600">
              Vlerat tona
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-zinc-950 sm:text-3xl">
              Si punojmë
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <article
                  key={value.title}
                  className="flex min-w-0 flex-col items-center rounded-[20px] border border-white bg-white/90 p-4 text-center shadow-[0_10px_30px_rgba(76,29,149,0.05)] sm:p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
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
                <p className="text-sm font-bold text-zinc-950">temadiplome.ce</p>
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
          <div className="relative overflow-hidden rounded-[24px] bg-[#0b0718] px-5 py-7 text-white shadow-[0_20px_60px_rgba(7,9,21,0.16)] sm:px-8 lg:flex lg:items-center lg:justify-between lg:gap-8 lg:px-10">
            <div className="absolute -left-16 -top-20 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="relative">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-300">
                Kontakto me ne
              </p>
              <h2 className="mt-2 font-serif text-2xl font-bold sm:text-3xl">
                Ke nevojë për orientim akademik?
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-300">
                Na shkruaj për temën, strukturën, analizën ose shërbimin që të
                nevojitet.
              </p>
            </div>

            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                whatsappMessage,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-purple-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-950/30 transition hover:-translate-y-0.5 lg:mt-0 lg:w-auto"
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