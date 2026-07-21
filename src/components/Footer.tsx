import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Instagram,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import { SITE_CONFIG } from "../lib/supabase";

type FooterSection = "services" | "navigation" | "contact";

export default function Footer() {
  const [openSection, setOpenSection] = useState<FooterSection | null>(null);

  const toggleSection = (section: FooterSection) => {
    setOpenSection((current) => (current === section ? null : section));
  };

  const whatsappMessage =
    "Përshëndetje! Dëshiroj informacion për një shërbim akademik.";

  return (
    <section className="px-4 pb-4 sm:px-5 lg:px-10 lg:pb-7">
      <footer className="mx-auto max-w-[1440px] overflow-hidden rounded-[22px] bg-[#070915] text-white shadow-[0_18px_50px_rgba(7,9,21,0.18)]">
        <div className="px-5 py-7 sm:px-6 lg:grid lg:grid-cols-[1.15fr_0.8fr_0.8fr_1.25fr] lg:gap-10 lg:px-10 lg:py-10">
          {/* BRAND */}
          <div className="pb-6 lg:pb-0">
            <Link to="/" className="inline-flex items-center">
              <img
                src="/images/home/logo2.png"
                alt="temadiplome.ce"
                className="h-10 w-auto object-contain sm:h-11"
              />
            </Link>

            <p className="mt-4 max-w-sm text-xs leading-6 text-zinc-400">
              Asistencë akademike profesionale për strukturim, analizë,
              prezantime dhe formatim.
            </p>

            <div className="mt-5 flex items-center gap-2">
              <a
                href="https://instagram.com/temadiplome.ce"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-300 transition hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </a>

              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                  whatsappMessage
                )}`}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-300 transition hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-white"
              >
                <MessageCircle className="h-4 w-4" />
              </a>

              <a
                href="mailto:temadiplome.ce@gmail.com"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-300 transition hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-white"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* SERVICES */}
          <div className="border-t border-white/10 lg:border-0">
            <button
              type="button"
              onClick={() => toggleSection("services")}
              className="flex w-full items-center justify-between py-4 text-left lg:pointer-events-none lg:py-0"
            >
              <h3 className="font-serif text-base font-semibold text-white">
                Shërbime
              </h3>

              <ChevronDown
                className={`h-4 w-4 text-zinc-400 transition-transform duration-300 lg:hidden ${
                  openSection === "services" ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 lg:mt-4 lg:max-h-none ${
                openSection === "services"
                  ? "max-h-64 pb-4"
                  : "max-h-0 lg:max-h-none"
              }`}
            >
              <div className="flex flex-col gap-2.5 text-xs text-zinc-400">
                <Link
                  to="/sherbimet"
                  className="transition hover:text-white"
                >
                  Punime Diplome
                </Link>

                <Link
                  to="/sherbimet"
                  className="transition hover:text-white"
                >
                  Strukturim Punimi
                </Link>

                <Link
                  to="/sherbimet"
                  className="transition hover:text-white"
                >
                  Referenca APA
                </Link>

                <Link
                  to="/sherbimet"
                  className="transition hover:text-white"
                >
                  Analizë SPSS
                </Link>

                <Link
                  to="/sherbimet"
                  className="transition hover:text-white"
                >
                  PowerPoint
                </Link>
              </div>
            </div>
          </div>

          {/* NAVIGATION */}
          <div className="border-t border-white/10 lg:border-0">
            <button
              type="button"
              onClick={() => toggleSection("navigation")}
              className="flex w-full items-center justify-between py-4 text-left lg:pointer-events-none lg:py-0"
            >
              <h3 className="font-serif text-base font-semibold text-white">
                Navigim
              </h3>

              <ChevronDown
                className={`h-4 w-4 text-zinc-400 transition-transform duration-300 lg:hidden ${
                  openSection === "navigation" ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 lg:mt-4 lg:max-h-none ${
                openSection === "navigation"
                  ? "max-h-72 pb-4"
                  : "max-h-0 lg:max-h-none"
              }`}
            >
              <div className="flex flex-col gap-2.5 text-xs text-zinc-400">
                <Link
                  to="/si-funksionon"
                  className="transition hover:text-white"
                >
                  Si funksionon
                </Link>

                <Link
                  to="/portofoli"
                  className="transition hover:text-white"
                >
                  Portofoli
                </Link>

                <Link
                  to="/universitetet"
                  className="transition hover:text-white"
                >
                  Universitetet
                </Link>

                <Link to="/blog" className="transition hover:text-white">
                  Blog
                </Link>

                <Link
                  to="/rreth-nesh"
                  className="transition hover:text-white"
                >
                  Rreth Nesh
                </Link>

                <Link
                  to="/kontakt"
                  className="transition hover:text-white"
                >
                  Kontakt
                </Link>
              </div>
            </div>
          </div>

          {/* CONTACT */}
          <div className="border-t border-white/10 lg:border-0">
            <button
              type="button"
              onClick={() => toggleSection("contact")}
              className="flex w-full items-center justify-between py-4 text-left lg:pointer-events-none lg:py-0"
            >
              <h3 className="font-serif text-base font-semibold text-white">
                Kontakt
              </h3>

              <ChevronDown
                className={`h-4 w-4 text-zinc-400 transition-transform duration-300 lg:hidden ${
                  openSection === "contact" ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 lg:mt-4 lg:max-h-none ${
                openSection === "contact"
                  ? "max-h-64 pb-4"
                  : "max-h-0 lg:max-h-none"
              }`}
            >
              <div className="space-y-3">
                <a
                  href="mailto:temadiplome.ce@gmail.com"
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs text-zinc-300 transition hover:border-violet-400/40 hover:bg-white/[0.07]"
                >
                  <Mail className="h-4 w-4 shrink-0 text-violet-400" />

                  <span className="min-w-0 truncate">
                    temadiplome.ce@gmail.com
                  </span>
                </a>

                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                    whatsappMessage
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs text-zinc-300 transition hover:border-violet-400/40 hover:bg-white/[0.07]"
                >
                  <Phone className="h-4 w-4 shrink-0 text-violet-400" />
                  +355 684 563 585
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col gap-3 border-t border-white/10 px-5 py-5 text-[10px] text-zinc-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-10">
          <p>© 2026 temadiplome.ce. Të gjitha të drejtat e rezervuara.</p>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link
              to="/privacy-policy"
              className="transition hover:text-zinc-300"
            >
              Politika e Privatësisë
            </Link>

            <Link
              to="/terms-and-conditions"
              className="transition hover:text-zinc-300"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </footer>
    </section>
  );
}