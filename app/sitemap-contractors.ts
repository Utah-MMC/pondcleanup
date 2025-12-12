import { MetadataRoute } from 'next';
import { contractors } from '@/lib/contractors';

export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate once per day

const BASE_URL = 'https://pondcleanup.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString().split('T')[0];

  // Contractor pages - only include legitimate contractors (exclude placements)
  const contractorPages: MetadataRoute.Sitemap = contractors
    .filter((c) => !c.isPlacement) // Only include legitimate contractors
    .map((contractor) => ({
      url: `${BASE_URL}${contractor.url}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  return contractorPages;
}

