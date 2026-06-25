import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: string
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([])

  const load = () => {
    supabase.from('contact_messages').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      if (data) setMessages(data as Message[])
    })
  }

  useEffect(() => { load() }, [])

  const del = async (id: string) => {
    if (!confirm('Konfirmo fshirjen')) return
    await supabase.from('contact_messages').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <h1 className="font-serif text-xl font-bold text-zinc-900 mb-4">Mesazhe ({messages.length})</h1>
      <div className="space-y-3">
        {messages.map((m) => (
          <div key={m.id} className="bg-white rounded-2xl border border-zinc-100 p-5 shadow-sm">
            <div className="flex items-start justify-between mb-1.5">
              <div>
                <p className="font-semibold text-zinc-900 text-sm">{m.name}</p>
                <p className="text-xs text-zinc-400">{m.email} · {new Date(m.created_at).toLocaleDateString('sq-AL')}</p>
              </div>
              <button onClick={() => del(m.id)} className="text-red-400 hover:text-red-600 text-xs font-medium">Fshi</button>
            </div>
            {m.subject && <p className="text-xs font-semibold text-amber-600 mb-1">{m.subject}</p>}
            <p className="text-sm text-zinc-600 leading-relaxed">{m.message}</p>
          </div>
        ))}
        {messages.length === 0 && <p className="text-center text-zinc-400 py-8 text-sm">Nuk ka mesazhe.</p>}
      </div>
    </div>
  )
}
