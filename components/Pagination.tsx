export default function Pagination() {
  return (
    <div className="mt-12 flex justify-center">
      <div className="flex items-center gap-2">
        <button className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-[#1E1E1E] text-[#8dadce] hover:bg-white/10 hover:text-white">
          <span className="material-symbols-outlined text-lg">chevron_left</span>
        </button>
        <button className="flex size-10 items-center justify-center rounded-lg bg-primary text-white font-bold shadow-neon-blue">1</button>
        <button className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-[#1E1E1E] text-[#B0B0B0] hover:bg-white/10 hover:text-white">2</button>
        <button className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-[#1E1E1E] text-[#B0B0B0] hover:bg-white/10 hover:text-white">3</button>
        <span className="text-[#8dadce]">...</span>
        <button className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-[#1E1E1E] text-[#B0B0B0] hover:bg-white/10 hover:text-white">12</button>
        <button className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-[#1E1E1E] text-[#8dadce] hover:bg-white/10 hover:text-white">
          <span className="material-symbols-outlined text-lg">chevron_right</span>
        </button>
      </div>
    </div>
  )
}

