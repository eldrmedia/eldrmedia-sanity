import { fetchQuery } from '@/lib/sanityClient'
import { homeQuery } from '@/lib/queries'
import ModuleRenderer from '@/components/ModuleRenderer'

export default async function HomePage(){
  const data = await fetchQuery<any>(homeQuery)
  return (
    <div>
      <ModuleRenderer modules={data?.modules || []}/>
    </div>
  )
}
