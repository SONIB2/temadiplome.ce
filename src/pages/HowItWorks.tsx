import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, MessageCircle, Landmark, Globe } from 'lucide-react'
import { SITE_CONFIG } from '../lib/supabase'

const phases = [
  {
    num: '01',
    badge: 'Kesti i parë',
    title: 'Projekt Proposal',
    text: 'Pas konfirmimit të temës dhe nënshkrimit të marrëveshjes, dorëzojmë Projekt Propozalin. Këtu kryhet kesti i parë i pagesës.',
    bg: 'bg-amber-400',
    textColor: 'text-zinc-900',
  },
  {
    num: '02',
    badge: null,
    title: 'Gjysma e diplomës',
    text: 'Ju sjellim gjysmën e diplomës të punuar plotësisht. Gjatë gjithë kësaj kohe jeni në kontakt me ne për çdo ndryshim të nevojshëm.',
    bg: 'bg-zinc-900',
    textColor: 'text-white',
  },
  {
    num: '03',
    badge: 'Kesti i fundit',
    title: 'Diploma e përfunduar',
    text: 'Ju njoftojmë se puna ka përfunduar. Kryhet kesti i fundit dhe ju sjellim diplomën të përfunduar plotësisht.',
    bg: 'bg-zinc-800',
    textColor: 'text-white',
  },
]

const payMethods = [
  { icon: Landmark, label: 'Bank Transfer', desc: 'Transfer bankar direkt' },
  { icon: Globe, label: 'MoneyGram', desc: 'Ndërkombëtar' },
  { icon: Globe, label: 'Ria Money Transfer', desc: 'Ndërkombëtar' },
  { icon: Globe, label: 'Western Union', desc: 'Ndërkombëtar' },
]

export default function HowItWorksPage() {
  return (
    <div className="pt-24 pb-20">
      <section className="container-academic text-center mb-14">
        <span className="section-label">Procesi</span>
        <h1 className="section-title mt-2 mb-3">Si funksionon</h1>
        <p className="section-subtitle mx-auto">Punën e sjellim në 3 faza, me komunikim të vazhdueshëm gjatë gjithë procesit.</p>
      </section>

      {/* 3 phases */}
      <section className="container-academic max-w-3xl mb-14">
        <div className="space-y-4">
          {phases.map((phase, i) => (
            <div key={i} className={`rounded-2xl p-7 ${phase.bg} relative overflow-hidden`}>
              <div className="flex items-start gap-5">
                <span className={`font-serif text-5xl font-bold opacity-20 flex-shrink-0 ${phase.textColor}`}>{phase.num}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className={`font-serif text-xl font-bold ${phase.textColor}`}>{phase.title}</h3>
                    {phase.badge && (
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${phase.bg === 'bg-amber-400' ? 'bg-zinc-900/20 text-zinc-900' : 'bg-amber-400 text-zinc-900'}`}>
                        {phase.badge}
                      </span>
                    )}
                  </div>
                  <p className={`text-sm leading-relaxed ${phase.bg === 'bg-amber-400' ? 'text-zinc-800' : 'text-zinc-300'}`}>{phase.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Key note */}
        <div className="mt-6 bg-zinc-50 border-l-4 border-amber-400 rounded-xl p-5 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-zinc-700 leading-relaxed">
            <strong>Gjatë gjithë procesit dhe pas përfundimit</strong> — jeni në kontakt të vazhdueshëm me ekipin tonë për çdo ndryshim të nevojshëm. Ndryshimet kryhen deri në 3 herë, brenda 1 muaji nga dorëzimi.
          </p>
        </div>
      </section>

      {/* Payment methods */}
      <section className="container-academic max-w-3xl mb-14">
        <div className="bg-zinc-950 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/5 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h2 className="font-serif text-2xl font-bold text-white mb-1">Mënyrat e pagesës</h2>
            <p className="text-zinc-400 text-sm mb-6">Detajet dërgohen pas konfirmimit të porosisë.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {payMethods.map((m, i) => (
                <div key={i} className="bg-white/8 border border-white/10 rounded-xl p-4 text-center">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center mx-auto mb-2">
                    <m.icon className="w-4 h-4 text-amber-400" />
                  </div>
                  <p className="font-semibold text-white text-sm">{m.label}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-academic max-w-3xl text-center">
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/zgjidh-punimin" className="btn-primary">
            Porosit tani <ArrowRight className="w-4 h-4" />
          </Link>
          <a href={`https://wa.me/${SITE_CONFIG.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <MessageCircle className="w-4 h-4" /> Konsultim falas në WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
