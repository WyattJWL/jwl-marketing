'use client'
import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, CheckCircle, Send } from 'lucide-react'
import AnimateOnScroll from '@/components/sections/AnimateOnScroll'
import content from '@/data/content.json'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // En production : envoyer vers une API route Next.js ou Formspree
    await new Promise(r => setTimeout(r, 1000))
    setSent(true)
    setLoading(false)
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-ink py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll>
            <div className="inline-flex items-center gap-2 bg-terra/15 border border-terra/30 text-terra px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
              Contact
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Parlons de votre <span className="gradient-text">visibilité</span>
            </h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              Audit gratuit, question, projet — je réponds sous 24h.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* Infos contact */}
            <div className="lg:col-span-2 space-y-6">
              <AnimateOnScroll>
                <h2 className="font-serif text-2xl font-bold text-ink mb-6">Informations</h2>
                <div className="space-y-4">
                  {[
                    { icon: Phone, label: 'Téléphone', value: '07 83 79 28 14', href: `tel:${content.site.phone}` },
                    { icon: Mail, label: 'Email', value: content.site.email, href: `mailto:${content.site.email}` },
                    { icon: MapPin, label: 'Adresse', value: content.site.address, href: null },
                    { icon: Clock, label: 'Disponibilité', value: 'Lun-Ven · 9h-18h', href: null },
                  ].map((info, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-surface rounded-xl border border-bd">
                      <div className="w-10 h-10 bg-terra/10 rounded-lg flex items-center justify-center flex-shrink-0 text-terra">
                        <info.icon size={18} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-muted uppercase tracking-wider mb-0.5">{info.label}</div>
                        {info.href ? (
                          <a href={info.href} className="text-ink2 hover:text-terra transition-colors text-sm font-medium">{info.value}</a>
                        ) : (
                          <span className="text-ink2 text-sm">{info.value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </AnimateOnScroll>

              {/* Zone d'intervention */}
              <AnimateOnScroll delay={200}>
                <div className="bg-ink rounded-2xl p-6 text-white">
                  <h3 className="font-serif font-bold text-lg mb-4">Zones d&apos;intervention</h3>
                  <div className="flex flex-wrap gap-2">
                    {content.zones.slice(0, 8).map(z => (
                      <span key={z} className="bg-white/10 text-white/70 text-xs px-2.5 py-1 rounded-full">{z}</span>
                    ))}
                    <span className="text-white/40 text-xs px-2 py-1">& toute la France à distance</span>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Formulaire */}
            <div className="lg:col-span-3">
              <AnimateOnScroll delay={100}>
                {sent ? (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center">
                    <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                    <h3 className="font-serif text-2xl font-bold text-ink mb-2">Message envoyé !</h3>
                    <p className="text-muted">Je vous réponds sous 24h. À très vite !</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-white border border-bd rounded-2xl p-8 shadow-sm space-y-5">
                    <h2 className="font-serif text-2xl font-bold text-ink mb-2">Audit gratuit</h2>
                    <p className="text-muted text-sm mb-6">Décrivez votre projet et je vous contacte rapidement.</p>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2">Prénom & Nom *</label>
                        <input type="text" required value={form.name}
                          onChange={e => setForm({...form, name: e.target.value})}
                          placeholder="Votre nom"
                          className="w-full px-4 py-3 border border-bd rounded-lg text-sm focus:border-terra focus:outline-none focus:ring-2 focus:ring-terra/20 transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2">Email *</label>
                        <input type="email" required value={form.email}
                          onChange={e => setForm({...form, email: e.target.value})}
                          placeholder="votre@email.fr"
                          className="w-full px-4 py-3 border border-bd rounded-lg text-sm focus:border-terra focus:outline-none focus:ring-2 focus:ring-terra/20 transition-all" />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2">Téléphone</label>
                        <input type="tel" value={form.phone}
                          onChange={e => setForm({...form, phone: e.target.value})}
                          placeholder="06 xx xx xx xx"
                          className="w-full px-4 py-3 border border-bd rounded-lg text-sm focus:border-terra focus:outline-none focus:ring-2 focus:ring-terra/20 transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2">Service souhaité</label>
                        <select value={form.service}
                          onChange={e => setForm({...form, service: e.target.value})}
                          className="w-full px-4 py-3 border border-bd rounded-lg text-sm focus:border-terra focus:outline-none focus:ring-2 focus:ring-terra/20 transition-all bg-white">
                          <option value="">Choisir...</option>
                          {content.services.map(s => <option key={s.slug} value={s.title}>{s.title}</option>)}
                          <option value="autre">Autre / Je ne sais pas encore</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2">Votre projet *</label>
                      <textarea required rows={5} value={form.message}
                        onChange={e => setForm({...form, message: e.target.value})}
                        placeholder="Décrivez votre activité, vos objectifs, vos défis actuels..."
                        className="w-full px-4 py-3 border border-bd rounded-lg text-sm focus:border-terra focus:outline-none focus:ring-2 focus:ring-terra/20 transition-all resize-none" />
                    </div>

                    <button type="submit" disabled={loading}
                      className="w-full bg-terra hover:bg-terra-dark text-white py-4 rounded-xl font-bold text-base transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-terra/25 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                      {loading ? 'Envoi en cours...' : (<><Send size={16} /> Envoyer ma demande</>)}
                    </button>
                    <p className="text-xs text-muted text-center">Réponse sous 24h — Aucun engagement</p>
                  </form>
                )}
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
