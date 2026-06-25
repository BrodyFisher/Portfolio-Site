import { useEffect, useRef, useState } from 'react'

// Adds an `is-visible` class once an element scrolls into view.
// Pair with the `.reveal` CSS class for a fade-up entrance.
export function useReveal(options = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px', ...options },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, visible]
}
