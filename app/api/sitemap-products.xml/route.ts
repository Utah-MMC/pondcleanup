import { NextResponse } from 'next/server';
import { products as fallbackProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

const BASE_URL = 'https://pondcleanup.com';

type ProductEntry = { slug: string; updatedAt?: Date | null };

async function loadProductEntries(): Promise<ProductEntry[]> {
  try {
    const { listActiveProducts } = await import('@/lib/productStore');
    const products = await listActiveProducts();
    if (products && products.length > 0) {
      return products.map((product) => ({
        slug: product.slug,
        updatedAt: product.updatedAt,
      }));
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Products sitemap: Could not fetch products, falling back to static list', error);
    }
  }

  return fallbackProducts.map((product) => ({
    slug: product.slug,
  }));
}

export async function GET() {
  const now = new Date().toISOString().split('T')[0];

  const productEntries = await loadProductEntries();

  const productUrls = productEntries.map((product) => {
    const lastmod = product.updatedAt ? product.updatedAt.toISOString().split('T')[0] : now;
    return `  <url>
    <loc>${BASE_URL}/shop/${product.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${productUrls.join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  });
}
