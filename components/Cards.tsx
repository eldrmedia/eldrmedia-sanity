// components/Cards.tsx
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import type { Image as SanityImageType } from 'sanity'
import { urlFor } from '@/lib/sanityImage'

/** ---------- Sanity image typing ---------- */
type SanityImage = {
  alt?: string
  asset?: {
    _id: string
    url: string
    metadata?: { lqip?: string; dimensions?: { width: number; height: number } }
  }
} & SanityImageType

/** ---------- Shared cover renderer ---------- */
function Cover({
  image,
  alt,
  sizes,
  className,
  maxW = 1600,
  maxH = 1000,
}: {
  image?: SanityImage
  alt: string
  sizes: string
  className?: string
  /** Cap the upstream size we request from Sanity */
  maxW?: number
  maxH?: number
}) {
  if (!image?.asset?._id) {
    return <div className={clsx('bg-neutral-100', className)} />
  }

  const src = urlFor(image).width(maxW).height(maxH).fit('crop').auto('format').url()

  return (
    <div className={clsx('relative', className)}>
      <Image
        src={src}
        alt={alt || ''}
        fill
        sizes={sizes}
        placeholder={image.asset.metadata?.lqip ? 'blur' : 'empty'}
        blurDataURL={image.asset.metadata?.lqip}
        className="object-cover"
        priority={false}
      />
    </div>
  )
}

/** =========================================================
 * ProjectCard
 * - Adds `variant` to support bento (tall / wide tiles)
 * - Accepts `className` to control grid spans from parent
 * ========================================================= */
export function ProjectCard({
  title,
  slug,
  cover,
  excerpt,
  tags,
  variant = 'default',
  className,
  hrefBase = '/case-study', // change to '/work' if you prefer
}: {
  title: string
  slug: { current: string }
  cover?: SanityImage
  excerpt?: string
  tags?: string[]
  variant?: 'default' | 'tall' | 'wide'
  className?: string
  hrefBase?: string
}) {
  // Map variant → aspect + upstream image size cap
  const variantCfg = {
    default: { aspect: 'aspect-[16/10]', maxW: 1600, maxH: 1000, sizes: '(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw' },
    tall:    { aspect: 'aspect-[3/4]',    maxW: 1400, maxH: 1867, sizes: '(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw' },
    wide:    { aspect: 'aspect-[21/9]',  maxW: 2200, maxH:  900, sizes: '(min-width:1024px) 66vw, (min-width:640px) 100vw, 100vw' },
  }[variant]

  return (
    <Link href={`${hrefBase}/${slug.current}`} className={clsx('card overflow-hidden block h-full', className)}>
      <Cover
        image={cover}
        alt={cover?.alt || title}
        sizes={variantCfg.sizes}
        maxW={variantCfg.maxW}
        maxH={variantCfg.maxH}
        className={clsx(variantCfg.aspect, 'rounded-t-md')}
      />
      <div className="p-4">
        {!!tags?.length && <div className="text-xs text-neutral-500">{tags.join(' • ')}</div>}
        <h3 className="h3 mt-1">{title}</h3>
        {excerpt && <p className="text-sm text-neutral-600 mt-1 line-clamp-2">{excerpt}</p>}
      </div>
    </Link>
  )
}

/** =========================================================
 * BlogCard
 * - Same image pipeline
 * - Smaller heading style for dense grids
 * ========================================================= */
export function BlogCard({
  title,
  slug,
  cover,
  excerpt,
  category,
  meta,
  className,
}: {
  title: string
  slug: { current: string }
  cover?: SanityImage
  excerpt?: string
  category?: string
  meta?: string
  className?: string
}) {
  return (
    <Link href={`/blog/${slug.current}`} className={clsx('card overflow-hidden block h-full', className)}>
      <Cover
        image={cover}
        alt={cover?.alt || title}
        sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
        className="aspect-[16/9] rounded-t-md"
        maxW={1600}
        maxH={900}
      />
      <div className="p-4">
        {category && <div className="text-xs text-neutral-500">{category}</div>}
        <h3 className="text-md mt-1">{title}</h3>
        {excerpt && <p className="text-sm text-neutral-600 mt-1 line-clamp-2">{excerpt}</p>}
        {meta && <div className="text-xs text-neutral-500 mt-2">{meta}</div>}
      </div>
    </Link>
  )
}
