import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const ALLOWED_HOSTS = new Set([
  'images.unsplash.com',
  'lh3.googleusercontent.com',
])

export async function GET(req: NextRequest) {
  const urlParam = req.nextUrl.searchParams.get('url')
  if (!urlParam) return NextResponse.json({ error: 'Missing url' }, { status: 400 })
  let upstream: URL
  try {
    upstream = new URL(urlParam)
  } catch {
    return NextResponse.json({ error: 'Invalid url' }, { status: 400 })
  }
  if (upstream.protocol !== 'https:' || !ALLOWED_HOSTS.has(upstream.host)) {
    return NextResponse.json({ error: 'Host not allowed' }, { status: 403 })
  }
  const res = await fetch(upstream.toString(), { cache: 'no-store' })
  const arrayBuffer = await res.arrayBuffer()
  const contentType = res.headers.get('content-type') || 'image/jpeg'
  return new NextResponse(Buffer.from(arrayBuffer), {
    status: res.status,
    headers: {
      'content-type': contentType,
      'cache-control': 'no-store',
    },
  })
}

