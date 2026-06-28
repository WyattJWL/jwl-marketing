import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/sections/Header'
import Footer from '@/components/sections/Footer'
import content from '@/data/content.json'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.jwl-marketing.fr'),
  title: {
    default: `${content.site.name} — Consultante SEO Aix-en-Provence`,
    template: `%s | ${content.site.name}`,
  },
  description: content.site.description,
  keywords: ['SEO Aix-en-Provence', 'consultant SEO PACA', 'référencement local', 'marketing digital', 'Google Business Profile', 'JWL Marketing'],
  authors: [{ name: 'Jodie Lapaillerie' }],
  creator: 'JWL Marketing',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.jwl-marketing.fr',
    siteName: content.site.name,
    title: `${content.site.name} — Consultante SEO Aix-en-Provence`,
    description: content.site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${content.site.name} — Consultante SEO Aix-en-Provence`,
    description: content.site.description,
  },
  alternates: { canonical: 'https://www.jwl-marketing.fr' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: content.site.name,
          description: content.site.description,
          url: 'https://www.jwl-marketing.fr',
          telephone: content.site.phone,
          email: content.site.email,
          address: {
            '@type': 'PostalAddress',
            addressLocality: content.site.city,
            addressRegion: content.site.region,
            addressCountry: 'FR'
          },
          geo: { '@type': 'GeoCoordinates', latitude: 43.5297, longitude: 5.4474 },
          priceRange: '€€',
          areaServed: content.zones.map(z => ({ '@type': 'City', name: z })),
        })}} />
      </head>
      <body className="antialiased">
        <Header />
        <main className="pt-16 lg:pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
