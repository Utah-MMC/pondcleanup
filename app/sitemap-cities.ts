import { MetadataRoute } from 'next';
import { allCitySlugs } from '@/lib/cities';

export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate once per day

const BASE_URL = 'https://pondcleanup.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString().split('T')[0];

  // City pages
  const cityPages: MetadataRoute.Sitemap = allCitySlugs.map((slug) => ({
    url: `${BASE_URL}/pages/cities/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return cityPages;
}

