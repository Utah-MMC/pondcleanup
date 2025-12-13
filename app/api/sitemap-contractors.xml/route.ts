import { NextResponse } from 'next/server';
import { contractors } from '@/lib/contractors';

export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate once per day

const BASE_URL = 'https://pondcleanup.com';

export async function GET() {
  const now = new Date().toISOString().split('T')[0];

  // Only include legitimate contractors (exclude placements)
  const contractorUrls = contractors
    .filter((c) => !c.isPlacement)
    .map(
      (contractor) => `  <url>
    <loc>${BASE_URL}${contractor.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${contractorUrls.join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  });
}

