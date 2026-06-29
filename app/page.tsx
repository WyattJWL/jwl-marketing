import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Phone, Star, CheckCircle, TrendingUp, MapPin, Search, Globe } from 'lucide-react'
import Section from '@/components/ui/Section'
import SectionTitle from '@/components/ui/SectionTitle'
import Button from '@/components/ui/Button'
import AnimateOnScroll from '@/components/sections/AnimateOnScroll'
import content from '@/data/content.json'

export const metadata: Metadata = {
  title: 'Consultante SEO Aix-en-Provence — JWL Marketing',
  description: content.site.description,
  alternates: { canonical: 'https://www.jwl-marketing.fr' },
}

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-ink overflow-hidden min-h-[85vh] flex items-center">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-terra/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gold/8 rounded-full blur-3xl animate-float" style={{animationDelay:'-3s'}} />
          <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize:'32px 32px'}} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              {/* Badge */}
              <AnimateOnScroll>
                <div className="inline-flex items-center gap-2 bg-terra/15 border border-terra/30 text-terra px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
                  <MapPin size={13} />
                  {content.hero.badge}
                </div>
              </AnimateOnScroll>

              {/* Title */}
              <AnimateOnScroll delay={100}>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
                  Vous méritez d&apos;être{' '}
                  <span className="gradient-text">trouvé sur Google.</span>
                </h1>
              </AnimateOnScroll>

              <AnimateOnScroll delay={200}>
                <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg">
                  {content.hero.subtitle}
                </p>
              </AnimateOnScroll>

              <AnimateOnScroll delay={300}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-terra hover:bg-terra-dark text-white px-8 py-4 rounded-xl font-bold text-base transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-terra/25">
                    Audit gratuit
                    <ArrowRight size={16} />
                  </Link>
                  <a href={`tel:${content.site.phone}`}
                    className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-xl font-medium text-base transition-all hover:bg-white/5">
                    <Phone size={15} />
                    07 83 79 28 14
                  </a>
                </div>
              </AnimateOnScroll>

              {/* Social proof */}
              <AnimateOnScroll delay={400}>
                <div className="flex items-center gap-4 mt-8 pt-8 border-t border-white/10">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="text-gold fill-gold" />
                    ))}
                  </div>
                  <span className="text-white/50 text-sm">5/5 — Avis Google vérifiés</span>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Image hero */}
            <AnimateOnScroll delay={200} direction="right">
              <div className="relative">
                <div className="aspect-[4/5] bg-gradient-to-br from-terra/20 to-gold/10 rounded-2xl overflow-hidden border border-white/10">
                  {content.hero.imageUrl ? (
                    <img src={content.hero.imageUrl} alt="Jodie Lapaillerie — JWL Marketing" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center text-white/30">
                        <div className="w-20 h-20 bg-white/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <span className="text-3xl">&#128247;</span>
                        </div>
                        <p className="text-sm font-medium">Photo de Jodie</p>
                        <p className="text-xs mt-1 opacity-60">Ajouter l&apos;URL dans l&apos;admin</p>
                      </div>
                    </div>
                  )}
                </div>
                {/* Floating cards */}
                <div className="absolute -left-6 top-1/4 bg-white rounded-xl p-4 shadow-2xl border border-bd">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <TrendingUp size={18} className="text-green-600" />
                    </div>
                    <div>
                      <div className="font-bold text-ink text-sm">+769%</div>
                      <div className="text-xs text-muted">Impressions Google</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-6 bottom-1/4 bg-white rounded-xl p-4 shadow-2xl border border-bd">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-terra/10 rounded-lg flex items-center justify-center">
                      <Search size={18} className="text-terra" />
                    </div>
                    <div>
                      <div className="font-bold text-ink text-sm">2ème position</div>
                      <div className="text-xs text-muted">Google en 1 mois</div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-surface border-y border-bd">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {content.stats.map((stat, i) => (
              <AnimateOnScroll key={i} delay={i * 100}>
                <div className="text-center">
                  <div className="font-serif text-3xl lg:text-4xl font-bold text-terra mb-1">{stat.value}</div>
                  <div className="font-semibold text-ink text-sm mb-1">{stat.label}</div>
                  <div className="text-xs text-muted">{stat.detail}</div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <Section id="services">
        <SectionTitle
          badge="Mes expertises"
          title="Des services SEO pensés pour"
          highlight="votre croissance locale"
          subtitle="Chaque prestation est adaptée aux réalités des TPE et PME. Pas de contrat forcé, des résultats mesurables."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.services.map((service, i) => (
            <AnimateOnScroll key={service.slug} delay={i * 80}>
              <Link href={`/services#${service.slug}`}
                className="group block bg-white border border-bd rounded-2xl p-6 hover:border-terra/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-11 h-11 bg-terra/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-terra/20 transition-colors">
                  <Search size={20} className="text-terra" />
                </div>
                <h3 className="font-serif font-bold text-ink text-xl mb-2">{service.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-4">{service.shortDesc}</p>
                <div className="flex items-center gap-1 text-terra text-sm font-semibold group-hover:gap-2 transition-all">
                  En savoir plus <ArrowRight size={14} />
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button href="/services" variant="outline" size="lg">Voir tous mes services</Button>
        </div>
      </Section>

      {/* ── ABOUT PREVIEW ── */}
      <Section className="bg-ink text-white">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <AnimateOnScroll>
            <div className="aspect-square max-w-md mx-auto lg:mx-0 bg-gradient-to-br from-terra/20 to-gold/10 rounded-2xl overflow-hidden border border-white/10 relative">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-white/30">
                  <div className="w-20 h-20 bg-white/10 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">&#128247;</div>
                  <p className="text-sm">Photo Jodie — Remplacer par /public/images/about.jpg</p>
                </div>
              </div>
              {/* Déco */}
              <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="text-white font-bold">Jodie Lapaillerie</div>
                <div className="text-white/60 text-xs">Fondatrice JWL Marketing</div>
              </div>
            </div>
          </AnimateOnScroll>

          <div>
            <AnimateOnScroll>
              <div className="inline-flex items-center gap-2 bg-terra/15 border border-terra/30 text-terra px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
                Qui suis-je
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={100}>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                Une consultante ancrée{' '}
                <span className="gradient-text">dans le tissu local PACA</span>
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll delay={200}>
              <p className="text-white/60 leading-relaxed mb-8">{content.about.bio}</p>
            </AnimateOnScroll>
            <div className="space-y-4 mb-8">
              {content.about.values.map((v, i) => (
                <AnimateOnScroll key={i} delay={200 + i * 100}>
                  <div className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-terra mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-white">{v.title} — </span>
                      <span className="text-white/60 text-sm">{v.desc}</span>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
            <AnimateOnScroll delay={500}>
              <Button href="/about" variant="outline">En savoir plus sur moi</Button>
            </AnimateOnScroll>
          </div>
        </div>
      </Section>

      {/* ── TESTIMONIALS ── */}
      <Section className="bg-surface">
        <SectionTitle
          badge="Ils me font confiance"
          title="Ce que disent"
          highlight="mes clients"
        />
        <div className="grid md:grid-cols-2 gap-6">
          {content.testimonials.map((t, i) => (
            <AnimateOnScroll key={i} delay={i * 150}>
              <div className="bg-white rounded-2xl p-8 border border-bd shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={14} className="text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-ink2 leading-relaxed mb-6 text-lg font-serif italic">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <div className="font-bold text-ink">{t.name}</div>
                  <div className="text-muted text-sm">{t.company}</div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Section>

      {/* ── BLOG PREVIEW ── */}
      <Section>
        <SectionTitle
          badge="Le Blog"
          title="Conseils SEO &"
          highlight="Marketing Digital"
          subtitle="Des articles concrets pour booster votre visibilité."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.blogPosts.map((post, i) => (
            <AnimateOnScroll key={post.slug} delay={i * 100}>
              <Link href={`/blog/${post.slug}`}
                className="group block bg-white border border-bd rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-video bg-gradient-to-br from-surface to-bd relative">
                  <div className="absolute inset-0 flex items-center justify-center text-muted/40">
                    <Globe size={40} />
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-terra text-white text-xs font-bold px-2.5 py-1 rounded-full">{post.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif font-bold text-ink text-lg mb-2 group-hover:text-terra transition-colors">{post.title}</h3>
                  <p className="text-muted text-sm leading-relaxed mb-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted">
                    <span>{new Date(post.date).toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'})}</span>
                    <span>{post.readTime} min</span>
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button href="/blog" variant="outline">Voir tous les articles</Button>
        </div>
      </Section>

      {/* ── CTA FINAL ── */}
      <section className="bg-terra py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Prêt à booster votre visibilité ?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Un audit gratuit pour commencer. Pas d&apos;engagement, juste des réponses concrètes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-terra hover:bg-surface px-8 py-4 rounded-xl font-bold text-base transition-all hover:-translate-y-1 hover:shadow-xl">
                Audit gratuit
                <ArrowRight size={16} />
              </Link>
              <a href={`tel:${content.site.phone}`}
                className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white hover:border-white px-8 py-4 rounded-xl font-medium text-base transition-all">
                <Phone size={15} /> 07 83 79 28 14
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  )
}
