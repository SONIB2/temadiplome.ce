import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'

const posts = [
  {
    slug: 'si-te-zgjedhesh-temen-e-diplomes',
    title: 'Si të zgjedhësh temën e diplomës?',
    category: 'Diplomë',
    date: '2026-01-10',
    image:
      'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=1200',
    content: `
Zgjedhja e temës së diplomës është një nga hapat më të rëndësishëm në procesin akademik. Një temë e mirë duhet të jetë e qartë, e realizueshme dhe e lidhur ngushtë me degën tuaj të studimit.

Fillimisht, duhet të mendoni për fushën që ju intereson më shumë. Një temë që lidhet me interesin tuaj personal është më e lehtë për t’u zhvilluar dhe ju ndihmon të ruani motivimin gjatë gjithë procesit.

Së dyti, tema duhet të ketë burime të mjaftueshme literature. Para se të vendosni përfundimisht, kontrolloni nëse ekzistojnë libra, artikuj shkencorë, raporte ose studime të mëparshme që mund të përdoren si bazë teorike.

Së treti, tema duhet të jetë specifike. Një temë shumë e gjerë e bën punimin të paqartë, ndërsa një temë shumë e ngushtë mund të mos ketë material të mjaftueshëm. Zgjidhja më e mirë është një temë e fokusuar, por me hapësirë për analizë.

Në fund, konsultohuni me pedagogun udhëheqës përpara se ta finalizoni temën. Miratimi i tij/saj ju ndihmon të shmangni ndryshime të mëvonshme dhe ta nisni punimin me drejtim të qartë.
    `,
  },
  {
    slug: 'si-strukturohet-nje-punim-diplome',
    title: 'Si strukturohet një punim diplome?',
    category: 'Strukturim',
    date: '2026-01-18',
    image:
      'https://images.pexels.com/photos/5905885/pexels-photo-5905885.jpeg?auto=compress&cs=tinysrgb&w=1200',
    content: `
Një punim diplome duhet të ketë strukturë të qartë dhe logjike. Struktura ndihmon lexuesin të kuptojë qëllimin e studimit, literaturën, metodologjinë, analizën dhe përfundimet.

Zakonisht, punimi nis me hyrjen, ku prezantohet tema, rëndësia e saj, qëllimi i studimit, objektivat dhe pyetjet kërkimore. Hyrja duhet të jetë e qartë dhe të tregojë pse tema është e rëndësishme.

Kapitulli teorik përfshin literaturën shkencore dhe konceptet kryesore që lidhen me temën. Këtu përdoren libra, artikuj, raporte dhe burime të tjera akademike.

Metodologjia shpjegon mënyrën si është realizuar studimi. Nëse përdoret pyetësor, intervistë ose analizë dokumentesh, kjo duhet të përshkruhet qartë.

Kapitulli i analizës paraqet rezultatet dhe interpretimin e tyre. Në fund vendosen konkluzionet dhe rekomandimet, të cilat duhet të lidhen drejtpërdrejt me qëllimin dhe objektivat e punimit.
    `,
  },
  {
    slug: 'gabimet-me-te-shpeshta-ne-tema-diplome',
    title: 'Gabimet më të shpeshta në temat e diplomës',
    category: 'Këshilla',
    date: '2026-02-02',
    image:
      'https://images.pexels.com/photos/4778611/pexels-photo-4778611.jpeg?auto=compress&cs=tinysrgb&w=1200',
    content: `
Një nga gabimet më të shpeshta në temat e diplomës është mungesa e strukturës së qartë. Kur kapitujt nuk lidhen mirë me njëri-tjetrin, punimi duket i paorganizuar dhe i vështirë për t’u ndjekur.

Një tjetër problem është përdorimi i burimeve të dobëta ose joakademike. Punimi duhet të mbështetet në literaturë serioze, si libra, artikuj shkencorë, raporte institucionale dhe burime të besueshme.

Shumë studentë bëjnë gabim edhe me referencat. Citimet në tekst dhe lista e referencave duhet të jenë në të njëjtin stil, për shembull APA, dhe të jenë të plota.

Në punimet me pyetësor, një gabim i zakonshëm është interpretimi i dobët i rezultateve. Nuk mjafton të vendosen vetëm tabela dhe grafikë; ato duhet të shpjegohen dhe të lidhen me hipotezat ose objektivat.

Për të shmangur këto gabime, punimi duhet planifikuar me kujdes, të rishikohet disa herë dhe të kontrollohet për strukturë, gjuhë, citime dhe përputhje me rregulloren e universitetit.
    `,
  },
  {
    slug: 'si-te-perdoresh-referencat-apa',
    title: 'Si të përdorësh referencat APA?',
    category: 'APA',
    date: '2026-02-15',
    image:
      'https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg?auto=compress&cs=tinysrgb&w=1200',
    content: `
Stili APA përdoret gjerësisht në punimet akademike dhe ndihmon në paraqitjen e saktë të burimeve. Çdo burim që përdoret në tekst duhet të shfaqet edhe në listën e referencave.

Në citimet brenda tekstit zakonisht vendoset mbiemri i autorit dhe viti i publikimit. Për shembull: (Hoxha, 2022). Nëse përdoret citim direkt, duhet të vendoset edhe faqja.

Lista e referencave vendoset në fund të punimit dhe duhet të jetë e renditur alfabetikisht. Formatimi ndryshon sipas llojit të burimit: libër, artikull shkencor, raport, faqe interneti ose ligj.

Një gabim i zakonshëm është vendosja e linkeve pa autor, pa vit ose pa titull. Referencat duhet të jenë të plota dhe të kontrolluara.

Përdorimi korrekt i APA-s e bën punimin më profesional dhe shmang problemet me plagjiaturën.
    `,
  },
  {
    slug: 'kur-duhet-analiza-spss-ne-punim',
    title: 'Kur duhet analiza SPSS në një punim?',
    category: 'SPSS',
    date: '2026-03-03',
    image:
      'https://images.pexels.com/photos/669622/pexels-photo-669622.jpeg?auto=compress&cs=tinysrgb&w=1200',
    content: `
Analiza SPSS përdoret kur punimi përfshin të dhëna sasiore, si pyetësorë, variabla, hipoteza ose krahasime statistikore.

Nëse keni mbledhur përgjigje nga studentë, klientë, pacientë, biznese ose grupe të tjera, SPSS ndihmon në përpunimin e të dhënave dhe paraqitjen e rezultateve në mënyrë të qartë.

Analizat më të zakonshme përfshijnë statistikat përshkruese, frekuencat, mesataret, korrelacionin, regresionin dhe testimin e hipotezave.

SPSS është i rëndësishëm sepse i jep punimit bazë më të fortë empirike. Megjithatë, rezultatet nuk duhet vetëm të vendosen në tabela; ato duhet të interpretohen dhe të lidhen me qëllimin e studimit.

Nëse punimi ka pyetësor dhe hipoteza, analiza statistikore është shpesh pjesë e domosdoshme e kapitullit të rezultateve.
    `,
  },
  {
    slug: 'si-te-pergatitesh-per-mbrojtjen-e-diplomes',
    title: 'Si të përgatitesh për mbrojtjen e diplomës?',
    category: 'Prezantim',
    date: '2026-03-20',
    image:
      'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200',
    content: `
Mbrojtja e diplomës kërkon përgatitje të mirë dhe prezantim të qartë. Qëllimi nuk është të lexoni të gjithë punimin, por të tregoni pjesët më të rëndësishme.

PowerPoint-i duhet të jetë i thjeshtë, profesional dhe jo shumë i ngarkuar. Ai duhet të përfshijë temën, qëllimin, metodologjinë, rezultatet kryesore, konkluzionet dhe rekomandimet.

Gjatë prezantimit, flisni qartë dhe përqendrohuni te argumentet kryesore. Mos vendosni shumë tekst në slide, sepse kjo e bën prezantimin të vështirë për t’u ndjekur.

Përgatituni edhe për pyetje nga komisioni. Pyetjet zakonisht lidhen me metodologjinë, rezultatet, literaturën dhe arsyet pse keni zgjedhur temën.

Një prezantim i mirë tregon që e kuptoni punimin tuaj dhe jeni të përgatitur për ta mbrojtur atë.
    `,
  },
]

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString('sq-AL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })

  if (!post) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="font-serif text-4xl font-bold text-zinc-900 mb-4">
          Artikulli nuk u gjet
        </h1>
        <Link to="/blog" className="text-amber-600 font-semibold">
          Kthehu te blogu
        </Link>
      </div>
    )
  }

  return (
    <article className="pt-28 pb-20 bg-white">
      <div className="container-academic max-w-4xl">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Kthehu te blogu
        </Link>

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
              <Tag className="w-3 h-3" />
              {post.category}
            </span>

            <span className="inline-flex items-center gap-1 text-xs text-zinc-400">
              <Calendar className="w-3 h-3" />
              {fmt(post.date)}
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-zinc-950 leading-tight mb-5">
            {post.title}
          </h1>
        </div>

        <div className="rounded-3xl overflow-hidden mb-10">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[260px] sm:h-[420px] object-cover"
          />
        </div>

        <div className="prose prose-zinc max-w-none">
          {post.content
            .trim()
            .split('\n\n')
            .map((paragraph, index) => (
              <p key={index} className="text-zinc-700 leading-8 text-base sm:text-lg mb-5">
                {paragraph.trim()}
              </p>
            ))}
        </div>
      </div>
    </article>
  )
}