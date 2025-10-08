/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: false,
  },
  // Make sure Next transpiles ESM packages shipped by Sanity plugins
  transpilePackages: [
    'sanity',
    'next-sanity',
    '@sanity/ui',
    '@sanity/color-input',
    '@sanity/vision',
    'styled-components',
  ],  
  images: {
    // Allow Sanity (and any other remotes you need) for <Image src="...">
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      // add others only if you actually use them, e.g.:
      // { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    formats: ['image/avif', 'image/webp'], // smaller, modern formats
    minimumCacheTTL: 60, // seconds (tweak to your liking)
  },
}

export default nextConfig
