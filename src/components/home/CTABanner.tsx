import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { SITE_CONFIG } from '../../lib/supabase'

export default function CTABanner() {
  return (
    <section className="py-14 bg-amber-400 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-zinc-900" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-zinc-900" />
      </div>
      <div className="container-academic relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900 mb-2">
              Gati të nisni punimin tuaj?
            </h2>
            <p className="text-zinc-800 text-base max-w-lg">
              Konsultimi është <strong>falas</strong>. Na shkruani tani dhe merrni ofertën brenda 1 ore.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link to="/zgjidh-punimin" className="btn-dark">
              Porosit tani <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={`https://wa.me/${SITE_CONFIG.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              <MessageCircle className="w-4 h-4" /> Konsultim falas
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
