import Image from 'next/image'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import clsx from 'clsx'

type AboutSplitData = {
  kicker?: string
  title?: string
  body?: any
  invertOnDesktop?: boolean
  bg?: string
  image?: { alt?: string; asset?: { url?: string } }
  bodyHeadingClasses?: { h1?: string; h2?: string; h3?: string; p?: string }
}

export default function AboutSplit({ data }: { data: AboutSplitData }) {
  const { kicker, title, body, image, invertOnDesktop, bg, bodyHeadingClasses } = data || {}
  const invertClass = invertOnDesktop ? 'md:[&>div:first-child]:order-2' : ''

  const components: PortableTextComponents = {
    block: {
      h1: ({ children }) => (
        <h1 className={clsx('h1', bodyHeadingClasses?.h1)}>
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className={clsx('h2', bodyHeadingClasses?.h2)}>
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className={clsx('h3', bodyHeadingClasses?.h3)}>
          {children}
        </h3>
      ),
      normal: ({ children }) => (
        <p className={clsx('leading-7', bodyHeadingClasses?.p)}>{children}</p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 pl-4 italic text-neutral-700">{children}</blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => <ul className="list-disc pl-6 space-y-2">{children}</ul>,
      number: ({ children }) => <ol className="list-decimal pl-6 space-y-2">{children}</ol>,
    },
  }

  return (
    <section className="section" style={bg ? { background: bg } : {}}>
      <div className="container">
        <div className={clsx('grid gap-8 md:grid-cols-5', invertClass)}>
          {/* Left: text */}
          <div className="md:col-span-3">
            {kicker && <div className="kicker">{kicker}</div>}
            {title && <h2 className="h2 mt-2">{title}</h2>}
            {body && (
              <div className="prose max-w-none mt-4">
                <PortableText value={body} components={components} />
              </div>
            )}
          </div>

          {/* Right: image */}
          <div className="md:col-span-2">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100">
              {image?.asset?.url && (
                <Image
                  src={image.asset.url}
                  alt={image.alt || ''}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 35vw, 100vw"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
