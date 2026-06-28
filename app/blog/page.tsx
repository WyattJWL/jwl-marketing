import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import Section from '@/components/ui/Section'
import SectionTitle from '@/components/ui/SectionTitle'
import AnimateOnScroll from '@/components/sections/AnimateOnScroll'
import content from '@/data/content.json'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Blog SEO & Marketing Digital — JWL Marketing Aix-en-Provence',
  description: 'Conseils SEO, marketing digital, référencement local et Google Business Profile pour les TPE et PME de la région PACA.',
  alternates: { canonical: 'https://www.jwl-marketing.fr/blog' },
}

export default function BlogPage() {
  const [featured, ...rest] = content.blogPosts
  return (
    <>
      <section className="bg-ink py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll>
            <div className="inline-flex items-center gap-2 bg-terra/15 border border-terra/30 text-terra px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
              Le Blog
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Conseils SEO & <span className="gradient-text">Marketing Digital</span>
            </h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              Des articles concrets pour les entrepreneurs, artisans et PME qui veulent grandir sur Google.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <Section>
        {/* Article featured */}
        <AnimateOnScroll>
          <Link href={`/blog/${featured.slug}`}
            className="group grid lg:grid-cols-2 gap-8 bg-surface border border-bd rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 mb-12">
            <div className="aspect-video lg:aspect-auto bg-gradient-to-br from-terra/15 to-gold/10 relative">
              <div className="absolute inset-0 flex items-center justify-center text-muted/40">
                <div className="text-center">
                  <div className="text-5xl mb-2">&#128247;</div>
                  <p className="text-xs">Ajouter /public/images/blog/{featured.slug}.jpg</p>
                </div>
              </div>
              <div className="absolute top-4 left-4">
                <span className="bg-terra text-white text-xs font-bold px-3 py-1.5 rounded-full">{featured.category}</span>
              </div>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 text-xs text-muted mb-4">
                <span>{formatDate(featured.date)}</span>
                <span className="w-1 h-1 bg-muted rounded-full" />
                <span className="flex items-center gap-1"><Clock size={12} /> {featured.readTime} min</span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink mb-4 group-hover:text-terra transition-colors">
                {featured.title}
              </h2>
              <p className="text-muted leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center gap-2 text-terra font-bold text-sm group-hover:gap-3 transition-all">
                Lire l&apos;article <ArrowRight size={14} />
              </div>
            </div>
          </Link>
        </AnimateOnScroll>

        {/* Autres articles */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post, i) => (
            <AnimateOnScroll key={post.slug} delay={i * 100}>
              <Link href={`/blog/${post.slug}`}
                className="group block bg-white border border-bd rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-video bg-gradient-to-br from-surface to-bd relative">
                  <div className="absolute inset-0 flex items-center justify-center text-muted/30 text-sm">
                    Image blog
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-terra text-white text-xs font-bold px-2.5 py-1 rounded-full">{post.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-muted mb-3">
                    <span>{formatDate(post.date)}</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime} min</span>
                  </div>
                  <h3 className="font-serif font-bold text-ink text-lg mb-2 group-hover:text-terra transition-colors">{post.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{post.excerpt}</p>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </Section>
    </>
  )
}
