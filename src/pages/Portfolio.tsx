import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, FileText, Download, Eye, BookOpen, LayoutTemplate } from 'lucide-react'
import { SITE_CONFIG } from '../lib/supabase'

const portfolioSamples = [
  {
    title: 'Analizë e Performancës Financiare të Ndërmarrjeve Shqiptare',
    field: 'Financë',
    level: 'Master',
    university: 'Universiteti i Tiranës',
    chapters: 5,
    pages: 80,
    img: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Ndikimi i Marketingut Dixhital në Sjelljen e Konsumatorit',
    field: 'Marketing',
    level: 'Bachelor',
    university: 'Universiteti Europian i Tiranës',
    chapters: 4,
    pages: 65,
    img: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Kujdesi Infermieror dhe Menaxhimi i Pacientit Kritik në ICU',
    field: 'Infermieri',
    level: 'Bachelor',
    university: 'Universiteti i Mjekësisë i Tiranës',
    chapters: 5,
    pages: 70,
    img: 'https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Analiza e Sistemit Juridik dhe E Drejta e Punës në Shqipëri',
    field: 'Juridik',
    level: 'Master',
    university: 'Universiteti i Tiranës',
    chapters: 6,
    pages: 90,
    img: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Menaxhimi i Burimeve Njerëzore dhe Motivimi i Punonjësve',
    field: 'Menaxhim',
    level: 'Bachelor',
    university: 'Kolegji AAB',
    chapters: 4,
    pages: 60,
    img: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Turizmi i Qëndrueshëm dhe Zhvillimi Ekonomik Rajonal',
    field: 'Turizëm',
    level: 'Master',
    university: 'Universiteti Aleksandër Moisiu Durrës',
    chapters: 5,
    pages: 75,
    img: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
]

const templates = [
  {
    name: 'Template Bachelor',
    desc: 'Struktura standarde e diplomës Bachelor: faqe titullore, abstrakti, lista e figurave, kapitulli, referenca APA.',
    pages: '75-100',
    icon: FileText,
    color: 'bg-blue-50 border-blue-200',
    iconColor: 'text-blue-600',
    badge: 'Bachelor',
    badgeColor: 'bg-blue-100 text-blue-700',
  },
  {
    name: 'Template Master',
    desc: 'Struktura e plotë e tezës Master me analizë shkencore, metodologji, konkluzione dhe shtojca.',
    pages: '100-150',
    icon: BookOpen,
    color: 'bg-amber-50 border-amber-200',
    iconColor: 'text-amber-600',
    badge: 'Master',
    badgeColor: 'bg-amber-100 text-amber-700',
  },
  {
    name: 'Template PowerPoint Mbrojtje',
    desc: '12-15 slide profesionale për prezantimin e diplomës: hyrje, gjetjet kryesore, konkluzione.',
    pages: '12-15 slide',
    icon: LayoutTemplate,
    color: 'bg-green-50 border-green-200',
    iconColor: 'text-green-600',
    badge: 'Prezantim',
    badgeColor: 'bg-green-100 text-green-700',
  },
]

const levelColors: Record<string, string> = {
  Bachelor: 'bg-blue-100 text-blue-700',
  Master: 'bg-amber-100 text-amber-700',
}

export default function Portfolio() {
  return (
    <div className="pt-24 pb-20">

      {/* Hero */}
      <section className="container-academic text-center mb-14">
        <span className="section-label">Portofol</span>
        <h1 className="section-title mt-2 mb-4">Punime të realizuara</h1>
        <p className="section-subtitle mx-auto">
          Shembuj reprezentativë nga punimet tona. Çdo punë është unike, e shkruar nga e para dhe e personalizuar sipas kërkesave tuaja.
        </p>
      </section>

      {/* Portfolio grid */}
      <section className="container-academic mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {portfolioSamples.map((p) => (
            <div key={p.title} className="bg-white border border-zinc-100 rounded-2xl overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200 group flex flex-col">
              <div className="relative h-44 overflow-hidden">
                <img
                  src={p.img}
                  alt={p.field}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/70 to-transparent" />
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${levelColors[p.level] || 'bg-zinc-200 text-zinc-700'}`}>
                    {p.level}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/90 text-zinc-800">
                    {p.field}
                  </span>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-serif font-semibold text-zinc-900 text-sm leading-snug mb-3 flex-1">{p.title}</h3>
                <div className="text-xs text-zinc-400 space-y-1 border-t border-zinc-100 pt-3">
                  <p>{p.university}</p>
                  <div className="flex gap-3 text-zinc-500">
                    <span>{p.chapters} kapituj</span>
                    <span>{p.pages} faqe</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center">
          <p className="text-sm text-amber-800 leading-relaxed">
            Punimet e mësipërme janë tregues orientues. Çdo punë e re kryhet nga e para, me temë dhe kërkesa unike.
            Nëse dëshironi të shikoni shembuj nga fusha juaj specifike,{' '}
            <a href={`https://wa.me/${SITE_CONFIG.whatsapp}`} target="_blank" rel="noopener noreferrer" className="font-bold underline text-amber-700 hover:text-amber-900">
              na kontaktoni direkt
            </a>.
          </p>
        </div>
      </section>

      {/* Templates */}
      <section className="container-academic mb-14">
        <div className="text-center mb-8">
          <span className="section-label">Struktura</span>
          <h2 className="section-title mt-2 mb-3">Template Universitare</h2>
          <p className="section-subtitle mx-auto">
            Çdo punë ndiqet sipas strukturës standarde të universitetit përkatës dhe udhëzimeve të pedagogut.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {templates.map((t) => (
            <div key={t.name} className={`border-2 rounded-2xl p-6 ${t.color}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm">
                  <t.icon className={`w-5 h-5 ${t.iconColor}`} />
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${t.badgeColor}`}>{t.badge}</span>
              </div>
              <h3 className="font-serif font-bold text-zinc-900 text-base mb-2">{t.name}</h3>
              <p className="text-zinc-600 text-xs leading-relaxed mb-3">{t.desc}</p>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Eye className="w-3.5 h-3.5" />
                <span>{t.pages} faqe</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-zinc-950 rounded-2xl p-6 text-center">
          <p className="text-zinc-400 text-sm mb-4">
            Keni nevojë për template specifike të universitetit tuaj? Na dërgoni udhëzimet dhe i personalizojmë.
          </p>
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <Download className="w-4 h-4" /> Kërko template falas
          </a>
        </div>
      </section>

      {/* Process quality */}
      <section className="container-academic mb-14">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { n: '01', title: 'Origjinale 100%', text: 'Çdo punë shkruhet nga e para, me burime dhe referenca origjinale.' },
            { n: '02', title: 'Standard Akademik', text: 'Ndiqet stili APA ose çdo stil tjetër që kërkon universiteti juaj.' },
            { n: '03', title: 'Kontroll i Kualitetit', text: 'Para dorëzimit, punimi kalon kontroll të brendshëm të cilësisë.' },
          ].map((s) => (
            <div key={s.n} className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm">
              <div className="font-serif text-3xl font-bold text-amber-400 mb-3">{s.n}</div>
              <h3 className="font-serif font-bold text-zinc-900 mb-2">{s.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-academic">
        <div className="bg-zinc-950 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <h2 className="font-serif text-3xl font-bold text-white mb-3">Gati të fillojmë punimin tuaj?</h2>
            <p className="text-zinc-400 mb-7 max-w-md mx-auto text-sm leading-relaxed">
              Konsultimi është falas. Na tregoni temën dhe ju japim vlerësim të menjëhershëm.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/zgjidh-punimin" className="btn-primary justify-center">
                Porosit tani <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp justify-center"
              >
                <MessageCircle className="w-4 h-4" /> Konsultim falas
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
