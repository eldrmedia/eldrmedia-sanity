// lib/sanityImage.ts
import imageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'
import { client } from './sanityClient' // <-- reuse your client

const builder = imageUrlBuilder(client)
export function urlFor(source: Image) {
  return builder.image(source)
}
