import { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaLinkedinIn, FaPaperPlane } from 'react-icons/fa'
import AnimatedBackground from '../components/AnimatedBackground'
import useScrollReveal from '../components/ScrollReveal'
import SEO from '../components/SEO'
import './Contact.css'

export default function Contact() {
  const revealRef = useScrollReveal()
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const body = new FormData()
      body.append('name', formData.name)
      body.append('email', formData.email)
      body.append('phone', formData.phone || 'Not provided')
      body.append('service', formData.service)
      body.append('message', formData.message)
      body.append('_subject', `🚀 New Contact Form Lead: ${formData.name}`)
      body.append('_template', 'table')
      body.append('_captcha', 'false')

      await fetch('https://formsubmit.co/contact.websageagency@gmail.com', {
        method: 'POST',
        body
      })
      
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', service: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 5000)
    }
  }

  return (
    <div className="contact-page">
      <AnimatedBackground />

      <div className="page-hero">
        <div className="container">
          <span className="page-hero-label">Contact Us</span>
          <h1>Let's Start Your <span className="gradient-text">Project</span></h1>
          <p>Ready to transform your digital presence? Get in touch and let's discuss how we can help your business grow.</p>
        </div>
      </div>

      <section className="section" ref={revealRef}>
        <div className="container">
          <div className="contact-grid reveal">
            <div className="contact-info">
              <h2>Get In <span className="gradient-text">Touch</span></h2>
              <p>Whether you need a WordPress site, Shopify store, SEO strategy, or a complete brand overhaul — we're here to help. Reach out and let's make it happen.</p>

              <div className="contact-cards">
                <a href="tel:+923316637318" className="contact-card">
                  <div className="contact-card-icon"><FaPhone /></div>
                  <div className="contact-card-text">
                    <h4>Phone</h4>
                    <p>+92 331 6637318</p>
                  </div>
                </a>
                <a href="mailto:contact.websageagency@gmail.com" className="contact-card">
                  <div className="contact-card-icon"><FaEnvelope /></div>
                  <div className="contact-card-text">
                    <h4>Email</h4>
                    <p>contact.websageagency@gmail.com</p>
                  </div>
                </a>
                <div className="contact-card">
                  <div className="contact-card-icon"><FaMapMarkerAlt /></div>
                  <div className="contact-card-text">
                    <h4>Location</h4>
                    <p>Remote — Serving Clients Worldwide</p>
                  </div>
                </div>
              </div>

              <div className="contact-socials-section">
                <h4>Follow Us</h4>
                <div className="contact-socials">
                  <a href="https://www.facebook.com/profile.php?id=61588411305318" target="_blank" rel="noopener noreferrer" className="contact-social-btn" aria-label="Facebook"><FaFacebookF /></a>
                  <a href="https://www.instagram.com/websageagency/" target="_blank" rel="noopener noreferrer" className="contact-social-btn" aria-label="Instagram"><FaInstagram /></a>
                  <a href="https://www.linkedin.com/company/websage-agency/" target="_blank" rel="noopener noreferrer" className="contact-social-btn" aria-label="LinkedIn"><FaLinkedinIn /></a>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <h3>Send Us a Message</h3>
              <p>Fill out the form below and we'll get back to you within 24 hours.</p>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <div style={{ fontSize: '3rem', marginBottom: 16 }}>🎉</div>
                  <h3 style={{ color: 'var(--red-primary)', marginBottom: 8 }}>Message Sent!</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-small)' }}>Thank you for reaching out. We'll get back to you shortly!</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input type="text" id="name" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input type="email" id="email" name="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input type="tel" id="phone" name="phone" placeholder="+92 300 0000000" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="service">Service Needed</label>
                      <select id="service" name="service" value={formData.service} onChange={handleChange} required>
                        <option value="">Select a service...</option>
                        <option value="wordpress">WordPress Development</option>
                        <option value="shopify">Shopify Development</option>
                        <option value="ecommerce">E-Commerce Solutions</option>
                        <option value="seo">SEO & Optimization</option>
                        <option value="landing">Landing Page Design</option>
                        <option value="marketing">Digital Marketing</option>
                        <option value="branding">Graphic Design & Branding</option>
                        <option value="portfolio">Portfolio & Business Website</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Your Message</label>
                    <textarea id="message" name="message" placeholder="Tell us about your project..." value={formData.message} onChange={handleChange} required />
                  </div>
                  <div className="form-submit">
                    <button type="submit" className="btn btn-primary">
                      Send Message <FaPaperPlane />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
