// components/Portable.tsx
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import clsx from 'clsx'

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1
        className={clsx(
          'h1'
        )}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        className={clsx(
          'h2'
        )}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className={clsx(
          'h3'
        )}
      >
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p
        className={clsx(
          ''
        )}
      >
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className={clsx(
          'border-l-4 border-neutral-300 pl-5 italic text-neutral-700',
          'text-base sm:text-lg leading-relaxed',
          'mt-6 mb-8'
        )}
      >
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul
        className={clsx(
          'list-disc pl-6 space-y-2',
          'text-base sm:text-lg leading-relaxed text-neutral-800',
          'mt-4 mb-6'
        )}
      >
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol
        className={clsx(
          'list-decimal pl-6 space-y-2',
          'text-base sm:text-lg leading-relaxed text-neutral-800',
          'mt-4 mb-6'
        )}
      >
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-neutral-900">{children}</strong>,
    em: ({ children }) => <em className="italic text-neutral-700">{children}</em>,
    code: ({ children }) => (
      <code className="px-1 py-0.5 rounded bg-neutral-100 text-neutral-900 text-sm">{children}</code>
    ),
    link: ({ children, value }) => {
      const href = (value?.href as string) || '#'
      const isExternal = /^https?:\/\//.test(href)
      return (
        <a
          href={href}
          className="underline decoration-neutral-400 hover:decoration-current hover:text-neutral-900 transition-colors"
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      )
    },
  },
}

export default function Portable({ value, className }: { value: any; className?: string }) {
  return (
    <div className={clsx('prose max-w-none', className)}>
      <PortableText value={value} components={components} />
    </div>
  )
}
