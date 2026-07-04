import { FaWordpress, FaShopify, FaGoogle, FaFacebook, FaMailchimp, FaFigma, FaElementor, FaChartLine } from 'react-icons/fa'
import { SiCanva, SiGoogleanalytics, SiHubspot, SiSemrush, SiWoocommerce, SiMeta } from 'react-icons/si'
import './TechMarquee.css'

const tools = [
  { name: 'WordPress', icon: <FaWordpress /> },
  { name: 'Shopify', icon: <FaShopify /> },
  { name: 'Meta Ads', icon: <FaFacebook /> },
  { name: 'Google Ads', icon: <FaGoogle /> },
  { name: 'Figma', icon: <FaFigma /> },
  { name: 'SEMrush', icon: <FaChartLine /> },
  { name: 'Mailchimp', icon: <FaMailchimp /> },
  { name: 'Canva', icon: <SiCanva /> },
  { name: 'Google Analytics', icon: <FaChartLine /> },
  { name: 'HubSpot', icon: <SiHubspot /> },
  { name: 'Elementor', icon: <FaElementor /> },
  { name: 'WooCommerce', icon: <FaShopify /> },
]

export default function TechMarquee() {
  const doubled = [...tools, ...tools]

  return (
    <section className="tech-marquee" id="tech-marquee">
      <div className="marquee-label">Tools & Platforms We Master</div>
      <div className="marquee-track">
        {doubled.map((tool, i) => (
          <div key={i}>
            <div className="marquee-item">
              {tool.icon}
              {tool.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
