// lib/settings.ts
import { fetchQuery } from '@/lib/sanityClient'
import { footerSettingsQuery } from './queries'

export type SocialSettings = {
  social?: {
    linkedin?: string | null
    github?: string | null
    instagram?: string | null
  }
}

export async function getFooterSettings(): Promise<SocialSettings> {
  return fetchQuery<SocialSettings>(footerSettingsQuery)
}
