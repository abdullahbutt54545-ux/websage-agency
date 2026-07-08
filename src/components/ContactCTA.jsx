import { Link } from 'react-router-dom'
import { FaWhatsapp, FaEnvelope, FaRocket } from 'react-icons/fa'
import useScrollReveal from './ScrollReveal'
import './ContactCTA.css'

export default function ContactCTA() {
  const revealRef = useScrollReveal()

  return (
    <section className="contact-cta-section" id="contact-cta">
      <div className="container" ref={revealRef}>
        <div className="contact-cta-wrapper reveal">
          <div className="contact-cta-content">
            <h2>Ready to Build Something <span className="gradient-text">Extraordinary?</span></h2>
            <p>Let's transform your digital vision into reality. Get in touch today and let's start building your success story.</p>
            <div className="contact-cta-actions">
              <Link to="/contact" className="btn btn-primary">
                Start Your Project <FaRocket />
              </Link>
              <a href="https://wa.me/923316637318" className="btn btn-outline" target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </div>
            <div className="contact-cta-info">
              <div className="contact-cta-item">
                <FaWhatsapp />
                <a href="https://wa.me/923316637318" target="_blank" rel="noopener noreferrer">+92 331 6637318</a>
              </div>
              <div className="contact-cta-item">
                <FaEnvelope />
                <a href="mailto:contact.websageagency@gmail.com">contact.websageagency@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
