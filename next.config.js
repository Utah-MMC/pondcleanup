/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: false, // Enable Next.js image optimization
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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

