'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'
import content from '@/data/content.json'

const nav = [
  { href: '/', label: 'Accueil' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'Qui suis-je' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-ink/98 backdrop-blur-md shadow-2xl' : 'bg-ink'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-gradient-to-br from-terra to-gold rounded-lg flex items-center justify-center font-serif font-bold text-white text-sm">
              JWL
            </div>
            <div>
              <div className="font-serif font-bold text-white text-sm leading-tight">JWL Marketing</div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest">Aix-en-Provence</div>
            </div>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {nav.map(n => (
              <Link key={n.href} href={n.href}
                className="text-white/70 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/5">
                {n.label}
              </Link>
            ))}
          </nav>

          {/* CTA desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <a href={`tel:${content.site.phone}`}
              className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
              <Phone size={14} />
              <span>07 83 79 28 14</span>
            </a>
            <Link href="/contact"
              className="bg-terra hover:bg-terra-dark text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all hover:-translate-y-0.5 hover:shadow-lg">
              Audit gratuit
            </Link>
          </div>

          {/* Burger mobile */}
          <button onClick={() => setOpen(!open)}
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="lg:hidden bg-ink border-t border-white/10">
          <div className="px-4 py-4 space-y-1">
            {nav.map(n => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
                className="block text-white/70 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg text-base font-medium transition-colors">
                {n.label}
              </Link>
            ))}
            <div className="pt-4 space-y-3 border-t border-white/10 mt-4">
              <a href={`tel:${content.site.phone}`}
                className="flex items-center gap-2 text-white/60 px-4 py-2 text-sm">
                <Phone size={14} /> 07 83 79 28 14
              </a>
              <Link href="/contact" onClick={() => setOpen(false)}
                className="block bg-terra text-white text-center px-4 py-3 rounded-lg font-bold text-sm">
                Audit gratuit
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
