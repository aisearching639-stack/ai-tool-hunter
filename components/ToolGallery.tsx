export default function ToolGallery({ mainMediaUrl, screenshots, mainLabel, isVideo }: { mainMediaUrl: string; screenshots: string[]; mainLabel?: string; isVideo?: boolean }) {
  const toProxy = (u: string) => (u?.startsWith('http') ? `/api/image-proxy?url=${encodeURIComponent(u)}` : u)
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-display font-bold text-white">Screenshots & Gallery</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-96 md:h-80">
        <div className="md:col-span-2 relative group rounded-xl overflow-hidden border border-[#333] bg-black">
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${toProxy(mainMediaUrl)})` }}></div>
          {isVideo && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
              <div className="size-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 cursor-pointer hover:bg-white/20 hover:scale-110 transition-all">
                <span className="material-symbols-outlined text-white text-4xl ml-1">play_arrow</span>
              </div>
            </div>
          )}
          {mainLabel && (
            <div className="absolute bottom-4 left-4"><span className="px-2 py-1 rounded bg-black/60 text-xs font-bold text-white backdrop-blur">{mainLabel}</span></div>
          )}
        </div>
        {screenshots.map((url, i) => (
          <div key={i} className="relative rounded-xl overflow-hidden border border-[#333] group cursor-zoom-in">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${toProxy(url)})` }}></div>
          </div>
        ))}
      </div>
    </div>
  )
}
