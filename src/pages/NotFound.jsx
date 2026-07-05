import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FaHome } from 'react-icons/fa'
import useScrollReveal from '../components/ScrollReveal'
import './NotFound.css'

export default function NotFound() {
  const revealRef = useScrollReveal()
  
  return (
    <div className="not-found-page" ref={revealRef}>
      <Helmet>
        <title>404 - Page Not Found | WebSage Agency</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Helmet>
      
      <div className="container not-found-container">
        <div className="not-found-content reveal">
          <h1 className="not-found-title gradient-text">404 Error</h1>
          <h2 className="not-found-subtitle">This page does not exist</h2>
          <p className="not-found-text">
            The link you clicked may be broken or the page may have been removed.
          </p>
          <Link to="/" className="btn btn-primary not-found-btn">
            <FaHome /> Back to Home
          </Link>
        </div>
        
        <div className="not-found-visual reveal-scale">
          <div className="animated-orbit">
            <div className="planet"></div>
            <div className="orbit orbit-1">
              <div className="satellite satellite-1"></div>
            </div>
            <div className="orbit orbit-2">
              <div className="satellite satellite-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
