import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPhone, FaEnvelope } from 'react-icons/fa'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src="/logo.png" alt="WebSage Agency" />
              <span className="footer-logo-text">Web<span>Sage</span> Agency</span>
            </Link>
            <p className="footer-desc">
              We craft stunning digital experiences — from WordPress & Shopify stores to SEO strategies and brand identities. Let's build something extraordinary together.
            </p>
            <div className="footer-socials">
              <a href="https://www.facebook.com/profile.php?id=61588411305318" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://www.instagram.com/websageagency/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/company/websage-agency/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <div className="footer-links">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/about" className="footer-link">About Us</Link>
              <Link to="/services" className="footer-link">Services</Link>
              <Link to="/portfolio" className="footer-link">Portfolio</Link>
              <Link to="/blog" className="footer-link">Blog</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
            </div>
          </div>

          <div className="footer-column">
            <h4>Services</h4>
            <div className="footer-links">
              <Link to="/services" className="footer-link">WordPress Development</Link>
              <Link to="/services" className="footer-link">Shopify Development</Link>
              <Link to="/services" className="footer-link">SEO & Optimization</Link>
              <Link to="/services" className="footer-link">Landing Pages</Link>
              <Link to="/services" className="footer-link">Digital Marketing</Link>
              <Link to="/services" className="footer-link">Graphic Design</Link>
            </div>
          </div>

          <div className="footer-column">
            <h4>Contact</h4>
            <div className="footer-links">
              <a href="tel:+923316637318" className="footer-link">
                <FaPhone /> +92 331 6637318
              </a>
              <a href="mailto:contact.websageagency@gmail.com" className="footer-link">
                <FaEnvelope /> contact.websageagency@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} <a href="/">WebSage Agency</a>. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <Link to="/faq">FAQ</Link>
            <Link to="/">Privacy Policy</Link>
            <Link to="/">Terms of Service</Link>
          </div>
        </div>
      </div>

      <div className="footer-watermark">WEBSAGE AGENCY</div>
    </footer>
  )
}
