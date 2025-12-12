import React from 'react'
import Navbar from '../../../../components/NavBar'
import ToolHeader from '../../../../components/ToolHeader'
import ToolGallery from '../../../../components/ToolGallery'
import PricingTable from '../../../../components/PricingTable'
import ToolContent from '../../../../components/ToolContent'
import StickyFooter from '../../../../components/StickyFooter'
import { getDictionary, Locale } from '@/lib/i18n'
import { getTools } from '@/lib/notion'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ lang: Locale; slug: string }> }

export default async function ToolDetailPage(props: Props) {
  const p = await props.params
  const dict = await getDictionary(p.lang)
  const _tools = await getTools(p.lang).catch(() => [])
  const mkSlug = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')
  const tool = _tools.find((t) => mkSlug(((t as any).technicalId || t.name) as string) === p.slug)
  if (!tool) return notFound()
  const breadcrumbs = [
    { label: 'Home', href: `/${p.lang}` },
    { label: tool.category || 'Tools', href: `/${p.lang}/category?filter=${encodeURIComponent(tool.category || '')}` },
    { label: tool.name },
  ]
  const firstOffer = (tool.offers || [])[0] || { headline: '', sublabel: '', verifiedText: '' }
  const vids = (tool.galleryItems || []).filter((g) => (g.type || '').toLowerCase() === 'video')
  const imgs = (tool.galleryItems || []).filter((g) => (g.type || '').toLowerCase() === 'image')
  const mainVideo = vids[0]
  const mainMediaUrl = (mainVideo?.url || imgs[0]?.url || tool.imageUrl || '')
  const mainLabel = mainVideo?.label || ''
  const isVideo = Boolean(mainVideo?.url)
  const screenshots = imgs.slice(mainVideo ? 0 : 1).map((g) => g.url || '').filter(Boolean)
  const plans = (tool.pricingPlans || []).map((p) => ({
    name: p.name,
    price: p.price,
    note: p.note,
    popular: p.popular,
    popularLabel: p.popularLabel,
  }))
  const integrityIssues = [
    firstOffer.headline ? null : 'Offers 未設定或未關聯',
    (tool.pricingPlans || []).length > 0 ? null : 'Pricing Plans 未設定或未關聯',
    (tool.specs || []).length > 0 ? null : 'Specs 未設定或未關聯',
    (mainVideo?.url || screenshots.length > 0) ? null : 'Gallery Items 未設定或未關聯',
  ].filter(Boolean) as string[]
  

  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <Navbar dict={dict} lang={p.lang} />
      <main className="relative flex flex-col min-h-screen pb-32">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-[1200px] px-4 md:px-8 lg:px-12 py-8 flex flex-col gap-8">
            <ToolHeader
              breadcrumbs={breadcrumbs}
              title={tool.name}
              logoUrl={tool.imageUrl}
              bestFor={tool.bestFor || tool.category || ''}
              rating={tool.rating || ''}
              reviewCount={String((tool as any).reviewCount || '')}
              description={tool.description || ''}
              offer={{ headline: firstOffer.headline, sublabel: firstOffer.sublabel || '', verifiedText: firstOffer.verifiedText || '' }}
            />
            {integrityIssues.length > 0 && (
              <div className="rounded-xl border-2 border-[#ff4d4f] bg-[#1a1111] p-4">
                <p className="text-[#ff857e] text-sm font-bold uppercase tracking-wider">資料完整性提示</p>
                <ul className="mt-2 text-sm text-white list-disc pl-5">
                  {integrityIssues.map((msg, i) => (
                    <li key={i}>{msg}</li>
                  ))}
                </ul>
              </div>
            )}
            <ToolGallery mainMediaUrl={mainMediaUrl} screenshots={screenshots} mainLabel={mainLabel} isVideo={isVideo} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
              <div className="lg:col-span-2 flex flex-col gap-8">
                <ToolContent summary={[tool.description || '']} pros={[]} cons={[]} />
                <div className="bg-surface-dark border border-border-dark rounded-xl p-6">
                  <h3 className="text-xl font-display font-bold text-white mb-6">Community Rating</h3>
                  <div className="flex flex-wrap gap-x-12 gap-y-6">
                    <div className="flex flex-col gap-1 items-center justify-center bg-[#121212] p-4 rounded-lg border border-[#333] min-w-[140px]">
                      <p className="text-white text-5xl font-display font-bold tracking-tight">{tool.rating || '—'}</p>
                      <div className="flex gap-0.5 mt-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <span key={i} className="material-symbols-outlined text-primary text-xl">star</span>
                        ))}
                      </div>
                      <p className="text-text-light text-xs mt-1">{(tool as any).reviewCount ? `Based on ${(tool as any).reviewCount} reviews` : 'No reviews yet'}</p>
                    </div>
                    
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <PricingTable plans={plans} />
                <div className="bg-surface-dark border border-border-dark rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Specs</h3>
                  <div className="space-y-4">
                    {(tool.specs || []).map((s, i) => (
                      <div key={i} className="flex justify-between items-center pb-3 border-b border-border-dark">
                        <span className="text-sm text-text-light">{s.name}</span>
                        <span className="text-sm text-white">{[s.value, s.unit].filter(Boolean).join(' ') || '—'}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </main>
      <StickyFooter ctaText="Visit Website" href={tool.linkUrl || '#'} startingPrice={(plans[0]?.price) || undefined} />
    </div>
  )
}
