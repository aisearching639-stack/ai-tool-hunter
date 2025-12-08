interface Plan {
  name: string
  price: string
  note: string
  popular?: boolean
  popularLabel?: string
}

export default function PricingTable({ plans }: { plans: Plan[] }) {
  return (
    <div className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden flex flex-col">
      <div className="bg-[#121212] p-4 border-b border-border-dark flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">Pricing Plans</h3>
        <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded border border-primary/20">Monthly</span>
      </div>
      <div>
        <table className="w-full text-left text-sm">
          <thead className="bg-[#181818] text-text-light font-medium border-b border-border-dark">
            <tr>
              <th className="px-4 py-3 font-normal">Plan</th>
              <th className="px-4 py-3 font-normal text-right">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2A2A]">
            {plans.map((plan, index) => (
              <tr key={index} className={`transition-colors ${plan.popular ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-white/5'}`}>
                <td className="px-4 py-4 text-white font-medium">
                  {plan.name}
                  {plan.popular && (
                    <span className="block text-xs text-primary mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[10px]">star</span>
                      {plan.popularLabel}
                    </span>
                  )}
                  <span className="block text-xs text-text-light font-normal mt-0.5">{plan.note}</span>
                </td>
                <td className="px-4 py-4 text-white text-right font-bold">{plan.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-[#181818] border-t border-border-dark">
        <p className="text-xs text-center text-text-light">All plans include commercial usage rights and access to the member gallery.</p>
      </div>
    </div>
  )
}
