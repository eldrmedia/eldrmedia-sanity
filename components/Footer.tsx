// components/Footer.tsx
import Link from "next/link"
import { Linkedin, Github, Instagram } from "react-bootstrap-icons"
import { getFooterSettings } from "@/lib/settings"

export default async function Footer() {
  const year = new Date().getFullYear()
  const settings = await getFooterSettings()
  const social = settings?.social || {}

  const links = [
    { href: social.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: social.github, label: "GitHub", Icon: Github },
    { href: social.instagram, label: "Instagram", Icon: Instagram },
  ].filter(l => !!l.href) as { href: string; label: string; Icon: any }[]

  return (
    <footer className="bg-neutral-900 text-neutral-400 py-12">
      <div className="container mx-auto px-4 flex flex-col items-center text-center space-y-8">
        <div className="font-heading text-2xl tracking-widest text-white">ELDR MEDIA</div>
        <hr className="w-full border-neutral-700" />

        {links.length > 0 && (
          <div className="flex gap-6">
            {links.map(({ href, label, Icon }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon size={18} />
              </Link>
            ))}
          </div>
        )}

        <p className="text-sm text-neutral-500">© {year} ELDR MEDIA</p>
      </div>
    </footer>
  )
}
