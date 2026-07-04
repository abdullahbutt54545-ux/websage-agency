import { FaBullseye, FaEye, FaHeart, FaHandshake, FaLightbulb, FaGem, FaWordpress, FaShopify, FaReact, FaFigma, FaNodeJs, FaGoogle } from 'react-icons/fa'
import AnimatedBackground from '../components/AnimatedBackground'
import useScrollReveal from '../components/ScrollReveal'
import ContactCTA from '../components/ContactCTA'
import SEO from '../components/SEO'
import './About.css'

const values = [
  { icon: <FaHeart />, title: 'Passion', desc: 'We love what we do and it shows in every pixel.' },
  { icon: <FaHandshake />, title: 'Integrity', desc: 'Honest pricing, clear communication, always.' },
  { icon: <FaLightbulb />, title: 'Innovation', desc: 'We stay ahead with cutting-edge solutions.' },
  { icon: <FaGem />, title: 'Excellence', desc: 'We don\'t settle for good — we aim for exceptional.' }
]

export default function About() {
  const ref1 = useScrollReveal()
  const ref2 = useScrollReveal()
  const ref3 = useScrollReveal()

  return (
    <div className="about-page">
      <SEO 
        title="About Us | WebSage Digital Agency"
        description="Learn about WebSage Agency's mission, our expert team, and why global brands trust us for their WordPress, Shopify, and Digital Marketing needs."
        keywords="about WebSage, digital agency team, web development experts, global digital agency, best SEO company"
      />
      <AnimatedBackground />

      <div className="page-hero">
        <div className="container">
          <span className="page-hero-label">About Us</span>
          <h1>The Story Behind <span className="gradient-text">WebSage</span></h1>
          <p>We're a passionate team of designers, developers, and marketers dedicated to helping businesses dominate the digital landscape.</p>
        </div>
      </div>

      <section className="about-story" ref={ref1}>
        <div className="container">
          <div className="about-story-grid reveal">
            <div className="about-story-content">
              <span className="section-label">Our Story</span>
              <h2>From Vision to <span className="gradient-text">Digital Excellence</span></h2>
              <p>WebSage Agency was born from a simple belief: every business deserves a powerful digital presence. What started as a small team of passionate web enthusiasts has grown into a full-service digital agency serving clients across the globe.</p>
              <p>We've built over 150 projects — from stunning WordPress sites and high-converting Shopify stores to comprehensive SEO campaigns and brand identity systems. Our approach combines creative design with data-driven strategy to deliver results that matter.</p>
              <p>Today, we continue to push boundaries, embracing new technologies and methodologies to keep our clients ahead of the curve. We're not just building websites — we're building digital empires.</p>
            </div>
            <div className="about-story-visual">
              <div className="tech-ecosystem">
                <div className="orbit orbit-1">
                  <div className="orbit-icon wp"><FaWordpress /></div>
                  <div className="orbit-icon shopify"><FaShopify /></div>
                </div>
                <div className="orbit orbit-2">
                  <div className="orbit-icon react"><FaReact /></div>
                  <div className="orbit-icon figma"><FaFigma /></div>
                </div>
                <div className="orbit orbit-3">
                  <div className="orbit-icon node"><FaNodeJs /></div>
                  <div className="orbit-icon google"><FaGoogle /></div>
                </div>
                <div className="ecosystem-center">
                  <img src={`${import.meta.env.BASE_URL}logo.png`} alt="WebSage Core" className="ecosystem-logo" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-mv" ref={ref2}>
        <div className="container">
          <div className="about-mv-grid reveal">
            <div className="about-mv-card">
              <div className="mv-icon"><FaBullseye /></div>
              <h3>Our Mission</h3>
              <p>To empower businesses of all sizes with premium digital solutions that drive growth, enhance brand visibility, and deliver measurable results. We make world-class web design and marketing accessible to everyone.</p>
            </div>
            <div className="about-mv-card">
              <div className="mv-icon"><FaEye /></div>
              <h3>Our Vision</h3>
              <p>To be the most trusted and innovative digital agency globally — known for transforming businesses through exceptional design, strategic marketing, and cutting-edge technology that consistently exceeds expectations.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-values" ref={ref3}>
        <div className="container">
          <div className="about-values-header reveal">
            <span className="section-label">Our Values</span>
            <h2 className="section-title">What We <span className="gradient-text">Stand For</span></h2>
          </div>
          <div className="about-values-grid reveal">
            {values.map((v, i) => (
              <div key={i} className="value-card stagger-child">
                <div className="value-icon">{v.icon}</div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </div>
  )
}
