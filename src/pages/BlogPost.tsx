import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Copy,
  Facebook,
  GraduationCap,
  Linkedin,
  MessageCircle,
  Tag,
} from "lucide-react";
import { SITE_CONFIG } from "../lib/supabase";

type Post = {
  slug: string;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
  highlights: string[];
};

const posts: Post[] = [
  {
    slug: "si-te-zgjedhesh-temen-e-diplomes",
    title: "Si të zgjedhësh temën e diplomës?",
    category: "Diplomë",
    date: "2026-01-10",
    image:
      "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=1400",
    excerpt:
      "Zgjedhja e temës është hapi i parë dhe më i rëndësishëm në procesin akademik.",
    highlights: [
      "Tema duhet të jetë e qartë dhe e fokusuar",
      "Duhet të ketë burime të mjaftueshme literature",
      "Duhet të jetë e realizueshme brenda afatit",
    ],
    content: `
Zgjedhja e temës së diplomës është një nga hapat më të rëndësishëm në procesin akademik. Një temë e mirë duhet të jetë e qartë, e realizueshme dhe e lidhur ngushtë me degën tuaj të studimit.

Fillimisht, duhet të mendoni për fushën që ju intereson më shumë. Një temë që lidhet me interesin tuaj personal është më e lehtë për t’u zhvilluar dhe ju ndihmon të ruani motivimin gjatë gjithë procesit.

Së dyti, tema duhet të ketë burime të mjaftueshme literature. Para se të vendosni përfundimisht, kontrolloni nëse ekzistojnë libra, artikuj shkencorë, raporte ose studime të mëparshme që mund të përdoren si bazë teorike.

Së treti, tema duhet të jetë specifike. Një temë shumë e gjerë e bën punimin të paqartë, ndërsa një temë shumë e ngushtë mund të mos ketë material të mjaftueshëm. Zgjidhja më e mirë është një temë e fokusuar, por me hapësirë për analizë.

Në fund, konsultohuni me pedagogun udhëheqës përpara se ta finalizoni temën. Miratimi i tij ose saj ju ndihmon të shmangni ndryshime të mëvonshme dhe ta nisni punimin me drejtim të qartë.
    `,
  },
  {
    slug: "si-strukturohet-nje-punim-diplome",
    title: "Si strukturohet një punim diplome?",
    category: "Strukturim",
    date: "2026-01-18",
    image:
      "https://images.pexels.com/photos/5905885/pexels-photo-5905885.jpeg?auto=compress&cs=tinysrgb&w=1400",
    excerpt:
      "Një strukturë e qartë e bën punimin më të kuptueshëm dhe më profesional.",
    highlights: [
      "Hyrja duhet të shpjegojë qëllimin e studimit",
      "Metodologjia duhet të jetë e qartë",
      "Përfundimet duhet të lidhen me objektivat",
    ],
    content: `
Një punim diplome duhet të ketë strukturë të qartë dhe logjike. Struktura ndihmon lexuesin të kuptojë qëllimin e studimit, literaturën, metodologjinë, analizën dhe përfundimet.

Zakonisht, punimi nis me hyrjen, ku prezantohet tema, rëndësia e saj, qëllimi i studimit, objektivat dhe pyetjet kërkimore. Hyrja duhet të jetë e qartë dhe të tregojë pse tema është e rëndësishme.

Kapitulli teorik përfshin literaturën shkencore dhe konceptet kryesore që lidhen me temën. Këtu përdoren libra, artikuj, raporte dhe burime të tjera akademike.

Metodologjia shpjegon mënyrën si është realizuar studimi. Nëse përdoret pyetësor, intervistë ose analizë dokumentesh, kjo duhet të përshkruhet qartë.

Kapitulli i analizës paraqet rezultatet dhe interpretimin e tyre. Në fund vendosen konkluzionet dhe rekomandimet, të cilat duhet të lidhen drejtpërdrejt me qëllimin dhe objektivat e punimit.
    `,
  },
  {
    slug: "gabimet-me-te-shpeshta-ne-tema-diplome",
    title: "Gabimet më të shpeshta në temat e diplomës",
    category: "Këshilla",
    date: "2026-02-02",
    image:
      "https://images.pexels.com/photos/4778611/pexels-photo-4778611.jpeg?auto=compress&cs=tinysrgb&w=1400",
    excerpt:
      "Mungesa e strukturës dhe burimeve të besueshme janë ndër gabimet më të zakonshme.",
    highlights: [
      "Mos përdorni burime joakademike",
      "Mos lini citime pa referenca",
      "Mos paraqisni rezultate pa interpretim",
    ],
    content: `
Një nga gabimet më të shpeshta në temat e diplomës është mungesa e strukturës së qartë. Kur kapitujt nuk lidhen mirë me njëri-tjetrin, punimi duket i paorganizuar dhe i vështirë për t’u ndjekur.

Një tjetër problem është përdorimi i burimeve të dobëta ose joakademike. Punimi duhet të mbështetet në literaturë serioze, si libra, artikuj shkencorë, raporte institucionale dhe burime të besueshme.

Shumë studentë bëjnë gabim edhe me referencat. Citimet në tekst dhe lista e referencave duhet të jenë në të njëjtin stil, për shembull APA, dhe të jenë të plota.

Në punimet me pyetësor, një gabim i zakonshëm është interpretimi i dobët i rezultateve. Nuk mjafton të vendosen vetëm tabela dhe grafikë; ato duhet të shpjegohen dhe të lidhen me hipotezat ose objektivat.

Për të shmangur këto gabime, punimi duhet planifikuar me kujdes, të rishikohet disa herë dhe të kontrollohet për strukturë, gjuhë, citime dhe përputhje me rregulloren e universitetit.
    `,
  },
  {
    slug: "si-te-perdoresh-referencat-apa",
    title: "Si të përdorësh referencat APA?",
    category: "APA",
    date: "2026-02-15",
    image:
      "https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg?auto=compress&cs=tinysrgb&w=1400",
    excerpt:
      "Stili APA ndihmon në paraqitjen e saktë dhe profesionale të burimeve.",
    highlights: [
      "Çdo citim duhet të ketë referencën përkatëse",
      "Lista duhet të jetë alfabetike",
      "Burimet duhet të jenë të plota",
    ],
    content: `
Stili APA përdoret gjerësisht në punimet akademike dhe ndihmon në paraqitjen e saktë të burimeve. Çdo burim që përdoret në tekst duhet të shfaqet edhe në listën e referencave.

Në citimet brenda tekstit zakonisht vendoset mbiemri i autorit dhe viti i publikimit. Për shembull: (Hoxha, 2022). Nëse përdoret citim direkt, duhet të vendoset edhe faqja.

Lista e referencave vendoset në fund të punimit dhe duhet të jetë e renditur alfabetikisht. Formatimi ndryshon sipas llojit të burimit: libër, artikull shkencor, raport, faqe interneti ose ligj.

Një gabim i zakonshëm është vendosja e linkeve pa autor, pa vit ose pa titull. Referencat duhet të jenë të plota dhe të kontrolluara.

Përdorimi korrekt i APA-s e bën punimin më profesional dhe shmang problemet me plagjiaturën.
    `,
  },
  {
    slug: "kur-duhet-analiza-spss-ne-punim",
    title: "Kur duhet analiza SPSS në një punim?",
    category: "SPSS",
    date: "2026-03-03",
    image:
      "https://images.pexels.com/photos/669622/pexels-photo-669622.jpeg?auto=compress&cs=tinysrgb&w=1400",
    excerpt:
      "SPSS përdoret kur studimi përfshin të dhëna sasiore, variabla dhe hipoteza.",
    highlights: [
      "Përdoret për pyetësorë dhe të dhëna numerike",
      "Rezultatet duhet të interpretohen",
      "Analizat duhet të lidhen me hipotezat",
    ],
    content: `
Analiza SPSS përdoret kur punimi përfshin të dhëna sasiore, si pyetësorë, variabla, hipoteza ose krahasime statistikore.

Nëse keni mbledhur përgjigje nga studentë, klientë, pacientë, biznese ose grupe të tjera, SPSS ndihmon në përpunimin e të dhënave dhe paraqitjen e rezultateve në mënyrë të qartë.

Analizat më të zakonshme përfshijnë statistikat përshkruese, frekuencat, mesataret, korrelacionin, regresionin dhe testimin e hipotezave.

SPSS është i rëndësishëm sepse i jep punimit bazë më të fortë empirike. Megjithatë, rezultatet nuk duhet vetëm të vendosen në tabela; ato duhet të interpretohen dhe të lidhen me qëllimin e studimit.

Nëse punimi ka pyetësor dhe hipoteza, analiza statistikore është shpesh pjesë e domosdoshme e kapitullit të rezultateve.
    `,
  },
  {
    slug: "si-te-pergatitesh-per-mbrojtjen-e-diplomes",
    title: "Si të përgatitesh për mbrojtjen e diplomës?",
    category: "Prezantim",
    date: "2026-03-20",
    image:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1400",
    excerpt:
      "Një mbrojtje e mirë kërkon prezantim të qartë dhe përgatitje për pyetjet.",
    highlights: [
      "Slide të thjeshta dhe jo të ngarkuara",
      "Fokus te rezultatet kryesore",
      "Përgatitje për pyetjet e komisionit",
    ],
    content: `
Mbrojtja e diplomës kërkon përgatitje të mirë dhe prezantim të qartë. Qëllimi nuk është të lexoni të gjithë punimin, por të tregoni pjesët më të rëndësishme.

PowerPoint-i duhet të jetë i thjeshtë, profesional dhe jo shumë i ngarkuar. Ai duhet të përfshijë temën, qëllimin, metodologjinë, rezultatet kryesore, konkluzionet dhe rekomandimet.

Gjatë prezantimit, flisni qartë dhe përqendrohuni te argumentet kryesore. Mos vendosni shumë tekst në slide, sepse kjo e bën prezantimin të vështirë për t’u ndjekur.

Përgatituni edhe për pyetje nga komisioni. Pyetjet zakonisht lidhen me metodologjinë, rezultatet, literaturën dhe arsyet pse keni zgjedhur temën.

Një prezantim i mirë tregon që e kuptoni punimin tuaj dhe jeni të përgatitur për ta mbrojtur atë.
    `,
  },
];

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((item) => item.slug === slug);

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("sq-AL", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      window.prompt("Kopjo linkun:", window.location.href);
    }
  };

  if (!post) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4 pt-24">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-zinc-950 sm:text-4xl">
            Artikulli nuk u gjet
          </h1>

          <Link
            to="/blog"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-purple-600 px-6 py-3 text-sm font-bold text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Kthehu te blogu
          </Link>
        </div>
      </main>
    );
  }

  const relatedPosts = posts
    .filter((item) => item.slug !== post.slug)
    .slice(0, 2);

  const whatsappMessage = `Përshëndetje! Kam nevojë për ndihmë lidhur me artikullin: ${post.title}`;

  return (
    <main className="w-full max-w-full overflow-x-hidden bg-white pb-0 pt-24 lg:pt-28">
      {/* BACK */}
      <section className="px-4 sm:px-5 lg:px-10">
        <div className="mx-auto max-w-[1100px]">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-violet-700 transition hover:text-violet-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Kthehu te blogu
          </Link>
        </div>
      </section>

      {/* ARTICLE HERO */}
      <section className="px-4 pb-7 pt-6 sm:px-5 sm:pb-9 lg:px-10">
        <div className="mx-auto max-w-[1100px]">
          <div className="rounded-[26px] border border-violet-100 bg-gradient-to-br from-violet-50/70 via-white to-white px-5 py-7 shadow-[0_18px_52px_rgba(76,29,149,0.07)] sm:px-8 sm:py-9 lg:px-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-100 bg-white px-3 py-1.5 text-xs font-bold text-violet-700">
                <Tag className="h-3.5 w-3.5" />
                {post.category}
              </span>

              <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(post.date)}
              </span>
            </div>

            <h1 className="mt-5 max-w-4xl font-serif text-3xl font-bold leading-tight text-zinc-950 sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-600 sm:text-base sm:leading-7">
              {post.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* MAIN IMAGE */}
      <section className="px-4 sm:px-5 lg:px-10">
        <div className="mx-auto max-w-[1100px]">
          <div className="overflow-hidden rounded-[24px] shadow-[0_18px_50px_rgba(24,24,27,0.08)]">
            <img
              src={post.image}
              alt={post.title}
              className="h-[240px] w-full object-cover sm:h-[420px] lg:h-[500px]"
            />
          </div>
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <section className="px-4 py-8 sm:px-5 sm:py-10 lg:px-10">
        <div className="mx-auto grid max-w-[1100px] gap-8 lg:grid-cols-[1fr_310px]">
          <article className="min-w-0">
            <div className="space-y-6">
              {post.content
                .trim()
                .split("\n\n")
                .map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-[15px] leading-7 text-zinc-700 sm:text-base sm:leading-8"
                  >
                    {paragraph.trim()}
                  </p>
                ))}
            </div>
          </article>

          {/* SIDEBAR */}
          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[20px] border border-violet-100 bg-gradient-to-br from-violet-50/80 to-white p-5 shadow-[0_10px_30px_rgba(76,29,149,0.05)]">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-600">
                Përmbledhje
              </p>

              <h2 className="mt-2 font-serif text-xl font-bold text-zinc-950">
                Pikat kryesore
              </h2>

              <ul className="mt-4 space-y-3">
                {post.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs leading-5 text-zinc-600 sm:text-sm"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[20px] border border-zinc-100 bg-white p-5 shadow-[0_10px_30px_rgba(24,24,27,0.05)]">
              <p className="text-xs font-bold text-zinc-950">
                Ndaje këtë artikull
              </p>

              <div className="mt-4 flex gap-2">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    window.location.href
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ndaje në Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
                >
                  <Facebook className="h-4 w-4" />
                </a>

                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    window.location.href
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ndaje në LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
                >
                  <Linkedin className="h-4 w-4" />
                </a>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `${post.title} ${window.location.href}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ndaje në WhatsApp"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>

                <button
                  type="button"
                  onClick={copyLink}
                  aria-label="Kopjo linkun"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* RELATED POSTS */}
      <section className="border-y border-violet-100 bg-gradient-to-b from-violet-50/40 to-white px-4 py-9 sm:px-5 sm:py-11 lg:px-10">
        <div className="mx-auto max-w-[1100px]">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-600">
            Artikuj të tjerë
          </p>

          <h2 className="mt-2 font-serif text-2xl font-bold text-zinc-950 sm:text-3xl">
            Artikuj të ngjashëm
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {relatedPosts.map((item) => (
              <Link
                key={item.slug}
                to={`/blog/${item.slug}`}
                className="group flex min-w-0 items-center gap-4 rounded-[18px] border border-white bg-white p-3 shadow-[0_10px_30px_rgba(76,29,149,0.05)] transition hover:border-violet-200 hover:shadow-md"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-20 w-24 shrink-0 rounded-xl object-cover sm:h-24 sm:w-32"
                />

                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-violet-600">
                    {item.category}
                  </span>

                  <h3 className="mt-1 line-clamp-2 font-serif text-sm font-bold leading-5 text-zinc-950 transition group-hover:text-violet-700 sm:text-base">
                    {item.title}
                  </h3>

                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-violet-700">
                    Lexo artikullin
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-8 sm:px-5 sm:py-10 lg:px-10">
        <div className="mx-auto max-w-[1100px]">
          <div className="relative overflow-hidden rounded-[24px] border border-violet-100 bg-gradient-to-br from-white via-violet-50/60 to-purple-100/40 px-5 py-7 shadow-[0_18px_48px_rgba(76,29,149,0.08)] sm:px-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
            <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-violet-300/20 blur-3xl" />

            <div className="relative flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-700 to-purple-500 text-white shadow-lg shadow-violet-200">
                <GraduationCap className="h-6 w-6" />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-600">
                  Ke nevojë për ndihmë?
                </p>

                <h2 className="mt-2 font-serif text-xl font-bold text-zinc-950 sm:text-2xl">
                  Merr orientim për punimin tënd
                </h2>

                <p className="mt-1 max-w-xl text-sm leading-6 text-zinc-600">
                  Na shkruaj për temën, strukturën ose analizën që të nevojitet.
                </p>
              </div>
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
              Na shkruani në WhatsApp
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}