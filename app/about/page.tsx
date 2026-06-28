import type { Metadata } from 'next'
import { CheckCircle, Award, Users, Target } from 'lucide-react'
import Section from '@/components/ui/Section'
import SectionTitle from '@/components/ui/SectionTitle'
import AnimateOnScroll from '@/components/sections/AnimateOnScroll'
import Button from '@/components/ui/Button'
import content from '@/data/content.json'

export const metadata: Metadata = {
  title: 'Jodie Lapaillerie — Consultante SEO Aix-en-Provence | JWL Marketing',
  description: 'Découvrez Jodie Lapaillerie, fondatrice de JWL Marketing. Consultante SEO & Marketing Digital basée à Aix-en-Provence, spécialisée dans l\'accompagnement des TPE/PME en région PACA.',
  alternates: { canonical: 'https://www.jwl-marketing.fr/about' },
}

const skills = ['SEO technique','Référencement local','Google Business Profile','Création de contenu SEO','Analyse Search Console','Formation SEO','WordPress','Stratégie digitale']

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-ink py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimateOnScroll>
              <div className="inline-flex items-center gap-2 bg-terra/15 border border-terra/30 text-terra px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
                Qui suis-je
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Jodie Lapaillerie,<br />
                <span className="gradient-text">votre alliée SEO</span>
              </h1>
              <p className="text-white/60 text-lg leading-relaxed mb-8">{content.about.bio}</p>
              <Button href="/contact">Travailler ensemble</Button>
            </AnimateOnScroll>

            {/* Photo */}
            <AnimateOnScroll delay={200} direction="right">
              <div className="relative mx-auto max-w-md">
                <div className="aspect-square bg-gradient-to-br from-terra/20 to-gold/10 rounded-2xl overflow-hidden border border-white/10">
                  <div className="w-full h-full flex flex-col items-center justify-center text-white/30 gap-3">
                    <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center text-4xl">&#128247;</div>
                    <div className="text-center">
                      <p className="text-sm font-medium">Photo de Jodie</p>
                      <p className="text-xs opacity-60 mt-1">Ajouter /public/images/jodie.jpg</p>
                    </div>
                  </div>
                </div>
                {/* Badge flottant */}
                <div className="absolute -bottom-4 -right-4 bg-terra rounded-2xl p-4 shadow-2xl">
                  <div className="text-white font-bold text-lg">JWL</div>
                  <div className="text-white/70 text-xs">Marketing</div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <Section className="bg-surface">
        <SectionTitle badge="Mes valeurs" title="Ce qui guide" highlight="mon approche" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Target, ...content.about.values[0] },
            { icon: Users, ...content.about.values[1] },
            { icon: Award, ...content.about.values[2] },
          ].map((v, i) => (
            <AnimateOnScroll key={i} delay={i * 150}>
              <div className="bg-white rounded-2xl p-8 border border-bd hover:border-terra/40 transition-colors hover:shadow-lg">
                <div className="w-12 h-12 bg-terra/10 rounded-xl flex items-center justify-center mb-5 text-terra">
                  <v.icon size={22} />
                </div>
                <h3 className="font-serif font-bold text-ink text-xl mb-3">{v.title}</h3>
                <p className="text-muted leading-relaxed">{v.desc}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Section>

      {/* Compétences */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimateOnScroll>
            <SectionTitle badge="Compétences" title="Mon expertise" highlight="à votre service" centered={false} />
            <div className="flex flex-wrap gap-3">
              {skills.map((s, i) => (
                <span key={i} className="bg-surface border border-bd rounded-lg px-4 py-2 text-sm font-medium text-ink2 hover:border-terra hover:text-terra transition-colors cursor-default">
                  {s}
                </span>
              ))}
            </div>
          </AnimateOnScroll>

          {/* Timeline parcours */}
          <AnimateOnScroll delay={200}>
            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-bold text-ink mb-6">Mon parcours</h3>
              {[
                { year: '2025', event: 'Lancement de JWL Marketing à Aix-en-Provence' },
                { year: '2024', event: 'Formation SEO avancée et certification' },
                { year: '2023', event: 'BTS NDRC — Négociation et Développement de la Relation Client' },
                { year: '2022', event: 'Premières missions freelance en marketing digital' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-terra rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {item.year.slice(2)}
                    </div>
                    {i < 3 && <div className="w-0.5 h-6 bg-bd mt-1" />}
                  </div>
                  <div className="pt-2">
                    <div className="text-xs text-terra font-bold mb-1">{item.year}</div>
                    <div className="text-ink2 text-sm leading-relaxed">{item.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </Section>

      {/* Engagement Entrepreneuri'Elles */}
      <Section className="bg-ink text-white">
        <AnimateOnScroll>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-terra/15 border border-terra/30 text-terra px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
              Engagement
            </div>
            <h2 className="font-serif text-3xl font-bold text-white mb-4">
              Bénévole chez <span className="gradient-text">Entrepreneuri'Elles</span>
            </h2>
            <p className="text-white/60 leading-relaxed mb-8">
              Je m'engage au sein du réseau Entrepreneuri'Elles en région PACA pour accompagner les femmes entrepreneures. Partager mes compétences, c'est aussi faire partie d'un écosystème plus solide.
            </p>
            <Button href="/contact" variant="outline">Me contacter</Button>
          </div>
        </AnimateOnScroll>
      </Section>
    </>
  )
}
