'use client'
// Intersection Observer pour les animations scroll
export function initAnimations() {
  if (typeof window === 'undefined') return
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  )
  document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el))
  return () => observer.disconnect()
}
