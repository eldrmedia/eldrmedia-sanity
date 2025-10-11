// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { fetchQuery } from '@/lib/sanityClient'
import { postBySlugQuery } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'
import Cover from '@/components/Cover'

type Post = {
  title: string
  slug: { current: string }
  excerpt?: string
  category?: string
  cover?: any
  body: any
  author?: { name?: string }
  publishedAt?: string
  readTime?: number
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await fetchQuery<any>(postBySlugQuery, { slug: params.slug })
  return buildMetadata(post, { path: `/blog/${params.slug}` })
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const data = await fetchQuery<Post | null>(postBySlugQuery, { slug: params.slug })
  if (!data) return notFound()

  const { title, excerpt, category, body, cover } = data

  return (
    <article className="container section">
      {category && <div className="kicker">{category}</div>}
      <h1 className="h1 mt-2">{title}</h1>
      {excerpt && <p className="lead mt-2">{excerpt}</p>}

      {/* Hero image */}
      {cover?.asset && (
        <div className="mt-6 card overflow-hidden">
          <Cover
            image={cover}
            alt={cover?.alt || title}
            className="aspect-[16/9]"
            maxW={2000}
            maxH={1125}
            priority
          />
        </div>
      )}

      {/* Body */}
      <div className="w-1/2 mx-auto mt-10">
        <PortableText value={body} />
      </div>
    </article>
  )
}
