import { useState, useEffect } from 'react'
import { GraduationCap, LogOut, LayoutDashboard, ShoppingCart, CreditCard, BookOpen, Mail, Users, X } from 'lucide-react'
import { supabase } from '../lib/supabase'
import AdminOrders from '../components/admin/AdminOrders'
import AdminPayments from '../components/admin/AdminPayments'
import AdminCourses from '../components/admin/AdminCourses'
import AdminMessages from '../components/admin/AdminMessages'
import AdminNewsletter from '../components/admin/AdminNewsletter'

type Tab = 'orders' | 'payments' | 'courses' | 'messages' | 'newsletter'

export default function Admin() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [tab, setTab] = useState<Tab>('orders')
  const [error, setError] = useState('')
  const [sideOpen, setSideOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_e, s) => {
      (async () => {
        setSession(s)
        setLoading(false)
      })()
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
  }

  if (loading) return <div className="pt-24 pb-20 container-academic text-center text-zinc-400 text-sm">Duke ngarkuar...</div>

  if (!session) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <div className="container-academic max-w-sm">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-zinc-100">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="w-7 h-7 text-amber-400" />
              </div>
              <h1 className="font-serif text-2xl font-bold text-zinc-900">Admin Panel</h1>
              <p className="text-sm text-zinc-400 mt-1">Hyr për të menaxhuar platformën</p>
            </div>
            <form onSubmit={signIn} className="space-y-3">
              <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-amber-400 text-sm bg-zinc-50 focus:bg-white" />
              <input type="password" required placeholder="Fjalëkalimi" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-amber-400 text-sm bg-zinc-50 focus:bg-white" />
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <button type="submit" className="btn-primary w-full justify-center py-3.5">Hyr</button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'orders', label: 'Porositë', icon: ShoppingCart },
    { id: 'payments', label: 'Pagesat', icon: CreditCard },
    { id: 'courses', label: 'Kursi PDF', icon: BookOpen },
    { id: 'messages', label: 'Mesazhet', icon: Mail },
    { id: 'newsletter', label: 'Newsletter', icon: Users },
  ]

  return (
    <div className="pt-16 pb-20 min-h-screen bg-zinc-50">
      <div className="container-academic">
        {/* Mobile tab bar */}
        <div className="flex items-center justify-between py-4 mb-4 lg:hidden">
          <span className="font-serif text-lg font-bold text-zinc-900">Admin</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setSideOpen(true)} className="w-9 h-9 rounded-xl bg-white border border-zinc-200 flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-zinc-600" />
            </button>
            <button onClick={() => supabase.auth.signOut()} className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
              <LogOut className="w-4 h-4 text-red-600" />
            </button>
          </div>
        </div>

        {/* Mobile tabs scroll */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5 lg:hidden -mx-4 px-4">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${tab === t.id ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-600 border border-zinc-200'}`}>
              <t.icon className="w-3.5 h-3.5" />{t.label}
            </button>
          ))}
        </div>

        <div className="flex gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl p-4 border border-zinc-100 sticky top-24">
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-zinc-100">
                <LayoutDashboard className="w-4 h-4 text-amber-500" />
                <span className="font-serif text-base font-bold text-zinc-900">Dashboard</span>
              </div>
              <nav className="space-y-1">
                {tabs.map((t) => (
                  <button key={t.id} onClick={() => setTab(t.id)} className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${tab === t.id ? 'bg-amber-400 text-zinc-900' : 'text-zinc-600 hover:bg-zinc-50'}`}>
                    <t.icon className="w-4 h-4" /> {t.label}
                  </button>
                ))}
              </nav>
              <button onClick={() => supabase.auth.signOut()} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors mt-4 pt-4 border-t border-zinc-100">
                <LogOut className="w-4 h-4" /> Dilni
              </button>
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            {tab === 'orders' && <AdminOrders />}
            {tab === 'payments' && <AdminPayments />}
            {tab === 'courses' && <AdminCourses />}
            {tab === 'messages' && <AdminMessages />}
            {tab === 'newsletter' && <AdminNewsletter />}
          </main>
        </div>
      </div>
    </div>
  )
}
