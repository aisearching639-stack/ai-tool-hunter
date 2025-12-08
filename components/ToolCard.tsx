import Link from 'next/link'
type RewardVariant = 'primary' | 'accent-purple' | 'accent-green'

type Dict = { cta?: { visit?: string; try?: string } }
export default function ToolCard({
  imageUrl,
  title,
  description,
  category,
  rating,
  rewardType,
  rewardVariant,
  dict,
}: {
  imageUrl: string
  title: string
  description: string
  category: string
  rating: string
  rewardType: string
  rewardVariant: RewardVariant
  dict?: Dict
}) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
  const t = rewardType.toLowerCase()
  const badge = (() => {
    if (t.includes('sponsor')) return { label: 'Sponsored', variant: 'gold', icon: 'workspace_premium' }
    if (t.includes('credit') || t.includes('tier')) return { label: 'Freemium', variant: 'green', icon: 'check_circle' }
    if (t.includes('free')) return { label: 'Free', variant: 'green', icon: 'check_circle' }
    if (t.includes('commission') || t.includes('affiliate')) return { label: 'Free Trial', variant: 'blue', icon: 'sell' }
    return { label: 'Paid', variant: 'blue', icon: 'sell' }
  })()

  const variantClasses = {
    purple: {
      border: 'hover:border-accent-purple/30',
      shadow: 'hover:shadow-neon-purple',
      badge: 'bg-accent-purple/10 border border-accent-purple/20 text-accent-purple shadow-[0_0_10px_rgba(138,43,226,0.1)]',
    },
    blue: {
      border: 'hover:border-primary/30',
      shadow: 'hover:shadow-neon-blue',
      badge: 'bg-primary/10 border border-primary/20 text-primary shadow-[0_0_10px_rgba(0,123,255,0.1)]',
    },
    green: {
      border: 'hover:border-accent-green/30',
      shadow: 'hover:shadow-[0_0_15px_rgba(0,255,157,0.15)]',
      badge: 'bg-accent-green/10 border border-accent-green/20 text-accent-green shadow-[0_0_10px_rgba(0,255,157,0.1)]',
    },
    gold: {
      border: 'hover:border-[#FFD700]/30',
      shadow: 'hover:shadow-[0_0_12px_rgba(255,215,0,0.2)]',
      badge: 'bg-[#FFD700]/10 border border-[#FFD700]/20 text-[#FFD700] shadow-[0_0_10px_rgba(255,215,0,0.1)]',
    },
  }[badge.variant as 'blue' | 'green' | 'gold' | 'purple']

  const hasTrial = /free|credit|tier/i.test(rewardType)
  const ctaText = hasTrial ? (dict?.cta?.try ?? 'Try for Free') : (dict?.cta?.visit ?? 'Visit Website')
  const toProxy = (u: string) => (u?.startsWith('http') ? `/api/image-proxy?url=${encodeURIComponent(u)}` : u)

  return (
    <div className={`group relative flex flex-col gap-4 overflow-hidden rounded-xl bg-surface-dark border border-white/5 p-5 transition-all hover:-translate-y-1 ${variantClasses.border} ${variantClasses.shadow}`}>
      <div className="absolute top-4 right-4 z-10">
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider whitespace-nowrap flex-shrink-0 ${variantClasses.badge}`}>
          <span className="material-symbols-outlined text-[14px] mr-1">{badge.icon}</span>
          {badge.label}
        </span>
      </div>
      <div className="absolute bottom-4 right-4 z-10">
        <Link href={`/tool/${slug}`} className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20 border border-white/10">
          {ctaText}
        </Link>
      </div>
      <div className="flex-shrink-0">
        <div className="h-24 w-24 rounded-lg bg-cover bg-center shadow-inner" style={{ backgroundImage: `url(${toProxy(imageUrl)})` }}></div>
      </div>
      <div className="flex flex-1 flex-col gap-2 min-w-0 pr-28">
        <div>
          <div>
            <h3 className="font-display text-xl font-bold text-white group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-sm text-text-light mt-1 line-clamp-2">{description}</p>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">category</span> {category}</span>
          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">star</span> {rating}</span>
        </div>
      </div>
    </div>
  )
}
