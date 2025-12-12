/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Set to true if you want to disable optimization for now
  },
  // Preserve trailing slashes for SEO
  trailingSlash: false,
  // Remove output: 'standalone' - Vercel handles Next.js automatically
}

module.exports = nextConfig

