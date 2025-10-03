// components/HeaderNav.tsx
'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import clsx from 'classnames'

type NavItem = { label: string; href: string }

function normalize(path: string) {
  // remove trailing slash except for root
  return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path
}

function isActive(pathname: string, href: string) {
  const p = normalize(pathname)
  const h = normalize(href)
  if (h === '/') return p === '/'
  return p === h || p.startsWith(h + '/')
}

export default function HeaderNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const panelRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return
      const t = e.target as Node
      if (panelRef.current && !panelRef.current.contains(t) && btnRef.current && !btnRef.current.contains(t)) {
        setOpen(false)
      }
    }
    function onEsc(e: KeyboardEvent) { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('click', onDocClick)
      document.removeEventListener('keydown', onEsc)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  return (
    <>
      {/* Desktop */}
      <nav className="hidden md:flex items-center gap-6 text-sm">
        {items.map((item) => {
          const active = isActive(pathname ?? '/', item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'text-neutral-700 hover:text-neutral-950 transition-colors',
                active && 'text-neutral-950 underline underline-offset-4 decoration-2'
              )}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Mobile button */}
      <div className="md:hidden">
        <button
          ref={btnRef}
          type="button"
          aria-label="Open menu"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-neutral-700 hover:bg-neutral-100"
        >
          <svg className={`h-6 w-6 transition-transform ${open ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown (only mounted when open) */}
      {open && (
        <div id="mobile-menu" role="dialog" aria-modal="true" className="fixed inset-x-0 top-14 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/30" />
          <div ref={panelRef} className="relative mx-4 rounded-2xl border border-neutral-200 bg-white shadow-card overflow-hidden">
            <nav className="py-2">
              {items.map((item) => {
                const active = isActive(pathname ?? '/', item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={clsx(
                      'block px-4 py-3 text-base',
                      active
                        ? 'text-neutral-950 font-medium underline underline-offset-4 decoration-2'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
