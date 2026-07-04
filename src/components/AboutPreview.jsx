import { Link } from 'react-router-dom'
import { FaBolt, FaShieldAlt, FaUsers, FaChartLine } from 'react-icons/fa'
import useScrollReveal from './ScrollReveal'
import './AboutPreview.css'

const features = [
  { icon: <FaBolt />, title: 'Lightning Fast', desc: 'Optimized sites that load in under 2 seconds' },
  { icon: <FaShieldAlt />, title: 'Secure & Reliable', desc: 'Enterprise-grade security on every project' },
  { icon: <FaUsers />, title: 'Client-First', desc: 'Your vision drives every design decision' },
  { icon: <FaChartLine />, title: 'Results-Driven', desc: 'Every pixel is optimized for conversion' }
]

const stats = [
  { value: '150+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '5+', label: 'Years Experience' },
  { value: '50+', label: 'Global Clients' }
]

export default function AboutPreview() {
  const revealRef = useScrollReveal()

  return (
    <section className="section about-preview" id="about-preview">
      <div className="container" ref={revealRef}>
        <div className="about-grid">
          <div className="about-visual reveal-fade">
            <div className="growth-viz-wrap">
              <div className="growth-viz-bg"></div>
              
              {/* Main Growth Chart Card */}
              <div className="growth-card main-chart">
                <div className="growth-card-header">
                  <span>SEO Growth Analysis</span>
                  <div className="growth-status">Live</div>
                </div>
                <div className="growth-chart-body">
                  <div className="chart-bar-wrap">
                    <div className="chart-bar" style={{ height: '30%' }}></div>
                    <div className="chart-bar" style={{ height: '45%' }}></div>
                    <div className="chart-bar" style={{ height: '35%' }}></div>
                    <div className="chart-bar" style={{ height: '60%' }}></div>
                    <div className="chart-bar" style={{ height: '85%' }}></div>
                    <div className="chart-bar highlight" style={{ height: '95%' }}></div>
                  </div>
                </div>
                <div className="growth-card-footer">
                  <div className="growth-metric">
                    <span className="m-val">+342%</span>
                    <span className="m-lbl">Organic Traffic</span>
                  </div>
                </div>
              </div>

              {/* Floating Performance Widget */}
              <div className="growth-card perf-widget">
                <div className="perf-circle-wrap">
                  <svg viewBox="0 0 36 36" className="perf-circle">
                    <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="circle-fill" strokeDasharray="99, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <div className="perf-percentage">99</div>
                </div>
                <span className="perf-label">Score</span>
              </div>

              {/* Floating Keyword Widget */}
              <div className="growth-card keyword-widget">
                <div className="kw-row"><span>#1</span> Google</div>
                <div className="kw-row"><span>#1</span> Shopify</div>
                <div className="kw-row"><span>#1</span> Marketing</div>
              </div>
            </div>

            <div className="about-accent-box">
              <div className="about-accent-number">10x</div>
              <div className="about-accent-label">Client Growth</div>
            </div>
          </div>

          <div className="about-content reveal-right">
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-title">
              We Scale Brands Through <span className="gradient-text">Strategic SEO & Design</span>
            </h2>
            <p className="section-subtitle">
              At WebSage Agency, we don't just build websites; we engineer digital growth engines. Our team of expert developers and SEO specialists work in tandem to ensure your brand not only looks premium but dominates search rankings.
            </p>

            <div className="about-features">
              {features.map((f, i) => (
                <div key={i} className="about-feature">
                  <div className="about-feature-icon">{f.icon}</div>
                  <div className="about-feature-text">
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 32 }}>
              <Link to="/about" className="btn btn-primary">
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>

        <div className="about-stats-row reveal">
          {stats.map((s, i) => (
            <div key={i} className="about-stat-card stagger-child">
              <div className="about-stat-value">{s.value}</div>
              <div className="about-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
