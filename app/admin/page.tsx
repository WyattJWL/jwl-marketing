'use client'
import { useState, useEffect } from 'react'
import { Lock, Eye, EyeOff, Zap } from 'lucide-react'

export default function AdminLogin() {
  const [pwd, setPwd] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    await new Promise(r => setTimeout(r, 600))
    if (pwd === '100124') {
      document.cookie = 'jwl_admin=1;path=/;max-age=86400'
      window.location.href = '/admin/dashboard'
    } else {
      setError(true)
      setPwd('')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Neon background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse" style={{animationDelay:'1.5s'}} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/5 rounded-full blur-2xl" />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:'linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)', backgroundSize:'40px 40px'}} />
      </div>

      <div className="w-full max-w-sm relative z-10">
        {/* Logo/icon */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.4)]">
            <Zap size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1" style={{fontFamily:'DM Sans,sans-serif'}}>
            Salut, Wyatt 👋
          </h1>
          <p className="text-white/40 text-sm">Administration JWL Marketing</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          <div className="mb-6">
            <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
                <Lock size={16} />
              </div>
              <input
                type={show ? 'text' : 'password'}
                value={pwd}
                onChange={e => { setPwd(e.target.value); setError(false) }}
                placeholder="••••••"
                className={`w-full bg-white/5 border rounded-xl px-10 py-3 text-white placeholder-white/20 text-sm outline-none transition-all focus:border-violet-500 focus:shadow-[0_0_15px_rgba(139,92,246,0.2)] ${error ? 'border-red-500/50' : 'border-white/10'}`}
                autoFocus
              />
              <button type="button" onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && <p className="text-red-400 text-xs mt-2">Mot de passe incorrect</p>}
          </div>

          <button type="submit" disabled={loading || !pwd}
            className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed relative overflow-hidden group"
            style={{background:'linear-gradient(135deg, #7c3aed, #2563eb)'}}>
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
            <div className="relative flex items-center justify-center gap-2">
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Zap size={15} />
              )}
              {loading ? 'Connexion...' : 'Accéder au dashboard'}
            </div>
          </button>
        </form>

        <div className="mt-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse" />
            <span className="text-white/20 text-xs">JWL Marketing — Admin v1.0</span>
          </div>
        </div>
      </div>
    </div>
  )
}
