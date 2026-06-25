import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, Shield, Clock, CheckCircle2, Instagram } from 'lucide-react'
import { SITE_CONFIG } from '../../lib/supabase'

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center pt-16 pb-12 overflow-hidden bg-zinc-950">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-15"
        poster="https://images.pexels.com/photos/5905857/pexels-photo-5905857.jpeg?auto=compress&cs=tinysrgb&w=1200"
      >
        <source src="https://cdn.coverr.co/videos/coverr-a-girl-studying-in-a-library-1616/1080p.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/85 via-zinc-950/75 to-zinc-950" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-amber-400/8 rounded-full blur-3xl pointer-events-none" />

      <div className="container-academic relative z-10 w-full">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-400 text-xs font-semibold mb-7 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Asistencë Akademike Profesionale
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.08] mb-6">
            Realizojmë<br />
            <span className="text-amber-400">temën tënde</span><br />
            të diplomës.
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 mb-8 leading-relaxed max-w-xl">
            Nga projekt-propozali deri tek diploma e përfunduar. Profesionalizëm, besueshmëri dhe afate të respektuara.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Link to="/zgjidh-punimin" className="btn-primary justify-center">
              Porosit tani <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp justify-center"
            >
              <MessageCircle className="w-4 h-4" /> Konsultim falas WhatsApp
            </a>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { val: '99%', label: 'Sukses', icon: CheckCircle2 },
              { val: '1 orë', label: 'Përgjigje', icon: Clock },
              { val: '100%', label: 'Konfidencial', icon: Shield },
              { val: '+400', label: 'Studentë', icon: CheckCircle2 },
            ].map((s) => (
              <div key={s.val} className="flex items-center gap-2 bg-white/6 border border-white/10 rounded-xl px-4 py-2.5">
                <s.icon className="w-4 h-4 text-amber-400" />
                <span className="font-serif font-bold text-white text-sm">{s.val}</span>
                <span className="text-zinc-400 text-xs">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
            <p className="text-xs text-zinc-400">Preferoni të na shkruani drejtpërdrejt?</p>
            <div className="flex gap-2">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#25D366] text-white text-xs font-semibold px-3 py-2 rounded-xl hover:bg-green-500 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
              </a>
              <a
                href={`https://instagram.com/${SITE_CONFIG.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold px-3 py-2 rounded-xl hover:opacity-90 transition-opacity"
              >
                <Instagram className="w-3.5 h-3.5" /> Instagram
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/20">
        <div className="w-px h-8 bg-white/20 rounded animate-bounce" />
        <span className="text-[10px] uppercase tracking-widest">Zbrit</span>
      </div>
    </section>
  )
}
