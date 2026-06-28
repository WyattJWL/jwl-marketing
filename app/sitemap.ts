import { MetadataRoute } from 'next'
import content from '@/data/content.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.jwl-marketing.fr'
  const staticPages = ['', '/services', '/about', '/contact', '/blog'].map(p => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: p === '' ? 1 : 0.8,
  }))
  const blogPages = content.blogPosts.map(p => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
  return [...staticPages, ...blogPages]
}
