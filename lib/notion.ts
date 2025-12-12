// Notion REST fetch to avoid SDK runtime issues

export type RewardVariant = 'primary' | 'accent-purple' | 'accent-green'
import type { Locale } from './i18n'

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

function mapPageToTool(page: any, lang?: Locale): Tool {
  const p = page.properties || {}
  const nameRt = descriptionFromProperty(p['產品名稱 (Name)'] || {})
  const title = localizedTitle(p, lang)
  const name = nameRt || title
  const description = localizedDescription(p, lang)
  const imageUrl = fileUrlFromProperty(p.Logo || p.Image || {})
  const category = selectValue(p.Category) || multiSelectFirst(p.Categories) || multiSelectFirst(p.Tags)
  const tags = (p.Tags?.multi_select || p.Categories?.multi_select || []).map((t: any) => t?.name).filter(Boolean)
  const rating = numberValue(p.Rating) || selectValue(p.Rating)
  const rewardType = selectValue(p.Reward) || descriptionFromProperty(p.Reward)
  const linkUrl = urlFromProperty(p.Affiliate || p.URL || p.Website || p.Link || {})
  const lastEdited = page.last_edited_time || undefined
  const rewardVariant = getRewardVariant(rewardType)
  const technicalId = titleFromProperty(p['ID / 技術名稱'] || {})
  return { imageUrl, name, title: name, description, category, rating, rewardType, rewardVariant, technicalId, tags, linkUrl, lastEdited }
}

export async function getTools(lang?: Locale): Promise<Tool[]> {
  const databaseId = process.env.NOTION_DATABASE_ID as string
  const normalizedId = toHyphenUuid(databaseId)
  try {
    const results = await queryDatabase(normalizedId)
    return results.map((r) => mapPageToTool(r, lang))
  } catch (e: any) {
    const msg = String(e?.message || '')
    if (msg.includes('is a page, not a database') || msg.includes('object_not_found') || msg.includes('Could not find database')) {
      const pageId = normalizedId
      if (!isHyphenUuid(pageId)) {
        console.error('Invalid Notion ID format for page fallback:', (databaseId || '').slice(0, 4))
        return []
      }
      const inlineResults = await findInlineDatabaseResultsFromPage(pageId)
      return inlineResults.map((r) => mapPageToTool(r, lang))
    }
    console.error('Notion query failed:', e)
    return []
  }
}
