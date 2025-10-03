// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { fetchQuery } from '@/lib/sanityClient'
import { postBySlugQuery } from '@/lib/queries'
import { urlFor } from '@/lib/sanityImage'

type SanityImage = {
  alt?: string
  asset?: {
    _id: string
    url: string
    metadata?: { lqip?: string; dimensions?: { width: number; height: number } }
  }
}

type Post = {
  title: string
  slug: { current: string }
  excerpt?: string
  category?: string
  cover?: SanityImage
  body: any
  author?: { name?: string }
  publishedAt?: string
  readTime?: number
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const data = await fetchQuery<Post | null>(postBySlugQuery, { slug: params.slug })
  if (!data) return notFound()

  const { title, excerpt, category, body, cover } = data

  // Compose a good src for the hero
  const heroSrc =
    cover?.asset?._id
      ? urlFor(cover).width(2000).height(1125).fit('crop').auto('format').url()
      : null

  return (
    <article className="container section">
      {category && <div className="kicker">{category}</div>}
      <h1 className="h1 mt-2">{title}</h1>
      {excerpt && <p className="lead mt-2">{excerpt}</p>}

      {/* Hero image */}
      <div className="mt-6 card overflow-hidden">
        <div className="relative aspect-[16/9] bg-neutral-100">
          {heroSrc && (
            <Image
              src={heroSrc}
              alt={cover?.alt || title}
              fill
              sizes="(min-width:1024px) 1024px, 100vw"
              placeholder={cover?.asset?.metadata?.lqip ? 'blur' : 'empty'}
              blurDataURL={cover?.asset?.metadata?.lqip}
              className="object-cover"
              priority
            />
          )}
        </div>
      </div>

      {/* Body */}
      <div className="prose max-w-none mt-10">
        <PortableText value={body} />
      </div>
    </article>
  )
}
