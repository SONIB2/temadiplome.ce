import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  X,
  MessageCircle,
  GraduationCap,
  BarChart3,
  Presentation,
  FileText,
  Star,
} from 'lucide-react'
import { SITE_CONFIG } from '../../lib/supabase'

const services = [
  'Konsultim Falas',
  'Strukturim 1 000 L',
  'Referenca APA 2 000 L',
  'SPSS 5 000 L',
  'PowerPoint 3 500 L',
  'Bachelor 18 500 L',
  'Master 25 500 L',
  'Detyrë Kursi në WhatsApp',
]

const cards = [
  {
    title: 'Punime Diplome',
    desc: 'Bachelor dhe Master me strukturë akademike, referenca dhe formatim final.',
    icon: GraduationCap,
  },
  {
    title: 'Analizë & Referenca',
    desc: 'SPSS, tabela, grafikë, interpretim dhe referenca APA.',
    icon: BarChart3,
  },
  {
    title: 'Prezantime',
    desc: 'PowerPoint profesional për mbrojtje, jo i ngarkuar dhe estetik.',
    icon: Presentation,
  },
  {
    title: 'Detyra Kursi',
    desc: 'Detyra dhe projekte sipas lëndës, afatit dhe kërkesave.',
    icon: FileText,
  },
]

const reviews = [
  {
    name: 'A. Hoxha',
    text: 'Më ndihmuan me strukturimin e temës dhe organizimin e kapitujve. Komunikimi ishte shumë korrekt.',
  },
  {
    name: 'E. Berisha',
    text: 'Shërbim profesional dhe shumë i qartë. Çdo hap u sqarua mirë dhe në kohë.',
  },
  {
    name: 'K. Dervishi',
    text: 'Analiza SPSS ishte e kuptueshme, me tabela dhe interpretim të rregullt.',
  },
]

export default function CompactHome() {
  const [openModal, setOpenModal] = useState<'services' | 'reviews' | 'process' | null>(null)

  return (
    <section className="bg-zinc-950 text-white overflow-hidden">
      {/* Moving ticker */}
      <div className="border-y border-white/10 bg-amber-400 text-zinc-950 py-3 overflow-hidden">
        <div className="flex gap-10 whitespace-nowrap animate-[marquee_28s_linear_infinite]">
          {[...services, ...services].map((item, index) => (
            <span key={index} className="text-sm font-bold tracking-wide">
              ✦ {item}
            </span>
          ))}
        </div>
      </div>

      {/* Compact interactive section */}
      <div className="container-academic py-16 sm:py-20">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div>
            <p className="text-amber-400 text-sm font-bold uppercase tracking-[0.25em] mb-5">
              Platformë akademike
            </p>

            <h2 className="font-serif text-4xl sm:text-6xl font-bold leading-tight max-w-3xl">
              Shërbimet, çmimet dhe porosia në një vend.
            </h2>

            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl mt-6">
              Zgjidhni shërbimin, dërgoni kërkesën dhe merrni konfirmim në WhatsApp.
              Pa seksione të gjata, pa paqartësi, vetëm proces i thjeshtë dhe i qartë.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link to="/zgjidh-punimin" className="btn-primary justify-center">
                Porosit tani <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp justify-center"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setOpenModal('services')}
              className="rounded-3xl bg-white text-zinc-950 p-6 text-left hover:-translate-y-1 transition-all duration-300"
            >
              <p className="text-4xl font-serif font-bold text-amber-500 mb-2">08</p>
              <h3 className="font-serif text-xl font-bold mb-2">Shërbime</h3>
              <p className="text-sm text-zinc-500">Shiko kategoritë kryesore.</p>
            </button>

            <button
              onClick={() => setOpenModal('process')}
              className="rounded-3xl bg-zinc-900 border border-white/10 p-6 text-left hover:-translate-y-1 transition-all duration-300"
            >
              <p className="text-4xl font-serif font-bold text-amber-400 mb-2">03</p>
              <h3 className="font-serif text-xl font-bold mb-2">Hapa</h3>
              <p className="text-sm text-zinc-400">Si funksionon porosia.</p>
            </button>

            <button
              onClick={() => setOpenModal('reviews')}
              className="rounded-3xl bg-zinc-900 border border-white/10 p-6 text-left hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <h3 className="font-serif text-xl font-bold mb-2">Reviews</h3>
              <p className="text-sm text-zinc-400">4.9/5 nga studentët.</p>
            </button>

            <Link
              to="/sherbimet"
              className="rounded-3xl bg-amber-400 text-zinc-950 p-6 text-left hover:-translate-y-1 transition-all duration-300"
            >
              <p className="text-4xl font-serif font-bold mb-2">ALL</p>
              <h3 className="font-serif text-xl font-bold mb-2">Çmimet</h3>
              <p className="text-sm text-zinc-800">Shiko listën e plotë.</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white text-zinc-950 rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 relative">
            <button
              onClick={() => setOpenModal(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>

            {openModal === 'services' && (
              <>
                <p className="section-label">Shërbimet</p>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6">
                  Si mund t’ju ndihmojmë?
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  {cards.map((card) => {
                    const Icon = card.icon
                    return (
                      <div key={card.title} className="rounded-2xl border border-zinc-200 p-5">
                        <Icon className="w-6 h-6 text-amber-500 mb-3" />
                        <h3 className="font-serif text-xl font-bold mb-2">{card.title}</h3>
                        <p className="text-sm text-zinc-500">{card.desc}</p>
                      </div>
                    )
                  })}
                </div>

                <Link
                  to="/sherbimet"
                  className="mt-6 inline-flex items-center gap-2 bg-zinc-950 text-white px-5 py-3 rounded-xl font-semibold"
                >
                  Shiko shërbimet dhe çmimet <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}

            {openModal === 'process' && (
              <>
                <p className="section-label">Procesi</p>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6">
                  Si funksionon?
                </h2>

                <div className="space-y-4">
                  {[
                    ['01', 'Zgjidh shërbimin', 'Zgjidhni shërbimin që ju nevojitet dhe plotësoni kërkesën.'],
                    ['02', 'Dërgo detajet', 'Vendosni temën, afatin, universitetin dhe çdo material që keni.'],
                    ['03', 'Merr konfirmimin', 'Ju kontaktojmë në WhatsApp për çmimin dhe hapat e radhës.'],
                  ].map(([num, title, desc]) => (
                    <div key={num} className="rounded-2xl bg-zinc-50 p-5 flex gap-4">
                      <span className="font-serif text-3xl font-bold text-amber-500">{num}</span>
                      <div>
                        <h3 className="font-serif text-xl font-bold">{title}</h3>
                        <p className="text-sm text-zinc-500 mt-1">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {openModal === 'reviews' && (
              <>
                <p className="section-label">Vlerësime</p>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6">
                  Çfarë thonë studentët?
                </h2>

                <div className="grid gap-4">
                  {reviews.map((review) => (
                    <div key={review.name} className="rounded-2xl border border-zinc-200 p-5">
                      <div className="flex gap-1 mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-zinc-600 text-sm mb-4">“{review.text}”</p>
                      <p className="font-semibold text-zinc-950">{review.name}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}