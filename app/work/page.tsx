import { fetchQuery } from '@/lib/sanityClient'
import { workPageQuery } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'
import { ProjectCard } from '@/components/Cards'
import Image from 'next/image'

export const revalidate = 60

export async function generateMetadata() {
  const data = await fetchQuery<any>(workPageQuery)
  const pageDoc = data?.page || {}
  return buildMetadata(pageDoc, { path: '/work' })
}

export default async function WorkPage(){
  const data = await fetchQuery<any>(workPageQuery)
  const page = data?.page
  const projects = data?.projects || []

  const hero = page?.modules?.find((m: any) => m._type === 'heroModule')
  const featured = page?.modules?.find((m: any) => m._type === 'featuredWorkModule')
  const cta = page?.modules?.find((m: any) => m._type === 'ctaModule')

  return (
    <div className="container section space-y-16">

      {/* 1) HERO */}
      {hero && <HeroModule data={hero} />}

      {/* 2) MAIN GRID OF ALL WORK */}
      <section>
        <header className="mb-10">
          <div className="kicker">Selected Works</div>
          <h1 className="h1 mt-2">
            A mix of design-system builds, government projects, and platform redesigns.
          </h1>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p: any) => (
            <ProjectCard key={p.slug.current} {...p} />
          ))}
        </div>
      </section>

      {/* 3) FEATURED WORK MODULE */}
      {featured && <FeaturedWorkModule data={featured} />}

      {/* 4) CTA */}
      {cta && <CtaModule data={cta} />}

    </div>
  )
}

/* ---------- Light module renderers (drop-in) ---------- */

function HeroModule({ data }: { data: any }) {
  const { superTitle, title, subtitle, media } = data || {}
  return (
    <section className="grid gap-8 md:grid-cols-2 items-center">
      <div>
        {superTitle && <div className="kicker">{superTitle}</div>}
        {title && <h1 className="display mt-2">{title}</h1>}
        {subtitle && <p className="lead mt-4 opacity-80">{subtitle}</p>}
      </div>
      {media?.asset?.url && (
        <div className="relative aspect-video rounded-2xl overflow-hidden">
          <Image
            src={media.asset.url}
            alt={media.alt || ''}
            fill
            className="object-cover"
            sizes="(min-width:1024px) 50vw, 100vw"
            priority
          />
        </div>
      )}
    </section>
  )
}

function FeaturedWorkModule({ data }: { data: any }) {
  const { title, kicker, items } = data || {}
  if (!items?.length) return null
  return (
    <section>
      {(kicker || title) && (
        <header className="mb-8">
          {kicker && <div className="kicker">{kicker}</div>}
          {title && <h2 className="h2 mt-2">{title}</h2>}
        </header>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p: any) => (
          <ProjectCard key={p._id} {...p} />
        ))}
      </div>
    </section>
  )
}

function CtaModule({ data }: { data: any }) {
  const { kicker, title, body, buttonLabel, buttonHref } = data || {}
  return (
    <section className="rounded-2xl p-8 md:p-12 bg-sun-500 text-white">
      {kicker && <div className="kicker text-white/80">{kicker}</div>}
      {title && <h2 className="h2 mt-2">{title}</h2>}
      {body && <p className="mt-4 max-w-2xl text-white/90">{body}</p>}
      {buttonLabel && buttonHref && (
        <a
          href={buttonHref}
          className="inline-flex mt-6 px-5 py-3 rounded-xl bg-white text-sun-700 font-medium hover:bg-white/90"
        >
          {buttonLabel}
        </a>
      )}
    </section>
  )
}
