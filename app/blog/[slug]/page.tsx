import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import content from '@/data/content.json'
import { formatDate } from '@/lib/utils'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return content.blogPosts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = content.blogPosts.find(p => p.slug === params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | JWL Marketing`,
    description: post.excerpt,
    alternates: { canonical: `https://www.jwl-marketing.fr/blog/${post.slug}` },
  }
}

const articleContent: Record<string, string[]> = {
  'seo-local-pme-2025': [
    'Le référencement local est devenu incontournable pour les PME qui veulent capter des clients dans leur zone géographique. Voici 5 actions que vous pouvez mettre en place dès aujourd\'hui.',
    '## 1. Optimisez votre fiche Google Business Profile',
    'C\'est le point de départ absolu. Une fiche complète avec photos, horaires, description et posts réguliers peut vous faire apparaître dans le "Pack Local" de Google — ces 3 résultats avec carte qui apparaissent en tête des recherches locales.',
    '## 2. Créez des pages géolocalisées',
    'Si vous intervenez dans plusieurs villes, créez une page dédiée pour chacune. "Plombier Aix-en-Provence", "Plombier Marseille" — chaque page doit être unique et utile, pas du copier-coller.',
    '## 3. Collectez des avis Google',
    'Les avis sont un signal fort pour Google. Demandez systématiquement à vos clients satisfaits de laisser un avis. Répondez à tous les avis, positifs comme négatifs.',
    '## 4. Travaillez vos citations locales',
    'Présence sur les annuaires (Pages Jaunes, Yelp, Tripadvisor selon votre secteur) avec des informations cohérentes. C\'est ce qu\'on appelle le NAP : Name, Address, Phone.',
    '## 5. Publiez du contenu local régulièrement',
    'Un article de blog sur votre territoire renforce votre autorité locale. Google aime les sites qui publient régulièrement du contenu pertinent et géolocalisé.',
  ],
  'google-business-profile-optimisation': [
    'Votre fiche Google Business Profile est souvent la première impression que vous donnez aux clients potentiels. 80% des recherches locales aboutissent à une visite ou un appel dans les 24h.',
    '## Catégories et attributs',
    'Choisissez la catégorie principale la plus précise possible. Ajoutez des catégories secondaires pertinentes et remplissez tous les attributs disponibles pour votre secteur.',
    '## Description optimisée',
    'Intégrez naturellement vos mots-clés locaux dans votre description. Soyez précis, professionnel et orienté bénéfices client.',
    '## Photos de qualité',
    'Les fiches avec photos reçoivent 42% de clics en plus. Ajoutez des photos de vos locaux, votre équipe, vos réalisations. Minimum 10 photos.',
    '## Posts Google réguliers',
    'Publiez des posts réguliers : offres, actualités, événements. C\'est un signal d\'activité fort pour l\'algorithme Google.',
  ],
  'audit-seo-pourquoi': [
    'Avant de vous lancer dans la création de contenu ou l\'acquisition de liens, il faut diagnostiquer l\'état réel de votre site. L\'audit SEO est la première étape indispensable.',
    '## Les 3 piliers d\'un audit SEO',
    'Un audit SEO analyse votre site sous trois angles complémentaires : le technique, le contenu et l\'autorité. Chaque pilier impacte différemment votre positionnement sur Google.',
    '## Technique : les fondations',
    'Vitesse de chargement, mobile-friendliness, indexation des pages, structure des URLs, balises meta — ces éléments déterminent si Google peut correctement explorer et indexer votre site.',
    '## Contenu : la pertinence',
    'Qualité des textes, optimisation des mots-clés, intention de recherche, maillage interne, cannibalisation — votre contenu répond-il vraiment aux questions de vos clients ?',
    '## Autorité : la crédibilité',
    'Profil de backlinks, présence locale, citations — Google mesure votre autorité par rapport aux autres sites de votre secteur.',
  ],
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = content.blogPosts.find(p => p.slug === params.slug)
  if (!post) notFound()
  const lines = articleContent[post.slug] ?? [post.excerpt]
  const related = content.blogPosts.filter(p => p.slug !== post.slug).slice(0, 2)

  return (
    <>
      <section className="bg-ink py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft size={14} /> Retour au blog
          </Link>
          <span className="bg-terra text-white text-xs font-bold px-3 py-1.5 rounded-full">{post.category}</span>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6 leading-tight">{post.title}</h1>
          <div className="flex items-center gap-6 text-white/50 text-sm">
            <span className="flex items-center gap-2"><Calendar size={13} />{formatDate(post.date)}</span>
            <span className="flex items-center gap-2"><Clock size={13} />{post.readTime} min</span>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <article className="lg:col-span-2">
            <div className="aspect-video bg-gradient-to-br from-surface to-bd rounded-2xl mb-10 flex items-center justify-center text-muted/40 text-sm">
              Image article — /public/images/blog/{post.slug}.jpg
            </div>
            <div className="space-y-4">
              {lines.map((line, i) => {
                if (line.startsWith('## ')) return <h2 key={i} className="font-serif text-2xl font-bold text-ink mt-8 mb-2">{line.replace('## ','')}</h2>
                return <p key={i} className="text-ink2 leading-relaxed">{line}</p>
              })}
            </div>
            <div className="mt-12 p-8 bg-ink rounded-2xl text-center">
              <h3 className="font-serif text-2xl font-bold text-white mb-3">Besoin d&apos;aide pour votre SEO ?</h3>
              <p className="text-white/60 mb-6">Audit gratuit — diagnostic en 48h.</p>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-terra hover:bg-terra-dark text-white px-8 py-4 rounded-xl font-bold transition-all">
                Demander un audit gratuit
              </Link>
            </div>
          </article>
          <aside className="space-y-6">
            <div className="bg-surface border border-bd rounded-2xl p-6">
              <h3 className="font-serif font-bold text-ink text-lg mb-4">Articles similaires</h3>
              <div className="space-y-4">
                {related.map(r => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} className="block group">
                    <div className="text-xs text-terra font-bold mb-1">{r.category}</div>
                    <div className="text-ink text-sm font-semibold group-hover:text-terra transition-colors">{r.title}</div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="bg-terra rounded-2xl p-6 text-white text-center">
              <h3 className="font-serif font-bold text-xl mb-3">Audit SEO gratuit</h3>
              <p className="text-white/80 text-sm mb-5">Découvrez les freins à votre visibilité.</p>
              <Link href="/contact" className="block bg-white text-terra font-bold py-3 rounded-xl text-sm hover:bg-surface transition-colors">Demander l&apos;audit</Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
