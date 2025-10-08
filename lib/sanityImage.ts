import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type {SanityImage} from './types'
import { projectId, dataset, apiVersion } from './sanityClient'


export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

const builder = imageUrlBuilder(client)

/** Turn expanded asset {_id} into a reference {_ref} so the builder is happy */
export function normalizeImage(source: any) {
  if (source?.asset?._id && !source?.asset?._ref) {
    return {...source, asset: {_type: 'reference', _ref: source.asset._id}}
  }
  return source
}

export function urlFor(source: SanityImage | any) {
  return builder.image(normalizeImage(source))
}

/** Read LQIP no matter where you projected it */
export function getLqip(img: any) {
  return img?.metadata?.lqip ?? img?.asset?.metadata?.lqip
}
