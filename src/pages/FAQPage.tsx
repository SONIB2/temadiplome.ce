import SEO from '../components/SEO'
import FAQ from '../components/FAQ'

export default function FAQPage() {
  return (
    <>
      <SEO
        title="Pyetje të Bëra Shpesh"
        description="Përgjigjet e pyetjeve të bëra shpesh rreth shërbimeve tona akademike."
        path="/faq"
      />
      <div className="pt-32 pb-20">
        <section className="container-academic">
          <FAQ />
        </section>
      </div>
    </>
  )
}
