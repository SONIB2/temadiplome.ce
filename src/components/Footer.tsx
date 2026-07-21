import { Instagram, Mail, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { SITE_CONFIG } from "../lib/supabase";

export default function Footer() {
  return (
    <section className="px-5 pb-5 lg:px-10 lg:pb-7">
      <footer className="mx-auto max-w-[1440px] overflow-hidden rounded-t-[24px] bg-[#070915] text-white">
        <div className="grid gap-8 px-6 py-10 md:grid-cols-2 lg:grid-cols-4 lg:px-10">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/images/home/logo2.png"
                alt="temadiplome.ce"
                className="h-11 w-auto object-contain"
              />
            </div>

            <p className="mt-5 max-w-xs text-xs leading-6 text-zinc-400">
              Asistencë akademike profesionale për strukturim, analizë,
              prezantime dhe formatim.
            </p>

            <div className="mt-5 flex gap-2">
              <a
                href="https://instagram.com/temadiplome.ce"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-300 hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </a>

              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-300 hover:text-white"
              >
                <MessageCircle className="h-4 w-4" />
              </a>

              <a
                href="mailto:temadiplome.ce@gmail.com"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-300 hover:text-white"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Shërbime</h3>

            <div className="mt-4 space-y-2 text-xs text-zinc-400">
              <p>Punime Diplome</p>
              <p>Strukturim Punimi</p>
              <p>Referenca APA</p>
              <p>Analizë SPSS</p>
              <p>PowerPoint</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Navigim</h3>

            <div className="mt-4 flex flex-col gap-2 text-xs text-zinc-400">
              <Link to="/si-funksionon">Si funksionon</Link>
              <Link to="/portofoli">Portofoli</Link>
              <Link to="/universitetet">Universitetet</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/rreth-nesh">Rreth Nesh</Link>
              <Link to="/kontakt">Kontakt</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Kontakt</h3>

            <div className="mt-4 space-y-3">
              <a
                href="mailto:temadiplome.ce@gmail.com"
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs text-zinc-300"
              >
                <Mail className="h-4 w-4 text-amber-400" />
                temadiplome.ce@gmail.com
              </a>

              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs text-zinc-300"
              >
                <Phone className="h-4 w-4 text-amber-400" />
                +355 684 563 585
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 px-6 py-5 text-[10px] text-zinc-500 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p>© 2026 temadiplome.ce. Të gjitha të drejtat e rezervuara.</p>

          <div className="flex gap-5">
            <Link to="/privacy-policy">Politika e Privatësisë</Link>
            <Link to="/terms-and-conditions">Terms & Conditions</Link>
          </div>
        </div>
      </footer>
    </section>
  );
}