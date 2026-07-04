import { FaRocket } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import HeroGraphic from './HeroGraphic'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Digital Agency — Est. 2024
          </div>

          <h1 className="hero-title">
            <span className="line">Expert Web Design &</span>
            <span className="line">
              <span className="highlight">SEO Growth</span>
            </span>
          </h1>

          <p className="hero-subtitle">
            We build high-performance websites and data-driven SEO strategies that scale your business and dominate search results.
          </p>

          <div className="hero-actions">
            <Link to="/contact" className="btn btn-primary">
              Start Your Project
              <FaRocket />
            </Link>
            <Link to="/services" className="btn btn-outline">
              Explore Services
            </Link>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-number">150<span>+</span></div>
              <div className="hero-stat-label">Projects Delivered</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">98<span>%</span></div>
              <div className="hero-stat-label">Client Satisfaction</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">50<span>+</span></div>
              <div className="hero-stat-label">Global Clients</div>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <HeroGraphic />
        </div>

      </div>

      <div className="hero-scroll">
        <span className="hero-scroll-text">Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  )
}
