import type { MetadataRoute } from 'next'
import { getTools } from '@/lib/notion'
import { locales } from '@/lib/i18n'

const defaultLang = 'en'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tools = await getTools().catch(() => [])
  const items: MetadataRoute.Sitemap = []

  items.push({ url: '/', lastModified: new Date() })
  items.push({ url: `/${defaultLang}`, lastModified: new Date() })
  items.push({ url: `/${defaultLang}/category`, lastModified: new Date() })

  const uniqueCategories = Array.from(new Set(tools.map((t) => t.category).filter(Boolean)))
  for (const cat of uniqueCategories) {
    items.push({ url: `/${defaultLang}/category?filter=${encodeURIComponent(cat!)}`, lastModified: new Date() })
  }

  for (const t of tools) {
    const slug = t.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')
    items.push({ url: `/${defaultLang}/tool/${slug}`, lastModified: t.lastEdited ? new Date(t.lastEdited) : new Date() })
  }

  return items
}

