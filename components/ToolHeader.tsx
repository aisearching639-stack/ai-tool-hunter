interface ToolHeaderProps {
  title: string
  logoUrl: string
  bestFor: string
  rating: string
  reviewCount: string
  description?: string
  breadcrumbs: { label: string; href?: string }[]
  offer: { headline: string; sublabel: string; verifiedText: string }
}

export default function ToolHeader({ title, logoUrl, bestFor, rating, reviewCount, description, breadcrumbs, offer }: ToolHeaderProps) {
  const toProxy = (u: string) => (u?.startsWith('http') ? `/api/image-proxy?url=${encodeURIComponent(u)}` : u)
  return (
    <div className="flex flex-col gap-6 p-6 rounded-2xl bg-surface-dark border border-border-dark shadow-glow relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/5 to-accent-purple/5 pointer-events-none"></div>
      <div className="flex items-center flex-wrap gap-2 text-sm text-text-light mb-2 w-full">
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <span className="material-symbols-outlined text-base">chevron_right</span>}
            {crumb.href ? (
              <a className="hover:text-primary transition-colors" href={crumb.href}>{crumb.label}</a>
            ) : (
              <span className="text-white font-medium">{crumb.label}</span>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center w-full relative z-10">
        <div className="flex flex-col sm:flex-row gap-6 flex-1">
          <div className="size-24 sm:size-32 rounded-2xl bg-black border border-[#333] flex items-center justify-center shrink-0 shadow-lg" style={{ backgroundImage: `url(${toProxy(logoUrl)})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          <div className="flex flex-col justify-center gap-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">{title}</h1>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-primary/20 to-accent-purple/20 border border-primary/30 text-primary backdrop-blur-sm">Best for: {bestFor}</span>
            </div>
            {description && (
              <p className="text-text-light text-lg max-w-xl">{description}</p>
            )}
            <div className="flex items-center gap-2 mt-1">
              <div className="flex text-primary">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="material-symbols-outlined text-lg">{Number(rating) >= star ? 'star' : 'star_half'}</span>
                ))}
              </div>
              <span className="text-white font-bold">{rating}</span>
              <span className="text-text-light text-sm">{reviewCount}</span>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-auto min-w-[320px]">
          <div className="group relative flex flex-col justify-between p-6 rounded-xl bg-[#121212] border-2 border-neon shadow-neon-green transition-transform hover:-translate-y-1">
            <div className="absolute inset-0 bg-neon/5 rounded-xl pointer-events-none"></div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-neon text-xs font-bold uppercase tracking-widest mb-1">{offer.sublabel}</p>
                <h3 className="text-2xl font-display font-bold text-white leading-tight">{offer.headline}</h3>
              </div>
              <span className="material-symbols-outlined text-neon text-3xl">monetization_on</span>
            </div>
            {offer.verifiedText && (
              <p className="text-gray-300 text-sm mb-4">{offer.verifiedText}</p>
            )}
            <div className="flex items-center gap-2 text-xs text-text-light">
              <span className="material-symbols-outlined text-sm">verified</span>
              {offer.verifiedText}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
