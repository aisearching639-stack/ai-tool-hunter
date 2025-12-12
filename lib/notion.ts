// Notion REST fetch to avoid SDK runtime issues

export type RewardVariant = 'primary' | 'accent-purple' | 'accent-green'
import type { Locale } from './i18n'
import { getValidNotionId } from './env'

export type Tool = {
  imageUrl: string
  name: string
  title?: string
  description: string
  category: string
  rating: string
  rewardType: string
  rewardVariant: RewardVariant
  technicalId?: string
  tags?: string[]
  linkUrl?: string
  lastEdited?: string
  bestFor?: string
  reviewCount?: string
  pricingPlans?: Array<{
    name: string
    price: string
    note: string
    popular?: boolean
    popularLabel?: string
    order?: number
  }>
  offers?: Array<{
    headline: string
    sublabel?: string
    verifiedText?: string
    order?: number
  }>
  specs?: Array<{
    name: string
    value?: string
    unit?: string
    order?: number
  }>
  galleryItems?: Array<{
    type?: string
    url?: string
    label?: string
    order?: number
    title?: string
  }>
}

const NOTION_TOKEN = process.env.NOTION_TOKEN as string
const NOTION_VERSION = process.env.NOTION_VERSION || '2022-06-28'

async function queryDatabase(databaseId: string): Promise<any[]> {
  const url = `https://api.notion.com/v1/databases/${databaseId}/query`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
    cache: 'no-store',
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`queryDatabase ${res.status} ${text}`)
  }
  const data = await res.json()
  return data.results || []
}

async function findInlineDatabaseResultsFromPage(pageId: string): Promise<any[]> {
  const url = `https://api.notion.com/v1/blocks/${pageId}/children`
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      'Notion-Version': NOTION_VERSION,
    },
    cache: 'no-store',
  })
  if (!res.ok) {
    const text = await res.text()
    console.error('Notion blocks children failed:', res.status, text)
    return []
  }
  const data = await res.json()
  const childDb = (data.results || []).find((b: any) => b.type === 'child_database')
  if (!childDb) return []
  try {
    return await queryDatabase(childDb.id)
  } catch (e) {
    console.error('Inline database query failed:', e)
    return []
  }
}

function textFromRichText(rt: any): string {
  return Array.isArray(rt) ? rt.map((t) => t.plain_text ?? '').join(' ').trim() : ''
}

function titleFromProperty(prop: any): string {
  const arr = prop?.title || []
  return textFromRichText(arr)
}

function descriptionFromProperty(prop: any): string {
  const arr = prop?.rich_text || []
  return textFromRichText(arr)
}

function urlFromProperty(prop: any): string {
  const u = prop?.url
  if (typeof u === 'string' && u) return u
  const rt = prop?.rich_text || []
  for (const t of rt) {
    const s = t?.plain_text || ''
    if (s && /^https?:\/\//.test(s)) return s
  }
  return ''
}

function fileUrlFromProperty(prop: any): string {
  const files = prop?.files || []
  const f = files[0]
  if (!f) return ''
  if (f.external?.url) return f.external.url
  if (f.file?.url) return f.file.url
  return ''
}

function selectValue(prop: any): string {
  const v = prop?.select?.name || ''
  return v || ''
}

function multiSelectFirst(prop: any): string {
  const arr = prop?.multi_select || []
  return arr[0]?.name || ''
}

function numberValue(prop: any): string {
  const v = prop?.number
  return v == null ? '' : String(v)
}

function checkboxValue(prop: any): boolean {
  return Boolean(prop?.checkbox)
}

function isHexUuid(id: string): boolean {
  return /^[0-9a-fA-F]{32}$/.test(id || '')
}

function isHyphenUuid(id: string): boolean {
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id || '')
}

function toHyphenUuid(id: string): string {
  if (isHexUuid(id)) {
    const s = id.toLowerCase()
    return `${s.slice(0,8)}-${s.slice(8,12)}-${s.slice(12,16)}-${s.slice(16,20)}-${s.slice(20)}`
  }
  return id
}

function getRewardVariant(rewardType: string): RewardVariant {
  const s = rewardType.toLowerCase()
  if (s.includes('cash') || s.includes('commission')) return 'accent-green'
  if (s.includes('credit') || s.includes('free')) return 'accent-purple'
  if (s.includes('fast')) return 'primary'
  return 'primary'
}

function localizedTitle(p: any, lang?: Locale): string {
  if (lang === 'zh-TW') {
    const tw = titleFromProperty(p.Name_ZH_TW || {})
    if (tw) return tw
  } else if (lang === 'zh-CN') {
    const cn = titleFromProperty(p.Name_ZH_CN || {})
    if (cn) return cn
  }
  return titleFromProperty(p.Title || p.Name || {})
}

function localizedDescription(p: any, lang?: Locale): string {
  if (lang === 'zh-TW') {
    const tw = descriptionFromProperty(p.Description_ZH_TW || {})
    if (tw) return tw
  } else if (lang === 'zh-CN') {
    const cn = descriptionFromProperty(p.Description_ZH_CN || {})
    if (cn) return cn
  }
  return descriptionFromProperty(p.Description || {})
}

function localizedName(p: any, lang?: Locale): string {
  if (lang === 'zh-TW') {
    const tw = descriptionFromProperty(p.Name_ZH_TW || p['Name_ZH_TW'] || {})
    if (tw) return tw
  } else if (lang === 'zh-CN') {
    const cn = descriptionFromProperty(p.Name_ZH_CN || p['Name_ZH_CN'] || {})
    if (cn) return cn
  }
  const candidates = [
    '產品名稱 (Name)',
    'Name',
    'name',
    'English Name',
    '英文名稱',
    'Product Name',
  ]
  for (const key of candidates) {
    const v = descriptionFromProperty(p[key] || {})
    if (v) return v
  }
  return ''
}

async function fetchPageProperties(pageId: string): Promise<any> {
  const url = `https://api.notion.com/v1/pages/${pageId}`
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      'Notion-Version': NOTION_VERSION,
    },
    cache: 'no-store',
  })
  if (!res.ok) {
    const text = await res.text()
    console.error('fetchPageProperties failed:', res.status, text)
    return {}
  }
  const data = await res.json()
  return data.properties || {}
}

function relationIds(prop: any): string[] {
  const arr = prop?.relation || []
  return arr.map((r: any) => r?.id).filter(Boolean)
}

function mapPageToTool(page: any, lang?: Locale): Tool {
  const p = page.properties || {}
  const name = localizedName(p, lang)
  const title = localizedTitle(p, lang)
  const description = localizedDescription(p, lang)
  const imageUrl = fileUrlFromProperty(p.Logo || p.Image || {})
  const category = selectValue(p.Category) || multiSelectFirst(p.Categories) || multiSelectFirst(p.Tags)
  const tags = (p.Tags?.multi_select || p.Categories?.multi_select || []).map((t: any) => t?.name).filter(Boolean)
  const rating = numberValue(p.Rating) || selectValue(p.Rating)
  const reviewCount = numberValue(p.Review_Count)
  const rewardType = selectValue(p.Reward) || descriptionFromProperty(p.Reward)
  const linkUrl = urlFromProperty(p.Affiliate || p.Official_URL || p.URL || p.Website || p.Link || {})
  const lastEdited = page.last_edited_time || undefined
  const rewardVariant = getRewardVariant(rewardType)
  const technicalId = titleFromProperty(p['ID / 技術名稱'] || {})
  const bestFor = descriptionFromProperty(p.BestFor || {}) || selectValue(p.BestFor)
  return { imageUrl, name, title: name, description, category, rating, rewardType, rewardVariant, technicalId, tags, linkUrl, lastEdited, bestFor, ...(reviewCount ? { reviewCount } : {}) }
}

export async function getTools(lang?: Locale): Promise<Tool[]> {
  const databaseId = getValidNotionId()
  const normalizedId = toHyphenUuid(databaseId)
  try {
    const results = await queryDatabase(normalizedId)
    const base = results.map((r) => mapPageToTool(r, lang))
    // Enrich with relations where available
    const enriched: Tool[] = []
    for (let i = 0; i < results.length; i++) {
      const page = results[i]
      const p = page.properties || {}
      const tool = base[i]
      // Pricing Plans
      if (p['Pricing Plans']?.relation?.length) {
        const ids = relationIds(p['Pricing Plans'])
        const plans: Tool['pricingPlans'] = []
        for (const id of ids) {
          const props = await fetchPageProperties(id)
          const name = titleFromProperty(props.Name || props.name || {})
          const priceNum = props.price?.number
          const currency = selectValue(props.currency)
          const cycle = selectValue(props.billingCycle)
          const note = descriptionFromProperty(props.note || {})
          const popular = checkboxValue(props.popular)
          const popularLabel = descriptionFromProperty(props.popularLabel || {})
          const orderVal = props.order?.number
          const priceStr = priceNum == null ? '' : `${priceNum}${currency ? ' ' + currency : ''}${cycle ? ' / ' + cycle : ''}`
          plans.push({ name, price: priceStr, note, popular, popularLabel, order: orderVal })
        }
        tool.pricingPlans = plans.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      }
      // Offers
      if (p.Offers?.relation?.length) {
        const ids = relationIds(p.Offers)
        const offers: Tool['offers'] = []
        for (const id of ids) {
          const props = await fetchPageProperties(id)
          const headline =
            descriptionFromProperty(props.headline || props.Headline || {})
          const sublabel =
            descriptionFromProperty(props.sublabel || props.Sublabel || {})
          const verifiedText =
            descriptionFromProperty(props.verifiedText || props.VerifiedText || {})
          const orderVal = props.order?.number || props.Order?.number
          offers.push({ headline, sublabel, verifiedText, order: orderVal })
        }
        tool.offers = offers.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      }
      // Specs
      if (p.Specs?.relation?.length) {
        const ids = relationIds(p.Specs)
        const specs: Tool['specs'] = []
        for (const id of ids) {
          const props = await fetchPageProperties(id)
          const name = titleFromProperty(props.name || props.Name || {})
          const value =
            descriptionFromProperty(props.value || props.Value || {}) ||
            selectValue(props.value || props.Value) ||
            numberValue(props.value || props.Value)
          const unit =
            descriptionFromProperty(props.unit || props.Unit || {}) ||
            selectValue(props.unit || props.Unit) ||
            numberValue(props.unit || props.Unit)
          const orderVal = props.order?.number
          specs.push({ name, value, unit, order: orderVal })
        }
        tool.specs = specs.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      }
      // Gallery Items
      if (p['Gallery Items']?.relation?.length) {
        const ids = relationIds(p['Gallery Items'])
        const items: Tool['galleryItems'] = []
        for (const id of ids) {
          const props = await fetchPageProperties(id)
          const type = selectValue(props.type)
          const fileUrl = fileUrlFromProperty(props.file || {})
          const url = urlFromProperty(props.url || {}) || fileUrl
          const label = descriptionFromProperty(props.label || {})
          const title = titleFromProperty(props.title || props.Name || {})
          const orderVal = props.order?.number
          items.push({ type, url, label, order: orderVal, title })
        }
        tool.galleryItems = items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      }
      enriched.push(tool)
    }
    return enriched
  } catch (e: any) {
    const msg = String(e?.message || '')
    if (msg.includes('is a page, not a database') || msg.includes('object_not_found') || msg.includes('Could not find database')) {
      const pageId = normalizedId
      if (!isHyphenUuid(pageId)) {
        console.error('Invalid Notion ID format for page fallback:', databaseId)
        return []
      }
      const inlineResults = await findInlineDatabaseResultsFromPage(pageId)
      const base = inlineResults.map((r) => mapPageToTool(r, lang))
      return base
    }
    console.error('Notion query failed:', e)
    return []
  }
}
