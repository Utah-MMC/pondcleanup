import { MetadataRoute } from 'next';

// Ensure sitemap index is generated at build time
export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate once per day

const BASE_URL = 'https://pondcleanup.com';

export default function sitemap(): MetadataRoute.SitemapIndex {
  const now = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

  return [
    {
      url: `${BASE_URL}/sitemap-pages.xml`,
      lastModified: now,
    },
    {
      url: `${BASE_URL}/sitemap-products.xml`,
      lastModified: now,
    },
    {
      url: `${BASE_URL}/sitemap-contractors.xml`,
      lastModified: now,
    },
    {
      url: `${BASE_URL}/sitemap-cities.xml`,
      lastModified: now,
    },
  ];
}
