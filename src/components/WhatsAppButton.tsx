import { MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "../lib/supabase";

export default function WhatsAppButton() {
  const message =
    "Përshëndetje! Dëshiroj informacion për një shërbim akademik.";

  return (
    <a
      href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
        message
      )}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Na shkruani në WhatsApp"
      className="
        fixed
        bottom-5
        right-[max(20px,calc((100vw-1440px)/2+40px))]
        z-50
        inline-flex
        items-center
        gap-2
        rounded-full
        bg-green-500
        px-5
        py-3
        text-sm
        font-bold
        text-white
        shadow-xl
        transition
        hover:-translate-y-0.5
        hover:bg-green-600
      "
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Na shkruani</span>
    </a>
  );
}