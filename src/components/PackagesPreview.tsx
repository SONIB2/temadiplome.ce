import { Link } from 'react-router-dom'
import { Check, Zap, MessageCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { supabase, SITE_CONFIG } from '../lib/supabase'

interface Package {
  id: string
  name: string
  price_cents: number
  features: string[]
  is_popular: boolean
}

const fallback: Package[] = [
  { id: '1', name: 'Basic', price_cents: 4900, features: ['Konsultim për strukturën', 'Sugjerim teme', 'Udhëzime fillestare'], is_popular: false },
  { id: '2', name: 'Standard', price_cents: 9900, features: ['Rishukim materiali', 'Formatim', 'Referenca APA', 'Sugjerime'], is_popular: true },
  { id: '3', name: 'Premium', price_cents: 19900, features: ['Konsultim i plotë', 'Analizë statistikore', 'PowerPoint mbrojtje', 'Kontroll përfundimtar'], is_popular: false },
]

const themes: Record<string, { wrapper: string; name: string; price: string; feature: string; btn: string }> = {
  Basic: { wrapper: 'bg-zinc-50 border-zinc-200', name: 'text-zinc-900', price: 'text-zinc-900', feature: 'text-zinc-600', btn: 'bg-zinc-900 text-white hover:bg-zinc-800' },
  Standard: { wrapper: 'bg-zinc-900 border-zinc-700', name: 'text-white', price: 'text-amber-400', feature: 'text-zinc-300', btn: 'bg-amber-400 text-zinc-900 hover:bg-amber-300' },
  Premium: { wrapper: 'bg-zinc-800 border-zinc-600', name: 'text-white', price: 'text-white', feature: 'text-zinc-300', btn: 'bg-white text-zinc-900 hover:bg-zinc-100' },
}

export default function PackagesPreview() {
  const [pkgs, setPkgs] = useState<Package[]>(fallback)

  useEffect(() => {
    supabase.from('packages').select('*').order('sort_order').then(({ data }) => {
      if (data && data.length) setPkgs(data as Package[])
    })
  }, [])

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container-academic">
        <div className="text-center mb-8">
          <span className="section-label">Paketat</span>
          <h2 className="section-title mt-2 mb-3">Paketa të kombinuara</h2>
          <p className="section-subtitle mx-auto">Konsultohuni me ne për paketën e duhur.</p>
        </div>

        <div className="flex justify-center mb-7">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold px-4 py-2 rounded-full">
            <Zap className="w-3.5 h-3.5" />
            Çmimet diskutohen sipas kërkesave — konsultim falas
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {pkgs.map((pkg) => {
            const t = themes[pkg.name] || themes.Basic
            return (
              <div key={pkg.id} className={`rounded-2xl p-7 border relative ${t.wrapper} ${pkg.is_popular ? 'md:scale-105 ring-2 ring-amber-400 ring-offset-4 ring-offset-white' : ''}`}>
                {pkg.is_popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-zinc-900 text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    MË POPULLORE
                  </span>
                )}
                <p className={`text-xs font-bold uppercase tracking-widest mb-2 opacity-50 ${t.name}`}>Paketa</p>
                <h3 className={`font-serif text-2xl font-bold mb-5 ${t.name}`}>{pkg.name}</h3>
                <ul className="space-y-2.5 mb-7">
                  {pkg.features.map((f, i) => (
                    <li key={i} className={`flex items-start gap-2.5 text-sm ${t.feature}`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${pkg.name === 'Basic' ? 'bg-zinc-200' : 'bg-white/15'}`}>
                        <Check className="w-3 h-3" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all active:scale-95 ${t.btn}`}
                >
                  <MessageCircle className="w-4 h-4" /> Diskuto çmimin
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
