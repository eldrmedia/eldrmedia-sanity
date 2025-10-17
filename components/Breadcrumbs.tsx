// components/Breadcrumbs.tsx
'use client'

import Link from 'next/link'
import clsx from 'clsx'
import { absoluteUrl } from '@/lib/seo'
import { useMemo } from 'react'

type Crumb = { label: string; href?: string }
type Props = {
  items: Crumb[]                 // e.g., [{label:'Home', href:'/'}, {label:'Blog', href:'/blog'}, {label:title}]
  align?: 'left' | 'center'      // default center
  className?: string
  jsonLd?: boolean               // emit BreadcrumbList JSON-LD (default true)
}

export default function Breadcrumbs({ items, align = 'center', className, jsonLd = true }: Props) {
  const lastIndex = items.length - 1

  const json = useMemo(() => {
    if (!jsonLd) return null
    const itemListElement = items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: absoluteUrl(c.href) } : {}),
    }))
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement,
    }
  }, [items, jsonLd])

  return (
    <>
        <div className="container py-2">
            <nav aria-label="Breadcrumb" className={clsx('mb-4', className)}>
            <ol
                className={clsx(
                'flex flex-wrap items-center gap-2 text-sm text-neutral-500',
                align === 'center' ? 'justify-center' : 'justify-start'
                )}
            >
                {items.map((c, i) => {
                const isLast = i === lastIndex
                return (
                    <li key={i} className="inline-flex items-center gap-2">
                    {c.href && !isLast ? (
                        <Link href={c.href} className="hover:underline">
                        {c.label}
                        </Link>
                    ) : (
                        <span className={clsx(isLast && 'text-neutral-900')} aria-current={isLast ? 'page' : undefined}>
                        {c.label}
                        </span>
                    )}
                    {!isLast && <span aria-hidden="true">›</span>}
                    </li>
                )
                })}
            </ol>
            </nav>
        </div>
      {json && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
      )}
    </>
  )
}
