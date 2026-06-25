import { useState, useEffect } from 'react'
import { FileText, Download, CheckCircle2, CreditCard, ArrowRight, BookOpen, Star, X } from 'lucide-react'
import { supabase, formatPrice } from '../lib/supabase'

interface Course {
  id: string
  title: string
  description: string
  contents: string[]
  benefits: string[]
  price_cents: number
  image_url: string
  file_url: string | null
}

export default function Courses() {
  const [course, setCourse] = useState<Course | null>(null)
  const [showPayment, setShowPayment] = useState(false)
  const [paymentData, setPaymentData] = useState({ name: '', email: '', method: 'card' })
  const [done, setDone] = useState(false)
  const [coupon, setCoupon] = useState('')
  const [discount, setDiscount] = useState(0)
  const [couponMsg, setCouponMsg] = useState('')

  useEffect(() => {
    supabase.from('courses').select('*').eq('is_active', true).limit(1).then(({ data }) => {
      if (data && data[0]) setCourse(data[0] as Course)
    })
  }, [])

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'STUDENT10') {
      setDiscount(10)
      setCouponMsg('Zbritje 10% u aplikua!')
    } else {
      setDiscount(0)
      setCouponMsg('Kuponi nuk është i vlefshëm.')
    }
  }

  const finalPrice = course ? Math.round(course.price_cents * (1 - discount / 100)) : 0

  const pay = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!course) return
    await supabase.from('payments').insert({
      course_id: course.id,
      payer_name: paymentData.name,
      payer_email: paymentData.email,
      amount_cents: finalPrice,
      method: paymentData.method,
      status: 'confirmed',
    })
    setDone(true)
    setShowPayment(false)
  }

  if (!course) return (
    <div className="pt-24 pb-20 container-academic">
      <div className="flex items-center justify-center h-40">
        <p className="text-zinc-400">Duke ngarkuar...</p>
      </div>
    </div>
  )

  if (done) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <div className="container-academic max-w-lg">
          <div className="bg-white rounded-3xl p-10 text-center shadow-xl border border-zinc-100">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-zinc-900 mb-3">Pagesa u krye!</h2>
            <p className="text-zinc-600 mb-5">Email-i me linkun e shkarkimit u dërgua te <strong>{paymentData.email}</strong></p>
            <div className="bg-zinc-50 rounded-2xl p-4 text-left mb-6 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-zinc-500">Kursi:</span><span className="font-medium text-zinc-900 truncate ml-2">{course.title.slice(0, 35)}…</span></div>
              <div className="flex justify-between"><span className="text-zinc-500">Çmimi:</span><span className="font-bold text-amber-600">{formatPrice(finalPrice)}</span></div>
            </div>
            {course.file_url ? (
              <a href={course.file_url} download className="btn-primary w-full justify-center">
                <Download className="w-5 h-5" /> Shkarko PDF-në tani
              </a>
            ) : (
              <p className="text-sm text-zinc-500">Linku i shkarkimit do t'ju arrijë me email brenda pak minutave.</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-20">
      <section className="container-academic text-center mb-12">
        <span className="section-label">Kurs PDF</span>
        <h1 className="section-title mt-2 mb-3">Kursi praktik për temën e diplomës</h1>
        <p className="section-subtitle mx-auto">Mëso hap pas hapi si të realizosh vetë punimin tënd akademik.</p>
      </section>

      <section className="container-academic">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* Main content */}
          <div>
            <div className="rounded-2xl overflow-hidden mb-8 shadow-md">
              <img
                src={course.image_url || 'https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=800'}
                alt={course.title}
                className="w-full h-60 sm:h-80 object-cover"
              />
            </div>

            <h2 className="font-serif text-2xl font-bold text-zinc-900 mb-3">{course.title}</h2>
            <p className="text-zinc-600 leading-relaxed mb-8">{course.description}</p>

            {/* Benefits */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mb-8">
              <h3 className="font-serif text-lg font-semibold text-zinc-900 mb-4">Përfitimet e kursit</h3>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {course.benefits?.map((b, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-700">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contents */}
            <div>
              <h3 className="font-serif text-xl font-semibold text-zinc-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-500" /> Përmbajtja e kursit
              </h3>
              <div className="space-y-2">
                {course.contents?.map((c, i) => (
                  <div key={i} className="flex items-start gap-3 py-3 border-b border-zinc-100 last:border-none">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-sm text-zinc-700">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky purchase card */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl border border-zinc-200 shadow-lg overflow-hidden">
              <div className="bg-zinc-900 p-6 text-center">
                <FileText className="w-10 h-10 text-amber-400 mx-auto mb-2" />
                <p className="text-zinc-400 text-sm mb-1">Çmimi i kursit</p>
                <p className="font-serif text-4xl font-bold text-amber-400">{formatPrice(finalPrice)}</p>
                {discount > 0 && (
                  <p className="text-green-400 text-sm mt-1">- {discount}% zbritje aplikuar</p>
                )}
              </div>
              <div className="p-6 space-y-4">
                {/* Star reviews */}
                <div className="flex items-center justify-center gap-1 text-sm text-zinc-600">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                  <span className="ml-1">4.9 / 5</span>
                </div>

                {/* Coupon */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Kodi i kuponit"
                    className="flex-1 px-3 py-2.5 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:border-amber-400"
                  />
                  <button onClick={applyCoupon} className="px-4 py-2.5 bg-zinc-900 text-white rounded-xl text-sm font-semibold hover:bg-zinc-800 transition-colors">
                    Apliko
                  </button>
                </div>
                {couponMsg && <p className={`text-xs ${discount > 0 ? 'text-green-600' : 'text-red-500'}`}>{couponMsg}</p>}

                <button onClick={() => setShowPayment(true)} className="btn-primary w-full justify-center text-base py-4">
                  <CreditCard className="w-5 h-5" /> Bli tani
                </button>

                <div className="space-y-2 text-xs text-zinc-500">
                  <div className="flex items-center gap-2"><Download className="w-3.5 h-3.5" /> Shkarkim automatik pas pagesës</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5" /> Email konfirmimi</div>
                  <div className="flex items-center gap-2"><BookOpen className="w-3.5 h-3.5" /> 13 kapituj praktikë</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment modal */}
      {showPayment && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowPayment(false)}>
          <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-3xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
              <h3 className="font-serif text-xl font-bold text-zinc-900">Pagesa</h3>
              <button onClick={() => setShowPayment(false)} className="w-8 h-8 rounded-xl bg-zinc-100 flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={pay} className="p-6 space-y-4">
              <input type="text" required placeholder="Emër i plotë" value={paymentData.name} onChange={(e) => setPaymentData({ ...paymentData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-amber-400 text-sm" />
              <input type="email" required placeholder="Email" value={paymentData.email} onChange={(e) => setPaymentData({ ...paymentData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-amber-400 text-sm" />

              <div>
                <p className="text-sm font-medium text-zinc-900 mb-2">Mënyra e pagesës</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { val: 'card', label: 'Kartë bankare' },
                    { val: 'paypal', label: 'PayPal' },
                    { val: 'bank', label: 'Bank transfer' },
                    { val: 'manual', label: 'Manuale' },
                  ].map((m) => (
                    <button key={m.val} type="button" onClick={() => setPaymentData({ ...paymentData, method: m.val })} className={`px-3 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${paymentData.method === m.val ? 'border-amber-400 bg-amber-50 text-amber-700' : 'border-zinc-200 text-zinc-600 hover:border-zinc-300'}`}>
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between font-bold pt-2 border-t border-zinc-100">
                <span className="text-zinc-900">Total:</span>
                <span className="text-amber-600 text-lg">{formatPrice(finalPrice)}</span>
              </div>

              <button type="submit" className="btn-primary w-full justify-center text-base py-4">
                <CreditCard className="w-5 h-5" /> Konfirmo pagesën
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
