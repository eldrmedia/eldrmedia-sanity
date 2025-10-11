// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { fetchQuery } from '@/lib/sanityClient'
import { siteSettingsQuery, allSlugsQuery } from '@/lib/queries'
import { absoluteUrl } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await fetchQuery<any>(siteSettingsQuery)
  const base = settings?.siteUrl as string | undefined

  const data = await fetchQuery<{ projects: { path: string }[]; posts: { path: string }[] }>(
    allSlugsQuery
  )

  const staticPaths = ['/', '/work', '/services', '/about', '/blog']

  const allPaths = [
    ...staticPaths.map((p) => ({ url: absoluteUrl(p, base) })),
    ...(data?.projects || []).map((p) => ({ url: absoluteUrl(p.path, base) })),
    ...(data?.posts || []).map((p) => ({ url: absoluteUrl(p.path, base) })),
  ]

  const now = new Date()
  return allPaths.map((item) => ({
    url: item.url,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))
}
