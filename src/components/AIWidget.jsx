import { useState, useRef, useEffect } from 'react'
import { FaTimes, FaWhatsapp, FaEnvelope, FaPaperPlane, FaCheckCircle, FaSpinner, FaUserTie } from 'react-icons/fa'
import { MdBusiness } from 'react-icons/md'
import { saveLead } from '../utils/leadStorage'
import { getAgentResponse, delay } from '../utils/chatAgent'
import './AIWidget.css'

const PROJECT_TYPES = ['WordPress Website', 'Shopify E-Commerce', 'Custom Web App', 'Landing Page', 'SEO / Digital Marketing', 'Branding & Design']
const TIMELINES = ['2+ Weeks', '1 Month', '2–3 Months', 'Flexible', 'Custom']

export default function AIWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [formState, setFormState] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    projectType: '',
    timeline: '',
    customTimeline: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  // Chat States
  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef(null)

  // Scroll chat to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chatMessages, isTyping])

  const validate = () => {
    const e = {}
    if (!formState.name.trim()) e.name = 'Name is required'
    if (!formState.email.trim() || !/\S+@\S+\.\S+/.test(formState.email)) e.email = 'Valid email required'
    if (!formState.phone.trim()) e.phone = 'Mobile number is required'
    if (!formState.country.trim()) e.country = 'Country is required'
    if (!formState.city.trim()) e.city = 'City is required'
    if (!formState.projectType) e.projectType = 'Please select a project type'
    return e
  }

  const handleChange = (field, value) => {
    setFormState(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('submitting')

    // Save to localStorage
    saveLead(formState)

    // Send via FormSubmit (zero-config email service)
    try {
      const body = new FormData()
      body.append('name', formState.name)
      body.append('businessName', formState.businessName || 'N/A')
      body.append('email', formState.email)
      body.append('phone', formState.phone)
      body.append('country', formState.country)
      body.append('city', formState.city)
      body.append('projectType', formState.projectType)
      const finalTimeline = formState.timeline === 'Custom' ? formState.customTimeline || 'Custom (Not specified)' : formState.timeline || 'Not specified'
      body.append('timeline', finalTimeline)
      body.append('message', formState.message || 'No message provided')
      body.append('_subject', `🚀 New Lead from WebSage: ${formState.name} - ${formState.projectType}`)
      body.append('_template', 'table')
      body.append('_captcha', 'false')

      await fetch('https://formsubmit.co/contact.websageagency@gmail.com', {
        method: 'POST',
        body
      })

      setStatus('success')
      startChat(formState.name)
    } catch (err) {
      // Even if email fails, lead is already saved locally
      setStatus('success')
      startChat(formState.name)
    }
  }

  const startChat = (name) => {
    setChatMessages([
      { sender: 'agent', text: `Thanks, ${name}! I've received your details. I am your WebSage Assistant. To give you the best advice, could you tell me a little bit more about what you are looking for? Or, I can tell you about our core **services**.` }
    ])
  }

  const handleChatSubmit = async (e) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const userText = chatInput.trim()
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }])
    setChatInput('')
    setIsTyping(true)

    await delay(1000) // fake typing delay
    
    const agentReply = getAgentResponse(userText, formState.name || 'there')
    setIsTyping(false)
    setChatMessages(prev => [...prev, { sender: 'agent', text: agentReply }])
  }

  // Simple Markdown-like formatter for bold text and line breaks
  const formatText = (text) => {
    return { __html: text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }
  }

  const hasError = (field) => errors[field]

  return (
    <div className={`ai-widget-container ${isOpen ? 'open' : ''}`}>
      {!isOpen && (
        <div className="ai-widget-tooltip">
          Hi! I am here to assist you. 👋
        </div>
      )}
      {/* Floating Button */}
      <button
        className="ai-widget-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Project Inquiry Form"
      >
        {isOpen ? <FaTimes /> : <FaUserTie size={22} />}
        {!isOpen && <span className="ai-widget-badge">!</span>}
      </button>

      {/* Form Window */}
      <div className="ai-widget-window">
        {/* Header */}
        <div className="ai-widget-header">
          <div className="ai-widget-avatar-wrapper">
            <div className="ai-widget-avatar-owner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FaUserTie size={18} />
            </div>
            <span className="online-indicator" />
          </div>
          <div className="ai-widget-header-info">
            <h4>Chat with WebSage</h4>
            <p>Usually replies in a few minutes</p>
          </div>
          <button className="ai-widget-close-btn" onClick={() => setIsOpen(false)}>
            <FaTimes size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="ai-widget-body">
          {status === 'success' ? (
            // ─── Chat Interface ───
            <div className="ai-widget-chat">
              <div className="ai-chat-messages">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`ai-chat-msg ${msg.sender}`}>
                    {msg.sender === 'agent' && (
                      <div className="ai-chat-avatar"><FaUserTie /></div>
                    )}
                    <div className="ai-chat-bubble" dangerouslySetInnerHTML={formatText(msg.text)} />
                  </div>
                ))}
                {isTyping && (
                  <div className="ai-chat-msg agent">
                    <div className="ai-chat-avatar"><FaUserTie /></div>
                    <div className="ai-chat-bubble typing">
                      <span>.</span><span>.</span><span>.</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              <form className="ai-chat-input-form" onSubmit={handleChatSubmit}>
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                />
                <button type="submit" disabled={!chatInput.trim()}>
                  <FaPaperPlane />
                </button>
              </form>
            </div>
          ) : (
            // ─── The Form ───
            <form className="ai-widget-form" onSubmit={handleSubmit} noValidate>
              <p className="form-intro">
                Hi! I'm here to help you find the right services to grow your business. Tell me a bit about what you need!
              </p>

              {/* Name + Business */}
              <div className="form-row">
                <div className={`form-group ${hasError('name') ? 'error' : ''}`}>
                  <label>Full Name *</label>
                  <input
                    type="text"
                    placeholder="John Smith"
                    value={formState.name}
                    onChange={e => handleChange('name', e.target.value)}
                  />
                  {hasError('name') && <span className="form-error">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label>Business Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="Your Company"
                    value={formState.businessName}
                    onChange={e => handleChange('businessName', e.target.value)}
                  />
                </div>
              </div>

              {/* Email + Phone */}
              <div className="form-row">
                <div className={`form-group ${hasError('email') ? 'error' : ''}`}>
                  <label>Email *</label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={formState.email}
                    onChange={e => handleChange('email', e.target.value)}
                  />
                  {hasError('email') && <span className="form-error">{errors.email}</span>}
                </div>
                <div className={`form-group ${hasError('phone') ? 'error' : ''}`}>
                  <label>Mobile Number *</label>
                  <input
                    type="tel"
                    placeholder="+1 234 567 890"
                    value={formState.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                  />
                  {hasError('phone') && <span className="form-error">{errors.phone}</span>}
                </div>
              </div>

              {/* Country + City */}
              <div className="form-row">
                <div className={`form-group ${hasError('country') ? 'error' : ''}`}>
                  <label>Country *</label>
                  <input
                    type="text"
                    placeholder="e.g. United States"
                    value={formState.country}
                    onChange={e => handleChange('country', e.target.value)}
                  />
                  {hasError('country') && <span className="form-error">{errors.country}</span>}
                </div>
                <div className={`form-group ${hasError('city') ? 'error' : ''}`}>
                  <label>City *</label>
                  <input
                    type="text"
                    placeholder="e.g. New York"
                    value={formState.city}
                    onChange={e => handleChange('city', e.target.value)}
                  />
                  {hasError('city') && <span className="form-error">{errors.city}</span>}
                </div>
              </div>

              {/* Project Type */}
              <div className={`form-group ${hasError('projectType') ? 'error' : ''}`}>
                <label>Project Type *</label>
                <div className="chip-group">
                  {PROJECT_TYPES.map(pt => (
                    <button
                      key={pt}
                      type="button"
                      className={`chip ${formState.projectType === pt ? 'active' : ''}`}
                      onClick={() => handleChange('projectType', pt)}
                    >{pt}</button>
                  ))}
                </div>
                {hasError('projectType') && <span className="form-error">{errors.projectType}</span>}
              </div>



              {/* Timeline */}
              <div className="form-group">
                <label>Timeline</label>
                <div className="chip-group">
                  {TIMELINES.map(t => (
                    <button
                      key={t}
                      type="button"
                      className={`chip ${formState.timeline === t ? 'active' : ''}`}
                      onClick={() => handleChange('timeline', t)}
                    >{t}</button>
                  ))}
                </div>
                {formState.timeline === 'Custom' && (
                  <input
                    type="text"
                    placeholder="Specify your custom timeline..."
                    value={formState.customTimeline}
                    onChange={e => handleChange('customTimeline', e.target.value)}
                    style={{ marginTop: '8px' }}
                  />
                )}
              </div>

              {/* Message */}
              <div className="form-group">
                <label>Tell us more (optional)</label>
                <textarea
                  rows={3}
                  placeholder="Describe your vision, goals, target audience..."
                  value={formState.message}
                  onChange={e => handleChange('message', e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="form-submit-btn"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? (
                  <><FaSpinner className="spin" /> Sending...</>
                ) : (
                  <><FaPaperPlane /> Send message</>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Footer links */}
        <div className="ai-widget-footer-links">
          <a href="https://wa.me/923316637318" target="_blank" rel="noopener noreferrer" className="link-wa">
            <FaWhatsapp /> WhatsApp
          </a>
          <a href="mailto:contact.websageagency@gmail.com" className="link-mail">
            <FaEnvelope /> Email
          </a>
        </div>
      </div>
    </div>
  )
}
