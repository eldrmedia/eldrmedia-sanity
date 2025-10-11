
import type { Metadata } from 'next'
import { siteSettingsQuery } from '@/lib/queries'
import { fetchQuery } from '@/lib/sanityClient'

type SeoLike = {
  seo?: {
    title?: string
    description?: string
    ogImage?: { asset?: { url?: string }; alt?: string }
    canonical?: string
    noindex?: boolean
  }
  title?: string
  excerpt?: string
  cover?: { asset?: { url?: string }; alt?: string }
  slug?: { current?: string }
}

export async function getSiteDefaults() {
  const settings = await fetchQuery<any>(siteSettingsQuery)
  const siteUrl: string | undefined = settings?.siteUrl
  const defaultSeo = settings?.defaultSeo || {}
  return { siteUrl, defaultSeo }
}

export function absoluteUrl(path: string, siteUrl?: string) {
  if (!siteUrl) return path
  try {
    return new URL(path, siteUrl).toString()
  } catch {
    return path
  }
}

export function imageUrlFrom(doc?: any) {
  return doc?.asset?.url || undefined
}

/** Merge a doc's SEO with site defaults into Next.js Metadata */
export async function buildMetadata(doc: SeoLike, opts?: { path?: string }): Promise<Metadata> {
  const { siteUrl, defaultSeo } = await getSiteDefaults()
  const seo = doc?.seo || {}

  const title =
    seo.title ||
    doc?.title ||
    defaultSeo?.title ||
    'ELDR MEDIA'
  const description =
    seo.description ||
    doc?.excerpt ||
    defaultSeo?.description ||
    'Design systems & strategy'

  const ogImage =
    imageUrlFrom(seo.ogImage) ||
    imageUrlFrom((doc as any)?.cover) ||
    imageUrlFrom(defaultSeo?.ogImage)

  const canonical = seo.canonical || (opts?.path ? absoluteUrl(opts.path, siteUrl) : undefined)
  const robots = seo.noindex ? { index: false, follow: false } : undefined

  const meta: Metadata = {
    title,
    description,
    alternates: { canonical },
    robots,
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article', // or 'website' for static pages
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    // Optional: base for relative URLs
    metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  }

  return meta
}
