import { Link } from 'react-router-dom'
import { FaWordpress, FaShopify, FaShoppingCart, FaSearch, FaRocket, FaBullhorn, FaPaintBrush, FaLaptopCode, FaArrowRight } from 'react-icons/fa'
import { services } from '../data/services'
import useScrollReveal from './ScrollReveal'
import './Services.css'

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

export default function Services() {
  const revealRef = useScrollReveal()

  return (
    <section className="section services-section" id="services">
      <div className="container" ref={revealRef}>
        <div className="services-header reveal">
          <span className="section-label">What We Do</span>
          <h2 className="section-title">
            Services That <span className="gradient-text">Drive Results</span>
          </h2>
          <p className="section-subtitle">
            From concept to launch, we deliver end-to-end digital solutions tailored to your business goals.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, i) => {
            const directions = ['reveal-left', 'reveal-scale', 'reveal-right', 'reveal-down'];
            return (
            <div key={service.id} className={`service-card stagger-child ${directions[i % 4]}`}>
              <div className="service-icon-wrapper">
                {iconMap[service.icon]}
              </div>
              <h3>{service.title}</h3>
              <p>{service.shortDesc}</p>
              <Link to="/services" className="service-arrow">
                Learn More <FaArrowRight />
              </Link>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
