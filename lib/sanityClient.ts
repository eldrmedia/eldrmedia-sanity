// lib/sanityClient.ts
import {createClient} from '@sanity/client'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'obf9pub6'
export const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.SANITY_API_VERSION || '2024-09-01'

// Public, read-only client (good for getStaticProps/RSC)
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // true for faster, cached reads
})

// Optional: authed client for drafts/preview (if you use it)
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // keep this in .env.local only
  perspective: 'previewDrafts',
})

export async function fetchQuery<T>(query: string, params: Record<string, any> = {}) {
  return client.fetch<T>(query, params)
}
