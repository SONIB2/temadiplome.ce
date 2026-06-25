import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

interface Subscriber {
  id: string
  email: string
  created_at: string
}

export default function AdminNewsletter() {
  const [subs, setSubs] = useState<Subscriber[]>([])

  useEffect(() => {
    supabase.from('newsletter').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      if (data) setSubs(data as Subscriber[])
    })
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-serif text-xl font-bold text-zinc-900">Newsletter</h1>
        <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full">{subs.length} abonentë</span>
      </div>
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-500">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-xs">Email</th>
                <th className="px-4 py-3 text-left font-medium text-xs">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {subs.map((s) => (
                <tr key={s.id} className="hover:bg-zinc-50">
                  <td className="px-4 py-3 text-zinc-900 text-sm">{s.email}</td>
                  <td className="px-4 py-3 text-zinc-400 text-xs">{new Date(s.created_at).toLocaleDateString('sq-AL')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {subs.length === 0 && <p className="text-center text-zinc-400 py-8 text-sm">Nuk ka abonentë.</p>}
      </div>
    </div>
  )
}
