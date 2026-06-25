import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, MessageCircle, Video, Gift, Landmark, Globe } from 'lucide-react'
import { SITE_CONFIG } from '../../lib/supabase'

const payMethods = [
  { icon: Landmark, label: 'Bank Transfer' },
  { icon: Globe, label: 'MoneyGram' },
  { icon: Globe, label: 'Ria Money Transfer' },
  { icon: Globe, label: 'Western Union' },
]

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-20 bg-zinc-50">
      <div className="container-academic">
        <div className="text-center mb-12">
          <span className="section-label">Si funksionon pagesa</span>
          <h2 className="section-title mt-2 mb-3">Pagesa kryhet në 2 këste</h2>
          <p className="section-subtitle mx-auto">Paguani vetëm pasi të merrni punën nga ne. Asnjë parapagim.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-8">
          {/* Kesti 1 */}
          <div className="bg-white border border-zinc-100 rounded-2xl p-7 shadow-sm">
            <div className="flex items-start justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center font-serif text-xl font-bold text-amber-700">
                1
              </div>
              <span className="text-xs font-bold bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full">Kesti i parë</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-zinc-900 mb-3">Pas projekt propozimit</h3>
            <p className="text-zinc-600 text-sm leading-relaxed mb-4">
              Kesti i parë kryhet <strong>pasi ju sjellim projekt propozimin</strong> ose pjesën e parë të punës. Fillimisht punojmë, pastaj paguhet.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 leading-relaxed">
                Titulli i temës duhet të jetë i konfirmuar nga pedagogi para fillimit. Ndryshime të titullit pas dorëzimit të pjesës së parë nuk pranohen.
              </p>
            </div>
          </div>

          {/* Kesti 2 */}
          <div className="bg-zinc-900 rounded-2xl p-7">
            <div className="flex items-start justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 flex items-center justify-center font-serif text-xl font-bold text-zinc-900">
                2
              </div>
              <span className="text-xs font-bold bg-amber-400 text-zinc-900 px-3 py-1.5 rounded-full">Kesti i fundit</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-white mb-3">Pas diplomës së përfunduar</h3>
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">
              Lajmëroheni kur punimi ka përfunduar. Kryhet kesti i fundit dhe ju sjellim punimin e plotë.
            </p>
            <div className="bg-white/8 border border-white/15 rounded-xl px-4 py-3 flex items-start gap-2">
              <Video className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-zinc-300 leading-relaxed">
                <strong className="text-amber-400">Prova:</strong> Nëse dëshironi, mund t'ju sjellim video të punimit para pagesës finale.
              </p>
            </div>
          </div>
        </div>

        {/* After payment */}
        <div className="bg-white border border-zinc-100 rounded-2xl p-5 shadow-sm mb-6 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-zinc-700 leading-relaxed">
            Pas pagesës finale bëjmë ndryshimet e kërkuara nga pedagogi juaj. Rregullimet kryhen deri në 3 deri 4 herë, brenda 1 muaji nga dorëzimi.
          </p>
        </div>

        {/* Referral */}
        <div className="bg-gradient-to-r from-amber-400 to-amber-300 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center flex-shrink-0">
            <Gift className="w-6 h-6 text-amber-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-zinc-900 text-base mb-1">Sugjeroni një mik dhe fitoni 10% ulje</p>
            <p className="text-zinc-800 text-sm leading-relaxed">
              Nëse sugjeroni një mik dhe ai kryen punimin e diplomës me ne, ju përfitoni 10% ulje. Plot 400 studentë na sugjerojnë dhe kanë mbetur të kënaqur.
            </p>
          </div>
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-zinc-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-zinc-800 transition-colors flex-shrink-0 whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5" /> Na kontakto
          </a>
        </div>

        {/* Payment methods */}
        <div className="bg-zinc-950 rounded-2xl p-6 mb-8">
          <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-4">Mënyrat e pagesës</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {payMethods.map((m) => (
              <div key={m.label} className="bg-white/6 border border-white/10 rounded-xl p-4 text-center">
                <div className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center mx-auto mb-2">
                  <m.icon className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-white text-xs font-semibold">{m.label}</p>
              </div>
            ))}
          </div>
          <p className="text-zinc-600 text-xs mt-4 text-center">Detajet dërgohen pas konfirmimit të porosisë.</p>
        </div>

        <div className="text-center">
          <Link to="/zgjidh-punimin" className="btn-primary">
            Porosit tani <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
