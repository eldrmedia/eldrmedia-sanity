import Image from 'next/image'
import clsx from 'clsx'
import {urlFor, getLqip} from '@/lib/sanityImage'

export default function Cover({
  image,
  alt,
  className,
  sizes = '(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw',
  maxW = 1600,
  maxH = 1000,
  priority = false,
}: {
  image?: any
  alt?: string
  className?: string
  sizes?: string
  maxW?: number
  maxH?: number
  priority?: boolean
}) {
  if (!image?.asset) return <div className={clsx('bg-neutral-100', className)} />

  const src = urlFor(image).width(maxW).height(maxH).fit('crop').auto('format').url()
  const blur = getLqip(image)

  return (
    <div className={clsx('relative', className)}>
      <Image
        src={src}
        alt={alt || ''}
        fill
        sizes={sizes}
        priority={priority}
        placeholder={blur ? 'blur' : 'empty'}
        blurDataURL={blur}
        className="object-cover"
      />
    </div>
  )
}
