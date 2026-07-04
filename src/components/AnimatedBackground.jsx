import InteractiveParticles from './InteractiveParticles'
import './AnimatedBackground.css'

export default function AnimatedBackground() {
  return (
    <div className="animated-bg" aria-hidden="true">
      <InteractiveParticles />
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />
      <div className="bg-grid" />
      <div className="bg-noise" />
      <div className="bg-vignette" />
    </div>
  )
}
