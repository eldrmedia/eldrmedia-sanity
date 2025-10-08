export type SanityImageAssetExpanded = {
  _id: string
  url: string
  metadata?: {
    lqip?: string
    dimensions?: { width: number; height: number; aspectRatio?: number }
  }
}

export type SanityImage =
  | {
      _type?: 'image'
      alt?: string
      // expanded asset shape from GROQ: asset->
      asset?: SanityImageAssetExpanded
      // sometimes you might project metadata at top-level
      metadata?: SanityImageAssetExpanded['metadata']
    }
  | {
      _type?: 'image'
      alt?: string
      // reference shape (no asset->)
      asset?: { _type?: 'reference'; _ref: string }
      metadata?: SanityImageAssetExpanded['metadata']
    }
