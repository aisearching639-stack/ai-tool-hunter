import { redirect } from 'next/navigation'
import { Locale } from '@/lib/i18n'

export default function ToolsRedirect({ params }: { params: { lang: Locale } }) {
  redirect(`/${params.lang}/category`)
}

