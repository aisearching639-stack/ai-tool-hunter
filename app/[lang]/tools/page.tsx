import { redirect } from 'next/navigation'
import { Locale } from '@/lib/i18n'

type Props = { params: Promise<{ lang: Locale }> }

export default async function ToolsRedirect(props: Props) {
  const p = await props.params
  redirect(`/${p.lang}/category`)
}
