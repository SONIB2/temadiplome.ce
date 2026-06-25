import { Star, Quote } from 'lucide-react'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

interface Testimonial {
  id: string
  student_name: string
  university: string
  rating: number
  message: string
}

export default function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>([])

  useEffect(() => {
    supabase.from('testimonials').select('*').eq('is_published', true).order('sort_order').then(({ data }) => {
      if (data && data.length) setItems(data as Testimonial[])
    })
  }, [])

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container-academic">
        <div className="text-center mb-10">
          <span className="section-label">Vlerësime</span>
          <h2 className="section-title mt-2 mb-2">Çfarë thonë studentët tanë</h2>
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-sm text-zinc-500 ml-2">4.9/5 nga {items.length || 12}+ studentë</span>
          </div>
        </div>

        {/* Grid - show first 6 on mobile, all on md+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((t, idx) => (
            <div key={t.id} className={`card p-6 relative group hover:-translate-y-0.5 ${idx >= 6 ? 'hidden lg:block' : ''}`}>
              <Quote className="absolute top-4 right-4 w-7 h-7 text-zinc-100 group-hover:text-amber-100 transition-colors" />
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-zinc-700 leading-relaxed mb-5">"{t.message}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-zinc-100">
                <div className="w-9 h-9 rounded-full bg-zinc-900 flex items-center justify-center text-amber-400 font-serif font-bold text-sm flex-shrink-0">
                  {t.student_name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-zinc-900 text-sm truncate">{t.student_name}</p>
                  <p className="text-xs text-zinc-400 truncate">{t.university}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length > 6 && (
          <p className="text-center text-xs text-zinc-400 mt-5">Dhe shumë të tjerë…</p>
        )}
      </div>
    </section>
  )
}
