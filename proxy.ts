import { NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'zh-CN', 'zh-TW'] as const
type Locale = typeof locales[number]

function detectLocale(req: NextRequest): Locale {
  const header = req.headers.get('accept-language') || ''
  const h = header.toLowerCase()
  if (h.includes('zh-tw')) return 'zh-TW'
  if (h.includes('zh-cn') || h.includes('zh')) return 'zh-CN'
  return 'en'
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  const seg = pathname.split('/').filter(Boolean)[0] || ''
  const hasLocale = locales.includes(seg as Locale)
  if (!hasLocale) {
    const loc = detectLocale(req)
    const url = req.nextUrl.clone()
    url.pathname = `/${loc}${pathname}`
    const res = NextResponse.redirect(url)
    res.cookies.set('LANG', loc, { path: '/', httpOnly: false })
    return res
  }
  const res = NextResponse.next()
  res.cookies.set('LANG', seg as Locale, { path: '/', httpOnly: false })
  return res
}

export const config = {
  matcher: ['/((?!_next|api|static|.*\\..*).*)'],
}

