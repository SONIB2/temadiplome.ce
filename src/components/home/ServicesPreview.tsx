import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import * as Icons from 'lucide-react'

interface Service {
  id: string
  title: string
  description: string
  includes: string[]
  price_note: string
  icon: string
}

export default function ServicesPreview() {
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    supabase.from('services').select('*').order('sort_order').then(({ data }) => {
      if (data && data.length) setServices(data as Service[])
    })
  }, [])

  const priceColor = (p: string) => {
    if (p === 'Falas') return 'bg-green-100 text-green-700'
    if (p === 'Pyet në WhatsApp') return 'bg-zinc-100 text-zinc-600'
    return 'bg-amber-50 text-amber-700'
  }

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container-academic">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="section-label">Shërbimet</span>
            <h2 className="section-title mt-2">Çfarë ofrojmë</h2>
          </div>
          <Link to="/sherbimet" className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-600 hover:text-amber-700 whitespace-nowrap">
            Shiko të gjitha <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service) => {
            const Icon = (Icons as any)[service.icon] || Icons.FileText
            return (
              <div key={service.id} className="card p-5 group hover:-translate-y-0.5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 group-hover:bg-amber-100 flex items-center justify-center transition-colors flex-shrink-0">
                    <Icon className="w-5 h-5 text-zinc-700 group-hover:text-amber-600 transition-colors" />
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${priceColor(service.price_note)}`}>
                    {service.price_note}
                  </span>
                </div>
                <h3 className="font-serif text-base font-semibold text-zinc-900 mb-1.5 leading-snug">{service.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed mb-3">{service.description}</p>
                <Link to={service.price_note === 'Pyet në WhatsApp' ? '/kontakt' : '/zgjidh-punimin'} className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-900 hover:text-amber-600 transition-colors">
                  {service.price_note === 'Pyet në WhatsApp' ? 'Na kontakto' : 'Porosit'} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
