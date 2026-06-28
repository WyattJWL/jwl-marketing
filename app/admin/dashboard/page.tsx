'use client'
import { useState, useEffect } from 'react'
import { Users, FileText, Settings, LogOut, Plus, Edit, Trash2, Save, X, ChevronRight, BarChart2, MessageSquare, Zap } from 'lucide-react'
import content from '@/data/content.json'

type Tab = 'dashboard' | 'services' | 'blog' | 'testimonials' | 'settings' | 'faq'

// Données en mémoire (en prod : fetch depuis /api/admin/*)
type SiteData = typeof content

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('dashboard')
  const [data, setData] = useState<SiteData>(content)
  const [saved, setSaved] = useState(false)
  const [editingService, setEditingService] = useState<number | null>(null)
  const [editingPost, setEditingPost] = useState<number | null>(null)

  // Vérif auth basique
  useEffect(() => {
    const ok = document.cookie.includes('jwl_admin=1')
    if (!ok) window.location.href = '/admin'
  }, [])

  const handleSave = () => {
    // En production : POST vers /api/admin/save
    // Ici on simule la sauvegarde en localStorage
    localStorage.setItem('jwl_admin_data', JSON.stringify(data))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const logout = () => {
    document.cookie = 'jwl_admin=; max-age=0; path=/'
    window.location.href = '/admin'
  }

  const navItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart2 size={16} /> },
    { id: 'services', label: 'Services', icon: <Settings size={16} /> },
    { id: 'blog', label: 'Articles', icon: <FileText size={16} /> },
    { id: 'testimonials', label: 'Avis', icon: <MessageSquare size={16} /> },
    { id: 'faq', label: 'FAQ', icon: <Users size={16} /> },
    { id: 'settings', label: 'Infos site', icon: <Settings size={16} /> },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex" style={{fontFamily:'DM Sans,sans-serif'}}>
      {/* Sidebar */}
      <aside className="w-56 border-r border-white/5 flex flex-col fixed top-0 left-0 bottom-0 bg-[#0d0d14]">
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-violet-600 to-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_12px_rgba(139,92,246,0.4)]">
              <Zap size={13} className="text-white" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">JWL Admin</div>
              <div className="text-[10px] text-white/30">Salut, Wyatt 👋</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                tab === item.id
                  ? 'bg-violet-600/20 text-violet-400 shadow-[inset_0_0_0_1px_rgba(139,92,246,0.2)]'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/5'
              }`}>
              {item.icon} {item.label}
              {tab === item.id && <ChevronRight size={12} className="ml-auto" />}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/5 space-y-2">
          <button onClick={handleSave}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
            <Save size={13} /> {saved ? 'Sauvegardé !' : 'Sauvegarder'}
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
        <div className="border-b border-white/5 px-6 py-4 flex items-center justify-between bg-[#0d0d14]/50 backdrop-blur sticky top-0 z-10">
          <div>
            <h1 className="text-sm font-bold text-white">{navItems.find(n => n.id === tab)?.label}</h1>
            <p className="text-xs text-white/30 mt-0.5">JWL Marketing — Admin</p>
          </div>
          {saved && (
            <div className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-green-400 px-3 py-1.5 rounded-lg text-xs font-bold">
              &#10003; Sauvegardé
            </div>
          )}
        </div>

        <div className="p-6">
          {/* ── DASHBOARD ── */}
          {tab === 'dashboard' && (
            <div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Services', value: data.services.length, color: 'violet' },
                  { label: 'Articles', value: data.blogPosts.length, color: 'blue' },
                  { label: 'Avis clients', value: data.testimonials.length, color: 'purple' },
                  { label: 'FAQ', value: data.faq.length, color: 'indigo' },
                ].map((s, i) => (
                  <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                    <div className={`text-3xl font-bold mb-1 ${s.color === 'violet' ? 'text-violet-400' : s.color === 'blue' ? 'text-blue-400' : s.color === 'purple' ? 'text-purple-400' : 'text-indigo-400'}`}>
                      {s.value}
                    </div>
                    <div className="text-xs text-white/40 font-medium">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white/[0.03] border border-violet-500/20 rounded-xl p-6 shadow-[0_0_20px_rgba(139,92,246,0.05)]">
                <h2 className="font-bold text-white mb-2 flex items-center gap-2"><Zap size={16} className="text-violet-400" /> Guide rapide</h2>
                <div className="space-y-2 text-sm text-white/50">
                  <p>&#8594; Modifiez le contenu depuis les onglets de gauche</p>
                  <p>&#8594; Cliquez sur "Sauvegarder" pour enregistrer les changements</p>
                  <p>&#8594; Les images sont à déposer dans <code className="bg-white/5 px-1.5 py-0.5 rounded text-violet-400 text-xs">/public/images/</code></p>
                  <p>&#8594; Pour mettre en ligne : pushez sur GitHub puis Vercel se charge du reste</p>
                </div>
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
                      <input value={s.title} onChange={e => { const d = {...data}; d.services[i].title = e.target.value; setData(d) }}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-violet-500" />
                      <input value={s.price} onChange={e => { const d = {...data}; d.services[i].price = e.target.value; setData(d) }}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-violet-400 outline-none focus:border-violet-500" placeholder="Prix" />
                      <textarea value={s.shortDesc} onChange={e => { const d = {...data}; d.services[i].shortDesc = e.target.value; setData(d) }} rows={2}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 outline-none focus:border-violet-500 resize-none" />
                      <textarea value={s.description} onChange={e => { const d = {...data}; d.services[i].description = e.target.value; setData(d) }} rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 outline-none focus:border-violet-500 resize-none" />
                      <div className="flex gap-2">
                        <button onClick={() => setEditingService(null)} className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg text-xs font-bold"><Save size={12} />OK</button>
                        <button onClick={() => setEditingService(null)} className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-white/60 px-4 py-2 rounded-lg text-xs"><X size={12} />Annuler</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white text-sm">{s.title}</div>
                        <div className="text-violet-400 text-xs mt-0.5">{s.price}</div>
                        <div className="text-white/40 text-xs mt-1">{s.shortDesc}</div>
                      </div>
                      <button onClick={() => setEditingService(i)} className="flex items-center gap-1.5 bg-white/5 hover:bg-violet-600/20 border border-white/10 hover:border-violet-500/30 text-white/50 hover:text-violet-400 px-3 py-1.5 rounded-lg text-xs transition-all">
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
              <div className="flex justify-end mb-2">
                <button onClick={() => {
                  const d = {...data}
                  d.blogPosts.push({slug:'nouvel-article',title:'Nouvel article',excerpt:'Description...',category:'SEO',date:new Date().toISOString().split('T')[0],readTime:3,imagePlaceholder:'Image'})
                  setData(d); setEditingPost(d.blogPosts.length - 1)
                }} className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold">
                  <Plus size={13} /> Nouvel article
                </button>
              </div>
              {data.blogPosts.map((p, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                  {editingPost === i ? (
                    <div className="space-y-3">
                      <input value={p.title} onChange={e => { const d={...data}; d.blogPosts[i].title=e.target.value; setData(d) }}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-violet-500" placeholder="Titre" />
                      <input value={p.slug} onChange={e => { const d={...data}; d.blogPosts[i].slug=e.target.value; setData(d) }}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-blue-400 outline-none focus:border-violet-500 font-mono" placeholder="slug-url" />
                      <div className="grid grid-cols-2 gap-3">
                        <input value={p.category} onChange={e => { const d={...data}; d.blogPosts[i].category=e.target.value; setData(d) }}
                          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/70 outline-none focus:border-violet-500" placeholder="Catégorie" />
                        <input type="number" value={p.readTime} onChange={e => { const d={...data}; d.blogPosts[i].readTime=+e.target.value; setData(d) }}
                          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/70 outline-none focus:border-violet-500" placeholder="Durée (min)" />
                      </div>
                      <textarea value={p.excerpt} onChange={e => { const d={...data}; d.blogPosts[i].excerpt=e.target.value; setData(d) }} rows={2}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 outline-none focus:border-violet-500 resize-none" placeholder="Extrait" />
                      <div className="flex gap-2">
                        <button onClick={() => setEditingPost(null)} className="flex items-center gap-1.5 bg-violet-600 text-white px-4 py-2 rounded-lg text-xs font-bold"><Save size={12} />OK</button>
                        <button onClick={() => setEditingPost(null)} className="flex items-center gap-1.5 bg-white/5 text-white/60 px-3 py-2 rounded-lg text-xs"><X size={12} /></button>
                        <button onClick={() => { const d={...data}; d.blogPosts.splice(i,1); setData(d); setEditingPost(null) }}
                          className="flex items-center gap-1.5 bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-2 rounded-lg text-xs ml-auto"><Trash2 size={12} />Supprimer</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white text-sm">{p.title}</div>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-blue-400 text-xs font-mono">/blog/{p.slug}</span>
                          <span className="text-white/30 text-xs">{p.category}</span>
                          <span className="text-white/30 text-xs">{p.readTime} min</span>
                        </div>
                      </div>
                      <button onClick={() => setEditingPost(i)} className="flex items-center gap-1.5 bg-white/5 hover:bg-violet-600/20 border border-white/10 hover:border-violet-500/30 text-white/50 hover:text-violet-400 px-3 py-1.5 rounded-lg text-xs transition-all">
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
              {data.testimonials.map((t, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input value={t.name} onChange={e => { const d={...data}; d.testimonials[i].name=e.target.value; setData(d) }}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-violet-500" placeholder="Nom" />
                    <input value={t.company} onChange={e => { const d={...data}; d.testimonials[i].company=e.target.value; setData(d) }}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 outline-none focus:border-violet-500" placeholder="Entreprise" />
                  </div>
                  <textarea value={t.text} onChange={e => { const d={...data}; d.testimonials[i].text=e.target.value; setData(d) }} rows={2}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 outline-none focus:border-violet-500 resize-none" />
                </div>
              ))}
            </div>
          )}

          {/* ── FAQ ── */}
          {tab === 'faq' && (
            <div className="space-y-3">
              <div className="flex justify-end mb-2">
                <button onClick={() => { const d={...data}; d.faq.push({question:'Nouvelle question ?',answer:'Réponse..'}); setData(d) }}
                  className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold">
                  <Plus size={13} />Ajouter
                </button>
              </div>
              {data.faq.map((f, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-2">
                  <input value={f.question} onChange={e => { const d={...data}; d.faq[i].question=e.target.value; setData(d) }}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-medium outline-none focus:border-violet-500" />
                  <textarea value={f.answer} onChange={e => { const d={...data}; d.faq[i].answer=e.target.value; setData(d) }} rows={2}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/60 outline-none focus:border-violet-500 resize-none" />
                  <button onClick={() => { const d={...data}; d.faq.splice(i,1); setData(d) }}
                    className="flex items-center gap-1 text-red-400 text-xs hover:text-red-300 transition-colors">
                    <Trash2 size={11} />Supprimer
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ── SETTINGS ── */}
          {tab === 'settings' && (
            <div className="max-w-lg space-y-4">
              {[
                { key: 'name', label: 'Nom du site' },
                { key: 'tagline', label: 'Slogan' },
                { key: 'phone', label: 'Téléphone' },
                { key: 'email', label: 'Email' },
                { key: 'address', label: 'Adresse' },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-1.5">{label}</label>
                  <input value={data.site[key as keyof typeof data.site] as string}
                    onChange={e => { const d={...data}; (d.site as Record<string,string>)[key]=e.target.value; setData(d) }}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500 transition-colors" />
                </div>
              ))}
              <div className="mt-6 p-4 bg-violet-600/10 border border-violet-500/20 rounded-xl text-xs text-white/50">
                <p className="font-bold text-violet-400 mb-1">Note technique</p>
                <p>Les modifications sont sauvegardées en localStorage. Pour les rendre permanentes, copiez le JSON modifié dans <code className="text-violet-400">/data/content.json</code> et redéployez sur Vercel.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
