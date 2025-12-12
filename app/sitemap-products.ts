import { MetadataRoute } from 'next';
import { listActiveProducts } from '@/lib/productStore';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour (products change more frequently)

const BASE_URL = 'https://pondcleanup.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString().split('T')[0];

  // Product pages (fetch from database)
  // If database is unavailable, return empty array (sitemap will still be valid)
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
    if (process.env.NODE_ENV === 'development') {
      console.warn('Products sitemap: Could not fetch products, returning empty sitemap');
    }
  }

  return productPages;
}

