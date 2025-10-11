// components/InlineSvg.tsx
"use client"

import { useMemo } from "react"
import DOMPurify from "isomorphic-dompurify"

interface InlineSvgProps {
  svg: string
  className?: string
}

export default function InlineSvg({ svg, className }: InlineSvgProps) {
  const clean = useMemo(
    () => DOMPurify.sanitize(svg, { USE_PROFILES: { svg: true, svgFilters: true } }),
    [svg]
  )

  return <span className={className} dangerouslySetInnerHTML={{ __html: clean }} />
}
