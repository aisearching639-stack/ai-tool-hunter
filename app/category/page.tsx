import Navbar from '../../components/NavBar'
import ToolCard from '../../components/ToolCard'
import Pagination from '../../components/Pagination'
import FilterSidebar from '../../components/category/FilterSidebar'
import SortHeader from '../../components/category/SortHeader'
import { getTools } from '@/lib/notion'

export const dynamic = 'force-dynamic'

export default async function CategoryPage({ searchParams }: { searchParams?: { tag?: string; filter?: string } }) {
  const tools = await getTools().catch((e) => {
    console.error('getTools() failed on CategoryPage:', e)
    return []
  })
  const q = (searchParams?.tag ?? searchParams?.filter ?? '').trim()
  const filtered = q ? tools.filter((t) => t.category?.toLowerCase() === q.toLowerCase()) : tools

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1">
        <FilterSidebar />
        <div className="flex-1 flex flex-col">
          <SortHeader count={filtered.length} category={q || 'All Tools'} />
          <div className="flex-1 bg-background-dark p-6 lg:p-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {(filtered.length === 0 ? tools : filtered).map((t) => (
                <ToolCard key={t.title} {...t} />
              ))}
            </div>
            <Pagination />
          </div>
        </div>
      </main>
    </div>
  )
}
