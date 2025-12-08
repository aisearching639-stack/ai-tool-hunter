import Navbar from '../../../components/NavBar'
import ToolCard from '../../../components/ToolCard'
import Pagination from '../../../components/Pagination'
import FilterSidebar from '../../../components/category/FilterSidebar'
import SortHeader from '../../../components/category/SortHeader'
import { getTools } from '@/lib/notion'
import { getDictionary, Locale } from '@/lib/i18n'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ lang: Locale }>
  searchParams: Promise<{ tag?: string; filter?: string; search?: string }>
}

export default async function CategoryPage(props: Props) {
  const p = await props.params
  const sp = (await props.searchParams) || {}
  const dict = await getDictionary(p.lang)
  const tools = await getTools(p.lang).catch((e) => {
    console.error('getTools() failed on CategoryPage:', e)
    return []
  })
  const q = (sp.tag ?? sp.filter ?? '').trim()
  const s = (sp.search ?? '').trim()
  const norm = (x: string) => x.toLowerCase()
  const filteredBase = q ? tools.filter((t) => t.category && norm(t.category) === norm(q)) : tools
  const filtered = s
    ? filteredBase.filter((t) => {
        const hay = [t.title, t.description, t.category, ...(t as any).tags || []]
          .filter(Boolean)
          .map((v: string) => norm(v))
          .join(' ')
        return hay.includes(norm(s))
      })
    : filteredBase

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar dict={dict} lang={p.lang} />
      <main className="flex flex-1">
        <FilterSidebar dict={dict} />
        <div className="flex-1 flex flex-col">
          <SortHeader count={filtered.length} category={s ? `${dict.home?.search_results_for ?? 'Search results for:'} ${s}` : (q || 'All Tools')} />
          <div className="flex-1 bg-background-dark p-6 lg:p-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {(filtered.length === 0 ? tools : filtered).map((t) => (
                <ToolCard key={t.title} {...t} dict={dict} />
              ))}
            </div>
            <Pagination />
          </div>
        </div>
      </main>
    </div>
  )
}
