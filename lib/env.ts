// lib/env.ts
function req(name: string, fallback?: string) {
  const v = process.env[name] ?? fallback
  if (!v) {
    throw new Error(`Missing required env var: ${name}`)
  }
  return v
}

export const SANITY_PROJECT_ID = req('NEXT_PUBLIC_SANITY_PROJECT_ID')
export const SANITY_DATASET    = req('NEXT_PUBLIC_SANITY_DATASET', 'production')
export const SANITY_API_VERSION = req('SANITY_API_VERSION', '2024-09-01')
export const SANITY_TOKEN = process.env.SANITY_API_TOKEN // optional
