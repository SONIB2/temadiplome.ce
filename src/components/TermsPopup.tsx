import { useState, useEffect } from 'react'
import { Shield, CheckCircle2, FileText, ChevronDown, ChevronUp, X } from 'lucide-react'

interface Props {
  inline?: boolean
  onAccept?: () => void
}

const STORAGE_KEY = 'tdc_terms_agreed'

const TermsContent = ({ expanded, setExpanded }: { expanded: boolean; setExpanded: (v: boolean) => void }) => (
  <div className="space-y-3">
    <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 space-y-4 text-sm">
      <div>
        <p className="text-xs text-zinc-500 mb-0.5">Perfaqësues</p>
        <p className="font-bold text-zinc-900">temadiplome.ce</p>
        <p className="text-zinc-400 text-xs mt-0.5">Klienti: plotësohet me emrin tuaj pas konfirmimit</p>
      </div>

      <div>
        <p className="font-bold text-zinc-900 mb-1.5">Objekti i Marrëveshjes</p>
        <p className="text-zinc-600 text-xs leading-relaxed">
          Kjo marrëveshje ka për objekt ofrimin e shërbimeve për hartimin e temave të diplomës dhe detyrave të kursit, të cilat do të kryhen nga faqja jonë për Klientin.
        </p>
      </div>

      <div className="space-y-2.5 text-xs text-zinc-600 leading-relaxed">
        <p><strong className="text-zinc-800">Ndryshimet:</strong> Klienti ka të drejtë të kërkojë ndryshime brenda një muaji nga dorëzimi. Ndryshimet kryhen deri në 3 deri 4 herë.</p>
        <p><strong className="text-zinc-800">Pagesa:</strong> Pagesa kryhet në dy këste. Detajet specifikohen në bisedë me klientin.</p>
        <p><strong className="text-zinc-800">Mënyra e Pagesës:</strong> Bank Transfer, MoneyGram, Ria, Western Union.</p>
        <p><strong className="text-zinc-800">Konfirmimi i Temës:</strong> Titulli i temës duhet të jetë i miratuar nga pedagogi <em>para</em> fillimit të punës. Nëse titulli ndryshon pasi kemi dorëzuar pjesën e parë, nuk kryhen ndryshime nga fillimi dhe nuk kthehet pagesa e kryer.</p>
        <p><strong className="text-zinc-800">Konfidencialiteti:</strong> Të gjitha informacionet e klientit ruhen me konfidencialitet të plotë.</p>
      </div>

      {expanded && (
        <div className="space-y-3 pt-3 border-t border-zinc-200 animate-fade-in">
          <div>
            <p className="font-bold text-zinc-900 mb-1">Zbatimi i Marrëveshjes</p>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Kjo marrëveshje bëhet aktive pas aprovimit të saj nga të dyja palët dhe mbetet në fuqi deri në përfundimin e shërbimit.
            </p>
          </div>
          <div className="text-xs text-zinc-500 space-y-1 pt-2 border-t border-zinc-200">
            <p><strong className="text-zinc-700">Nënshkruar nga:</strong> temadiplome.ce</p>
            <p><strong className="text-zinc-700">Klienti:</strong> [Emri i Studentit]</p>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1.5 text-xs text-amber-600 font-semibold hover:text-amber-700 transition-colors"
      >
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        {expanded ? 'Shfaq më pak' : 'Lexo të plotën'}
      </button>
    </div>

    <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl p-3.5">
      <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
      <p className="text-xs text-green-800 leading-relaxed">
        <strong>100% Konfidencial.</strong> Informacioni juaj nuk ndahet me asnjë palë të tretë.
      </p>
    </div>
  </div>
)

export default function TermsPopup({ inline = false, onAccept }: Props) {
  const [visible, setVisible] = useState(false)
  const [checked, setChecked] = useState(false)
  const [shake, setShake] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (inline) return
    if (!localStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => setVisible(true), 700)
      return () => clearTimeout(t)
    }
  }, [inline])

  const handleCheck = () => {
    setChecked(prev => {
      const next = !prev
      if (next) onAccept?.()
      return next
    })
  }

  const agree = () => {
    if (!checked) {
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  const footer = (
    <div className="space-y-3">
      <label className="flex items-start gap-3 cursor-pointer">
        <button
          type="button"
          onClick={handleCheck}
          className={`w-5 h-5 rounded-md border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
            checked ? 'bg-amber-400 border-amber-400' : shake ? 'border-red-400 bg-red-50' : 'border-zinc-300 hover:border-amber-400'
          }`}
        >
          {checked && <CheckCircle2 className="w-3.5 h-3.5 text-zinc-900" />}
        </button>
        <span className={`text-sm leading-relaxed ${shake && !checked ? 'text-red-600' : 'text-zinc-700'}`}>
          Kam lexuar, kuptuar dhe pranoj <strong>Marrëveshjen e Bashkëpunimit</strong> me temadiplome.ce.
        </span>
      </label>
      {shake && !checked && (
        <p className="text-xs text-red-500">Duhet të pranosh kushtet për të vazhduar.</p>
      )}
    </div>
  )

  // Inline version — rendered inside the order form
  if (inline) {
    return (
      <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center flex-shrink-0">
            <FileText className="w-4 h-4 text-zinc-900" />
          </div>
          <p className="font-serif font-bold text-zinc-900 text-base">Marrëveshja e Bashkëpunimit</p>
        </div>
        <TermsContent expanded={expanded} setExpanded={setExpanded} />
        <div className="mt-4">{footer}</div>
      </div>
    )
  }

  // Full-screen popup
  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-3xl shadow-2xl overflow-hidden animate-slide-up flex flex-col max-h-[92svh]">

        {/* Header */}
        <div className="bg-zinc-950 px-6 pt-5 pb-5 flex-shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-zinc-900" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-white">Marrëveshje Bashkëpunimi</h2>
              <p className="text-zinc-500 text-xs mt-0.5">temadiplome.ce — Lexo para se të vazhdosh.</p>
            </div>
          </div>
          <button
            onClick={() => setVisible(false)}
            className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors ml-3 flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <TermsContent expanded={expanded} setExpanded={setExpanded} />
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-4 border-t border-zinc-100 flex-shrink-0 bg-white space-y-4">
          {footer}
          <button
            onClick={agree}
            className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-all ${
              checked
                ? 'bg-amber-400 text-zinc-900 hover:bg-amber-300 active:scale-95'
                : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            Pranoj dhe vazhdoj
          </button>
          <button onClick={() => setVisible(false)} className="w-full text-xs text-zinc-400 hover:text-zinc-600 transition-colors py-1">
            Mbyll
          </button>
        </div>
      </div>
    </div>
  )
}
