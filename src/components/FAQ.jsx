import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import { faqData } from '../data/faq'
import useScrollReveal from './ScrollReveal'
import './FAQ.css'

export default function FAQ({ showAll = false }) {
  const [openIndex, setOpenIndex] = useState(null)
  const revealRef = useScrollReveal()

  const allItems = faqData.flatMap(cat => cat.items)
  const displayItems = showAll ? allItems : allItems.slice(0, 5)

  return (
    <section className="section faq-section-home" id="faq">
      <div className="container" ref={revealRef}>
        <div className="faq-home-header reveal">
          <span className="section-label">FAQ</span>
          <h2 className="section-title">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="section-subtitle">
            Got questions? We've got answers. Here are some of the most common things our clients ask.
          </p>
        </div>

        <div className="faq-list reveal">
          {displayItems.map((item, i) => (
            <div key={i} className={`faq-item${openIndex === i ? ' open' : ''}`}>
              <button
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                {item.q}
                <span className="faq-icon"><FaPlus /></span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">{item.a}</div>
              </div>
            </div>
          ))}
        </div>

        {!showAll && (
          <div className="faq-cta reveal">
            <Link to="/faq" className="btn btn-outline">View All FAQs</Link>
          </div>
        )}
      </div>
    </section>
  )
}
