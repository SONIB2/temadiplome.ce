import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, MessageCircle, Landmark, Globe, Shield } from 'lucide-react'
import { SITE_CONFIG } from '../lib/supabase'
import * as Icons from 'lucide-react'

interface Service {
  id: string
  title: string
  description: string
  includes: string[]
  price_note: string
  icon: string
}

const services: Service[] = [
  {
    id: '1',
    title: 'Konsultim Falas',
    description: 'Diskutim fillestar për temën, kërkesat, afatin dhe mënyrën e realizimit.',
    price_note: 'Falas',
    icon: 'MessageCircle',
    includes: [
      'Analizë fillestare e kërkesës',
      'Orientim për strukturën',
      'Sugjerime për hapat e radhës',
    ],
  },
  {
    id: '2',
    title: 'Strukturim dhe Organizim',
    description: 'Ndihmë për strukturën e punimit, ndarjen e kapitujve dhe organizimin akademik.',
    price_note: '1 000 L',
    icon: 'ListChecks',
    includes: [
      'Ndarje kapitujsh',
      'Objektiva dhe metodologji',
      'Plan pune i qartë',
    ],
  },
  {
    id: '3',
    title: 'Referenca APA',
    description: 'Rregullim dhe formatim i referencave sipas stilit APA.',
    price_note: '2 000 L',
    icon: 'BookOpen',
    includes: [
      'Citimet në tekst',
      'Lista e referencave',
      'Formatim sipas APA',
    ],
  },
  {
    id: '4',
    title: 'Analizë SPSS',
    description: 'Përpunim të dhënash, tabela, grafikë dhe interpretim i rezultateve statistikore.',
    price_note: '5 000 L',
    icon: 'BarChart3',
    includes: [
      'Statistika përshkruese',
      'Korrelacion / regresion',
      'Interpretim akademik',
    ],
  },
  {
    id: '5',
    title: 'PowerPoint',
    description: 'Prezantim profesional për mbrojtje diplome, detyrë kursi ose projekt akademik.',
    price_note: '3 500 L',
    icon: 'Presentation',
    includes: [
      'Dizajn profesional',
      'Slide jo të ngarkuara',
      'Përmbledhje e qartë',
    ],
  },
  {
    id: '6',
    title: 'Diplomë Bachelor',
    description: 'Asistencë për strukturim, zhvillim, formatim dhe përgatitje të punimit Bachelor.',
    price_note: '18 500 L',
    icon: 'GraduationCap',
    includes: [
      'Strukturim i plotë',
      'Kapituj teorikë dhe analizë',
      'Formatim final',
    ],
  },
  {
    id: '7',
    title: 'Diplomë Master',
    description: 'Asistencë më e plotë akademike për punim Master, analizë dhe përgatitje finale.',
    price_note: '25 500 L',
    icon: 'Award',
    includes: [
      'Punim i strukturuar',
      'Literaturë dhe analizë',
      'Përgatitje finale',
    ],
  },
  {
    id: '8',
    title: 'Detyrë Kursi',
    description: 'Detyra kursi sipas lëndës, volumit, afatit dhe kërkesave specifike.',
    price_note: 'Diskutohet në WhatsApp',
    icon: 'FileText',
    includes: [
      'Çmim sipas volumit',
      'Afat sipas kërkesës',
      'Komunikim në WhatsApp',
    ],
  },
]

const payMethods = [
  { icon: Landmark, label: 'Bank Transfer', desc: 'Llogari bankare shqiptare ose ndërkombëtare' },
  { icon: Globe, label: 'MoneyGram', desc: 'Transfer i shpejtë ndërkombëtar' },
  { icon: Globe, label: 'Ria Money Transfer', desc: 'Transfer ndërkombëtar' },
  { icon: Globe, label: 'Western Union', desc: 'Transfer ndërkombëtar i besueshëm' },
]

export default function Services() {
  const priceColor = (p: string) => {
    if (p === 'Falas') return 'bg-green-100 text-green-700 border border-green-200'
    if (p === 'Diskutohet në WhatsApp') return 'bg-zinc-100 text-zinc-600 border border-zinc-200'
    return 'bg-amber-50 text-amber-700 border border-amber-200'
  }

  return (
    <div className="pt-24 pb-20">
      <section className="container-academic text-center mb-12">
        <span className="section-label">Shërbimet</span>
        <h1 className="section-title mt-2 mb-3">Shërbimet tona akademike</h1>
        <p className="section-subtitle mx-auto">
          Çmimet janë transparente. Konsultimi është gjithmonë <strong>falas</strong>.
        </p>
      </section>

      <section className="container-academic mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => {
            const Icon = (Icons as any)[service.icon] || Icons.FileText
            const isWhatsApp = service.price_note === 'Diskutohet në WhatsApp'
            const isFree = service.price_note === 'Falas'

            return (
              <div
                key={service.id}
                className={`card p-6 group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ${
                  isFree ? 'ring-2 ring-green-300 ring-offset-2' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-zinc-100 group-hover:bg-amber-100 flex items-center justify-center transition-colors flex-shrink-0">
                    <Icon className="w-5 h-5 text-zinc-700 group-hover:text-amber-600 transition-colors" />
                  </div>

                  <span className={`text-sm font-bold px-3 py-1.5 rounded-xl ${priceColor(service.price_note)}`}>
                    {service.price_note}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-semibold text-zinc-900 mb-2 leading-snug">
                  {service.title}
                </h3>

                <p className="text-sm text-zinc-500 leading-relaxed mb-4">
                  {service.description}
                </p>

                <ul className="space-y-1.5 mb-5">
                  {service.includes.map((inc, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-zinc-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                      {inc}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-zinc-100">
                  {isWhatsApp ? (
                    <a
                      href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full btn-whatsapp text-xs px-4 py-2.5 justify-center"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Diskuto çmimin
                    </a>
                  ) : (
                    <Link
                      to="/zgjidh-punimin"
                      className="w-full btn-dark text-xs px-4 py-2.5 justify-center"
                    >
                      {isFree ? 'Kërko konsultim falas' : 'Porosit tani'}{' '}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="container-academic">
        <div className="bg-zinc-950 rounded-3xl p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-zinc-900" />
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-white">
                  Mënyrat e pagesës
                </h2>
                <p className="text-zinc-400 text-sm">
                  Pagesat kryhen me metoda ndërkombëtare të besueshme
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {payMethods.map((m, i) => (
                <div
                  key={i}
                  className="bg-white/8 border border-white/10 rounded-xl p-4 text-center hover:bg-white/12 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center mx-auto mb-2.5">
                    <m.icon className="w-4 h-4 text-amber-400" />
                  </div>

                  <p className="font-semibold text-white text-sm">{m.label}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{m.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-zinc-500 text-xs mt-5 text-center">
              Detajet e plota të llogarisë dërgohen pas konfirmimit të porosisë përmes WhatsApp ose email.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}