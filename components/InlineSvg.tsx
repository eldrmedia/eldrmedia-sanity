// components/InlineSvg.tsx
"use client"

import { useEffect, useState } from "react"

interface InlineSvgProps {
  svg: string
  className?: string
}

export default function InlineSvg({ svg, className }: InlineSvgProps) {
  const [clean, setClean] = useState<string>("")

  useEffect(() => {
    let mounted = true
    ;(async () => {
      // Dynamically load only in the browser
      const mod = await import("isomorphic-dompurify") // or "dompurify"
      const DOMPurify = mod.default || (mod as any)
      const sanitized = DOMPurify.sanitize(svg, { USE_PROFILES: { svg: true, svgFilters: true } })
      if (mounted) setClean(sanitized)
    })()
    return () => {
      mounted = false
    }
  }, [svg])

  // Server render: empty span; it fills right after hydration
  return <span className={className} dangerouslySetInnerHTML={{ __html: clean }} />
}
