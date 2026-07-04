import { useEffect, useRef } from 'react'

export default function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add staggered delay to children if specified
            const children = el.querySelectorAll('.stagger-child')
            if (children.length > 0) {
              children.forEach((child, i) => {
                // Only set if not already defined via inline styles to avoid conflicts
                if (!child.style.transitionDelay) {
                  child.style.transitionDelay = `${i * 0.2}s`
                }
                child.classList.add('visible')
              })
            }
            el.classList.add('visible')
          } else {
            // Remove 'visible' class when elements leave the screen to allow replay
            const children = el.querySelectorAll('.stagger-child')
            if (children.length > 0) {
              children.forEach((child) => {
                child.classList.remove('visible')
              })
            }
            el.classList.remove('visible')
          }
        })
      },
      {
        threshold: options.threshold || 0.02,
        rootMargin: options.rootMargin || '0px 0px 50px 0px'
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
