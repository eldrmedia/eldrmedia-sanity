import { fetchQuery } from '@/lib/sanityClient'
import { projectBySlugQuery } from '@/lib/queries'
import ModuleRenderer from '@/components/ModuleRenderer'
import ThemeVars from '@/components/ThemeVars'
import { buildMetadata } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'

type Params = { params: { slug: string, title: string } }

export async function generateMetadata({ params }: Params) {
  const data = await fetchQuery<any>(projectBySlugQuery, { slug: params.slug })
  return buildMetadata(data, { path: `/case/${params.slug}` })
}

export default async function CasePage({params}:{params:{slug:string}}){
  const data = await fetchQuery<any>(projectBySlugQuery, {slug: params.slug})
  if (!data) return notFound()

  const projectTitle = data.title as string | undefined
  return (
    <div>
      <Breadcrumbs
        align="left"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Work', href: '/work' },       // ← was "Blog"
          { label: projectTitle ?? 'Case study' } // ← use fetched title safely
        ]}
      />

      <ThemeVars theme={data?.brandTheme}/>
      <section className="container section">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6">
            <div className="kicker">Case Study</div>
            <h1 className="h1 mt-2">{data?.title}</h1>
            {data?.challenge && <p className="lead mt-2">{data.challenge}</p>}
            {data?.snapshot?.length>0 && (
              <div className="card p-4 mt-6 grid sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {data.snapshot.map((s:any,i:number)=>(
                  <div key={i}>
                    <div className="text-xs text-neutral-500">{s.label}</div>
                    <div className="font-semibold">{s.value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="lg:col-span-6">
            <div className="card aspect-[16/10] bg-neutral-100">{data?.heroUrl && <img src={data.heroUrl} alt="" className="w-full h-full object-cover"/>}</div>
          </div>
        </div>
      </section>
      <ModuleRenderer modules={data?.modules || []}/>
    </div>
  )
}
