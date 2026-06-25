import { useState, useEffect } from 'react'
import { supabase, formatPrice } from '../../lib/supabase'

interface Payment {
  id: string
  payer_name: string
  payer_email: string
  amount_cents: number
  method: string
  status: string
  created_at: string
}

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
}

export default function AdminPayments() {
  const [payments, setPayments] = useState<Payment[]>([])

  useEffect(() => {
    supabase.from('payments').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      if (data) setPayments(data as Payment[])
    })
  }, [])

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('payments').update({ status }).eq('id', id)
    setPayments((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)))
  }

  const total = payments.filter((p) => p.status === 'confirmed').reduce((a, b) => a + b.amount_cents, 0)

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Të ardhura', val: formatPrice(total), color: 'text-amber-600' },
          { label: 'Konfirmuara', val: payments.filter((p) => p.status === 'confirmed').length, color: 'text-green-600' },
          { label: 'Në pritje', val: payments.filter((p) => p.status === 'pending').length, color: 'text-amber-600' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-4 border border-zinc-100 text-center">
            <p className="text-xs text-zinc-500 mb-1">{s.label}</p>
            <p className={`font-serif text-xl font-bold ${s.color}`}>{s.val}</p>
          </div>
        ))}
      </div>

      <h1 className="font-serif text-xl font-bold text-zinc-900 mb-4">Pagesat ({payments.length})</h1>

      <div className="space-y-3">
        {payments.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl border border-zinc-100 p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-semibold text-zinc-900 text-sm">{p.payer_name}</p>
                <p className="text-xs text-zinc-400">{p.payer_email}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="font-bold text-amber-600 text-sm">{formatPrice(p.amount_cents)}</span>
                  <span className="text-xs text-zinc-400">{p.method}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[p.status] || statusColors.pending}`}>{p.status}</span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">{new Date(p.created_at).toLocaleDateString('sq-AL')}</p>
              </div>
              <select
                value={p.status}
                onChange={(e) => updateStatus(p.id, e.target.value)}
                className="text-xs border border-zinc-200 rounded-xl px-2.5 py-1.5 focus:outline-none flex-shrink-0"
              >
                <option value="pending">Në pritje</option>
                <option value="confirmed">Konfirmuar</option>
                <option value="failed">Dështuar</option>
              </select>
            </div>
          </div>
        ))}
        {payments.length === 0 && <p className="text-center text-zinc-400 py-8 text-sm">Nuk ka pagesa.</p>}
      </div>
    </div>
  )
}
