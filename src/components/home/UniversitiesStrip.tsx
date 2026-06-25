import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap, MapPin } from 'lucide-react'

const uniStrip = [
  'Universiteti i Tiranës',
  'Universiteti i Mjekësisë',
  'Universiteti Bujqësor',
  'UET Tiranë',
  'Universiteti Luarasi',
  'Kolegji AAB',
  'Universiteti i Prishtinës',
  'Kolegji UBT',
  'Kolegji Heimerer',
  'Albanian University',
  'Universiteti AMED',
  'Universiteti i Vlorës',
  'Kolegji Iliria',
  'Kolegji FAMA',
  'Universiteti Fan S. Noli',
  'Universiteti i Elbasanit',
]

const countries = [
  { flag: '🇦🇱', name: 'Shqipëri' },
  { flag: '🇽🇰', name: 'Kosovë' },
  { flag: '🇲🇰', name: 'Maqedoni' },
  { flag: '🇲🇪', name: 'Mal i Zi' },
]

export default function UniversitiesStrip() {
  return (
    <section className="py-14 bg-white border-t border-zinc-100">
      <div className="container-academic">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="section-label">Mbulimi ynë</span>
            <h2 className="font-serif text-2xl font-bold text-zinc-900 mt-1">
              60+ Universitete nga 4 shtete
            </h2>
          </div>
          <div className="flex gap-3 flex-wrap">
            {countries.map((c) => (
              <div key={c.name} className="flex items-center gap-1.5 bg-zinc-100 rounded-xl px-3 py-2">
                <span>{c.flag}</span>
                <span className="text-xs font-semibold text-zinc-700">{c.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scrolling strip */}
        <div className="relative overflow-hidden rounded-2xl bg-zinc-50 border border-zinc-100 py-4">
          <div className="flex gap-3 animate-scroll-x whitespace-nowrap">
            {[...uniStrip, ...uniStrip].map((u, i) => (
              <div key={i} className="inline-flex items-center gap-2 bg-white border border-zinc-100 rounded-xl px-4 py-2.5 shadow-sm flex-shrink-0">
                <GraduationCap className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                <span className="text-xs font-medium text-zinc-700">{u}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <MapPin className="w-4 h-4 text-amber-500" />
            <span>Punojmë edhe me universitete të tjera. Na kontaktoni.</span>
          </div>
          <Link
            to="/universitetet"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
          >
            Shiko të gjitha <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
