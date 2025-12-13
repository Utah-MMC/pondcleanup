import { NextResponse } from 'next/server';

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

function generatePagesSitemap(): string {
  const now = new Date().toISOString().split('T')[0];

  const urls = [
    // Homepage
    { url: BASE_URL, priority: '1.0', changefreq: 'weekly' },
    // Main navigation pages
    { url: `${BASE_URL}/about`, priority: '0.8', changefreq: 'monthly' },
    { url: `${BASE_URL}/book`, priority: '0.9', changefreq: 'weekly' },
    { url: `${BASE_URL}/contact`, priority: '0.7', changefreq: 'monthly' },
    { url: `${BASE_URL}/contractors`, priority: '0.9', changefreq: 'weekly' },
    { url: `${BASE_URL}/diy`, priority: '0.7', changefreq: 'monthly' },
    { url: `${BASE_URL}/faq`, priority: '0.6', changefreq: 'monthly' },
    { url: `${BASE_URL}/gallery`, priority: '0.8', changefreq: 'weekly' },
    { url: `${BASE_URL}/how-it-works`, priority: '0.7', changefreq: 'monthly' },
    { url: `${BASE_URL}/locations`, priority: '0.9', changefreq: 'weekly' },
    { url: `${BASE_URL}/services`, priority: '0.9', changefreq: 'monthly' },
    { url: `${BASE_URL}/shop`, priority: '0.8', changefreq: 'weekly' },
    // Legacy /pages routes
    { url: `${BASE_URL}/pages/about`, priority: '0.6', changefreq: 'monthly' },
    { url: `${BASE_URL}/pages/book`, priority: '0.9', changefreq: 'weekly' },
    { url: `${BASE_URL}/pages/contact`, priority: '0.6', changefreq: 'monthly' },
    { url: `${BASE_URL}/pages/find-a-contractor`, priority: '0.9', changefreq: 'weekly' },
    { url: `${BASE_URL}/pages/for-contractors`, priority: '0.7', changefreq: 'monthly' },
    { url: `${BASE_URL}/pages/gallery`, priority: '0.8', changefreq: 'weekly' },
    { url: `${BASE_URL}/pages/how-it-works`, priority: '0.7', changefreq: 'monthly' },
    { url: `${BASE_URL}/pages/locations`, priority: '0.9', changefreq: 'weekly' },
    { url: `${BASE_URL}/pages/services`, priority: '0.9', changefreq: 'monthly' },
    // Service pages
    ...serviceSlugs.map((slug) => ({
      url: `${BASE_URL}/services/${slug}`,
      priority: '0.8',
      changefreq: 'monthly',
    })),
    // Service pages (legacy)
    ...serviceSlugs.map((slug) => ({
      url: `${BASE_URL}/pages/services/${slug}`,
      priority: '0.8',
      changefreq: 'monthly',
    })),
    // DIY guides
    { url: `${BASE_URL}/diy/clarity-algae-basics`, priority: '0.6', changefreq: 'monthly' },
    { url: `${BASE_URL}/diy/spring-opening-checklist`, priority: '0.6', changefreq: 'monthly' },
    { url: `${BASE_URL}/diy/fall-closing-checklist`, priority: '0.6', changefreq: 'monthly' },
  ];

  const urlEntries = urls
    .map(
      (item) => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

export async function GET() {
  try {
    const sitemap = generatePagesSitemap();

    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error('Error generating pages sitemap:', error);
    // Return empty but valid sitemap on error
    const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
    return new NextResponse(emptySitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    });
  }
}

