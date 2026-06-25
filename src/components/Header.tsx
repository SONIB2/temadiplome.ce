import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, GraduationCap, ChevronDown } from 'lucide-react'

const navLinks = [
  { label: 'Shërbimet', path: '/sherbimet' },
  { label: 'Si funksionon', path: '/si-funksionon' },
  { label: 'Portofoli', path: '/portofoli' },
  { label: 'Universitetet', path: '/universitetet' },
  { label: 'Blog', path: '/blog' },
  { label: 'Rreth Nesh', path: '/rreth-nesh' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setIsOpen(false) }, [location])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/98 backdrop-blur-md shadow-[0_1px_16px_rgba(0,0,0,0.08)]' : 'bg-white/90 backdrop-blur-sm'}`}>
        <div className="container-academic flex items-center justify-between h-16 sm:h-[68px]">

          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 flex items-center justify-center group-hover:bg-amber-400 transition-colors duration-200">
              <GraduationCap className="w-5 h-5 text-amber-400 group-hover:text-zinc-900 transition-colors duration-200" />
            </div>
            <div className="leading-none">
              <span className="font-serif text-lg font-bold text-zinc-900">
                temadiplome<span className="text-amber-500">.ce</span>
              </span>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'bg-zinc-100 text-zinc-900'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden xl:flex items-center gap-2">
            <Link to="/kontakt" className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition-colors">
              Kontakt
            </Link>
            <Link to="/zgjidh-punimin" className="btn-primary px-5 py-2.5 text-sm">
              Porosit tani
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-700 active:scale-95 transition-transform"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`xl:hidden fixed inset-0 z-40 transition-all duration-300 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsOpen(false)}
        />
        <div className={`absolute top-0 right-0 h-full w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
            <span className="font-serif text-lg font-bold text-zinc-900">
              temadiplome<span className="text-amber-500">.ce</span>
            </span>
            <button onClick={() => setIsOpen(false)} className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center">
              <X className="w-5 h-5 text-zinc-600" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
            {[
              { label: 'Faqja Kryesore', path: '/' },
              ...navLinks,
              { label: 'Kontakt', path: '/kontakt' },
              { label: 'FAQ', path: '/faq' },
              { label: 'Materiale falas', path: '/materiale-falas' },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  location.pathname === link.path ? 'bg-amber-50 text-amber-700' : 'text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-zinc-100 space-y-2">
            <Link to="/kontakt" className="block w-full text-center px-4 py-3 rounded-xl border border-zinc-200 text-sm font-medium text-zinc-700">
              Na kontakto
            </Link>
            <Link to="/zgjidh-punimin" className="btn-primary w-full justify-center">
              Porosit tani
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
