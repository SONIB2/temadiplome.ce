import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, FileText, Download, Eye, BookOpen, LayoutTemplate } from 'lucide-react'
import { SITE_CONFIG } from '../lib/supabase'


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

      {/* Templates */}
      <section className="container-academic mb-14">
        <div className="text-center mb-8">
          <span className="section-label">Shembuj Strukturash</span>
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
