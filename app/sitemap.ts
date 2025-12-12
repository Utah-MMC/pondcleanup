import { MetadataRoute } from 'next';
import { allCitySlugs } from '@/lib/cities';
import { contractors } from '@/lib/contractors';
import { listActiveProducts } from '@/lib/productStore';

// Ensure sitemap is generated at build time and is revalidated
export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate once per day

const BASE_URL = 'https://pondcleanup.com';

// Service slugs
const serviceSlugs = [
  'pond-cleaning',
  'pond-maintenance',
  'pond-opening-closing',
  'pond-restoration',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/book`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contractors`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/diy`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/how-it-works`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/locations`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/pages/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/pages/book`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/pages/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/pages/find-a-contractor`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/pages/for-contractors`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/pages/gallery`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/pages/how-it-works`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/pages/locations`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/pages/services`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/shop`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/diy`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/diy/clarity-algae-basics`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/diy/spring-opening-checklist`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/diy/fall-closing-checklist`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Service pages
  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Service pages (pages/services)
  const pagesServicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${BASE_URL}/pages/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // City pages
  const cityPages: MetadataRoute.Sitemap = allCitySlugs.map((slug) => ({
    url: `${BASE_URL}/pages/cities/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Contractor pages
  const contractorPages: MetadataRoute.Sitemap = contractors
    .filter((c) => !c.isPlacement) // Only include legitimate contractors
    .map((contractor) => ({
      url: `${BASE_URL}${contractor.url}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  // Product pages (fetch from database)
  // Note: If database is unavailable (e.g., during build on Vercel with SQLite),
  // we'll skip product pages but still generate the rest of the sitemap
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const products = await listActiveProducts();
    if (products && products.length > 0) {
      productPages = products.map((product) => ({
        url: `${BASE_URL}/shop/${product.slug}`,
        lastModified: product.updatedAt ? product.updatedAt.toISOString().split('T')[0] : now,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));
    }
  } catch (error) {
    // Silently continue without product pages if database is unavailable
    // This ensures the sitemap still generates successfully
    // Log in development only
    if (process.env.NODE_ENV === 'development') {
      console.warn('Sitemap: Could not fetch products, continuing without product pages');
    }
  }

  // Combine all pages
  return [
    ...staticPages,
    ...servicePages,
    ...pagesServicePages,
    ...cityPages,
    ...contractorPages,
    ...productPages,
  ];
}

