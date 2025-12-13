/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Set to true if you want to disable optimization for now
  },
  // Preserve trailing slashes for SEO
  trailingSlash: false,
  // Remove output: 'standalone' - Vercel handles Next.js automatically
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap.xml',
      },
      {
        source: '/sitemap-pages.xml',
        destination: '/api/sitemap-pages.xml',
      },
      {
        source: '/sitemap-products.xml',
        destination: '/api/sitemap-products.xml',
      },
      {
        source: '/sitemap-contractors.xml',
        destination: '/api/sitemap-contractors.xml',
      },
      {
        source: '/sitemap-cities.xml',
        destination: '/api/sitemap-cities.xml',
      },
    ];
  },
}

module.exports = nextConfig

