// components/Header.tsx
import Link from 'next/link'
import { fetchQuery } from '@/lib/sanityClient'
import HeaderNav from './HeaderNav'

type NavItem = { label: string; href: string }

export default async function Header() {
  const data = await fetchQuery<{ items?: NavItem[] }>(`
    *[_type=="navigation"][0]{ items[]{label, href} }
  `)

  const items: NavItem[] = data?.items?.length
    ? data.items
    : [
        { label: 'Home', href: '/' },
        { label: 'Work', href: '/work' },
        { label: 'Blog', href: '/blog' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ]

  return (
    <header className="sticky top-0 z-50 bg-white  border-b border-neutral-200">
      <div className="container h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold flex items-center gap-1">
          ELDR<span className="text-sun-600">•</span>MEDIA
        </Link>
        <HeaderNav items={items} />
      </div>
    </header>
  )
}
