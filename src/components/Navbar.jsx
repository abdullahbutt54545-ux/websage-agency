import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/blog', label: 'Blog' },
  { path: '/faq', label: 'FAQ' },
  { path: '/contact', label: 'Contact' }
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      if (mobileOpen) {
        setMobileOpen(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mobileOpen])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="main-navbar">
        <div className="navbar-inner">
          <Link to="/" className="nav-logo">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="WebSage Agency Logo" className={scrolled ? 'logo-img-scrolled' : ''} />
            <div className="nav-logo-text-container">
              <span className={`nav-logo-full ${scrolled ? 'hidden' : ''}`}>Web<span>Sage</span> Agency</span>
              <span className={`nav-logo-short ${scrolled ? 'visible' : ''}`}>WS</span>
            </div>
          </Link>

          <div className="nav-links">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link${location.pathname === item.path ? ' active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link to="/contact" className="btn btn-primary nav-cta desktop-only">
            Get a Quote
          </Link>

          <button
            className={`nav-toggle${mobileOpen ? ' open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`nav-mobile${mobileOpen ? ' open' : ''}`}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-link${location.pathname === item.path ? ' active' : ''}`}
          >
            {item.label}
          </Link>
        ))}
        <Link to="/contact" className="btn btn-primary" style={{ marginTop: 16 }}>
          Get a Quote
        </Link>
      </div>
    </>
  )
}
