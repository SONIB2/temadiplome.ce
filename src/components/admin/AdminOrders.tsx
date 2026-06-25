import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Download, Eye, X } from 'lucide-react'

interface Order {
  id: string
  full_name: string
  email: string
  phone: string
  university: string
  field_of_study: string
  study_level: string
  work_type: string
  subject_area: string
  deadline: string
  has_existing_material: boolean
  uploaded_files: string[]
  description: string
  budget_note: string
  status: string
  created_at: string
}

const statusLabels: Record<string, string> = {
  new: 'I ri', contacted: 'I kontaktuar', in_progress: 'Në proces', completed: 'Përfunduar', cancelled: 'Anuluar'
}
const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-amber-100 text-amber-700',
  in_progress: 'bg-purple-100 text-purple-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState<Order | null>(null)

  const load = () => {
    let q = supabase.from('orders').select('*').order('created_at', { ascending: false })
    if (filter !== 'all') q = q.eq('status', filter)
    q.then(({ data }) => { if (data) setOrders(data as Order[]) })
  }

  useEffect(() => { load() }, [filter])

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('orders').update({ status }).eq('id', id)
    load()
    setSelected(null)
  }

  const statuses = ['new', 'contacted', 'in_progress', 'completed', 'cancelled']

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-serif text-xl font-bold text-zinc-900">Porositë ({orders.length})</h1>
      </div>

      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {['all', ...statuses].map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${filter === s ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-600 border border-zinc-200'}`}>
            {s === 'all' ? 'Të gjitha' : statusLabels[s]}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {orders.map((o) => (
          <div key={o.id} className="bg-white rounded-2xl border border-zinc-100 p-5 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-semibold text-zinc-900 text-sm">{o.full_name}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{o.email}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-xs bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-full">{o.work_type}</span>
                  <span className="text-xs bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-full">{o.subject_area}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[o.status] || statusColors.new}`}>{statusLabels[o.status] || o.status}</span>
                </div>
                <p className="text-xs text-zinc-400 mt-1.5">{new Date(o.created_at).toLocaleDateString('sq-AL')}</p>
              </div>
              <button onClick={() => setSelected(o)} className="flex-shrink-0 w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {orders.length === 0 && <p className="text-center text-zinc-400 py-8 text-sm">Nuk ka porosi.</p>}
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60" onClick={() => setSelected(null)}>
          <div className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
              <h2 className="font-serif text-lg font-bold text-zinc-900">Detajet</h2>
              <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-xl bg-zinc-100 flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-2.5 text-sm">
              {[
                ['Emër', selected.full_name],
                ['Email', selected.email],
                ['Telefon', selected.phone],
                ['Universiteti', selected.university || '—'],
                ['Dega', selected.field_of_study || '—'],
                ['Niveli', selected.study_level],
                ['Lloji', selected.work_type],
                ['Fusha', selected.subject_area],
                ['Afati', selected.deadline ? new Date(selected.deadline).toLocaleDateString('sq-AL') : '—'],
                ['Buxheti', selected.budget_note || '—'],
                ['Ka material', selected.has_existing_material ? 'Po' : 'Jo'],
              ].map(([l, v]) => (
                <div key={l} className="flex justify-between gap-3 border-b border-zinc-50 pb-2">
                  <span className="text-zinc-500 flex-shrink-0">{l}:</span>
                  <span className="text-zinc-900 font-medium text-right">{v}</span>
                </div>
              ))}
              <div>
                <p className="font-medium text-zinc-900 mt-1 mb-1">Përshkrim:</p>
                <p className="text-zinc-600 leading-relaxed text-xs">{selected.description}</p>
              </div>
              {selected.uploaded_files?.length > 0 && (
                <div>
                  <p className="font-medium text-zinc-900 mt-2 mb-1">Skedarë:</p>
                  {selected.uploaded_files.map((f, i) => (
                    <a key={i} href={f} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-amber-600 text-xs hover:underline mb-1">
                      <Download className="w-3.5 h-3.5" /> Skedar {i + 1}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div className="px-5 pb-5 border-t border-zinc-100 pt-3">
              <p className="text-xs font-medium text-zinc-900 mb-2">Ndrysho statusin:</p>
              <div className="flex flex-wrap gap-2">
                {statuses.map((s) => (
                  <button key={s} onClick={() => updateStatus(selected.id, s)} className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${selected.status === s ? 'bg-amber-400 text-zinc-900' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}>
                    {statusLabels[s]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
