import { Hero, WhyUs, HowItWorks, ServicesPreview, Testimonials, CTABanner, UniversitiesStrip } from '../components/home'

export default function Home() {
  return (
    <>
      <Hero />
      <UniversitiesStrip />
      <WhyUs />
      <ServicesPreview />
      <HowItWorks />
      <Testimonials />
      <CTABanner />
    </>
  )
}
