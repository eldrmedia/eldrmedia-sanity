'use client'

import { useMemo } from 'react'
import DOMPurify from 'dompurify'

export default function InlineSvg({
  svg,
  className,
}: {
  svg: string
  className?: string
}) {
  // Sanitize only in the browser
  const clean = useMemo(() => {
    // DOMPurify in the browser auto-detects window/document
    return DOMPurify.sanitize(svg, { USE_PROFILES: { svg: true, svgFilters: true } })
  }, [svg])

  return <span className={className} dangerouslySetInnerHTML={{ __html: clean }} />
}
