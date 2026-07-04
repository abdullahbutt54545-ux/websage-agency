import AnimatedBackground from '../components/AnimatedBackground'
import Hero from '../components/Hero'
import TechMarquee from '../components/TechMarquee'
import AboutPreview from '../components/AboutPreview'
import Services from '../components/Services'
import WhyChooseUs from '../components/WhyChooseUs'
import Portfolio from '../components/Portfolio'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import ContactCTA from '../components/ContactCTA'
import SEO from '../components/SEO'

export default function Home() {
  return (
    <>
      <SEO 
        title="WebSage Agency | High-Performance Web Design & SEO Services"
        description="Transform your business with WebSage Agency. We build high-converting WordPress sites, Shopify stores, and dominate search engines with expert SEO strategies."
        keywords="web design agency, SEO agency, WordPress development company, Shopify experts, digital marketing firm, high conversion landing pages"
      />
      <AnimatedBackground />
      <Hero />
      <TechMarquee />
      <AboutPreview />
      <Services />
      <WhyChooseUs />
      <Portfolio />
      <Testimonials />
      <FAQ />
      <ContactCTA />
    </>
  )
}
