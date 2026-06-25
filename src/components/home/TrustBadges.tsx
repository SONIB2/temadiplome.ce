import { Shield, CheckCircle2, Lock, Star, Clock, Users } from 'lucide-react'

const badges = [
  { icon: Shield, title: '100% Konfidencial', text: 'Çdo informacion ruhet me absolute diskreccion. Nuk ndahet me asnjë palë të tretë.' },
  { icon: CheckCircle2, title: '99% Sukses', text: 'Studentët tanë mbrohen me sukses falë punimeve të standardit të lartë akademik.' },
  { icon: Clock, title: 'Përgjigje brenda 1 ore', text: 'Ekipi ynë është aktiv çdo ditë dhe përgjigjet shpejt për çdo kërkesë.' },
  { icon: Lock, title: 'Pagesa e Sigurt', text: 'Bank Transfer, MoneyGram, Ria dhe Western Union — metoda të besueshme ndërkombëtare.' },
  { icon: Star, title: 'Cilësi e Garantuar', text: 'Çdo punim kalon nëpër kontroll të brendshëm para dorëzimit tek klienti.' },
  { icon: Users, title: 'Ekip Profesional', text: 'Punojmë me specialistë të fushave të ndryshme akademike për çdo lloj punimi.' },
]

export default function TrustBadges() {
  return (
    <section className="py-14 sm:py-16 bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-amber-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-amber-400 rounded-full blur-3xl" />
      </div>
      <div className="container-academic relative z-10">
        {/* Main trust headline */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-400 text-zinc-900 px-5 py-2.5 rounded-full font-bold text-sm mb-5 shadow-lg">
            <Shield className="w-4 h-4" />
            100% të pastër dhe të saktë
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
            Besueshmëria është prioriteti ynë
          </h2>
          <p className="text-zinc-400 text-base max-w-xl mx-auto">
            Çdo student që bashkëpunon me ne firmos një <strong className="text-white">Marrëveshje Bashkëpunimi</strong> — transparencë totale nga fillimi deri në fund.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((b, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors group">
              <div className="w-11 h-11 rounded-xl bg-amber-400/15 group-hover:bg-amber-400 flex items-center justify-center mb-4 transition-colors">
                <b.icon className="w-5 h-5 text-amber-400 group-hover:text-zinc-900 transition-colors" />
              </div>
              <h3 className="font-serif text-base font-bold text-white mb-2">{b.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
