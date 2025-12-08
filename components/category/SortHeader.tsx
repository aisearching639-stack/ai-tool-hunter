export default function SortHeader({ count, category }: { count: number; category: string }) {
  return (
    <div className="sticky top-16 lg:top-20 z-30 flex flex-col gap-4 border-b border-white/10 bg-background-dark/95 px-6 py-4 backdrop-blur md:flex-row md:items-center md:justify-between lg:px-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">{category}</h1>
        <p className="mt-1 text-sm text-white/60">Showing {count} results</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-white/50">Sort by:</span>
        <div className="relative">
          <select className="appearance-none rounded-lg border border-white/10 bg-surface-dark py-2 pl-3 pr-10 text-sm font-medium text-white focus:border-primary focus:ring-1 focus:ring-primary">
            <option>Relevance</option>
            <option>Newest</option>
            <option>Highest Rated</option>
            <option>Most Popular</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50"><span className="material-symbols-outlined text-[18px]">expand_more</span></span>
        </div>
        <button className="flex items-center justify-center rounded-lg border border-white/10 bg-surface-dark p-2 text-white/70 hover:bg-surface-dark/80 hover:text-white md:hidden"><span className="material-symbols-outlined text-[20px]">filter_list</span></button>
      </div>
    </div>
  )
}

