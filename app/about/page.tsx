// app/about/page.tsx
import { fetchQuery } from '@/lib/sanityClient'
import { aboutQuery } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'
import ModuleRenderer from '@/components/ModuleRenderer'

// Generate page-specific <head> metadata from Sanity
export async function generateMetadata() {
  const data = await fetchQuery<any>(aboutQuery)
  return buildMetadata(data, { path: '/about' })
}

export default async function AboutPage() {
  const data = await fetchQuery<any>(aboutQuery)
  return (
    <div>
      <ModuleRenderer modules={data?.modules || []} />
    </div>
  )
}
