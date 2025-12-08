export default function ToolContent({
  summary,
  pros,
  cons,
}: {
  summary: string[]
  pros: string[]
  cons: string[]
}) {
  return (
    <div className="lg:col-span-2 flex flex-col gap-8">
      <section className="bg-surface-dark border border-border-dark rounded-xl p-6 md:p-8">
        <h3 className="text-2xl font-display font-bold text-white mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">psychology</span>
          AI Summary
        </h3>
        <div className="prose prose-invert max-w-none text-text-light leading-relaxed">
          {summary.map((p, i) => (
            <p key={i} className={i !== summary.length - 1 ? 'mb-4' : ''}>{p}</p>
          ))}
        </div>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-dark/50 border border-green-900/30 rounded-xl p-6">
          <h4 className="text-green-400 font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined">thumb_up</span>
            Pros
          </h4>
          <ul className="space-y-3">
            {pros.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                <span className="material-symbols-outlined text-green-500 text-lg shrink-0">check_circle</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-surface-dark/50 border border-red-900/30 rounded-xl p-6">
          <h4 className="text-red-400 font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined">thumb_down</span>
            Cons
          </h4>
          <ul className="space-y-3">
            {cons.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                <span className="material-symbols-outlined text-red-500 text-lg shrink-0">cancel</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

