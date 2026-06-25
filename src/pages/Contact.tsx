import { useState } from 'react'
import { Mail, MessageCircle, Instagram, Clock, Send, CheckCircle2, X } from 'lucide-react'
import { supabase, SITE_CONFIG } from '../lib/supabase'
import FAQ from '../components/FAQ'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await supabase.from('contact_messages').insert(form)
    setLoading(false)
    setSent(true)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="pt-24 pb-20">
      <section className="container-academic text-center mb-12">
        <span className="section-label">Kontakt</span>
        <h1 className="section-title mt-2 mb-3">Na kontaktoni</h1>
        <p className="section-subtitle mx-auto">Jemi këtu për t'ju ndihmuar çdo ditë.</p>
      </section>

      <section className="container-academic mb-16">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Contact channels */}
          <div className="space-y-3">
            <a href={`https://wa.me/${SITE_CONFIG.whatsapp}`} target="_blank" rel="noopener noreferrer" className="card p-5 flex items-center gap-4 group hover:-translate-y-0.5">
              <div className="w-11 h-11 rounded-xl bg-green-100 group-hover:bg-[#25D366] flex items-center justify-center transition-colors flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-green-600 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="font-semibold text-zinc-900 text-sm">WhatsApp</p>
                <p className="text-xs text-zinc-400">Na shkruani tani</p>
              </div>
            </a>

            <a href={`mailto:${SITE_CONFIG.email}`} className="card p-5 flex items-center gap-4 group hover:-translate-y-0.5">
              <div className="w-11 h-11 rounded-xl bg-amber-100 group-hover:bg-amber-400 flex items-center justify-center transition-colors flex-shrink-0">
                <Mail className="w-5 h-5 text-amber-600 group-hover:text-zinc-900 transition-colors" />
              </div>
              <div>
                <p className="font-semibold text-zinc-900 text-sm">Email</p>
                <p className="text-xs text-zinc-400">{SITE_CONFIG.email}</p>
              </div>
            </a>

            <a href={`https://instagram.com/${SITE_CONFIG.instagram}`} target="_blank" rel="noopener noreferrer" className="card p-5 flex items-center gap-4 group hover:-translate-y-0.5">
              <div className="w-11 h-11 rounded-xl bg-zinc-100 group-hover:bg-zinc-900 flex items-center justify-center transition-colors flex-shrink-0">
                <Instagram className="w-5 h-5 text-zinc-700 group-hover:text-amber-400 transition-colors" />
              </div>
              <div>
                <p className="font-semibold text-zinc-900 text-sm">Instagram</p>
                <p className="text-xs text-zinc-400">@{SITE_CONFIG.instagram}</p>
              </div>
            </a>

            <div className="card p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-zinc-900 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="font-semibold text-zinc-900 text-sm">Orari i punës</p>
                <p className="text-xs text-zinc-500">E Hënë - E Premte: 09:00 - 18:00</p>
                <p className="text-xs text-zinc-400">E Shtunë, E Diel, Festa: Pushim</p>
                <p className="text-xs text-zinc-400 mt-1">Pas orarit, një asistent do ju përgjigjet.</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-100 shadow-sm">
              {sent ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-zinc-900 mb-2">Mesazhi u dërgua!</h3>
                  <p className="text-zinc-500 text-sm mb-5">Do t'ju përgjigjemi sa më shpejt.</p>
                  <button onClick={() => setSent(false)} className="btn-outline">Dërgo tjetër</button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-zinc-900 mb-1">Dërgoni mesazh</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-900 mb-1.5">Emër *</label>
                      <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-amber-400 text-sm bg-zinc-50 focus:bg-white transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-900 mb-1.5">Email *</label>
                      <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-amber-400 text-sm bg-zinc-50 focus:bg-white transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-900 mb-1.5">Subjekti</label>
                    <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-amber-400 text-sm bg-zinc-50 focus:bg-white transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-900 mb-1.5">Mesazhi *</label>
                    <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-amber-400 text-sm bg-zinc-50 focus:bg-white transition-colors resize-none" />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5">
                    {loading ? 'Duke dërguar...' : 'Dërgo mesazhin'} <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="container-academic">
        <FAQ />
      </section>
    </div>
  )
}
