import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MessageCircle,
  Instagram,
  Mail,
  Phone,
  Clock,
  ChevronDown,
} from 'lucide-react'
import { SITE_CONFIG } from '../lib/supabase'

const footerServices = [
  { label: 'Konsultim Falas', path: '/sherbimet' },
  { label: 'Strukturim', path: '/sherbimet' },
  { label: 'Referenca APA', path: '/sherbimet' },
  { label: 'Analizë SPSS', path: '/sherbimet' },
  { label: 'PowerPoint', path: '/sherbimet' },
  { label: 'Bachelor', path: '/sherbimet' },
  { label: 'Master', path: '/sherbimet' },
  { label: 'Detyrë Kursi', path: '/sherbimet' },
]

const quickLinks = [
  { label: 'Shërbimet', path: '/sherbimet' },
  { label: 'Si funksionon', path: '/si-funksionon' },
  { label: 'Portofoli', path: '/portofoli' },
  { label: 'Universitetet', path: '/universitetet' },
  { label: 'Blog', path: '/blog' },
  { label: 'Rreth Nesh', path: '/rreth-nesh' },
  { label: 'Kontakt', path: '/kontakt' },
]

function FooterAccordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-zinc-200">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-serif text-base font-bold text-zinc-950">
          {title}
        </span>

        <ChevronDown
          className={`w-5 h-5 text-zinc-500 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && <div className="pb-5 animate-fade-in">{children}</div>}
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-100 pb-24 sm:pb-0">
      <div className="container-academic py-10 sm:py-12">
        {/* BRAND */}
        <div className="text-center max-w-xl mx-auto">
          <Link to="/" className="inline-flex items-center justify-center gap-3 mb-4">
            <img
              src="/images/portfolio/logo.png"
              alt="temadiplome.ce logo"
              className="h-11 w-auto object-contain"
            />

            <span className="font-serif text-xl font-bold text-zinc-950">
              temadiplome<span className="text-amber-500">.ce</span>
            </span>
          </Link>

          <p className="text-zinc-500 text-sm leading-relaxed">
            Asistencë akademike profesionale për studentë: punime diplome,
            detyra kursi, SPSS, PowerPoint, APA dhe formatim.
          </p>

          <div className="flex justify-center gap-3 mt-5">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>

            <a
              href={`https://instagram.com/${SITE_CONFIG.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full text-white flex items-center justify-center transition-transform hover:scale-105"
              style={{
                background:
                  'linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCAF45 100%)',
              }}
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>

            <a
              href="mailto:temadiplome.ce@gmail.com"
              className="w-11 h-11 rounded-full bg-amber-400/10 text-amber-600 hover:bg-amber-400 hover:text-zinc-950 flex items-center justify-center transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* MOBILE ACCORDION */}
        <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 px-5 md:hidden">
          <FooterAccordion title="Shërbime" defaultOpen>
            <div className="space-y-3">
              {footerServices.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="block text-sm text-zinc-600 hover:text-amber-600 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </FooterAccordion>

          <FooterAccordion title="Quicklinks">
            <div className="space-y-3">
              {quickLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block text-sm text-zinc-600 hover:text-amber-600 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </FooterAccordion>

          <FooterAccordion title="Stay Connected">
            <div className="space-y-4 text-sm text-zinc-600">
              <a
                href="mailto:temadiplome.ce@gmail.com"
                className="flex items-center justify-center gap-2 hover:text-amber-600 transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-500" />
                <span className="break-all">temadiplome.ce@gmail.com</span>
              </a>

              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 hover:text-amber-600 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-500" />
                +355 684 563 585
              </a>

              <div className="rounded-xl bg-white border border-zinc-200 p-4 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <p className="font-semibold text-zinc-950">Orari i punës</p>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between gap-4">
                    <span>E Hënë - E Premte</span>
                    <span className="font-semibold text-amber-600 whitespace-nowrap">
                      09:00 - 18:00
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span>E Shtunë</span>
                    <span>Pushim</span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span>E Diel</span>
                    <span>Pushim</span>
                  </div>
                </div>
              </div>
            </div>
          </FooterAccordion>
        </div>

        {/* DESKTOP FOOTER */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-10 mt-12">
          <div>
            <h3 className="font-serif text-lg font-bold text-zinc-950 mb-4">
              Shërbime
            </h3>

            <div className="space-y-2">
              {footerServices.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="block text-sm text-zinc-500 hover:text-amber-600 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold text-zinc-950 mb-4">
              Navigim
            </h3>

            <div className="space-y-2">
              {quickLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block text-sm text-zinc-500 hover:text-amber-600 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-serif text-lg font-bold text-zinc-950 mb-4">
              Kontakt
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="mailto:temadiplome.ce@gmail.com"
                className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 hover:bg-white hover:shadow-md transition-all"
              >
                <Mail className="w-5 h-5 text-amber-500 mb-3" />
                <p className="text-xs uppercase tracking-wider text-zinc-400 mb-1">
                  Email
                </p>
                <p className="text-sm text-zinc-700 break-all">
                  temadiplome.ce@gmail.com
                </p>
              </a>

              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 hover:bg-white hover:shadow-md transition-all"
              >
                <Phone className="w-5 h-5 text-amber-500 mb-3" />
                <p className="text-xs uppercase tracking-wider text-zinc-400 mb-1">
                  WhatsApp
                </p>
                <p className="text-sm text-zinc-700">+355 684 563 585</p>
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-zinc-100 mt-8 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400 text-center">
          <p>© 2026 temadiplome.ce. Të gjitha të drejtat e rezervuara.</p>
          <p>400+ studentë · 99% sukses · 100% konfidencial</p>
        </div>
      </div>
    </footer>
  )
}