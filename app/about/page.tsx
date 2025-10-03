import { fetchQuery } from '@/lib/sanityClient'
import { aboutQuery } from '@/lib/queries'
import ModuleRenderer from '@/components/ModuleRenderer'

export default async function AboutPage() {
  const data = await fetchQuery<any>(aboutQuery)
  return (
    <div>
      <ModuleRenderer modules={data?.modules || []} />
    </div>
  )
}
