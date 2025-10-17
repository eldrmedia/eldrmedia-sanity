// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { fetchQuery } from '@/lib/sanityClient'
import { postBySlugQuery } from '@/lib/queries'
import { buildMetadata, absoluteUrl } from '@/lib/seo'
import Cover from '@/components/Cover'
import Portable from '@/components/Portable'
import Image from 'next/image'
import Breadcrumbs from '@/components/Breadcrumbs'

// Optional: tune freshness for posts page
export const revalidate = 300

type RelatedPost = {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  cover?: { alt?: string; asset?: { url?: string } }
  publishedAt?: string
  readTime?: number
  tags?: string[]
}

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
  tags?: string[]
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
    tags = [],
    related = [],
  } = data

  const authorName = author?.name || '—'
  const authorImg = author?.image?.asset?.url
  const published = formatDate(publishedAt)
  const minutes = readTime ? `${readTime} min read` : undefined
  const pageUrl = absoluteUrl(`/blog/${slug?.current || params.slug}`)

  // Prefer explicit alt; fall back to title
  const coverAlt = cover?.alt || title
  const coverUrl = cover?.asset?.url

  // UI-side safety filter: only keep related posts that share >=1 tag with this post, cap to 3.
  const hasOverlap = (a: string[] = [], b: string[] = []) => {
    if (!a.length || !b.length) return false
    const set = new Set(a)
    return b.some(t => set.has(t))
  }
  const filteredRelated = related.filter(p => hasOverlap(tags, p.tags || [])).slice(0, 3)

  // Tag chip
  const TagChip = ({ label, highlight = false }: { label: string; highlight?: boolean }) => (
    <span
      className={
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ' +
        (highlight
          ? 'bg-sun-100 text-sun-800 ring-sun-200'
          : 'bg-neutral-100 text-neutral-700 ring-neutral-200')
      }
    >
      {label}
    </span>
  )

  return (
    <>
      <Breadcrumbs align="left" items={[
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: title }
      ]} />      
    
      <article className="container section">
        {/* Kicker / Category + date */}
        {(category || published) && (
          <div className="kicker text-center">
            {category}
            {published && (
              <>
                {category ? ' ' : null}
                {category ? '|' : null} <time dateTime={publishedAt}>{published}</time>
              </>
            )}
          </div>
        )}
        
        {/* Title & dek */}
        <h1 className="h1 text-center">{title}</h1>
        {excerpt && <p className="lead mt-2 text-neutral-700 text-center">{excerpt}</p>}

        {/* Current post tags */}
        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-2" aria-label="Post tags">
            {tags.map((t) => (
              <TagChip key={t} label={t} />
            ))}
          </div>
        )}

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

        {/* Related (always render the section; show empty state if no overlaps) */}
        <section className="mx-auto mt-16 w-full md:w-5/6 lg:w-4/6">
          <header className="mb-6">
            <div className="kicker text-center">Related</div>
            <h2 className="h3 text-center mt-2">You might also like</h2>
          </header>

          {filteredRelated.length > 0 ? (
            <>
              <div className="grid gap-6 sm:grid-cols-2">
                {filteredRelated.map((p) => {
                  const relTags = p.tags ?? []
                  const matchSet = new Set(tags)
                  return (
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
                        {p.excerpt && (
                          <p className="mt-2 text-sm text-neutral-600 line-clamp-2">{p.excerpt}</p>
                        )}

                        {/* Related post tags with matching highlight */}
                        {relTags.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2" aria-label="Related post tags">
                            {relTags.map((t) => (
                              <TagChip key={t} label={t} highlight={matchSet.has(t)} />
                            ))}
                          </div>
                        )}
                      </div>
                    </a>
                  )
                })}
              </div>

              {/* Legend */}
              {tags.length > 0 && (
                <p className="mt-4 text-xs text-neutral-500 text-center">
                  Tags matching this article are highlighted.
                </p>
              )}
            </>
          ) : (
            <div className="mx-auto max-w-xl card p-6 text-center">
              <p className="text-neutral-700">No posts share tags with this one yet.</p>
              <a
                href="/blog"
                className="mt-4 inline-flex items-center justify-center rounded-lg bg-sun-600 px-4 py-2 text-white hover:bg-sun-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-300"
              >
                Browse all articles
              </a>

              {/* Optional: show this article’s tags for context */}
              {tags.length > 0 && (
                <p className="mt-3 text-xs text-neutral-500">
                  This article’s tags: {tags.join(', ')}
                </p>
              )}
            </div>
          )}
        </section>

        {/* Article JSON-LD (SEO) */}
        <script
          type="application/ld+json"
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

        {/* Breadcrumb JSON-LD (SEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
                { '@type': 'ListItem', position: 2, name: 'Blog', item: absoluteUrl('/blog') },
                { '@type': 'ListItem', position: 3, name: title, item: pageUrl },
              ],
            }),
          }}
        />      

      </article>    
    </>
    
  )
}
