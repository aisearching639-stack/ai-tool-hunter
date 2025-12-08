type Dict = { filters?: { title?: string; reset?: string; pricing?: string } }
export default function FilterSidebar({ dict }: { dict?: Dict }) {
  return (
    <aside className="hidden lg:flex w-80 flex-col border-r border-white/10 bg-[#121212] sticky top-20 h-[calc(100vh-80px)] overflow-y-auto">
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-white">{dict?.filters?.title ?? 'Filter Tools'}</h2>
          <button className="text-xs font-medium text-white/50 hover:text-primary transition-colors">{dict?.filters?.reset ?? 'Reset'}</button>
        </div>
        <div className="mb-8 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-white border border-white/10">Video<button className="text-white/50 hover:text-white"><span className="material-symbols-outlined text-[14px]">close</span></button></span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-white border border-white/10">Top Rated<button className="text-white/50 hover:text-white"><span className="material-symbols-outlined text-[14px]">close</span></button></span>
        </div>
        <div className="space-y-8">
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-white/90"><span className="material-symbols-outlined text-primary text-[18px]">payments</span>Reward Type</h3>
            <div className="space-y-2">
              {['Cash Commission', 'Free Credits', 'Free Tier'].map((label, idx) => (
                <label key={idx} className="flex items-center gap-3 cursor-pointer">
                  <div className="relative flex items-center">
                    <input className="peer h-4 w-4 appearance-none rounded border border-white/20 bg-surface-dark checked:border-primary checked:bg-primary transition-all focus:ring-0 focus:ring-offset-0" type="checkbox" defaultChecked={label === 'Free Credits'} />
                    <span className="material-symbols-outlined absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[12px] text-white opacity-0 peer-checked:opacity-100">check</span>
                  </div>
                  <span className="text-sm text-white/70">{label}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-white/90"><span className="material-symbols-outlined text-accent-purple text-[18px]">group</span>Target Audience</h3>
            <div className="space-y-2">
              {['Creators', 'Developers', 'Marketers', 'Designers'].map((label, idx) => (
                <label key={idx} className="flex items-center gap-3 cursor-pointer">
                  <div className="relative flex items-center">
                    <input className="peer h-4 w-4 appearance-none rounded border border-white/20 bg-surface-dark checked:border-accent-purple checked:bg-accent-purple transition-all focus:ring-0 focus:ring-offset-0" type="checkbox" />
                    <span className="material-symbols-outlined absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[12px] text-white opacity-0 peer-checked:opacity-100">check</span>
                  </div>
                  <span className="text-sm text-white/70">{label}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-white/90"><span className="material-symbols-outlined text-accent-green text-[18px]">attach_money</span>{dict?.filters?.pricing ?? 'Pricing Range'}</h3>
            <div className="pt-2 px-1">
              <input className="w-full h-1 bg-[#2A2A2A] rounded-lg appearance-none cursor-pointer" type="range" min={0} max={1000} />
              <div className="mt-2 flex justify-between text-xs font-medium text-white/50 font-display"><span>$0</span><span>$500+</span></div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto border-t border-white/10 p-6">
        <div className="rounded-xl bg-gradient-to-br from-surface-dark to-[#2A2A2A] p-4 border border-white/5">
          <p className="text-sm font-medium text-white">Need help finding tools?</p>
          <p className="text-xs text-white/50 mt-1 mb-3">Talk to our AI assistant to get personalized recommendations.</p>
          <button className="w-full rounded-lg bg-white/10 py-2 text-xs font-bold text-white hover:bg-white/20 transition-colors">Start Chat</button>
        </div>
      </div>
    </aside>
  )
}
