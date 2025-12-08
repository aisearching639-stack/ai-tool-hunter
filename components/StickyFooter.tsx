export default function StickyFooter({ ctaText, href, startingPrice }: { ctaText?: string; href?: string; startingPrice?: string }) {
  return (
    <div className="fixed bottom-0 left-0 w-full z-50 glass-panel border-t border-[#333]">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-8 lg:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col hidden sm:flex">
          <p className="text-text-light text-xs uppercase tracking-wide">Starting price</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-white">{startingPrice ?? '$10'}</span>
            <span className="text-sm text-text-light">/month</span>
          </div>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="flex flex-col items-end hidden md:flex">
            <span className="text-neon text-xs font-bold uppercase tracking-widest animate-pulse">20% Cashback Active</span>
            <span className="text-xs text-gray-400">Offer expires in 24h</span>
          </div>
          <a href={href || '#'} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none h-12 px-8 rounded-full bg-neon hover:bg-[#32e612] text-background-dark text-base font-bold tracking-wide shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:shadow-[0_0_30px_rgba(57,255,20,0.6)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group">
            <span>{ctaText ?? 'Visit Website'}</span>
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </a>
        </div>
      </div>
    </div>
  )
}
