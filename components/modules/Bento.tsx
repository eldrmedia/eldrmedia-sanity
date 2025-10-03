// components/sections/Bento.tsx
import React from 'react'
import SectionHeader from '../SectionHeader'
import { ProjectCard } from '../Cards'
import clsx from 'clsx'

/**
 * Expected data from Sanity:
 * {
 *   superTitle?: string
 *   title?: string
 *   subtitle?: string
 *   bg?: string                           // e.g. 'bg-neutral-50'
 *   pattern?: 'rightTall' | 'bottomFull'  // choose layout pattern
 *   projects: Array<{
 *     title: string
 *     slug: { current: string }
 *     cover?: any
 *     excerpt?: string
 *     tags?: string[]
 *   }>
 * }
 */
export default function Bento({ data }: { data: any }) {
  const items = Array.isArray(data?.projects) ? data.projects.slice(0, 4) : []
  const pattern: 'rightTall' | 'bottomFull' = data?.pattern || 'bottomFull'

  return (
    <section className={data?.bg || ''}>
      <div className="container section">
        <SectionHeader
          superTitle={data?.superTitle}
          title={data?.title}
          subtitle={data?.subtitle}
        />

        {pattern === 'rightTall' ? (
          // ─────────────────────────────────────────────────────────────
          // PATTERN A: RIGHT TALL
          // Row 1: [0][1]
          // Row 2: [2] and [3] spans vertically (tall) on the right
          // ─────────────────────────────────────────────────────────────
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:auto-rows-[12rem]">
            {items[0] && <ProjectCard {...items[0]} />}
            {items[1] && <ProjectCard {...items[1]} />}
            {items[2] && <ProjectCard {...items[2]} />}
            {items[3] && (
              <ProjectCard
                {...items[3]}
                variant="tall"
                className="lg:row-span-2 h-full"
              />
            )}
          </div>
        ) : (
          // ─────────────────────────────────────────────────────────────
          // PATTERN B (default): BOTTOM FULL
          // Row 1: [0][1]
          // Row 2: [2] spans both columns (full width)
          // (If you have a 4th item, it will appear as a new full row)
          // ─────────────────────────────────────────────────────────────
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* top row */}
            {items[0] && <ProjectCard {...items[0]} />}
            {items[1] && <ProjectCard {...items[1]} />}

            {/* bottom full-width featured tile */}
            {items[2] && (
              <ProjectCard
                {...items[2]}
                variant="wide"
                className="sm:col-span-2"
              />
            )}

            {/* optional extra: if 4th item exists, place it full width under */}
            {items[3] && (
              <ProjectCard
                {...items[3]}
                className="sm:col-span-2"
              />
            )}
          </div>
        )}
      </div>
    </section>
  )
}
