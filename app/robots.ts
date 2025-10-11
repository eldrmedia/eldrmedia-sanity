import type { MetadataRoute } from 'next'
import { fetchQuery } from '@/lib/sanityClient'
import { siteSettingsQuery } from '@/lib/queries'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await fetchQuery<any>(siteSettingsQuery)
  const host = settings?.siteUrl
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/studio'] }],
    sitemap: host ? `${host}/sitemap.xml` : undefined,
    host: host || undefined,
  }
}
