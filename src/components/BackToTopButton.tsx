import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (!visible) return null

  return (
    <button
      onClick={scrollToTop}
      aria-label="Kthehu sipër"
      className="fixed bottom-24 right-5 z-50 w-12 h-12 rounded-full bg-zinc-900 text-amber-400 shadow-xl border border-white/10 flex items-center justify-center hover:bg-zinc-800 transition-all md:bottom-8"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  )
}