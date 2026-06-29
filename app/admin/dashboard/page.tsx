'use client'
import { useState, useEffect } from 'react'
import { FileText, Settings, LogOut, Plus, Edit, Trash2, Save, X, ChevronRight, BarChart2, MessageSquare, Zap, Image, Link, CheckCircle } from 'lucide-react'
import contentDefault from '@/data/content.json'

type Tab = 'dashboard' | 'images' | 'services' | 'blog' | 'testimonials' | 'settings' | 'faq'
type SiteData = typeof contentDefault

// Composant ImageField — champ URL avec prévisualisation
function ImageField({
  label, value, onChange, hint
}: { label: string; value: string; onChange: (v: string) => void; hint?: string }) {
  const [draft, setDraft] = useState(value)
  const [preview, setPreview] = useState(!!value)

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-3">
      <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">{label}</label>
      {hint && <p className="text-xs text-white/30">{hint}</p>}

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Link size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="url"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            placeholder="https://exemple.com/image.jpg"
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-violet-500 transition-colors"
          />
        </div>
        <button
          type="button"
          onClick={() => { onChange(draft); setPreview(true) }}
          className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors flex-shrink-0"
        >
          <CheckCircle size={12} /> OK
        </button>
        {draft && (
          <button
            type="button"
            onClick={() => { setDraft(''); onChange(''); setPreview(false) }}
            className="text-white/30 hover:text-red-400 px-2 transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Prévisualisation */}
      {preview && draft && (
        <div className="relative">
          <img
            src={draft}
            alt="Prévisualisation"
            className="w-full h-40 object-cover rounded-lg border border-white/10"
            onError={() => setPreview(false)}
            onLoad={() => setPreview(true)}
          />
          <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle size={9} /> Image OK
          </div>
        </div>
      )}
    </div>
  )
}

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('dashboard')
  const [data, setData] = useState<SiteData>(contentDefault)
  const [saved, setSaved] = useState(false)
  const [editingService, setEditingService] = useState<number | null>(null)
  const [editingPost, setEditingPost] = useState<number | null>(null)

  useEffect(() => {
    const ok = document.cookie.includes('jwl_admin=1')
    if (!ok) window.location.href = '/admin'
    // Charger depuis localStorage si dispo
    const stored = localStorage.getItem('jwl_admin_data')
    if (stored) {
      try { setData(JSON.parse(stored)) } catch {}
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem('jwl_admin_data', JSON.stringify(data))
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const logout = () => {
    document.cookie = 'jwl_admin=; max-age=0; path=/'
    window.location.href = '/admin'
  }

  const setImageUrl = (path: string[], value: string) => {
    const d = JSON.parse(JSON.stringify(data)) as SiteData
    let obj: Record<string, unknown> = d as unknown as Record<string, unknown>
    for (let i = 0; i < path.length - 1; i++) {
      obj = obj[path[i]] as Record<string, unknown>
    }
    obj[path[path.length - 1]] = value
    setData(d)
  }

  const navItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart2 size={15} /> },
    { id: 'images', label: 'Images', icon: <Image size={15} /> },
    { id: 'services', label: 'Services', icon: <Settings size={15} /> },
    { id: 'blog', label: 'Articles', icon: <FileText size={15} /> },
    { id: 'testimonials', label: 'Avis', icon: <MessageSquare size={15} /> },
    { id: 'faq', label: 'FAQ', icon: <FileText size={15} /> },
    { id: 'settings', label: 'Infos site', icon: <Settings size={15} /> },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex" style={{ fontFamily: 'DM Sans,sans-serif' }}>
      {/* Sidebar */}
      <aside className="w-56 border-r border-white/5 flex flex-col fixed top-0 left-0 bottom-0 bg-[#0d0d14] z-10">
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-gradient-to-br from-violet-600 to-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_12px_rgba(139,92,246,0.4)]">
              <Zap size={13} className="text-white" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">JWL Admin</div>
              <div className="text-[10px] text-white/30">Salut, Wyatt 👋</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                tab === item.id
                  ? 'bg-violet-600/20 text-violet-400 shadow-[inset_0_0_0_1px_rgba(139,92,246,0.2)]'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/5'
              }`}>
              {item.icon}
              {item.label}
              {tab === item.id && <ChevronRight size={11} className="ml-auto" />}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/5 space-y-2">
          <button onClick={handleSave}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
            <Save size={13} />
            {saved ? '✓ Sauvegardé !' : 'Sauvegarder'}
          </button>
          <button onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs text-white/30 hover:text-white/60 hover:bg-white/5 transition-all">
            <LogOut size={13} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="ml-56 flex-1 min-h-screen">
        {/* Topbar */}
        <div className="border-b border-white/5 px-6 py-4 flex items-center justify-between bg-[#0d0d14]/80 backdrop-blur sticky top-0 z-10">
          <div>
            <h1 className="text-sm font-bold text-white">{navItems.find(n => n.id === tab)?.label}</h1>
            <p className="text-[11px] text-white/25 mt-0.5">JWL Marketing</p>
          </div>
          {saved && (
            <div className="flex items-center gap-2 bg-green-500/15 border border-green-500/25 text-green-400 px-3 py-1.5 rounded-lg text-xs font-bold animate-fade-in">
              <CheckCircle size={12} /> Sauvegardé
            </div>
          )}
        </div>

        <div className="p-6 max-w-3xl">

          {/* ── DASHBOARD ── */}
          {tab === 'dashboard' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { label: 'Services', value: data.services.length, color: 'text-violet-400' },
                  { label: 'Articles', value: data.blogPosts.length, color: 'text-blue-400' },
                  { label: 'Avis', value: data.testimonials.length, color: 'text-purple-400' },
                  { label: 'FAQ', value: data.faq.length, color: 'text-indigo-400' },
                ].map((s, i) => (
                  <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                    <div className={`text-3xl font-bold mb-1 ${s.color}`}>{s.value}</div>
                    <div className="text-xs text-white/40">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white/[0.03] border border-violet-500/20 rounded-xl p-5 shadow-[0_0_20px_rgba(139,92,246,0.05)]">
                <h2 className="font-bold text-white mb-3 flex items-center gap-2 text-sm">
                  <Zap size={15} className="text-violet-400" /> Guide rapide
                </h2>
                <div className="space-y-2 text-xs text-white/50 leading-relaxed">
                  <p>&#8594; Onglet <span className="text-violet-400 font-bold">Images</span> — coller l&apos;URL de vos photos, prévisualisation instantanée</p>
                  <p>&#8594; Onglet <span className="text-violet-400 font-bold">Services</span> — modifier les textes et prix</p>
                  <p>&#8594; Onglet <span className="text-violet-400 font-bold">Articles</span> — ajouter/modifier les articles de blog</p>
                  <p>&#8594; Toujours cliquer <span className="text-green-400 font-bold">Sauvegarder</span> en bas à gauche</p>
                  <p>&#8594; Après sauvegarde, Wyatt copie le JSON dans <code className="text-violet-400">/data/content.json</code> et push sur GitHub</p>
                </div>
              </div>

              <div className="bg-blue-600/10 border border-blue-500/20 rounded-xl p-4">
                <p className="text-xs text-blue-400 font-bold mb-1">Pour les images — méthode simple</p>
                <p className="text-xs text-white/40 leading-relaxed">
                  Uploadez votre photo sur Google Drive ou Imgur (gratuit), faites clic droit &rarr; &ldquo;Copier le lien de l&apos;image&rdquo; et collez-le dans l&apos;onglet Images.
                </p>
              </div>
            </div>
          )}

          {/* ── IMAGES ── */}
          {tab === 'images' && (
            <div className="space-y-4">
              <div className="bg-blue-600/10 border border-blue-500/20 rounded-xl p-4 mb-2">
                <p className="text-xs text-blue-400 font-bold mb-1">Comment obtenir une URL d&apos;image ?</p>
                <div className="text-xs text-white/50 space-y-1">
                  <p>1. Uploader votre photo sur <a href="https://imgur.com" target="_blank" rel="noopener" className="text-blue-400 underline">imgur.com</a> (gratuit, sans compte)</p>
                  <p>2. Clic droit sur l&apos;image &rarr; &ldquo;Copier l&apos;adresse de l&apos;image&rdquo;</p>
                  <p>3. Coller l&apos;URL dans le champ correspondant ci-dessous</p>
                </div>
              </div>

              <ImageField
                label="Photo Hero (page d'accueil)"
                value={(data.hero as {imageUrl?: string}).imageUrl ?? ''}
                onChange={v => setImageUrl(['hero', 'imageUrl'], v)}
                hint="Photo de Jodie — format portrait recommandé (4:5)"
              />

              <ImageField
                label="Photo À propos (section accueil)"
                value={(data.about as {imageUrl?: string}).imageUrl ?? ''}
                onChange={v => setImageUrl(['about', 'imageUrl'], v)}
                hint="Photo ambiance ou portrait — format carré"
              />

              <ImageField
                label="Photo page Qui suis-je"
                value={(data.about as {imageUrlHero?: string}).imageUrlHero ?? ''}
                onChange={v => setImageUrl(['about', 'imageUrlHero'], v)}
                hint="Photo principale de la page about"
              />

              <div className="border-t border-white/10 pt-4">
                <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Images des services</h3>
                {data.services.map((s, i) => (
                  <div key={i} className="mb-3">
                    <ImageField
                      label={s.title}
                      value={(s as {imageUrl?: string}).imageUrl ?? ''}
                      onChange={v => {
                        const d = JSON.parse(JSON.stringify(data)) as SiteData
                        ;(d.services[i] as {imageUrl?: string}).imageUrl = v
                        setData(d)
                      }}
                      hint={`Image illustrant le service "${s.title}"`}
                    />
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4">
                <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Images des articles de blog</h3>
                {data.blogPosts.map((p, i) => (
                  <div key={i} className="mb-3">
                    <ImageField
                      label={p.title}
                      value={(p as {imageUrl?: string}).imageUrl ?? ''}
                      onChange={v => {
                        const d = JSON.parse(JSON.stringify(data)) as SiteData
                        ;(d.blogPosts[i] as {imageUrl?: string}).imageUrl = v
                        setData(d)
                      }}
                      hint="Format paysage 16:9 recommandé"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── SERVICES ── */}
          {tab === 'services' && (
            <div className="space-y-3">
              {data.services.map((s, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                  {editingService === i ? (
                    <div className="space-y-3">
                      <input value={s.title}
                        onChange={e => { const d = JSON.parse(JSON.stringify(data)) as SiteData; d.services[i].title = e.target.value; setData(d) }}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-violet-500" placeholder="Titre" />
                      <input value={s.price}
                        onChange={e => { const d = JSON.parse(JSON.stringify(data)) as SiteData; d.services[i].price = e.target.value; setData(d) }}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-violet-400 outline-none focus:border-violet-500" placeholder="Prix" />
                      <textarea value={s.shortDesc}
                        onChange={e => { const d = JSON.parse(JSON.stringify(data)) as SiteData; d.services[i].shortDesc = e.target.value; setData(d) }}
                        rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 outline-none focus:border-violet-500 resize-none" placeholder="Description courte" />
                      <textarea value={s.description}
                        onChange={e => { const d = JSON.parse(JSON.stringify(data)) as SiteData; d.services[i].description = e.target.value; setData(d) }}
                        rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 outline-none focus:border-violet-500 resize-none" placeholder="Description longue" />
                      <div className="flex gap-2">
                        <button onClick={() => setEditingService(null)} className="flex items-center gap-1.5 bg-violet-600 text-white px-4 py-2 rounded-lg text-xs font-bold"><Save size={12} />OK</button>
                        <button onClick={() => setEditingService(null)} className="flex items-center gap-1.5 bg-white/5 text-white/50 px-3 py-2 rounded-lg text-xs"><X size={12} /></button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-semibold text-white text-sm truncate">{s.title}</div>
                        <div className="text-violet-400 text-xs mt-0.5">{s.price}</div>
                        <div className="text-white/35 text-xs mt-1 truncate">{s.shortDesc}</div>
                      </div>
                      <button onClick={() => setEditingService(i)}
                        className="flex-shrink-0 flex items-center gap-1.5 bg-white/5 hover:bg-violet-600/20 border border-white/10 hover:border-violet-500/30 text-white/50 hover:text-violet-400 px-3 py-1.5 rounded-lg text-xs transition-all">
                        <Edit size={12} />Modifier
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ── BLOG ── */}
          {tab === 'blog' && (
            <div className="space-y-3">
              <div className="flex justify-end">
                <button onClick={() => {
                  const d = JSON.parse(JSON.stringify(data)) as SiteData
                  d.blogPosts.push({ slug: 'nouvel-article', title: 'Nouvel article', excerpt: 'Description...', category: 'SEO', date: new Date().toISOString().split('T')[0], readTime: 3, imagePlaceholder: '', imageUrl: '' } as typeof d.blogPosts[0])
                  setData(d); setEditingPost(d.blogPosts.length - 1)
                }} className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold">
                  <Plus size={13} /> Nouvel article
                </button>
              </div>
              {data.blogPosts.map((p, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                  {editingPost === i ? (
                    <div className="space-y-3">
                      <input value={p.title}
                        onChange={e => { const d = JSON.parse(JSON.stringify(data)) as SiteData; d.blogPosts[i].title = e.target.value; setData(d) }}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-violet-500" placeholder="Titre" />
                      <input value={p.slug}
                        onChange={e => { const d = JSON.parse(JSON.stringify(data)) as SiteData; d.blogPosts[i].slug = e.target.value; setData(d) }}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-blue-400 font-mono outline-none focus:border-violet-500" placeholder="slug-url" />
                      <div className="grid grid-cols-2 gap-3">
                        <input value={p.category}
                          onChange={e => { const d = JSON.parse(JSON.stringify(data)) as SiteData; d.blogPosts[i].category = e.target.value; setData(d) }}
                          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/70 outline-none focus:border-violet-500" placeholder="Catégorie" />
                        <input type="number" value={p.readTime}
                          onChange={e => { const d = JSON.parse(JSON.stringify(data)) as SiteData; d.blogPosts[i].readTime = +e.target.value; setData(d) }}
                          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/70 outline-none focus:border-violet-500" placeholder="Min lecture" />
                      </div>
                      <textarea value={p.excerpt}
                        onChange={e => { const d = JSON.parse(JSON.stringify(data)) as SiteData; d.blogPosts[i].excerpt = e.target.value; setData(d) }}
                        rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 outline-none focus:border-violet-500 resize-none" placeholder="Extrait" />
                      <div className="flex gap-2">
                        <button onClick={() => setEditingPost(null)} className="flex items-center gap-1.5 bg-violet-600 text-white px-4 py-2 rounded-lg text-xs font-bold"><Save size={12} />OK</button>
                        <button onClick={() => setEditingPost(null)} className="flex items-center gap-1.5 bg-white/5 text-white/50 px-3 py-2 rounded-lg text-xs"><X size={12} /></button>
                        <button onClick={() => { const d = JSON.parse(JSON.stringify(data)) as SiteData; d.blogPosts.splice(i, 1); setData(d); setEditingPost(null) }}
                          className="flex items-center gap-1 bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-2 rounded-lg text-xs ml-auto"><Trash2 size={12} />Supprimer</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-semibold text-white text-sm truncate">{p.title}</div>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-blue-400 text-xs font-mono truncate">/blog/{p.slug}</span>
                          <span className="text-white/25 text-xs flex-shrink-0">{p.category}</span>
                        </div>
                      </div>
                      <button onClick={() => setEditingPost(i)}
                        className="flex-shrink-0 flex items-center gap-1.5 bg-white/5 hover:bg-violet-600/20 border border-white/10 hover:border-violet-500/30 text-white/50 hover:text-violet-400 px-3 py-1.5 rounded-lg text-xs transition-all">
                        <Edit size={12} />Modifier
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ── TESTIMONIALS ── */}
          {tab === 'testimonials' && (
            <div className="space-y-3">
              <div className="flex justify-end">
                <button onClick={() => {
                  const d = JSON.parse(JSON.stringify(data)) as SiteData
                  d.testimonials.push({ name: 'Nouveau client', company: 'Entreprise', text: 'Témoignage...', rating: 5 })
                  setData(d)
                }} className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold">
                  <Plus size={13} /> Ajouter
                </button>
              </div>
              {data.testimonials.map((t, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input value={t.name}
                      onChange={e => { const d = JSON.parse(JSON.stringify(data)) as SiteData; d.testimonials[i].name = e.target.value; setData(d) }}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-violet-500" placeholder="Nom" />
                    <input value={t.company}
                      onChange={e => { const d = JSON.parse(JSON.stringify(data)) as SiteData; d.testimonials[i].company = e.target.value; setData(d) }}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 outline-none focus:border-violet-500" placeholder="Entreprise" />
                  </div>
                  <textarea value={t.text}
                    onChange={e => { const d = JSON.parse(JSON.stringify(data)) as SiteData; d.testimonials[i].text = e.target.value; setData(d) }}
                    rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 outline-none focus:border-violet-500 resize-none" />
                  <button onClick={() => { const d = JSON.parse(JSON.stringify(data)) as SiteData; d.testimonials.splice(i, 1); setData(d) }}
                    className="flex items-center gap-1 text-red-400 text-xs hover:text-red-300 transition-colors">
                    <Trash2 size={11} />Supprimer
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ── FAQ ── */}
          {tab === 'faq' && (
            <div className="space-y-3">
              <div className="flex justify-end">
                <button onClick={() => { const d = JSON.parse(JSON.stringify(data)) as SiteData; d.faq.push({ question: 'Nouvelle question ?', answer: 'Réponse...' }); setData(d) }}
                  className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold">
                  <Plus size={13} />Ajouter
                </button>
              </div>
              {data.faq.map((f, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-2">
                  <input value={f.question}
                    onChange={e => { const d = JSON.parse(JSON.stringify(data)) as SiteData; d.faq[i].question = e.target.value; setData(d) }}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-medium outline-none focus:border-violet-500" />
                  <textarea value={f.answer}
                    onChange={e => { const d = JSON.parse(JSON.stringify(data)) as SiteData; d.faq[i].answer = e.target.value; setData(d) }}
                    rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/60 outline-none focus:border-violet-500 resize-none" />
                  <button onClick={() => { const d = JSON.parse(JSON.stringify(data)) as SiteData; d.faq.splice(i, 1); setData(d) }}
                    className="flex items-center gap-1 text-red-400 text-xs hover:text-red-300 transition-colors">
                    <Trash2 size={11} />Supprimer
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ── SETTINGS ── */}
          {tab === 'settings' && (
            <div className="space-y-3">
              {([
                ['name', 'Nom du site'],
                ['tagline', 'Slogan'],
                ['phone', 'Téléphone'],
                ['email', 'Email'],
                ['address', 'Adresse'],
              ] as [keyof typeof data.site, string][]).map(([key, label]) => (
                <div key={key} className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                  <label className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-2">{label}</label>
                  <input
                    value={typeof data.site[key] === 'string' ? data.site[key] as string : ''}
                    onChange={e => {
                      const d = JSON.parse(JSON.stringify(data)) as SiteData
                      ;(d.site as Record<string, string>)[key] = e.target.value
                      setData(d)
                    }}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
              ))}
              <div className="bg-violet-600/10 border border-violet-500/20 rounded-xl p-4 text-xs text-white/50">
                <p className="font-bold text-violet-400 mb-1">Note</p>
                <p>Les modifications sont en mémoire. Cliquer &ldquo;Sauvegarder&rdquo; les garde dans le navigateur. Pour les rendre permanentes, Wyatt doit copier le JSON dans <code className="text-violet-400">/data/content.json</code> et redéployer sur Vercel.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
