import { Link } from 'react-router-dom'
import { Check, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'
import { supabase, formatPrice } from '../lib/supabase'

interface Package {
  id: string
  name: string
  price_cents: number
  features: string[]
  is_popular: boolean
}

const FIRST = 500

const fallback: Package[] = [
  { id: '1', name: 'Basic', price_cents: 4900, features: ['Konsultim për strukturën', 'Sugjerim teme', 'Udhëzime fillestare'], is_popular: false },
  { id: '2', name: 'Standard', price_cents: 9900, features: ['Rishukim materiali', 'Formatim', 'Referenca APA', 'Sugjerime për përmirësim'], is_popular: true },
  { id: '3', name: 'Premium', price_cents: 19900, features: ['Konsultim i plotë', 'Analizë statistikore', 'PowerPoint për mbrojtje', 'Kontroll përfundimtar'], is_popular: false },
]

const themes: Record<string, { wrapper: string; label: string; price: string; sub: string; check: string; btn: string }> = {
  Basic: {
    wrapper: 'bg-zinc-50 border-zinc-200',
    label: 'text-zinc-500',
    price: 'text-zinc-900',
    sub: 'text-zinc-500',
    check: 'bg-zinc-200 text-zinc-700',
    btn: 'bg-zinc-900 text-white hover:bg-zinc-800',
  },
  Standard: {
    wrapper: 'bg-zinc-900 border-zinc-700',
    label: 'text-amber-400',
    price: 'text-amber-400',
    sub: 'text-zinc-400',
    check: 'bg-white/10 text-zinc-300',
    btn: 'bg-amber-400 text-zinc-900 hover:bg-amber-300',
  },
  Premium: {
    wrapper: 'bg-zinc-800 border-zinc-600',
    label: 'text-zinc-400',
    price: 'text-white',
    sub: 'text-zinc-500',
    check: 'bg-white/10 text-zinc-300',
    btn: 'bg-white text-zinc-900 hover:bg-zinc-100',
  },
}

export default function Packages() {
  const [pkgs, setPkgs] = useState<Package[]>(fallback)

  useEffect(() => {
    supabase.from('packages').select('*').order('sort_order').then(({ data }) => {
      if (data && data.length) setPkgs(data as Package[])
    })
  }, [])

  return (
    <div className="pt-24 pb-20">
      <section className="container-academic text-center mb-10">
        <span className="section-label">Paketat</span>
        <h1 className="section-title mt-2 mb-3">Zgjidh paketën e duhur</h1>
        <p className="section-subtitle mx-auto">Tre paketa me çmime të qarta dhe pagesa me këste.</p>
      </section>

      <section className="container-academic max-w-4xl">
        {/* installment note */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold px-4 py-2 rounded-full">
            <Zap className="w-3.5 h-3.5" />
            Kesti i parë vetëm {FIRST} L — kesti i dytë pas dorëzimit të punës
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pkgs.map((pkg) => {
            const t = themes[pkg.name] || themes.Basic
            const remaining = pkg.price_cents - FIRST
            return (
              <div key={pkg.id} className={`rounded-2xl p-7 border relative ${t.wrapper} ${pkg.is_popular ? 'md:scale-105 ring-2 ring-amber-400 ring-offset-4 ring-offset-white' : ''}`}>
                {pkg.is_popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-zinc-900 text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    MË POPULLORE
                  </span>
                )}
                <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${t.label}`}>Paketa</p>
                <h3 className={`font-serif text-2xl font-bold mb-1 ${t.price}`}>{pkg.name}</h3>
                <p className={`font-serif text-3xl font-bold ${t.price}`}>{formatPrice(pkg.price_cents)}</p>
                <div className="mt-2 mb-5 space-y-0.5">
                  <p className={`text-xs ${t.sub}`}>Kesti i parë: <strong>{FIRST} L</strong></p>
                  <p className={`text-xs ${t.sub}`}>Kesti i dytë: {remaining.toLocaleString()} L pas punës</p>
                </div>
                <ul className="space-y-2.5 mb-7">
                  {pkg.features.map((f, i) => (
                    <li key={i} className={`flex items-start gap-2.5 text-sm ${pkg.is_popular ? 'text-zinc-300' : 'text-zinc-600'}`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${t.check}`}>
                        <Check className="w-3 h-3" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/zgjidh-punimin" className={`w-full inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold text-sm transition-all active:scale-95 ${t.btn}`}>
                  Zgjidh {pkg.name}
                </Link>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
