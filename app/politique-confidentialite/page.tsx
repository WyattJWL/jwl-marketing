import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Politique de confidentialité — JWL Marketing', alternates: { canonical: 'https://www.jwl-marketing.fr/politique-confidentialite' } }
export default function PolitiqueConfidentialite() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <h1 className="font-serif text-3xl font-bold text-ink mb-8">Politique de confidentialité</h1>
      <div className="space-y-6 text-ink2">
        <section><h2 className="font-serif text-xl font-bold text-ink mb-3">Données collectées</h2><p>Via le formulaire de contact : nom, email, téléphone, message. Ces données sont utilisées uniquement pour répondre à vos demandes.</p></section>
        <section><h2 className="font-serif text-xl font-bold text-ink mb-3">Durée de conservation</h2><p>Vos données sont conservées 3 ans maximum, puis supprimées.</p></section>
        <section><h2 className="font-serif text-xl font-bold text-ink mb-3">Vos droits (RGPD)</h2><p>Vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Contactez-nous : contact@jwl-marketing.fr</p></section>
      </div>
    </div>
  )
}
