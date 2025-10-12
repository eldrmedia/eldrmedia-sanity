// app/providers/LenisProvider.tsx
'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Keep options that exist in your Lenis version
    const lenis = new Lenis({
      duration: 1.2,        // smoothing duration
      smoothWheel: true,     // enable wheel smoothing
      // You can also try: gestureDirection: 'both', wheelMultiplier: 1, touchMultiplier: 1
    })

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
