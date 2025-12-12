import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDIYGuideBySlug, diyGuides } from '@/lib/diyGuides';
import { sanitizeHtmlForDisplay } from '@/lib/safeHtml';

export async function generateStaticParams() {
  return diyGuides.map((guide) => ({ guide: guide.slug }));
}

export async function generateMetadata({ params }: { params: { guide: string } }): Promise<Metadata> {
  const guide = getDIYGuideBySlug(params.guide);
  if (!guide) return { title: 'Guide Not Found | DIY Pond Care' };
  return {
    title: `${guide.title} | DIY Pond Care | Pond Cleanup`,
    description: guide.shortDescription,
  };
}

export default function DIYGuidePage({ params }: { params: { guide: string } }) {
  const guide = getDIYGuideBySlug(params.guide);
  if (!guide) notFound();

  const htmlContent = sanitizeHtmlForDisplay(guide.content);

  return (
    <main>
      <section className="directory-hero">
        <div className="container">
          <h1>{guide.title}</h1>
          <p>{guide.shortDescription}</p>
          <div style={{ marginTop: 'var(--spacing-md)' }}>
            <Link href="/diy" className="btn btn-secondary">Back to DIY Guides</Link>
          </div>
        </div>
      </section>

      <section className="how-it-works" style={{ padding: 'var(--spacing-xl) 0' }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div
            className="product-details-html"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            style={{
              lineHeight: 1.8,
              color: 'var(--color-text)',
            }}
          />

          <div style={{ marginTop: 'var(--spacing-xl)', padding: 'var(--spacing-md)', backgroundColor: 'var(--color-bg-light)', borderRadius: 'var(--border-radius-lg)' }}>
            <h2>Need Professional Help?</h2>
            <p style={{ color: 'var(--color-text-light)' }}>
              If you're stuck or prefer to have an expert handle it, we can connect you with a qualified pond contractor in your area.
            </p>
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap', marginTop: 'var(--spacing-sm)' }}>
              <Link href="/contractors" className="btn btn-primary">
                Find a Contractor
              </Link>
              <Link href="/book" className="btn btn-secondary">
                Get Professional Help
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

