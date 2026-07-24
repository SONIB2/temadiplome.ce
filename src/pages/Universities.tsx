import SEO from "../components/SEO";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  GraduationCap,
  Languages,
  MapPin,
  MessageCircle,
  School,
  Users,
} from "lucide-react";
import { SITE_CONFIG } from "../lib/supabase";

interface University {
  name: string
  abbr: string
  city: string
  logo: string
  type: 'public' | 'private'
}

const albaniaPublic: University[] = [
  {
    name: 'Universiteti i Tiranës',
    abbr: 'UT',
    city: 'Tiranë',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/University_of_Tirana_logo.svg/960px-University_of_Tirana_logo.svg.png?_=20131226141644',
    type: 'public',
  },
  {
    name: 'Universiteti i Mjekësisë i Tiranës',
    abbr: 'UMT',
    city: 'Tiranë',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Universiteti_i_Mjek%C3%ABsis%C3%AB%2C_Tiran%C3%AB.svg',
    type: 'public',
  },
  {
    name: 'Universiteti Bujqësor i Tiranës',
    abbr: 'UBT',
    city: 'Tiranë',
    logo: 'https://al.h-index.com/web/uploads/images/N0YEY-.png',
    type: 'public',
  },
  {
    name: 'Universiteti Aleksandër Moisiu',
    abbr: 'UAMD',
    city: 'Durrës',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Universiteti_%22Aleksand%C3%ABr_Moisiu%22.svg/250px-Universiteti_%22Aleksand%C3%ABr_Moisiu%22.svg.png',
    type: 'public',
  },
  {
    name: 'Universiteti Luigj Gurakuqi',
    abbr: 'UNISHK',
    city: 'Shkodër',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Universiteti_i_Shkodr%C3%ABs_%22Luigj_Gurakuqi%22.svg/960px-Universiteti_i_Shkodr%C3%ABs_%22Luigj_Gurakuqi%22.svg.png?_=20250316154320',
    type: 'public',
  },
  {
    name: 'Universiteti Aleksandër Xhuvani',
    abbr: 'UNIEL',
    city: 'Elbasan',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Logo_e_Universitetit_%22Aleksand%C3%ABr_Xhuvani%22.svg/250px-Logo_e_Universitetit_%22Aleksand%C3%ABr_Xhuvani%22.svg.png',
    type: 'public',
  },
  {
    name: 'Universiteti Ismail Qemali',
    abbr: 'UNIVLORA',
    city: 'Vlorë',
    logo: 'https://upload.wikimedia.org/wikipedia/en/3/3a/Logo_e_Universitetit_%22Ismail_Qemali%22.svg',
    type: 'public',
  },
  {
    name: 'Universiteti Fan S. Noli',
    abbr: 'UNKORCE',
    city: 'Korçë',
    logo: 'https://unkorce.edu.al/medngar/2024/08/Logo_e_Universitetit__Fan_Noli_-e1726660879862.png',
    type: 'public',
  },
  {
    name: 'Universiteti Eqerem Çabej',
    abbr: 'UOGJ',
    city: 'Gjirokastër',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/Logo_e_Universitetit_%22Eqrem_%C3%87abej%22.svg/330px-Logo_e_Universitetit_%22Eqrem_%C3%87abej%22.svg.png',
    type: 'public',
  },
  {
    name: 'Universiteti i Arteve',
    abbr: 'UA',
    city: 'Tiranë',
    logo: 'https://i0.wp.com/maturashteterore.com/wp-content/uploads/2023/05/Artet.png?fit=1063%2C625&ssl=1',
    type: 'public',
  },
  {
    name: 'Universiteti i Sporteve',
    abbr: 'USTA',
    city: 'Tiranë',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnhcsTcH67RS9tY96wArxDNNd71ByP4BqUfw&s',
    type: 'public',
  },
]

const albaniaPrivate: University[] = [
  {
    name: 'Universiteti Europian i Tiranës',
    abbr: 'UET',
    city: 'Tiranë',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/88/Logo_e_Universitetit_Europian_t%C3%AB_Tiran%C3%ABs.svg/330px-Logo_e_Universitetit_Europian_t%C3%AB_Tiran%C3%ABs.svg.png',
    type: 'private',
  },
  {
    name: 'Universiteti Luarasi',
    abbr: 'LUARASI',
    city: 'Tiranë',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Luarasi_University_Logo.svg/330px-Luarasi_University_Logo.svg.png',
    type: 'private',
  },
  {
    name: 'Albanian University',
    abbr: 'AU',
    city: 'Tiranë',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/Logo_of_Albanian_University.svg/330px-Logo_of_Albanian_University.svg.png',
    type: 'private',
  },
  {
    name: 'Universiteti Polis',
    abbr: 'POLIS',
    city: 'Tiranë',
    logo: 'https://universitetipolis.edu.al/wp-content/uploads/2022/09/Universiteti_Polis.svg_.png',
    type: 'private',
  },
  {
    name: 'Universiteti Katolik Zoja e Këshillit',
    abbr: 'UNIZKM',
    city: 'Tiranë',
    logo: 'https://mail.ascal.al/images/iallogos/4.png',
    type: 'private',
  },
  {
    name: 'Universiteti Western Balkans',
    abbr: 'WB',
    city: 'Tiranë',
    logo: 'https://wbu.edu.al/assets/img/logo-big.png',
    type: 'private',
  },
  {
    name: 'Universiteti Mesdhetar',
    abbr: 'UMD',
    city: 'Tiranë',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSntNcnrU1lZH3u5QdN0hufXFTMmEfYmNaqzA&s',
    type: 'private',
  },
]

const kosovoPublic: University[] = [
  {
    name: 'Universiteti i Prishtinës "Hasan Prishtina"',
    abbr: 'UP',
    city: 'Prishtinë',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/University_of_Prishtina_logo.svg',
    type: 'public',
  },
  {
    name: 'Universiteti i Prizrenit "Ukshin Hoti"',
    abbr: 'UNIPRIZ',
    city: 'Prizren',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStKgf-8V119jdyEgoi-V0B12zTFvGe1zSyWA&s',
    type: 'public',
  },
  {
    name: 'Universiteti i Pejës "Haxhi Zeka"',
    abbr: 'UPZ',
    city: 'Pejë',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Logo_e_Universiteti_Haxhi_Zeka.png',
    type: 'public',
  },
  
]

const kosovoPrivate: University[] = [
  {
    name: 'Kolegji AAB',
    abbr: 'AAB',
    city: 'Prishtinë',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Kolegji_AAB.png',
    type: 'private',
  },
  {
    name: 'Kolegji UBT',
    abbr: 'UBT',
    city: 'Prishtinë',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7uepTjzCkixd_39y55UxX-tzS9kj0BUU-RA&s',
    type: 'private',
  },
  { name: 'Kolegji Heimerer', abbr: 'HEIMERER', city: 'Prishtinë', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQvXlTHfjTY1O5EQuWhNJKXOIsD_hKJpUyiA&s', type: 'private' },
  { name: 'Kolegji Biznesi', abbr: 'KB', city: 'Prishtinë', logo: 'https://kolegjibiznesi.com/Materialet/LogoKBPrishtine.png', type: 'private' },
  { name: 'Kolegji Universum', abbr: 'UNIVERSUM', city: 'Prishtinë', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTSYiGvSOfzCTIFyHOIP0mRGDSkvpv4WtOfg&s', type: 'private' },
]


const northMacedoniaPublic: University[] = [
  {
    name: 'Universiteti i Tetovës',
    abbr: 'UT',
    city: 'Tetovë',
    logo: 'https://unite.edu.mk/wp-content/uploads/2023/10/cropped-logo-512x512-1.png',
    type: 'public',
  },
  {
    name: 'Universiteti “Nënë Tereza”',
    abbr: 'UNT',
    city: 'Shkup',
    logo: 'https://unt.edu.mk/wp-content/uploads/2016/10/unnamed-e1477506523758.jpg',
    type: 'public',
  },
]

const northMacedoniaPrivate: University[] = [
  {
    name: 'Universiteti i Evropës Juglindore',
    abbr: 'SEEU',
    city: 'Tetovë',
    logo: 'https://iconape.com/wp-content/files/ep/188937/png/188937.png',
    type: 'private',
  },
]

const montenegroPublic: University[] = [
  {
    name: 'Universiteti i Malit të Zi',
    abbr: 'UCG',
    city: 'Podgoricë',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Logo_Univerzitet_Mediteran.png',
    type: 'public',
  },
]

const montenegroPrivate: University[] = []


type CountryCode = "AL" | "XK" | "MK" | "ME";

type CountryData = {
  code: CountryCode;
  name: string;
  subtitle: string;
  publicUnis: University[];
  privateUnis: University[];
};

const countries: CountryData[] = [
  {
    code: "AL",
    name: "Shqipëri",
    subtitle: "Universitete publike dhe private në Shqipëri",
    publicUnis: albaniaPublic,
    privateUnis: albaniaPrivate,
  },
  {
    code: "XK",
    name: "Kosovë",
    subtitle: "Universitete dhe kolegje në Kosovë",
    publicUnis: kosovoPublic,
    privateUnis: kosovoPrivate,
  },
  {
    code: "MK",
    name: "Maqedoni e Veriut",
    subtitle: "Universitete me programe në shqip dhe anglisht",
    publicUnis: northMacedoniaPublic,
    privateUnis: northMacedoniaPrivate,
  },
  {
    code: "ME",
    name: "Mal i Zi",
    subtitle: "Universitete dhe programe akademike në Malin e Zi",
    publicUnis: montenegroPublic,
    privateUnis: montenegroPrivate,
  },
];

const stats = [
  { value: "+400", label: "Studentë", icon: GraduationCap },
  { value: "30+", label: "Universitete", icon: Building2 },
  { value: "4", label: "Shtete", icon: MapPin },
  { value: "3", label: "Gjuhë", icon: Languages },
];

function UniversityCard({ university }: { university: University }) {
  return (
    <article className="group flex min-w-0 items-center gap-3 rounded-[16px] border border-zinc-100 bg-white p-3 shadow-[0_8px_24px_rgba(24,24,27,0.04)] transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-[0_12px_30px_rgba(76,29,149,0.08)]">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-50">
        {university.logo ? (
          <>
            <img
              src={university.logo}
              alt={university.name}
              className="max-h-10 max-w-10 object-contain"
              onError={(event) => {
                event.currentTarget.style.display = "none";
                const fallback =
                  event.currentTarget.nextElementSibling as HTMLElement | null;
                if (fallback) fallback.style.display = "flex";
              }}
            />

            <div className="hidden h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-[10px] font-bold text-violet-700">
              {university.abbr.slice(0, 3)}
            </div>
          </>
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-[10px] font-bold text-violet-700">
            {university.abbr.slice(0, 3)}
          </div>
        )}
      </div>

      <div className="min-w-0">
        <h3 className="line-clamp-2 text-[11px] font-bold leading-4 text-zinc-900 sm:text-xs">
          {university.name}
        </h3>

        <p className="mt-1 flex items-center gap-1 text-[10px] text-zinc-400">
          <MapPin className="h-3 w-3" />
          {university.city}
        </p>
      </div>
    </article>
  );
}

function UniversityGroup({
  title,
  universities,
  accent,
}: {
  title: string;
  universities: University[];
  accent: "violet" | "zinc";
}) {
  if (universities.length === 0) return null;

  return (
    <section>
      <div className="flex items-center gap-2">
        <span
          className={`h-2 w-2 rounded-full ${
            accent === "violet" ? "bg-violet-600" : "bg-zinc-400"
          }`}
        />

        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">
          {title}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        {universities.map((university) => (
          <UniversityCard key={university.name} university={university} />
        ))}
      </div>
    </section>
  );
}

export default function Universities() {
  const [activeCountry, setActiveCountry] = useState<CountryCode>("AL");

  const selectedCountry =
    countries.find((country) => country.code === activeCountry) ?? countries[0];

  const totalInstitutions =
    selectedCountry.publicUnis.length + selectedCountry.privateUnis.length;

  const whatsappMessage =
    "Përshëndetje! Dëshiroj informacion për një universitet që nuk është në listë.";

return (
  <>
    <SEO
      title="Universitetet që Shërbejmë"
      description="Shiko universitetet dhe kolegjet me të cilat punojmë në Shqipëri, Kosovë, Maqedoninë e Veriut dhe Malin e Zi."
      path="/universitetet"
    />

    <main className="w-full max-w-full overflow-x-hidden bg-white pb-0 pt-24 lg:pt-28">      <section className="px-4 sm:px-5 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-violet-600">
              Mbulimi ynë
            </p>

            <h1 className="mt-3 font-serif text-3xl font-bold text-zinc-950 sm:text-4xl lg:text-5xl">
              Universitetet që shërbejmë
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-500 sm:text-base">
              Nga viti 2022 kemi mbështetur studentë nga universitete dhe
              kolegje në Shqipëri, Kosovë, Maqedoninë e Veriut dhe Malin e Zi.
            </p>
          </div>

<div className="mx-auto mt-8 grid max-w-[1050px] grid-cols-2 gap-3 lg:grid-cols-4">
  {stats.map((stat) => {
    const Icon = stat.icon;

    return (
      <article
        key={stat.label}
        className="flex min-h-[82px] items-center justify-center gap-3 rounded-[18px] border border-violet-100 bg-white px-4 py-3 shadow-[0_10px_28px_rgba(76,29,149,0.05)]"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
          <Icon className="h-5 w-5" />
        </div>

        <div className="flex items-baseline gap-2 whitespace-nowrap">
          <span className="font-serif text-lg font-bold text-zinc-950">
            {stat.value}
          </span>

          <span className="text-sm text-zinc-500">
            {stat.label}
          </span>
        </div>
      </article>
    );
  })}
</div>
        </div>
      </section>

      <section className="px-4 pb-8 pt-8 sm:px-5 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="mx-auto grid w-full max-w-md grid-cols-4 gap-2">
            {countries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => setActiveCountry(country.code)}
                className={`rounded-xl border px-3 py-2.5 text-xs font-bold transition ${
                  activeCountry === country.code
                    ? "border-violet-700 bg-gradient-to-r from-violet-700 to-purple-600 text-white shadow-lg shadow-violet-200/70"
                    : "border-zinc-200 bg-white text-zinc-600 hover:border-violet-300 hover:text-violet-700"
                }`}
              >
                {country.code}
              </button>
            ))}
          </div>

          <div className="mt-8 border-t border-zinc-100 pt-7">
            <div className="flex flex-col gap-2 border-b border-zinc-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="font-serif text-2xl font-bold text-violet-700">
                  {selectedCountry.code}
                </span>

                <div>
                  <h2 className="font-serif text-2xl font-bold text-zinc-950">
                    {selectedCountry.name}
                  </h2>

                  <p className="mt-1 text-xs text-zinc-500">
                    {selectedCountry.subtitle}
                  </p>
                </div>
              </div>

              {totalInstitutions > 0 && (
                <p className="text-xs font-semibold text-zinc-500">
                  {totalInstitutions} institucione
                </p>
              )}
            </div>

            {totalInstitutions > 0 ? (
              <div className="mt-7 space-y-8">
                <UniversityGroup
                  title="Universitete publike"
                  universities={selectedCountry.publicUnis}
                  accent="violet"
                />

                <UniversityGroup
                  title="Universitete dhe kolegje private"
                  universities={selectedCountry.privateUnis}
                  accent="zinc"
                />
              </div>
            ) : (
              <div className="mt-7 rounded-[22px] border border-violet-100 bg-gradient-to-br from-violet-50/70 to-white px-5 py-9 text-center shadow-[0_10px_30px_rgba(76,29,149,0.05)]">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-violet-700">
                  <School className="h-6 w-6" />
                </div>

                <h3 className="mt-4 font-serif text-xl font-bold text-zinc-950">
                  Punojmë edhe me institucione të tjera
                </h3>

                <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-zinc-500">
                  Na dërgo emrin e universitetit, programin dhe gjuhën e
                  studimit për ta konfirmuar.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="px-4 pb-8 sm:px-5 lg:px-10">
  <div className="mx-auto max-w-[1440px]">
    <div className="relative overflow-hidden rounded-[24px] border border-violet-100 bg-gradient-to-r from-violet-50/80 via-white to-violet-50/40 px-5 py-7 shadow-[0_16px_44px_rgba(76,29,149,0.08)] sm:px-8 lg:flex lg:items-center lg:justify-between lg:gap-8 lg:px-10">
      <div className="absolute -left-16 -top-20 h-56 w-56 rounded-full bg-violet-300/20 blur-3xl" />
      <div className="absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-purple-300/20 blur-3xl" />

      <div className="relative flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-700 to-purple-500 text-white shadow-lg shadow-violet-200">
          <School className="h-6 w-6" />
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-600">
            Nuk e gjete universitetin?
          </p>

          <h2 className="mt-2 font-serif text-2xl font-bold text-zinc-950 sm:text-3xl">
            Na dërgo emrin e institucionit
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
            Punojmë edhe me universitete dhe programe që nuk janë ende në listë.
            Mjafton të na dërgosh emrin, programin dhe gjuhën e studimit.
          </p>
        </div>
      </div>

      <a
        href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
          whatsappMessage
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative mt-6 inline-flex w-full min-h-[50px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-purple-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-200/70 transition hover:-translate-y-0.5 lg:mt-0 lg:w-auto"
      >
        <MessageCircle className="h-4 w-4" />
        Kontrollo universitetin
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  </div>
</section>
       </main>
  </>
);
}