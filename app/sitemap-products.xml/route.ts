import { NextResponse } from 'next/server';
import { listActiveProducts } from '@/lib/productStore';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

const BASE_URL = 'https://pondcleanup.com';

export async function GET() {
  const now = new Date().toISOString().split('T')[0];

  let productUrls: string[] = [];

  try {
    const products = await listActiveProducts();
    if (products && products.length > 0) {
      productUrls = products.map((product) => {
        const lastmod = product.updatedAt ? product.updatedAt.toISOString().split('T')[0] : now;
        return `  <url>
    <loc>${BASE_URL}/shop/${product.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
      });
    }
  } catch (error) {
    // Silently continue without product pages if database is unavailable
    if (process.env.NODE_ENV === 'development') {
      console.warn('Products sitemap: Could not fetch products, returning empty sitemap');
    }
  }

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

