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

  const accordionClass = (section: FooterSection) =>
    `grid transition-[grid-template-rows,opacity] duration-300 ease-out lg:block ${
      openSection === section
        ? "grid-rows-[1fr] opacity-100"
        : "grid-rows-[0fr] opacity-80 lg:opacity-100"
    }`;

  return (
    <section className="w-full max-w-full overflow-x-hidden px-4 pb-4 pt-2 sm:px-5 lg:px-10 lg:pb-6 lg:pt-3">
      <footer className="mx-auto w-full max-w-[1440px] overflow-hidden rounded-[22px] bg-[#070915] text-white shadow-[0_18px_50px_rgba(7,9,21,0.18)]">
        <div className="px-5 py-6 sm:px-6 sm:py-7 lg:grid lg:grid-cols-[1.15fr_0.8fr_0.8fr_1.25fr] lg:gap-10 lg:px-10 lg:py-9">
          {/* BRAND */}
          <div className="min-w-0 pb-5 lg:pb-0">
            <Link to="/" className="inline-flex max-w-full items-center">
              <img
                src="/images/home/logo2.png"
                alt="temadiplome.ce"
                className="h-9 w-auto max-w-[190px] object-contain sm:h-10"
              />
            </Link>

            <p className="mt-4 max-w-sm text-xs leading-6 text-zinc-400">
              Asistencë akademike profesionale për strukturim, analizë,
              prezantime dhe formatim.
            </p>

            <div className="mt-4 flex items-center gap-2">
              <a
                href="https://instagram.com/temadiplome.ce"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-300 transition hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </a>

              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                  whatsappMessage,
                )}`}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-300 transition hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-white"
              >
                <MessageCircle className="h-4 w-4" />
              </a>

              <a
                href="mailto:temadiplome.ce@gmail.com"
                aria-label="Email"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-300 transition hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-white"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* SERVICES */}
          <div className="min-w-0 border-t border-white/10 lg:border-0">
            <button
              type="button"
              onClick={() => toggleSection("services")}
              aria-expanded={openSection === "services"}
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

            <div className={accordionClass("services")}>
              <div className="min-h-0 overflow-hidden">
                <div className="flex flex-col gap-2.5 pb-4 text-xs text-zinc-400 lg:mt-4 lg:pb-0">
                  <Link to="/sherbimet" className="transition hover:text-white">
                    Punime Diplome
                  </Link>
                  <Link to="/sherbimet" className="transition hover:text-white">
                    Strukturim Punimi
                  </Link>
                  <Link to="/sherbimet" className="transition hover:text-white">
                    Referenca APA
                  </Link>
                  <Link to="/sherbimet" className="transition hover:text-white">
                    Analizë SPSS
                  </Link>
                  <Link to="/sherbimet" className="transition hover:text-white">
                    PowerPoint
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* NAVIGATION */}
          <div className="min-w-0 border-t border-white/10 lg:border-0">
            <button
              type="button"
              onClick={() => toggleSection("navigation")}
              aria-expanded={openSection === "navigation"}
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

            <div className={accordionClass("navigation")}>
              <div className="min-h-0 overflow-hidden">
                <div className="flex flex-col gap-2.5 pb-4 text-xs text-zinc-400 lg:mt-4 lg:pb-0">
                  <Link
                    to="/si-funksionon"
                    className="transition hover:text-white"
                  >
                    Si funksionon
                  </Link>
                  <Link to="/portofoli" className="transition hover:text-white">
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
                  <Link to="/rreth-nesh" className="transition hover:text-white">
                    Rreth Nesh
                  </Link>
                  <Link to="/kontakt" className="transition hover:text-white">
                    Kontakt
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* CONTACT */}
          <div className="min-w-0 border-t border-white/10 lg:border-0">
            <button
              type="button"
              onClick={() => toggleSection("contact")}
              aria-expanded={openSection === "contact"}
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

            <div className={accordionClass("contact")}>
              <div className="min-h-0 overflow-hidden">
                <div className="space-y-3 pb-4 lg:mt-4 lg:pb-0">
                  <a
                    href="mailto:temadiplome.ce@gmail.com"
                    className="flex min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-xs text-zinc-300 transition hover:border-violet-400/40 hover:bg-white/[0.07] sm:px-4"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-violet-400" />
                    <span className="min-w-0 truncate">
                      temadiplome.ce@gmail.com
                    </span>
                  </a>

                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                      whatsappMessage,
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-xs text-zinc-300 transition hover:border-violet-400/40 hover:bg-white/[0.07] sm:px-4"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-violet-400" />
                    <span className="truncate">+355 684 563 585</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex min-w-0 flex-col gap-3 border-t border-white/10 px-5 py-4 text-[10px] text-zinc-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-10">
          <p className="min-w-0">
            © 2026 temadiplome.ce. Të gjitha të drejtat e rezervuara.
          </p>

          <div className="flex min-w-0 flex-wrap gap-x-5 gap-y-2">
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