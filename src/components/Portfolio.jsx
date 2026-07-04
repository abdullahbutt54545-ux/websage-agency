import { useState } from 'react'
import { Link } from 'react-router-dom'
import { portfolioItems, categories } from '../data/portfolio'
import useScrollReveal from './ScrollReveal'
import './Portfolio.css'

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [loadedImages, setLoadedImages] = useState({})
  const revealRef = useScrollReveal()

  const handleImageLoad = (id) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }))
  }

  const filtered = activeFilter === 'all'
    ? portfolioItems.slice(0, 6)
    : portfolioItems.filter(p => p.category === activeFilter).slice(0, 6)

  return (
    <section className="section portfolio-section" id="portfolio">
      <div className="container" ref={revealRef}>
        <div className="portfolio-header reveal">
          <span className="section-label">Our Work</span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            A showcase of our best work — delivering digital excellence across industries.
          </p>
        </div>

        <div className="portfolio-filters reveal">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`portfolio-filter-btn${activeFilter === cat.id ? ' active' : ''}`}
              onClick={() => setActiveFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="portfolio-grid reveal">
          {filtered.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-card"
              style={{ '--accent-color': item.color }}
            >
              <div className="portfolio-card-stripe" style={{ background: item.color }} />
              <div className="portfolio-card-image-wrapper">
                {!loadedImages[item.id] && (
                  <div className="portfolio-card-spinner" />
                )}
                <img
                  src={`${import.meta.env.BASE_URL.slice(0, -1)}${item.image}`}
                  alt={item.title}
                  className={`portfolio-card-image${loadedImages[item.id] ? ' loaded' : ''}`}
                  loading="lazy"
                  onLoad={() => handleImageLoad(item.id)}
                />
              </div>
              <div className="portfolio-card-label">
                <div className="portfolio-card-label-title">{item.title}</div>
                <div className="portfolio-card-label-cat" style={{ color: item.color }}>{item.category === 'shopify' ? 'Shopify' : 'WordPress'}</div>
              </div>
              <div className="portfolio-card-bg">{item.title.charAt(0)}</div>
              <div className="portfolio-card-overlay">
                <div className="portfolio-card-header">
                  <h3 className="portfolio-card-title">{item.title}</h3>
                  <div className="portfolio-card-link-icon" style={{ '--accent-color': item.color }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </div>
                </div>
                <p className="portfolio-card-desc">{item.description}</p>
                <div className="portfolio-card-tags">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="portfolio-tag" style={{ color: item.color, borderColor: `${item.color}33`, background: `${item.color}11` }}>{tag}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="portfolio-cta reveal">
          <Link to="/portfolio" className="btn btn-outline">View All Projects</Link>
        </div>
      </div>
    </section>
  )
}
