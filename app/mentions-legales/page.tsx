import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Mentions légales — JWL Marketing', alternates: { canonical: 'https://www.jwl-marketing.fr/mentions-legales' } }
export default function MentionsLegales() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <h1 className="font-serif text-3xl font-bold text-ink mb-8">Mentions légales</h1>
      <div className="prose prose-lg text-ink2 space-y-6">
        <section><h2 className="font-serif text-xl font-bold text-ink mb-3">Éditeur</h2><p>JWL Marketing — Jodie Lapaillerie<br />Pôle d'activité La Duranne, Aix-en-Provence<br />contact@jwl-marketing.fr — 07 83 79 28 14</p></section>
        <section><h2 className="font-serif text-xl font-bold text-ink mb-3">Hébergement</h2><p>Vercel Inc. — 340 Pine Street, Suite 701, San Francisco, CA 94104, USA</p></section>
        <section><h2 className="font-serif text-xl font-bold text-ink mb-3">Propriété intellectuelle</h2><p>L'ensemble du contenu de ce site est protégé par le droit d'auteur. Toute reproduction sans autorisation est interdite.</p></section>
        <section><h2 className="font-serif text-xl font-bold text-ink mb-3">Contact</h2><p>Pour toute question : contact@jwl-marketing.fr</p></section>
      </div>
    </div>
  )
}
