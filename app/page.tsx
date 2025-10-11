import { fetchQuery } from '@/lib/sanityClient'
import { homeQuery } from '@/lib/queries'
import ModuleRenderer from '@/components/ModuleRenderer'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata() {
  const data = await fetchQuery<any>(homeQuery)
  return buildMetadata(data, { path: '/' })
}

export default async function HomePage(){
  const data = await fetchQuery<any>(homeQuery)
  return <ModuleRenderer modules={data?.modules || []}/>
}