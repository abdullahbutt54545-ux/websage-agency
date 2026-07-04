import './HeroGraphic.css'
import { FaShieldAlt, FaChartLine, FaCloudUploadAlt } from 'react-icons/fa'

export default function HeroGraphic() {
  return (
    <div className="hg-cyber-container">
      {/* Background Grid */}
      <div className="hg-cyber-grid" />
      
      {/* Central Cybernetic Core */}
      <div className="hg-cyber-core">
        <div className="core-scanner" />
        <div className="core-inner-glow" />
        <div className="core-circles">
          <div className="c-circle c1" />
          <div className="c-circle c2" />
          <div className="c-circle c3" />
        </div>
      </div>

      {/* Floating Data Panels */}
      <div className="cyber-panel p-top">
        <div className="p-icon"><FaShieldAlt /></div>
        <div className="p-text">
          <span className="p-val">HIGH SPEED</span>
          <span className="p-lbl">Performance</span>
        </div>
      </div>

      <div className="cyber-panel p-right">
        <div className="p-icon"><FaChartLine /></div>
        <div className="p-text">
          <span className="p-val">10X</span>
          <span className="p-lbl">SEO Growth</span>
        </div>
      </div>

      <div className="cyber-panel p-bottom">
        <div className="p-icon"><FaCloudUploadAlt /></div>
        <div className="p-text">
          <span className="p-val">CUSTOM</span>
          <span className="p-lbl">Web Design</span>
        </div>
      </div>

      {/* Animated Data Streams */}
      <div className="data-streams">
        <div className="stream s1" />
        <div className="stream s2" />
        <div className="stream s3" />
      </div>

      {/* Orbiting Particles */}
      <div className="cyber-particles">
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`particle p${i}`} />
        ))}
      </div>
    </div>
  )
}
