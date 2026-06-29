import type { Metadata } from 'next'
import { CheckCircle, ArrowRight, Phone } from 'lucide-react'
import Section from '@/components/ui/Section'
import SectionTitle from '@/components/ui/SectionTitle'
import AnimateOnScroll from '@/components/sections/AnimateOnScroll'
import Button from '@/components/ui/Button'
import content from '@/data/content.json'

export const metadata: Metadata = {
  title: 'Services SEO & Marketing Digital — JWL Marketing Aix-en-Provence',
  description: 'Audit SEO, référencement local, création site web, Google Business Profile, formation SEO. Prestations sur mesure pour TPE et PME à Aix-en-Provence et en PACA.',
  alternates: { canonical: 'https://www.jwl-marketing.fr/services' },
}

const iconMap: Record<string, React.ReactNode> = {
  Search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  MapPin: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Globe: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Star: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  GraduationCap: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  TrendingUp: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-ink py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll>
            <div className="inline-flex items-center gap-2 bg-terra/15 border border-terra/30 text-terra px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
              Mes services
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
              Des solutions SEO concrètes pour{' '}
              <span className="gradient-text">votre visibilité locale</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Chaque prestation est pensée pour les TPE, PME et indépendants qui veulent plus de clients depuis Google.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Services list */}
      <Section>
        <div className="space-y-20">
          {content.services.map((service, i) => (
            <div key={service.slug} id={service.slug}>
              <AnimateOnScroll>
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                  {/* Content */}
                  <div>
                    <div className="w-14 h-14 bg-terra/10 rounded-2xl flex items-center justify-center mb-6 text-terra">
                      {iconMap[service.icon]}
                    </div>
                    <div className="text-terra text-sm font-bold uppercase tracking-wider mb-2">
                      {service.price}
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mb-4">{service.title}</h2>
                    <p className="text-muted leading-relaxed text-lg mb-6">{service.description}</p>
                    <ul className="space-y-3 mb-8">
                      {service.benefits.map((b, j) => (
                        <li key={j} className="flex items-center gap-3">
                          <CheckCircle size={16} className="text-terra flex-shrink-0" />
                          <span className="text-ink2 text-sm">{b}</span>
                        </li>
                      ))}
                    </ul>
                    <Button href="/contact" size="lg">
                      Demander un devis <ArrowRight size={16} />
                    </Button>
                  </div>

                  {/* Image service */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-surface to-bd rounded-2xl overflow-hidden border border-bd relative">
                    {service.imageUrl ? (
                      <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-muted/40">
                        <div className="text-terra mb-4">{iconMap[service.icon]}</div>
                        <p className="text-sm font-medium">{service.title}</p>
                        <p className="text-xs mt-1 opacity-60">URL image dans l&apos;admin</p>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-terra/10 rounded-xl" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 bg-gold/10 rounded-lg" />
                  </div>
                </div>
              </AnimateOnScroll>
              {i < content.services.length - 1 && <div className="border-t border-bd mt-20" />}
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-surface border-t border-bd py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mb-4">
              Vous ne savez pas par où commencer ?
            </h2>
            <p className="text-muted text-lg mb-8">
              Commençons par un audit gratuit de votre situation actuelle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" size="lg">Audit gratuit <ArrowRight size={16} /></Button>
              <a href={`tel:${content.site.phone}`}
                className="inline-flex items-center justify-center gap-2 border-2 border-bd hover:border-terra text-ink px-8 py-4 rounded-xl font-medium transition-all">
                <Phone size={15} /> 07 83 79 28 14
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  )
}
