import Navbar from '../components/NavBar'
import HeroSection from '../components/HeroSection'
import HomeSidebar from '../components/HomeSidebar'
import ToolCard from '../components/ToolCard'
import Footer from '../components/Footer'
import { getTools } from '@/lib/notion'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const tools = await getTools().catch((e) => {
    console.error('getTools() failed on HomePage:', e)
    return []
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h2 className="font-display text-2xl font-bold text-white">Today&apos;s Top Finds</h2>
                <a className="text-sm font-medium text-primary hover:text-white transition-colors flex items-center gap-1" href="#">
                  View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
              {tools.length === 0 ? (
                <p className="text-sm text-text-light">No tools found yet.</p>
              ) : (
                tools.map((t) => <ToolCard key={t.title} {...t} />)
              )}
            </div>
            <div className="lg:col-span-4">
              <HomeSidebar />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
