import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ScrollToTop from './components/ScrollToTop'
import TermsPopup from './components/TermsPopup'
import Home from './pages/Home'
import Services from './pages/Services'
import OrderWork from './pages/OrderWork'
import HowItWorks from './pages/HowItWorks'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQPage from './pages/FAQPage'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import FreeMaterials from './pages/FreeMaterials'
import Admin from './pages/Admin'
import Universities from './pages/Universities'
import Portfolio from './pages/Portfolio'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <TermsPopup />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sherbimet" element={<Services />} />
          <Route path="/zgjidh-punimin" element={<OrderWork />} />
          <Route path="/si-funksionon" element={<HowItWorks />} />
          <Route path="/rreth-nesh" element={<About />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/materiale-falas" element={<FreeMaterials />} />
          <Route path="/universitetet" element={<Universities />} />
          <Route path="/portofoli" element={<Portfolio />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
