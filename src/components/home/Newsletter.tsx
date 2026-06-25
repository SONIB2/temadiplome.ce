import { useState } from 'react'
import { Mail, Send } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    await supabase.from('newsletter').insert({ email })
    setLoading(false)
    setSent(true)
    setEmail('')
  }

  return (
    <section className="py-14 bg-zinc-50">
      <div className="container-academic">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-5">
            <Mail className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 mb-2">
            Merr këshilla akademike falas
          </h3>
          <p className="text-zinc-500 text-sm mb-6">Abonohu për të marrë artikuj, udhëzues dhe materialet tona edukative.</p>

          {sent ? (
            <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-2xl text-sm font-medium">
              Faleminderit! U abonuat me sukses.
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email-i juaj"
                className="flex-1 px-4 py-3 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              />
              <button type="submit" disabled={loading} className="btn-primary whitespace-nowrap">
                {loading ? 'Duke dërguar...' : 'Abonohu'} <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
