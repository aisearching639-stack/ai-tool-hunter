import Link from 'next/link'
import LanguageSwitcher from './LanguageSwitcher'

type Dict = { nav?: { discover?: string; categories?: string; subscribe?: string } }
export default function Navbar({ dict, lang }: { dict?: Dict; lang?: string }) {

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background-dark/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-white">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-primary to-accent-purple shadow-neon-blue">
            <span className="material-symbols-outlined text-[20px] text-white">radar</span>
          </div>
          <h2 className="font-display text-xl font-bold tracking-tight text-white">AI Tool Hunter</h2>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link prefetch={false} className="text-sm font-medium text-text-light hover:text-white transition-colors" href={`/${lang || ''}`}>{dict?.nav?.discover ?? 'Discover'}</Link>
          <Link prefetch={false} className="text-sm font-medium text-text-light hover:text-white transition-colors" href={`/${lang || ''}/category`}>{dict?.nav?.categories ?? 'Categories'}</Link>
        </nav>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <button className="hidden sm:flex group relative items-center justify-center overflow-hidden rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-white/10 hover:border-accent-purple/50 hover:shadow-neon-purple">
            <span className="relative z-10 flex items-center gap-2">Log In</span>
          </button>
          <div className="group relative flex items-center justify-center overflow-hidden rounded-lg bg-primary px-5 py-2 text-sm font-bold text-white shadow-lg transition-all hover:bg-primary-dark hover:scale-105 hover:shadow-neon-blue">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
            <span className="relative z-10">{dict?.nav?.subscribe ?? 'Subscribe'}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
