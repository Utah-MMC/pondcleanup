/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Set to true if you want to disable optimization for now
  },
  // Preserve trailing slashes for SEO
  trailingSlash: false,
  // Output static files if needed
  output: 'standalone',
}

module.exports = nextConfig

