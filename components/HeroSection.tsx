"use client"
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'
type Dict = { home?: { hero_title?: string; hero_subtitle?: string; search_placeholder?: string; search_button?: string } }
export default function HeroSection({ dict }: { dict?: Dict }) {
  const router = useRouter()
  const pathname = usePathname()
  const [query, setQuery] = useState('')
  const lang = (pathname.split('/').filter(Boolean)[0] || 'en')
  function submit() {
    const q = query.trim()
    if (!q) return
    router.push(`/${lang}/category?search=${encodeURIComponent(q)}`)
  }
  return (
    <div className="relative w-full overflow-hidden bg-background-dark py-16 sm:py-24">
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px]"></div>
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-accent-purple/10 blur-[120px]"></div>
      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <h1 className="font-display text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-6xl text-glow">
          {dict?.home?.hero_title ?? (
            <>Discover High-Value <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-purple">AI Assets & Credits</span></>
          )}
        </h1>
        <p className="mt-4 text-lg text-text-light max-w-2xl mx-auto">
          {dict?.home?.hero_subtitle ?? 'Curated tools for professional creators and developers. Find the best AI software with exclusive rewards and commissions.'}
        </p>
        <div className="mt-10 flex justify-center">
          <div className="relative flex w-full max-w-2xl flex-col gap-2 sm:flex-row sm:items-center p-1 rounded-xl bg-surface-dark border border-border-dark shadow-2xl ring-1 ring-white/10 focus-within:ring-primary focus-within:ring-2 transition-all">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <span className="material-symbols-outlined text-text-light">search</span>
            </div>
            <input
              className="block w-full rounded-lg border-0 bg-transparent py-4 pl-12 pr-4 text-white placeholder:text-gray-500 focus:ring-0 sm:text-base font-body"
              placeholder={dict?.home?.search_placeholder ?? 'Search for tools, tasks, or rewards...'}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') submit()
              }}
            />
            <button onClick={submit} className="m-1 rounded-lg bg-primary px-8 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-primary-dark hover:shadow-neon-blue sm:w-auto">{dict?.home?.search_button ?? 'Search'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
