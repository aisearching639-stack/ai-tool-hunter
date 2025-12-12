import fs from 'fs'
import path from 'path'

export function getEnv(key: string): string {
  const val = process.env[key]
  if (typeof val === 'string' && val.length > 0) return val
  return getEnvFromFile(key)
}

function getEnvFromFile(key: string): string {
  try {
    const envPath = path.join(process.cwd(), '.env.local')
    const content = fs.readFileSync(envPath, 'utf8')
    const line = content.split(/\r?\n/).find((l) => l.startsWith(key + '='))
    if (!line) return ''
    return line.slice(key.length + 1).trim()
  } catch {
    return ''
  }
}

export function getValidNotionId(): string {
  const raw = getEnv('NOTION_DATABASE_ID')
  const s = (raw || '').trim()
  const isHex32 = /^[0-9a-fA-F]{32}$/.test(s)
  const isHyphenUuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(s)
  if (isHex32 || isHyphenUuid) return s
  const fromFile = getEnvFromFile('NOTION_DATABASE_ID')
  const t = (fromFile || '').trim()
  const ok = /^[0-9a-fA-F]{32}$/.test(t) || /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(t)
  if (ok) {
    if (s && !isHex32 && !isHyphenUuid) {
      process.env.NOTION_DATABASE_ID = t
    }
    return t
  }
  return s
}
