import { Route, Routes, useLocation } from "react-router-dom";

import Header from "./components/Header";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";
import TermsPopup from "./components/TermsPopup";
import BackToTopButton from "./components/BackToTopButton";

import Home from "./pages/Home";
import Services from "./pages/Services";
import OrderWork from "./pages/OrderWork";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQPage from "./pages/FAQPage";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import FreeMaterials from "./pages/FreeMaterials";
import Admin from "./pages/Admin";
import Universities from "./pages/Universities";
import Portfolio from "./pages/Portfolio";
import Footer from "./components/Footer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import CookiePolicy from "./pages/CookiePolicy";
import RefundPolicy from "./pages/RefundPolicy";
import AcademicIntegrity from "./pages/AcademicIntegrity";

import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import MyOrders from "./pages/MyOrders";
import OrderTracking from "./pages/OrderTracking";

export default function App() {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ScrollToTop />

      {!isAdminPage && <TermsPopup />}
      {!isAdminPage && <Header />}

      <main className="flex-1">
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/sherbimet" element={<Services />} />
          <Route path="/si-funksionon" element={<HowItWorks />} />
          <Route path="/rreth-nesh" element={<About />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/materiale-falas" element={<FreeMaterials />} />
          <Route path="/universitetet" element={<Universities />} />
          <Route path="/portofoli" element={<Portfolio />} />

          {/* Authentication */}
          <Route path="/auth" element={<Auth />} />

          {/* User pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/zgjidh-punimin" element={<OrderWork />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/order-tracking" element={<OrderTracking />} />

          {/* Admin */}
          <Route path="/admin" element={<Admin />} />

          {/* Legal pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsConditions />}
          />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route
            path="/academic-integrity"
            element={<AcademicIntegrity />}
          />

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      {!isAdminPage && <Footer />}
      {!isAdminPage && <BackToTopButton />}
      {!isAdminPage && <WhatsAppButton />}
    </div>
  );
}