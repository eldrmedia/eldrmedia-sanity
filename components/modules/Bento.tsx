// components/sections/Bento.tsx
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

type Project = {
  title: string
  slug?: { current?: string }
  cover?: { alt?: string; asset?: { url?: string } }
  // Some pages project just a flat coverUrl string
  coverUrl?: string
  // A few other shapes we may encounter (be permissive)
  media?: { asset?: { url?: string }; url?: string; alt?: string }
  image?: { asset?: { url?: string } }
  heroUrl?: string
  excerpt?: string
  tags?: string[]
}

export default function Bento({ data }: { data: any }) {
  // Pull 4 case studies max
  const items: Project[] = Array.isArray(data?.projects) ? data.projects.slice(0, 4) : []

  // Dark default like the reference; allow override from Sanity (e.g., 'bg-white')
  const bgClass = data?.bg ?? 'bg-neutral-100'

  // Helpers
  const hrefFor = (p?: Project) => (p?.slug?.current ? `/case-study/${p.slug.current}` : '#')

  // Be liberal about where the URL might live (homeQuery uses coverUrl)
  const urlFor = (p?: Project) =>
    p?.cover?.asset?.url ||
    p?.coverUrl ||
    p?.media?.asset?.url ||
    p?.media?.url ||
    p?.image?.asset?.url ||
    p?.heroUrl ||
    ''

  const altFor = (p?: Project) => p?.cover?.alt || p?.media?.alt || p?.title || ''
  const labelFor = (p?: Project) => (Array.isArray(p?.tags) && p!.tags![0]) || 'Case Study'

  const Tile = ({
    p,
    colSpan,
    rounded,
    badgeSide,
  }: {
    p?: Project
    colSpan: string // e.g., 'lg:col-span-4'
    rounded: string // e.g., 'lg:rounded-tl-4xl'
    badgeSide?: 'left' | 'right'
  }) => {
    if (!p) return null
    const img = urlFor(p)
    const alt = altFor(p)
    const label = labelFor(p)

    return (
      <div className={clsx('flex p-px', colSpan)}>
        <Link
          href={hrefFor(p)}
          className={clsx(
            'w-full overflow-hidden rounded-xl bg-white outline outline-gray-200',
            rounded,
            'outline-link'
          )}
        >
          <div className="relative">
            {/* Badge */}
            <div className={clsx('hidden absolute z-10 top-4', badgeSide === 'right' ? 'right-4' : 'left-4')}>
              <span className="inline-flex items-center rounded-full bg-neutral-900/90 px-3 py-1 text-sm font-medium text-white shadow/50 shadow">
                {label}
              </span>
            </div>

            {/* Media */}
            {img ? (
              <div className="relative h-80 bg-neutral-700">
                <Image
                  src={img}
                  alt={alt}
                  fill
                  className="object-cover object-left"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority={false}
                />
              </div>
            ) : (
              <div className="h-80 bg-neutral-700/60 grid place-items-center text-neutral-300">
                <div className="h-14 w-32 rounded-md bg-current/20" />
              </div>
            )}
          </div>

          {/* Copy */}
          <div className="p-4 md:p-6">
            <h3 className="kicker font-body">{label}</h3>
            <p className="mt-2 mb-2 text-lg">{p.title}</p>
            {p.excerpt && <p className="mt-2 mb-0 text-sm leading-6 text-neutral-400">{p.excerpt}</p>}
          </div>
        </Link>
      </div>
    )
  }

  return (
    <section className={bgClass}>
      <div className="mx-auto max-w-2xl px-6 py-16 sm:py-20 lg:max-w-5xl lg:px-8">
        {/* Header */}
        <div className="text-center">
          {data?.superTitle && <div className="text-sm text-sun-900">{data.superTitle}</div>}
          {data?.title && (
            <h2 className="h2 mt-0">
              {data.title}
            </h2>
          )}
          {data?.subtitle && <p className="mt-3">{data.subtitle}</p>}
        </div>

        {/* Bento grid (4/2/2/4 like the template) */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          {/* 1: lg:col-span-4 */}
          <Tile p={items[0]} colSpan="lg:col-span-3" rounded="max-lg:rounded-t-4xl lg:rounded-tl-4xl" badgeSide="left" />
          {/* 2: lg:col-span-2 */}
          <Tile p={items[1]} colSpan="lg:col-span-3" rounded="lg:rounded-tr-4xl" badgeSide="left" />
          {/* 3: lg:col-span-2 */}
          <Tile p={items[2]} colSpan="lg:col-span-6" rounded="lg:rounded-bl-4xl" badgeSide="left" />
        </div>
      </div>
    </section>
  )
}
