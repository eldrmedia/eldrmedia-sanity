export const siteSettingsQuery = `
*[_type == "siteSettings"][0]{
  siteUrl,
  defaultSeo{
    title,
    description,
    ogImage{asset->{url}},
    canonical,
    noindex
  },
  navigation->{
    title,
    items[]{
      label,
      href,
      children[]{label, href}
    }
  }
}
`

export const homeQuery = `*[_type == "home"][0]{
  title,
  modules[]{
    _type,
    _key,
    ...,
    media{..., "url": asset->url},
    posts[]->{title, slug, excerpt, "coverUrl": cover.asset->url, category, author->{name, "imageUrl": image.asset->url}, publishedAt, readTime},
    projects[]->{title, slug, excerpt, "coverUrl": cover.asset->url, tags},
    testimonial{quote, person, role, rating},
    phases[],
    before{"url": asset->url},
    after{"url": asset->url},
    milestones[],
    features[],
    kpis[],
    quarters[],
    action
  }
}`


// For About Page
export const aboutQuery = `*[_type=="about"][0]{
  title,
  modules[]{
    ...,
    // hero fields
    media{..., asset->},
    _type == "aboutSplitModule" => {
      _type, kicker, title, body, invertOnDesktop, bg,
      image{ ..., asset-> { url, metadata{ dimensions } }, alt }
    },    
    // body content
    subtitle,
    // capabilities reuse
    features[],
    // values block
    values[],
    bg,
    // testimonial / cta reuse
    testimonial,
    action
  }
}`


// For projects
export const workQuery = `
*[_type=="project"] | order(_createdAt desc){
  _id, title, slug, excerpt, tags,
  cover{
    ...,
    asset->{
      _id,
      url,
      metadata{ lqip, dimensions{ width, height } }
    },
    alt
  }
}
`
// For Works Page
export const workPageQuery = /* groq */ `
{
  // 1) page modules (hero, featured, cta) from a "page" singleton with slug "work"
  "page": *[_type == "page" && slug.current == "work"][0]{
    modules[]{
      ...,
      // Hero fields you actually render
      _type == "heroModule" => {
        _type,
        superTitle,
        title,
        subtitle,
        media
      },

      // Featured Work module – assume it stores references to projects in "items"
      _type == "featuredWorkModule" => {
        _type,
        title,
        kicker,
        items[]->{
          _id, title, slug, excerpt, tags,
          cover{
            ...,
            asset->{
              _id,
              url,
              metadata{ lqip, dimensions{ width, height } }
            },
            alt
          }
        }
      },

      // CTA module
      _type == "ctaModule" => {
        _type,
        kicker,
        title,
        body,
        action,
        buttonLabel,
        buttonHref
      }
    }
  },

  // 2) all projects for the main grid
  "projects": *[_type=="project"] | order(_createdAt desc){
    _id, title, slug, excerpt, tags,
    cover{
      ...,
      asset->{
        _id,
        url,
        metadata{ lqip, dimensions{ width, height } }
      },
      alt
    }
  }
}
`

// For Case Studies
export const projectBySlugQuery = `*[_type=="project" && slug.current==$slug][0]{
  _id, title, slug, brandTheme, snapshot[], challenge,
  "heroUrl": heroMedia.asset->url,
  modules[]{
    ...,
    media{..., "url": asset->url},
    phases[],
    before{"url": asset->url},
    after{"url": asset->url},
    milestones[],
    features[],
    kpis[],
    quarters[],
    action
  },
  impact[],
  governance[],
  testimonial
}`

// For Listing Blog Posts
export const postsQuery = `
*[_type in ["post","blogPost"] && defined(slug.current)] 
| order(coalesce(publishedAt, _createdAt) desc) {
  _id,
  title,
  slug,
  excerpt,
  "coverUrl": coalesce(cover.asset->url, mainImage.asset->url, image.asset->url),
  category,
  author->{ name, "imageUrl": image.asset->url },
  publishedAt,
  readTime,
    cover{
    ...,
    asset->{
      _id,
      url,
      metadata{ lqip, dimensions{ width, height } }
    },
    alt
  }
}
`
// For Single Blog Posts
export const postBySlugQuery = `
*[_type in ["post","blogPost"] && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  category,
  author->{ name, "imageUrl": image.asset->url },
  publishedAt,
  readTime,
  body,
  cover{
    ...,
    asset->{
      _id,
      url,
      metadata{ lqip, dimensions{ width, height } }
    },
    alt
  }
}
`

// Return URL paths for dynamic routes used in the sitemap
export const allSlugsQuery = `
{
  "projects": *[_type == "project" && defined(slug.current)]{
    "path": "/case-study/" + slug.current
  },
  "posts": *[_type == "post" && defined(slug.current)]{
    "path": "/blog/" + slug.current
  }
}
`