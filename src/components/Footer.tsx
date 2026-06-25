import { Link } from 'react-router-dom'
import { GraduationCap, Mail, Instagram, MessageCircle, Clock } from 'lucide-react'
import { SITE_CONFIG } from '../lib/supabase'

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 pt-14 pb-8 mt-20">
      <div className="container-academic">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">

          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-zinc-900" />
              </div>
              <span className="font-serif text-lg font-bold text-white">
                temadiplome<span className="text-amber-400">.ce</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-500 mb-5">
              Asistencë akademike profesionale. 99% sukses. Përgjigje brenda 1 ore. 100% konfidencial.
            </p>
            <div className="flex gap-2 mb-3">
              <a href={`https://wa.me/${SITE_CONFIG.whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-[#25D366] flex items-center justify-center transition-colors" title="WhatsApp">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href={`https://instagram.com/${SITE_CONFIG.instagram}`} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-zinc-800 flex items-center justify-center hover:opacity-80 transition-opacity" title={`@${SITE_CONFIG.instagram}`}>
                <Instagram className="w-4 h-4" />
              </a>
              <a href={`mailto:${SITE_CONFIG.email}`}
                className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-amber-400 hover:text-zinc-900 flex items-center justify-center transition-colors" title={SITE_CONFIG.email}>
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <a href={`https://instagram.com/${SITE_CONFIG.instagram}`} target="_blank" rel="noopener noreferrer"
              className="text-xs text-zinc-600 hover:text-amber-400 transition-colors">
              @{SITE_CONFIG.instagram}
            </a>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Shërbime</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/sherbimet" className="hover:text-amber-400 transition-colors">Konsultim Falas</Link></li>
              <li><Link to="/sherbimet" className="hover:text-amber-400 transition-colors">Strukturim Punimi</Link></li>
              <li><Link to="/sherbimet" className="hover:text-amber-400 transition-colors">Referenca APA</Link></li>
              <li><Link to="/sherbimet" className="hover:text-amber-400 transition-colors">Analizë SPSS</Link></li>
              <li><Link to="/sherbimet" className="hover:text-amber-400 transition-colors">Diplomë Bachelor</Link></li>
              <li><Link to="/sherbimet" className="hover:text-amber-400 transition-colors">Diplomë Master</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Navigim</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-amber-400 transition-colors">Faqja Kryesore</Link></li>
              <li><Link to="/rreth-nesh" className="hover:text-amber-400 transition-colors">Rreth Nesh</Link></li>
              <li><Link to="/si-funksionon" className="hover:text-amber-400 transition-colors">Si funksionon</Link></li>
              <li><Link to="/blog" className="hover:text-amber-400 transition-colors">Blog</Link></li>
              <li><Link to="/faq" className="hover:text-amber-400 transition-colors">FAQ</Link></li>
              <li><Link to="/materiale-falas" className="hover:text-amber-400 transition-colors">Materiale falas</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Kontakt</h4>
            <ul className="space-y-2.5 text-sm mb-5">
              <li>
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-amber-400 transition-colors text-xs break-all">
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${SITE_CONFIG.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                  {SITE_CONFIG.whatsappDisplay}
                </a>
              </li>
              <li><Link to="/kontakt" className="hover:text-amber-400 transition-colors">Dërgo mesazh</Link></li>
            </ul>

            <div className="border-t border-zinc-800 pt-4">
              <div className="flex items-center gap-1.5 mb-2">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <p className="text-xs font-semibold text-white">Orari i punës</p>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between gap-3">
                  <span className="text-zinc-500">E Hënë - E Premte</span>
                  <span className="text-amber-400 font-semibold">{SITE_CONFIG.schedule.weekdays}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-zinc-500">E Shtunë, E Diel</span>
                  <span className="text-zinc-600">Pushim</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-zinc-500">Festa Zyrtare</span>
                  <span className="text-zinc-600">Pushim</span>
                </div>
                <p className="text-zinc-600 leading-relaxed mt-2 text-[11px]">
                  Pas orarit, një asistent do ju përgjigjet. Ju lutemi të mbeteni në pritje.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-800">
              <button
                onClick={() => { localStorage.removeItem('tdc_terms_agreed'); window.location.reload() }}
                className="text-xs text-zinc-600 hover:text-amber-400 transition-colors"
              >
                Marrëveshja e Bashkëpunimit
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-zinc-600">
          <p>© {new Date().getFullYear()} temadiplome.ce. Të gjitha të drejtat e rezervuara.</p>
          <p>99% sukses &middot; Përgjigje brenda 1 ore &middot; 100% Konfidencial</p>
        </div>
      </div>
    </footer>
  )
}
