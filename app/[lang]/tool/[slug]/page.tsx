import React from 'react'
import Navbar from '../../../../components/NavBar'
import ToolHeader from '../../../../components/ToolHeader'
import ToolGallery from '../../../../components/ToolGallery'
import PricingTable from '../../../../components/PricingTable'
import ToolContent from '../../../../components/ToolContent'
import StickyFooter from '../../../../components/StickyFooter'
import { getDictionary, Locale } from '@/lib/i18n'

type Props = { params: Promise<{ lang: Locale; slug: string }> }

export default async function ToolDetailPage(props: Props) {
  const p = await props.params
  const dict = await getDictionary(p.lang)
  const mockToolData = {
    breadcrumbs: [
      { label: 'Home', href: `/${p.lang}` },
      { label: 'Generative Art', href: `/${p.lang}/category` },
      { label: p.slug },
    ],
    title: 'Midjourney',
    logoUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuANK95yCmhghkiA7osZsnGcPUkEUy_akbXiZ4dysxYq6FZjmT2Rp1OJIGMnOfP1RZSypxCGkAuh7P93vIsQ9qjb6jxcEvyAl7uc0S98zTVzm1_-ORywGZVjAZwtX-96j58fElWXUAjTd7as4n_HKEjJ3f33ZRJ1vMxKMw8KZcWxfJzCfDldFiuGfoJlXJuOEuJupCT03yd3L1gTMbQnxvEOglPK9AnU6OmLGXgEGQqnYtDw4L-PGpPX7IFpkco-0oclptIu6ru2Wwo',
    bestFor: 'Designers',
    rating: '4.8',
    reviewCount: '(12,405 reviews)',
    offer: {
      headline: '20% Cash Commission',
      sublabel: 'Exclusive Offer',
      verifiedText: 'Verified 2 hours ago',
    },
    gallery: {
      mainMediaUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuANK95yCmhghkiA7osZsnGcPUkEUy_akbXiZ4dysxYq6FZjmT2Rp1OJIGMnOfP1RZSypxCGkAuh7P93vIsQ9qjb6jxcEvyAl7uc0S98zTVzm1_-ORywGZVjAZwtX-96j58fElWXUAjTd7as4n_HKEjJ3f33ZRJ1vMxKMw8KZcWxfJzCfDldFiuGfoJlXJuOEuJupCT03yd3L1gTMbQnxvEOglPK9AnU6OmLGXgEGQqnYtDw4L-PGpPX7IFpkco-0oclptIu6ru2Wwo',
      screenshots: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuANK95yCmhghkiA7osZsnGcPUkEUy_akbXiZ4dysxYq6FZjmT2Rp1OJIGMnOfP1RZSypxCGkAuh7P93vIsQ9qjb6jxcEvyAl7uc0S98zTVzm1_-ORywGZVjAZwtX-96j58fElWXUAjTd7as4n_HKEjJ3f33ZRJ1vMxKMw8KZcWxfJzCfDldFiuGfoJlXJuOEuJupCT03yd3L1gTMbQnxvEOglPK9AnU6OmLGXgEGQqnYtDw4L-PGpPX7IFpkco-0oclptIu6ru2Wwo',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuANK95yCmhghkiA7osZsnGcPUkEUy_akbXiZ4dysxYq6FZjmT2Rp1OJIGMnOfP1RZSypxCGkAuh7P93vIsQ9qjb6jxcEvyAl7uc0S98zTVzm1_-ORywGZVjAZwtX-96j58fElWXUAjTd7as4n_HKEjJ3f33ZR1vMxKMw8KZcWxfJzCfDldFiuGfoJlXJuOEuJupCT03yd3L1gTMbQnxvEOglPK9AnU6OmLGXgEGQqnYtDw4L-PGpPX7IFpkco-0oclptIu6ru2Wwo',
      ],
    },
    pricing: {
      plans: [
        { name: 'Basic', price: '$10', note: '3.3 hr/mo Fast GPU' },
        { name: 'Standard', price: '$30', note: '15 hr/mo Fast GPU', popular: true, popularLabel: 'Most Popular' },
        { name: 'Pro', price: '$60', note: '30 hr/mo + Stealth' },
      ],
    },
    sticky: {
      startingPrice: '$10',
      ctaText: 'Get Deal & Claim Reward',
    },
    content: {
      summary: [
        'Midjourney v6 represents a quantum leap in generative AI, offering unprecedented photorealism and adherence to complex prompts.',
        'The model excels at texture, lighting, and composition, often producing results that require little to no post-processing.',
      ],
      pros: [
        'Unmatched artistic style and photorealism',
        'Active, helpful community on Discord',
        'Frequent model updates',
        'Commercial rights included',
      ],
      cons: [
        'Requires Discord account',
        'Generations are public by default',
        'Subscription only',
      ],
    },
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <Navbar dict={dict} lang={p.lang} />
      <main className="relative flex flex-col min-h-screen pb-32">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-[1200px] px-4 md:px-8 lg:px-12 py-8 flex flex-col gap-8">
            <ToolHeader
              breadcrumbs={mockToolData.breadcrumbs}
              title={mockToolData.title}
              logoUrl={mockToolData.logoUrl}
              bestFor={mockToolData.bestFor}
              rating={mockToolData.rating}
              reviewCount={mockToolData.reviewCount}
              offer={mockToolData.offer}
            />
            <ToolGallery mainMediaUrl={mockToolData.gallery.mainMediaUrl} screenshots={mockToolData.gallery.screenshots} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
              <div className="lg:col-span-2 flex flex-col gap-8">
                <ToolContent summary={mockToolData.content.summary} pros={mockToolData.content.pros} cons={mockToolData.content.cons} />
                <div className="bg-surface-dark border border-border-dark rounded-xl p-6">
                  <h3 className="text-xl font-display font-bold text-white mb-6">Community Rating</h3>
                  <div className="flex flex-wrap gap-x-12 gap-y-6">
                    <div className="flex flex-col gap-1 items-center justify-center bg-[#121212] p-4 rounded-lg border border-[#333] min-w-[140px]">
                      <p className="text-white text-5xl font-display font-bold tracking-tight">4.8</p>
                      <div className="flex gap-0.5 mt-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <span key={i} className="material-symbols-outlined text-primary text-xl">{i === 5 ? 'star_half' : 'star'}</span>
                        ))}
                      </div>
                      <p className="text-text-light text-xs mt-1">Based on 12k reviews</p>
                    </div>
                    <div className="flex-1 grid grid-cols-[20px_1fr_40px] items-center gap-y-3 min-w-[200px]">
                      {[5, 4, 3, 2, 1].map((star, idx) => (
                        <React.Fragment key={star}>
                          <p className="text-white text-sm">{star}</p>
                          <div className="h-2 w-full bg-[#333] rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${[80, 12, 5, 1, 2][idx]}%` }}></div>
                          </div>
                          <p className="text-text-light text-sm text-right">{[80, 12, 5, 1, 2][idx]}%</p>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <PricingTable plans={mockToolData.pricing.plans} />
                <div className="bg-surface-dark border border-border-dark rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Specs</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-border-dark"><span className="text-sm text-text-light">Model Version</span><span className="text-sm text-white font-mono bg-[#121212] px-2 py-0.5 rounded border border-[#333]">v6.0</span></div>
                    <div className="flex justify-between items-center pb-3 border-b border-border-dark"><span className="text-sm text-text-light">Output Resolution</span><span className="text-sm text-white">Up to 2048x2048</span></div>
                    <div className="flex justify-between items-center pb-3 border-b border-border-dark"><span className="text-sm text-text-light">Aspect Ratios</span><span className="text-sm text-white">Any custom ratio</span></div>
                    <div className="flex justify-between items-center pb-3 border-b border-border-dark"><span className="text-sm text-text-light">Platform</span><div className="flex items-center gap-1"><span className="material-symbols-outlined text-base text-[#5865F2]">chat</span><span className="text-sm text-white">Discord</span></div></div>
                    <div className="flex flex-col gap-2 pt-1"><div className="flex justify-between text-xs mb-1"><span className="text-text-light">Speed Score</span><span className="text-primary font-bold">9.2/10</span></div><div className="h-1.5 w-full bg-[#121212] rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-primary to-accent-purple w-[92%] rounded-full"></div></div></div>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-border-dark bg-gradient-to-br from-[#121212] to-[#1A1A1A]">
                  <h3 className="text-sm font-bold text-text-light uppercase tracking-wider mb-4">Alternatives</h3>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors group"><div className="size-8 rounded bg白 flex items-center justify-center text黑 font-bold">D</div><div className="flex-1"><p className="text-sm font-bold text白 group-hover:text-primary transition-colors">DALL-E 3</p><p className="text-xs text-text-light">OpenAI</p></div><span className="material-symbols-outlined text-text-light text-sm">arrow_forward</span></div>
                    <div className="flex items-center gap-3 p-2 hover:bg白/5 rounded-lg cursor-pointer transition-colors group"><div className="size-8 rounded bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text白 font-bold">S</div><div className="flex-1"><p className="text-sm font-bold text白 group-hover:text-primary transition-colors">Stable Diffusion</p><p className="text-xs text-text-light">Stability AI</p></div><span className="material-symbols-outlined text-text-light text-sm">arrow_forward</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <StickyFooter />
    </div>
  )
}
