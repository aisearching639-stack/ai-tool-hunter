import Link from 'next/link'

type Dict = { home?: { trending_title?: string } }
export default function HomeSidebar({ dict }: { dict?: Dict }) {
  return (
    <div className="space-y-8">
      <div className="rounded-xl bg-surface-dark border border-white/5 p-6">
        <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">trending_up</span>
          {dict?.home?.trending_title ?? 'Trending Categories'}
        </h3>
        <nav className="flex flex-col gap-1">
          {[
            { label: 'Generative Art', icon: 'brush' },
            { label: 'Coding Assistants', icon: 'terminal' },
            { label: 'Large Language Models', icon: 'smart_toy' },
            { label: 'Voice Synthesis', icon: 'record_voice_over' },
          ].map((item) => (
            <Link key={item.label} className="group flex items-center justify-between rounded-lg p-2 text-sm text-text-light hover:bg-white/5 hover:text-white transition-all" href={`/category?filter=${encodeURIComponent(item.label)}`}>
              <span className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded bg-white/5 text-white group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                </span>
                {item.label}
              </span>
              <span className="material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-surface-dark to-surface-darker border border-white/5 p-6">
        <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-accent-green/10 blur-[40px]"></div>
        <h3 className="relative font-display text-lg font-bold text-white mb-2">Stay Ahead</h3>
        <p className="relative text-sm text-text-light mb-4">Get the top 5 AI tools and commission opportunities delivered weekly.</p>
        <form className="relative flex flex-col gap-2">
          <label className="sr-only" htmlFor="email">Email address</label>
          <input className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-accent-green focus:ring-1 focus:ring-accent-green" id="email" placeholder="you@example.com" required type="email" />
          <button className="w-full rounded-lg bg-accent-green/90 px-3 py-2 text-sm font-bold text-black transition-colors hover:bg-accent-green hover:shadow-[0_0_15px_rgba(0,255,157,0.3)]" type="submit">Join Newsletter</button>
        </form>
        <div className="mt-3 flex items-center gap-2">
          <div className="flex -space-x-2">
            <div className="h-6 w-6 rounded-full border border-surface-dark bg-gray-500 bg-cover" style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuBH429EdWzt6VGr-MRJnvRoliIYf4AT_i3i2yp-qdIw2wWHPbqU-kgPBKD2FqsNObehujvxvF9_NIn40FQ3VpSe6km9szH67mS6FdiLAG9826_x_qo_m04d8Wnkg12sO5TFHKqhQkDjqD4lwJJpPGD82ofrM6KVsYutIObtjy_lCeE5sOB5iatzjQ18as9SRWi2fsESQZeuOuxjztV5sffMPsVhmzXsqyFThDw9W4YIMYIW2D7yZsqnMw-ltUUR1Dk65HXfUF0xeRg)' }}></div>
            <div className="h-6 w-6 rounded-full border border-surface-dark bg-gray-400 bg-cover" style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuBH429EdWzt6VGr-MRJnvRoliIYf4AT_i3i2yp-qdIw2wWHPbqU-kgPBKD2FqsNObehujvxvF9_NIn40FQ3VpSe6km9szH67mS6FdiLAG9826_x_qo_m04d8Wnkg12sO5TFHKqhQkDjqD4lwJJpPGD82ofrM6KVsYutIObtjy_lCeE5sOB5iatzjQ18as9SRWi2fsESQZeuOuxjztV5sffMPsVhmzXsqyFThDw9W4YIMYIW2D7yZsqnMw-ltUUR1Dk65HXfUF0xeRg)' }}></div>
            <div className="h-6 w-6 rounded-full border border-surface-dark bg-gray-300 bg-cover" style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuBH429EdWzt6VGr-MRJnvRoliIYf4AT_i3i2yp-qdIw2wWHPbqU-kgPBKD2FqsNObehujvxvF9_NIn40FQ3VpSe6km9szH67mS6FdiLAG9826_x_qo_m04d8Wnkg12sO5TFHKqhQkDjqD4lwJJpPGD82ofrM6KVsYutIObtjy_lCeE5sOB5iatzjQ18as9SRWi2fsESQZeuOuxjztV5sffMPsVhmzXsqyFThDw9W4YIMYIW2D7yZsqnMw-ltUUR1Dk65HXfUF0xeRg)' }}></div>
          </div>
          <span className="text-xs text-gray-500">Join 12,000+ hunters</span>
        </div>
      </div>
    </div>
  )
}
