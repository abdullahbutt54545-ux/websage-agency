import { useEffect, useRef } from 'react'

export default function InteractiveParticles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    
    let particles = []
    const particleCount = window.innerWidth <= 768 ? 90 : 180
    const mouse = { x: null, y: null, radius: 250 }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', resize)
    resize()

    const handleMouseMove = (e) => {
      mouse.x = e.x
      mouse.y = e.y
    }
    const handleMouseOut = () => {
      mouse.x = null
      mouse.y = null
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseout', handleMouseOut)

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.8
        this.vx = (Math.random() - 0.5) * 1.5
        this.vy = (Math.random() - 0.5) * 1.5
        this.friction = 0.95
        this.density = (Math.random() * 15) + 2
        this.color = 'rgba(227, 27, 35, 0.8)'
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }

      update() {
        // Boundary collision
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1

        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.x
          let dy = mouse.y - this.y
          let distance = Math.sqrt(dx * dx + dy * dy)
          let maxDistance = mouse.radius

          if (distance < maxDistance) {
            let force = (maxDistance - distance) / maxDistance
            let accel = force * this.density * 0.008
            
            this.vx += (dx / distance) * accel
            this.vy += (dy / distance) * accel

            // Draw "rope" line to mouse
            ctx.strokeStyle = `rgba(227, 27, 35, ${force * 0.6})`
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
          }
        }

        this.vx *= this.friction
        this.vy *= this.friction

        // Smooth ambient movement when slow (no random jitter)
        const minVelocity = 0.15
        if (Math.abs(this.vx) < minVelocity) {
          this.vx += this.vx > 0 ? 0.005 : -0.005
        }
        if (Math.abs(this.vy) < minVelocity) {
          this.vy += this.vy > 0 ? 0.005 : -0.005
        }

        this.x += this.vx
        this.y += this.vy
      }
    }

    const init = () => {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw()
        particles[i].update()
      }
      connect()
      animationFrameId = requestAnimationFrame(animate)
    }

    const connect = () => {
      let opacityValue = 1
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let dx = particles[a].x - particles[b].x
          let dy = particles[a].y - particles[b].y
          let distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            opacityValue = 1 - (distance / 150)
            ctx.strokeStyle = `rgba(227, 27, 35, ${opacityValue * 0.2})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[a].x, particles[a].y)
            ctx.lineTo(particles[b].x, particles[b].y)
            ctx.stroke()
          }
        }
      }
    }

    init()
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseout', handleMouseOut)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        pointerEvents: 'none', 
        zIndex: 1,
        opacity: 0.9
      }} 
    />
  )
}
