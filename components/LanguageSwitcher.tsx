"use client"
import { usePathname, useRouter } from 'next/navigation'

const choices = [
  { code: 'en', label: 'EN' },
  { code: 'zh-TW', label: '繁體' },
  { code: 'zh-CN', label: '简体' },
]

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  function switchTo(code: string) {
    const parts = pathname.split('/').filter(Boolean)
    const current = parts[0] || 'en'
    parts[0] = code
    const next = '/' + parts.join('/')
    router.push(next)
  }
  return (
    <div className="flex items-center gap-2">
      {choices.map((c) => (
        <button key={c.code} onClick={() => switchTo(c.code)} className="px-2 py-1 text-xs rounded border border-white/10 text-white/80 hover:text-white hover:bg-white/10">
          {c.label}
        </button>
      ))}
    </div>
  )
}

