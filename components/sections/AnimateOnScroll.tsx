'use client'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right'
}

export default function AnimateOnScroll({ children, className, delay = 0, direction = 'up' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('in-view'); obs.disconnect() }
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const directionClass = {
    up: 'translate-y-6',
    left: '-translate-x-6',
    right: 'translate-x-6',
  }[direction]

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        'opacity-0 transition-all duration-700 ease-out',
        directionClass,
        '[&.in-view]:opacity-100 [&.in-view]:translate-y-0 [&.in-view]:translate-x-0',
        className
      )}
    >
      {children}
    </div>
  )
}
