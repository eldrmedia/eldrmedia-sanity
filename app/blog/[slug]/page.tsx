// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { fetchQuery } from '@/lib/sanityClient'
import { postBySlugQuery } from '@/lib/queries'
import { buildMetadata, absoluteUrl } from '@/lib/seo'
import Cover from '@/components/Cover'
import Portable from '@/components/Portable'
import Image from 'next/image'

// Optional: tune freshness for posts page
export const revalidate = 300

type Post = {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  category?: string
  cover?: { alt?: string; asset?: { url?: string } }
  body: any
  author?: { name?: string; image?: { asset?: { url?: string } } }
  publishedAt?: string
  readTime?: number
  related?: RelatedPost[]
}

function formatDate(iso?: string) {
  if (!iso) return ''
  try {
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(
      new Date(iso)
    )
  } catch {
    return ''
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await fetchQuery<Post | null>(postBySlugQuery, { slug: params.slug })
  if (!post) return {}
  return buildMetadata(post, { path: `/blog/${params.slug}` })
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const data = await fetchQuery<Post | null>(postBySlugQuery, { slug: params.slug })
  if (!data) return notFound()

  const {
    title,
    excerpt,
    category,
    body,
    cover,
    author,
    publishedAt,
    readTime,
    slug,
  } = data

  const authorName = author?.name || '—'
  const authorImg = author?.image?.asset?.url
  const published = formatDate(publishedAt)
  const minutes = readTime ? `${readTime} min read` : undefined
  const pageUrl = absoluteUrl(`/blog/${slug?.current || params.slug}`)

  // Prefer explicit alt; fall back to title
  const coverAlt = cover?.alt || title
  const coverUrl = cover?.asset?.url

  return (
    <article className="container section">
      {/* Kicker / Category + date */}
      {category && (
        <div className="kicker text-center">
          {category}
          {published && (
            <>
              {' '}
              | <time dateTime={publishedAt}>{published}</time>
            </>
          )}
        </div>
      )}
      
      {/* Title & dek */}
      <h1 className="h1 text-center">{title}</h1>
      {excerpt && <p className="lead mt-2 text-neutral-700">{excerpt}</p>}

      {/* Byline — centered */}
      <div className="mt-6 flex items-center justify-center gap-3 text-sm text-neutral-600">
        {authorImg && (
          <span className="relative inline-block h-9 w-9 overflow-hidden rounded-full ring-1 ring-neutral-300">
            <Image src={authorImg} alt={authorName} fill className="object-cover" sizes="48px" />
          </span>
        )}
        <div className="flex items-center gap-2">
          {authorName && <span className="font-medium text-neutral-800">{authorName}</span>}
          {minutes && (
            <>
              <span aria-hidden="true">•</span>
              <span>{minutes}</span>
            </>
          )}
        </div>
      </div>

      {/* Cover image */}
      {coverUrl && (
        <div className="mt-8 card overflow-hidden">
          <Cover
            image={cover}
            alt={coverAlt}
            className="aspect-[16/9]"
            maxW={2000}
            maxH={1125}
            priority
          />
        </div>
      )}

      {/* Body */}
      <div className="mx-auto mt-10 w-full md:w-5/6 lg:w-4/6">
        {body && <Portable value={body} className="text-neutral-900" />}
      </div>



      {/* Article JSON-LD (SEO) */}
      <script
        type="application/ld+json"
        // Keep this minimal but useful; expand if you track more fields.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: title,
            description: excerpt,
            author: authorName ? [{ '@type': 'Person', name: authorName }] : undefined,
            datePublished: publishedAt,
            mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
            image: coverUrl ? [coverUrl] : undefined,
          }),
        }}
      />

{data.related && data.related.length > 0 && (
  <section className="mx-auto mt-16 w-full md:w-5/6 lg:w-4/6">
    <header className="mb-6">
      <div className="kicker text-center">Related</div>
      <h2 className="h3 text-center mt-2">You might also like</h2>
    </header>

    <div className="grid gap-6 sm:grid-cols-2">
      {data.related.map((p) => (
        <a
          key={p._id}
          href={`/blog/${p.slug.current}`}
          className="group rounded-xl border border-neutral-200 overflow-hidden hover:shadow-sm transition"
        >
          {p.cover?.asset?.url && (
            <div className="relative aspect-[16/9] bg-neutral-100">
              <Image
                src={p.cover.asset.url}
                alt={p.cover.alt || p.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          )}
          <div className="p-4">
            <div className="text-sm text-neutral-500">
              {p.readTime ? `${p.readTime} min read` : ''}
            </div>
            <div className="mt-1 font-medium group-hover:underline">{p.title}</div>
            {p.excerpt && <p className="mt-2 text-sm text-neutral-600 line-clamp-2">{p.excerpt}</p>}
          </div>
        </a>
      ))}
    </div>
  </section>
)}
      
    </article>    
  )
}
