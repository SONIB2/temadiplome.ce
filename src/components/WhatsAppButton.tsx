import { MessageCircle } from 'lucide-react'
import { SITE_CONFIG } from '../lib/supabase'

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 bg-[#25D366] text-white pl-4 pr-5 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:bg-green-500 active:scale-95 transition-all duration-200 group"
      aria-label="Na kontakto në WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="text-sm font-semibold hidden sm:block">Na shkruani</span>
      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white" />
    </a>
  )
}
