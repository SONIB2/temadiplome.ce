import { Link } from 'react-router-dom'
import { ArrowRight, Award, Clock, Users, Shield } from 'lucide-react'

const reasons = [
  { icon: Award, title: '99% Sukses', text: 'Mbi 99% e studentëve tanë mbrohen me sukses falë punimeve tona.' },
  { icon: Clock, title: 'Brenda 1 ore', text: 'Ekipi përgjigjet çdo ditë brenda 1 orës nga dërgimi i mesazhit.' },
  { icon: Users, title: 'Komunikim i vazhdueshëm', text: 'Gjatë gjithë procesit jeni në kontakt me ne për çdo ndryshim.' },
  { icon: Shield, title: '100% Konfidencial', text: 'Informacioni juaj është i mbrojtur dhe nuk ndahet me asnjë palë të tretë.' },
]

export default function WhyUs() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container-academic">
        <div className="text-center mb-10">
          <span className="section-label">Pse të na zgjedhin</span>
          <h2 className="section-title mt-2 mb-3">Arsyet për të na besuar</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map((r, i) => (
            <div key={i} className="card p-6 group hover:-translate-y-0.5 text-center sm:text-left">
              <div className="w-11 h-11 rounded-xl bg-zinc-100 group-hover:bg-amber-100 flex items-center justify-center mb-4 mx-auto sm:mx-0 transition-colors">
                <r.icon className="w-5 h-5 text-zinc-700 group-hover:text-amber-600 transition-colors" />
              </div>
              <h3 className="font-serif text-base font-semibold text-zinc-900 mb-1.5">{r.title}</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/rreth-nesh" className="inline-flex items-center gap-2 text-amber-600 text-sm font-semibold hover:underline">
            Më shumë rreth nesh <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
