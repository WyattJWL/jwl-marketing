import Link from 'next/link'
import { Phone, Mail, MapPin, Linkedin, Facebook } from 'lucide-react'
import content from '@/data/content.json'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-ink text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-terra to-gold rounded-lg flex items-center justify-center font-serif font-bold text-white text-sm">JWL</div>
              <div>
                <div className="font-serif font-bold text-white">JWL Marketing</div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest">Aix-en-Provence</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
              Consultante SEO & Marketing Digital. J'accompagne les indépendants et TPE/PME de la région PACA.
            </p>
            <div className="flex gap-3">
              {content.site.socialLinks.linkedin && (
                <a href={content.site.socialLinks.linkedin} target="_blank" rel="noopener"
                  className="w-9 h-9 bg-white/5 hover:bg-terra rounded-lg flex items-center justify-center transition-colors">
                  <Linkedin size={15} />
                </a>
              )}
              {content.site.socialLinks.facebook && (
                <a href={content.site.socialLinks.facebook} target="_blank" rel="noopener"
                  className="w-9 h-9 bg-white/5 hover:bg-terra rounded-lg flex items-center justify-center transition-colors">
                  <Facebook size={15} />
                </a>
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-white/40 mb-4">Services</h3>
            <ul className="space-y-2">
              {content.services.map(s => (
                <li key={s.slug}>
                  <Link href={`/services#${s.slug}`} className="text-white/60 hover:text-terra text-sm transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-white/40 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href={`tel:${content.site.phone}`} className="flex items-center gap-2 text-white/60 hover:text-terra text-sm transition-colors">
                  <Phone size={13} /> 07 83 79 28 14
                </a>
              </li>
              <li>
                <a href={`mailto:${content.site.email}`} className="flex items-center gap-2 text-white/60 hover:text-terra text-sm transition-colors">
                  <Mail size={13} /> {content.site.email}
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2 text-white/60 text-sm">
                  <MapPin size={13} className="mt-0.5 flex-shrink-0" /> {content.site.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Zones */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-white/30 text-xs mb-3">Zones d'intervention :</p>
          <div className="flex flex-wrap gap-2">
            {content.zones.map(z => (
              <span key={z} className="text-white/40 text-xs bg-white/5 px-2 py-1 rounded">{z}</span>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">© {year} JWL Marketing — Tous droits réservés</p>
          <div className="flex gap-4">
            <Link href="/mentions-legales" className="text-white/30 hover:text-white/60 text-xs transition-colors">Mentions légales</Link>
            <Link href="/politique-confidentialite" className="text-white/30 hover:text-white/60 text-xs transition-colors">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
