// app/blog/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { fetchQuery } from '@/lib/sanityClient'
import { blogPageFeaturedQuery, postsByCategoryQuery, categoriesQuery } from '@/lib/queries'
import { BlogCard } from '@/components/Cards'
import Breadcrumbs from '@/components/Breadcrumbs'

type SearchParams = { category?: string }

type FeaturedPost = {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  category?: string
  tags?: string[]
  readTime?: number
  publishedAt?: string
  author?: { name?: string; imageUrl?: string }
  cover?: { alt?: string; asset?: { url?: string } }
}

export const revalidate = 300

export default async function BlogIndex({ searchParams }: { searchParams?: SearchParams }) {
  const activeCategory = (searchParams?.category ?? '').trim() || undefined

  // 1) Featured (picked in Studio on the "Blog" page) — SAFE GUARD
  const featuredRes = await fetchQuery<{ featured?: FeaturedPost[] } | null>(blogPageFeaturedQuery)
  const featured: FeaturedPost[] = featuredRes?.featured ?? []
  const hero = featured.length > 0 ? featured[0] : null

  // 2) Categories for filter UI — SAFE GUARD
  const categories = (await fetchQuery<string[] | null>(categoriesQuery)) ?? []

  // 3) Exclude the featured post from the grid (avoid duplicates)
  const excludeIds = hero ? [hero._id] : []

  // 4) Posts (optionally filtered by category) — ALWAYS provide params
  const posts =
    (await fetchQuery<any[] | null>(postsByCategoryQuery, {
      category: activeCategory ?? null,
      excludeIds,
    })) ?? []

  return (
    <>
      <Breadcrumbs align="left" items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />
      <div className="container section">
        <header className="mb-8">
          <div className="kicker">Insights & Ideas</div>
          <h1 className="h1 mt-2">Latest blog posts</h1>
          <p className="lead">Discover stories, tips, and resources to inspire your next big idea.</p>
        </header>

        {/* Featured hero (ALWAYS visible when one is configured) */}
        {hero && (
          <section className="mb-12">
            <Link
              href={`/blog/${hero.slug.current}`}
              className="block rounded-3xl overflow-hidden border border-neutral-200 hover:shadow-md transition"
            >
              <div className="grid md:grid-cols-2">
                {/* Media */}
                <div className="relative bg-neutral-100 aspect-[16/9] md:aspect-auto md:h-[420px]">
                  <div className="absolute left-4 top-4 z-10">
                    <span className="inline-flex items-center rounded-full bg-neutral-900 px-3 py-1 text-sm font-medium text-white shadow/50 shadow">
                      Featured
                    </span>
                  </div>

                  {hero.cover?.asset?.url ? (
                    <Image
                      src={hero.cover.asset.url}
                      alt={hero.cover.alt || hero.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center text-neutral-300">
                      <div className="h-14 w-32 rounded-md bg-current/20" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 md:p-10 flex flex-col justify-center">
                  {hero.category && (
                    <div className="mb-3">
                      <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-800 ring-1 ring-neutral-200">
                        {hero.category}
                      </span>
                    </div>
                  )}

                  <h2 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight">
                    {hero.title}
                  </h2>

                  <div className="mt-3 flex items-center gap-3 text-neutral-600">
                    {hero.author?.imageUrl && (
                      <span className="relative inline-block h-9 w-9 overflow-hidden rounded-full ring-1 ring-neutral-300">
                        <Image
                          src={hero.author.imageUrl}
                          alt={hero.author?.name || 'Author avatar'}
                          fill
                          className="object-cover"
                          sizes="36px"
                        />
                      </span>
                    )}
                    <span className="text-sm">
                      {hero.author?.name ? <strong className="text-neutral-800">{hero.author.name}</strong> : null}
                      {hero.author?.name && (hero.publishedAt || hero.readTime) ? <span aria-hidden="true"> • </span> : null}
                      {hero.publishedAt ? (
                        <time dateTime={hero.publishedAt}>
                          {new Intl.DateTimeFormat('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          }).format(new Date(hero.publishedAt))}
                        </time>
                      ) : null}
                      {hero.readTime ? <span>{` • ${hero.readTime} min read`}</span> : null}
                    </span>
                  </div>

                  {hero.excerpt && <p className="mt-4 text-lg leading-relaxed text-neutral-700">{hero.excerpt}</p>}
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Category filter */}
        {categories.length > 0 && (
          <nav aria-label="Filter by category" className="mb-10">
            <ul className="flex flex-wrap gap-2">
              <li>
                <Link
                  href="/blog"
                  className={
                    'inline-flex items-center rounded-full px-3 py-1 text-sm ring-1 ' +
                    (!activeCategory
                      ? 'bg-sun-600 text-white ring-sun-600'
                      : 'bg-neutral-50 text-neutral-700 ring-neutral-200 hover:bg-neutral-100')
                  }
                >
                  All
                </Link>
              </li>
              {categories.map((cat) => {
                const isActive = activeCategory === cat
                return (
                  <li key={cat}>
                    <Link
                      href={`/blog?category=${encodeURIComponent(cat)}`}
                      className={
                        'inline-flex items-center rounded-full px-3 py-1 text-sm ring-1 ' +
                        (isActive
                          ? 'bg-sun-600 text-white ring-sun-600'
                          : 'bg-neutral-50 text-neutral-700 ring-neutral-200 hover:bg-neutral-100')
                      }
                    >
                      {cat}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        )}

        {/* Posts grid */}
        {posts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p) => (
              <BlogCard
                key={p.slug.current}
                {...p}
                meta={`${p.author?.name || ''}${p.author?.name && p.readTime ? ' · ' : ''}${
                  p.readTime || 3
                } min`}
              />
            ))}
          </div>
        ) : (
          <div className="card p-6 text-center">
            <p className="text-neutral-700">
              {activeCategory ? `No posts in “${activeCategory}” yet.` : 'No posts available yet.'}
            </p>
            <div className="mt-4">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-lg bg-sun-600 px-4 py-2 text-white hover:bg-sun-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-300"
              >
                View all articles
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
