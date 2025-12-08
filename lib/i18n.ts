export const locales = ['en', 'zh-CN', 'zh-TW'] as const
export type Locale = typeof locales[number]

export async function getDictionary(lang: Locale): Promise<any> {
  try {
    const dict = await import(`../dictionaries/${lang}.json`)
    return dict.default
  } catch {
    const dict = await import('../dictionaries/en.json')
    return dict.default
  }
}

