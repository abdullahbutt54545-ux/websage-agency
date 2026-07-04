import { FaStar } from 'react-icons/fa'
import { testimonials } from '../data/testimonials'
import useScrollReveal from './ScrollReveal'
import './Testimonials.css'

export default function Testimonials() {
  const revealRef = useScrollReveal()

  return (
    <section className="section testimonials-section" id="testimonials">
      <div className="container" ref={revealRef}>
        <div className="testimonials-header reveal">
          <span className="section-label">Client Love</span>
          <h2 className="section-title">
            What Our Clients <span className="gradient-text">Say</span>
          </h2>
          <p className="section-subtitle">
            Don't take our word for it — hear from the businesses we've helped succeed.
          </p>
        </div>

        <div className="testimonials-grid reveal">
          {testimonials.slice(0, 3).map((t) => (
            <div key={t.id} className="testimonial-card stagger-child">
              <div className="testimonial-stars">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.avatar}</div>
                <div className="testimonial-author-info">
                  <h4>{t.name}</h4>
                  <p>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
