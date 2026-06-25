import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface FaqItem {
  id: string
  question: string
  answer: string
}

const fallback: FaqItem[] = [
  { id: '1', question: 'Si mund ta porosis një shërbim?', answer: 'Shkoni te Zgjidh Punimin, zgjidhni shërbimin, plotësoni formën dhe ekipi ynë ju kontakton brenda 24 orëve.' },
  { id: '2', question: 'A mund të blej vetëm kursin PDF?', answer: 'Po, kursi PDF blihet drejtpërdrejt nga faqja Kurse PDF. Pas pagesës merrni linkun e shkarkimit.' },
  { id: '3', question: 'Si e marr PDF-në pas pagesës?', answer: 'Menjëherë pas pagesës merrni email me linkun e shkarkimit. E shkarkoni sa herë dëshironi.' },
  { id: '4', question: 'Cili është kesti i parë?', answer: 'Kesti i parë është 500 L, i pagueshëm pas konfirmimit të porosisë. Kesti i dytë paguhet pasi ju dërgojmë pjesën e parë të punës.' },
  { id: '5', question: 'A ofroni konsultime online?', answer: 'Po, konsultime online 1-me-1 përmes video call 45 minuta.' },
  { id: '6', question: 'A mund të dërgoj materialin tim?', answer: 'Po, mund të ngarkoni Word, PDF, Excel dhe foto drejtpërdrejt në formën e porosisë.' },
  { id: '7', question: 'Sa kohë zgjat përgjigjja?', answer: 'Zakonisht brenda 24 orëve nga dërgimi i kërkesës.' },
  { id: '8', question: 'A janë pagesat e sigurta?', answer: 'Po, pranojmë kartë bankare, PayPal, bank transfer dhe pagesë manuale.' },
  { id: '9', question: 'A mund të kërkoj ofertë të personalizuar?', answer: 'Po, plotësoni formën dhe ne ju dërgojmë ofertë brenda 24 orëve.' },
]

export default function FAQ() {
  const [items, setItems] = useState<FaqItem[]>(fallback)
  const [open, setOpen] = useState<string | null>('1')

  useEffect(() => {
    supabase.from('faq').select('*').order('sort_order').then(({ data }) => {
      if (data && data.length) setItems(data as FaqItem[])
    })
  }, [])

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <span className="section-label">FAQ</span>
        <h2 className="section-title mt-2 mb-3">Pyetje të shpeshta</h2>
        <p className="section-subtitle mx-auto">Përgjigjet për pyetjet më të zakonshme.</p>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-zinc-100 overflow-hidden shadow-sm">
            <button
              onClick={() => setOpen(open === item.id ? null : item.id)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-zinc-50 transition-colors"
            >
              <span className="font-medium text-zinc-900 text-sm leading-snug pr-4">{item.question}</span>
              <ChevronDown className={`w-4 h-4 text-amber-500 transition-transform flex-shrink-0 ${open === item.id ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${open === item.id ? 'max-h-48' : 'max-h-0'}`}>
              <p className="px-5 pb-4 text-sm text-zinc-600 leading-relaxed">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
