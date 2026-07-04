import AnimatedBackground from '../components/AnimatedBackground'
import FAQ from '../components/FAQ'
import SEO from '../components/SEO'

export default function FAQPage() {
  return (
    <div className="faq-page">
      <SEO 
        title="Frequently Asked Questions | WebSage Digital Agency"
        description="Have questions about our WordPress, Shopify, or SEO services? Read our FAQ to learn how WebSage Agency delivers premium digital solutions."
        keywords="web design FAQ, SEO questions, Shopify development cost, WordPress agency FAQ, digital marketing FAQ"
      />
      <AnimatedBackground />

      <div className="page-hero">
        <div className="container">
          <span className="page-hero-label">FAQ</span>
          <h1>Frequently Asked <span className="gradient-text">Questions</span></h1>
          <p>Everything you need to know about our services, process, and pricing.</p>
        </div>
      </div>

      <FAQ showAll={true} />
    </div>
  )
}
