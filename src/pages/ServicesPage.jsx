import { FaWordpress, FaShopify, FaShoppingCart, FaSearch, FaRocket, FaBullhorn, FaPaintBrush, FaLaptopCode } from 'react-icons/fa'
import { services } from '../data/services'
import AnimatedBackground from '../components/AnimatedBackground'
import ContactCTA from '../components/ContactCTA'
import useScrollReveal from '../components/ScrollReveal'
import SEO from '../components/SEO'
import './ServicesPage.css'

const iconMap = {
  FaWordpress: <FaWordpress />,
  FaShopify: <FaShopify />,
  FaShoppingCart: <FaShoppingCart />,
  FaSearch: <FaSearch />,
  FaRocket: <FaRocket />,
  FaBullhorn: <FaBullhorn />,
  FaPaintBrush: <FaPaintBrush />,
  FaLaptopCode: <FaLaptopCode />
}

const processSteps = [
  { num: '01', title: 'Discovery', desc: 'We understand your goals, audience, and competitive landscape.' },
  { num: '02', title: 'Design', desc: 'We craft stunning mockups and wireframes tailored to your brand.' },
  { num: '03', title: 'Develop', desc: 'We build your solution with clean code and best practices.' },
  { num: '04', title: 'Deploy', desc: 'We launch, optimize, and provide ongoing support.' }
]

export default function ServicesPage() {
  const ref1 = useScrollReveal()
  const ref2 = useScrollReveal()

  return (
    <div className="services-page">
      <SEO 
        title="Our Services | Custom WordPress, Shopify & SEO Solutions"
        description="Explore WebSage Agency's premium services: custom WordPress and Shopify development, data-driven SEO, responsive landing pages, and branding."
        keywords="WordPress development services, Shopify e-commerce development, custom web design services, professional SEO optimization, digital branding services"
      />
      <AnimatedBackground />

      <div className="page-hero">
        <div className="container">
          <span className="page-hero-label">Our Services</span>
          <h1>Solutions That <span className="gradient-text">Drive Growth</span></h1>
          <p>End-to-end digital services tailored to transform your business and maximize your online impact.</p>
        </div>
      </div>

      <section className="section" ref={ref1}>
        <div className="container">
          <div className="services-detail-grid reveal">
            {services.map((service, i) => (
              <div key={service.id} className="service-detail-card stagger-child">
                <div className="service-detail-icon">
                  {iconMap[service.icon]}
                </div>
                <div className="service-detail-content">
                  <h3>{service.title}</h3>
                  <p>{service.fullDesc}</p>
                </div>
                <div className="service-detail-features">
                  {service.features.map((f, j) => (
                    <span key={j} className="service-feature-tag">{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="process-section" ref={ref2}>
        <div className="container">
          <div className="process-header reveal">
            <span className="section-label">Our Process</span>
            <h2 className="section-title">How We <span className="gradient-text">Work</span></h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>A streamlined process that delivers exceptional results, every time.</p>
          </div>
          <div className="process-grid reveal">
            {processSteps.map((step, i) => (
              <div key={i} className="process-step stagger-child">
                <div className="process-step-number">{step.num}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </div>
  )
}
