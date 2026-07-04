import { FaBolt, FaEye, FaExpand, FaHeadset, FaChartLine, FaMicrochip } from 'react-icons/fa'
import useScrollReveal from './ScrollReveal'
import './WhyChooseUs.css'

const reasons = [
  { num: '01', icon: <FaBolt />, title: 'Lightning Speed', desc: 'We deliver projects on time without compromising quality. Fast turnarounds, efficient workflows.' },
  { num: '02', icon: <FaEye />, title: 'Full Transparency', desc: 'No hidden fees, no surprises. You get clear timelines, regular updates, and open communication.' },
  { num: '03', icon: <FaExpand />, title: 'Built to Scale', desc: 'Our solutions grow with your business. From startup to enterprise — we build for the future.' },
  { num: '04', icon: <FaHeadset />, title: 'Dedicated Support', desc: '24/7 support with a dedicated project manager. We\'re your partners, not just vendors.' },
  { num: '05', icon: <FaChartLine />, title: 'Results-Driven', desc: 'Every design decision is backed by data. We focus on conversions, not just aesthetics.' },
  { num: '06', icon: <FaMicrochip />, title: 'Cutting-Edge Tech', desc: 'We use the latest tools and technologies to ensure your project stays ahead of the competition.' }
]

export default function WhyChooseUs() {
  const revealRef = useScrollReveal()

  return (
    <section className="section why-section" id="why-choose-us">
      <div className="container" ref={revealRef}>
        <div className="why-header reveal">
          <span className="section-label">Why Choose Us</span>
          <h2 className="section-title">
            What Makes Us <span className="gradient-text">Different</span>
          </h2>
          <p className="section-subtitle">
            We don't just build websites — we build digital experiences that drive real business results.
          </p>
        </div>

        <div className="why-grid reveal">
          {reasons.map((r, i) => (
            <div key={i} className="why-card stagger-child">
              <div className="why-card-number">{r.num}</div>
              <div className="why-card-icon">{r.icon}</div>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
