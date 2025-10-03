// lib/sanityClient.ts
import { createClient } from '@sanity/client'  // ⬅️ use @sanity/client, not 'sanity'

export const client = createClient({
  projectId: 'obf9pub6',
  dataset: 'production',
  basePath: '/studio',
  apiVersion: '2024-09-01',
  useCdn: false,
})

export async function fetchQuery<T>(query: string, params: Record<string, any> = {}) {
  return client.fetch<T>(query, params)
}
