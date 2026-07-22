import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Instagram,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";
import { supabase, SITE_CONFIG } from "../lib/supabase";
import FAQ from "../components/FAQ";

type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialForm: ContactForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const updateField = (
    field: keyof ContactForm,
    value: string
  ) => {
    setErrorMessage("");
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const { error } = await supabase.from("contact_messages").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
      created_at: new Date().toISOString(),
    });

    setLoading(false);

    if (error) {
      console.error("Contact message error:", error);
      setErrorMessage(
        "Mesazhi nuk u dërgua. Ju lutemi provoni përsëri."
      );
      return;
    }

    setSent(true);
    setForm(initialForm);
  };

  const fieldClass =
    "w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100";

  return (
    <main className="w-full max-w-full overflow-x-hidden bg-white pb-0 pt-24 lg:pt-28">
      {/* PAGE INTRO */}
      <section className="px-4 sm:px-5 lg:px-10">
        <div className="mx-auto max-w-[1440px] text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-violet-600">
            Kontakt
          </p>

          <h1 className="mt-3 font-serif text-3xl font-bold text-zinc-950 sm:text-4xl lg:text-5xl">
            Na kontaktoni
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base">
            Jemi këtu për t&apos;ju ndihmuar me pyetjet dhe kërkesat tuaja.
          </p>

          <div className="mx-auto mt-4 h-0.5 w-10 rounded-full bg-violet-600" />
        </div>
      </section>

      {/* CONTACT DETAILS + FORM */}
      <section className="px-4 py-8 sm:px-5 sm:py-10 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-8">
            {/* CONTACT CHANNELS */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-w-0 items-center gap-3 rounded-[18px] border border-zinc-100 bg-white p-4 shadow-[0_10px_30px_rgba(24,24,27,0.05)] transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-[0_14px_36px_rgba(16,185,129,0.08)] sm:p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition group-hover:bg-[#25D366] group-hover:text-white">
                  <MessageCircle className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-zinc-950">
                    WhatsApp
                  </p>

                  <p className="mt-0.5 truncate text-[10px] text-zinc-400 sm:text-xs">
                    Na shkruani tani
                  </p>
                </div>

                <ArrowRight className="hidden h-4 w-4 shrink-0 text-violet-600 transition-transform group-hover:translate-x-1 sm:block" />
              </a>

              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="group flex min-w-0 items-center gap-3 rounded-[18px] border border-zinc-100 bg-white p-4 shadow-[0_10px_30px_rgba(24,24,27,0.05)] transition hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-[0_14px_36px_rgba(245,158,11,0.08)] sm:p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 transition group-hover:bg-amber-400 group-hover:text-zinc-950">
                  <Mail className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-zinc-950">
                    Email
                  </p>

                  <p className="mt-0.5 truncate text-[10px] text-zinc-400 sm:text-xs">
                    {SITE_CONFIG.email}
                  </p>
                </div>

                <ArrowRight className="hidden h-4 w-4 shrink-0 text-violet-600 transition-transform group-hover:translate-x-1 sm:block" />
              </a>

              <a
                href={`https://instagram.com/${SITE_CONFIG.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-w-0 items-center gap-3 rounded-[18px] border border-zinc-100 bg-white p-4 shadow-[0_10px_30px_rgba(24,24,27,0.05)] transition hover:-translate-y-0.5 hover:border-pink-200 hover:shadow-[0_14px_36px_rgba(236,72,153,0.08)] sm:p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-pink-500 to-amber-400 text-white">
                  <Instagram className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-zinc-950">
                    Instagram
                  </p>

                  <p className="mt-0.5 truncate text-[10px] text-zinc-400 sm:text-xs">
                    @{SITE_CONFIG.instagram}
                  </p>
                </div>

                <ArrowRight className="hidden h-4 w-4 shrink-0 text-violet-600 transition-transform group-hover:translate-x-1 sm:block" />
              </a>

              <article className="col-span-2 flex min-w-0 items-start gap-3 rounded-[18px] border border-zinc-100 bg-white p-4 shadow-[0_10px_30px_rgba(24,24,27,0.05)] sm:p-5 lg:col-span-1">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-amber-400">
                  <Clock className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-bold text-zinc-950">
                    Orari i punës
                  </p>

                  <p className="mt-1 text-[10px] leading-4 text-zinc-500 sm:text-xs">
                    E Hënë – E Premte: 09:00 – 18:00
                  </p>

                  <p className="text-[10px] leading-4 text-zinc-400 sm:text-xs">
                    E Shtunë, E Diel dhe festat: Pushim
                  </p>

                  <p className="mt-1 text-[10px] leading-4 text-zinc-400 sm:text-xs">
                    Pas orarit, një asistent do t&apos;ju përgjigjet.
                  </p>
                </div>
              </article>
            </div>

            {/* CONTACT FORM */}
            <div className="rounded-[24px] border border-violet-100 bg-white p-5 shadow-[0_20px_60px_rgba(76,29,149,0.08)] sm:p-8">
              {sent ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center py-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                    <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                  </div>

                  <h2 className="mt-5 font-serif text-2xl font-bold text-zinc-950 sm:text-3xl">
                    Mesazhi u dërgua!
                  </h2>

                  <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">
                    Faleminderit që na kontaktuat. Do t&apos;ju përgjigjemi sa
                    më shpejt të jetë e mundur.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-6 inline-flex items-center justify-center rounded-xl border border-violet-200 bg-white px-6 py-3 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
                  >
                    Dërgo një mesazh tjetër
                  </button>
                </div>
              ) : (
                <form onSubmit={submit}>
                  <div className="mb-7">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-600">
                      Mesazh
                    </p>

                    <h2 className="mt-2 font-serif text-2xl font-bold text-zinc-950 sm:text-3xl">
                      Dërgoni një mesazh
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                      Plotësoni formularin dhe do t&apos;ju përgjigjemi sa më
                      shpejt.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mb-1.5 block text-xs font-bold text-zinc-800"
                      >
                        Emër *
                      </label>

                      <input
                        id="contact-name"
                        type="text"
                        required
                        autoComplete="name"
                        value={form.name}
                        onChange={(event) =>
                          updateField("name", event.target.value)
                        }
                        placeholder="Shkruani emrin tuaj"
                        className={fieldClass}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-1.5 block text-xs font-bold text-zinc-800"
                      >
                        Email *
                      </label>

                      <input
                        id="contact-email"
                        type="email"
                        required
                        autoComplete="email"
                        value={form.email}
                        onChange={(event) =>
                          updateField("email", event.target.value)
                        }
                        placeholder="Shkruani email-in tuaj"
                        className={fieldClass}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="contact-subject"
                      className="mb-1.5 block text-xs font-bold text-zinc-800"
                    >
                      Subjekti
                    </label>

                    <input
                      id="contact-subject"
                      type="text"
                      value={form.subject}
                      onChange={(event) =>
                        updateField("subject", event.target.value)
                      }
                      placeholder="Shkruani subjektin"
                      className={fieldClass}
                    />
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="contact-message"
                      className="mb-1.5 block text-xs font-bold text-zinc-800"
                    >
                      Mesazhi *
                    </label>

                    <textarea
                      id="contact-message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={(event) =>
                        updateField("message", event.target.value)
                      }
                      placeholder="Shkruani mesazhin tuaj..."
                      className={`${fieldClass} resize-none`}
                    />
                  </div>

                  {errorMessage && (
                    <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-5 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-purple-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-200/70 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Duke dërguar..." : "Dërgo mesazhin"}
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-violet-100 bg-gradient-to-b from-violet-50/35 to-white px-4 py-10 sm:px-5 sm:py-12 lg:px-10">
        <div className="mx-auto max-w-[980px]">
          <div className="mb-8 text-center sm:mb-10">
          </div>

          <FAQ />
        </div>
      </section>
    </main>
  );
}