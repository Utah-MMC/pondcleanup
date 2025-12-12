import type { Metadata } from 'next';
import Link from 'next/link';
import { diyGuides } from '@/lib/diyGuides';

export const metadata: Metadata = {
  title: 'DIY Pond Care Guides | Pond Cleanup',
  description: 'Learn how to maintain, clean, and troubleshoot your pond with practical step-by-step DIY guides from Pond Cleanup.',
};

const categoryLabels: Record<string, string> = {
  seasonal: 'Seasonal Care',
  troubleshooting: 'Troubleshooting',
  maintenance: 'Maintenance',
  setup: 'Setup & Installation',
};

export default function DiyPage() {
  const guidesByCategory = diyGuides.reduce(
    (acc, guide) => {
      if (!acc[guide.category]) acc[guide.category] = [];
      acc[guide.category].push(guide);
      return acc;
    },
    {} as Record<string, typeof diyGuides>,
  );

  return (
    <main>
      <section className="directory-hero">
        <div className="container">
          <h1>DIY Pond Care Guides</h1>
          <p>We teach you—simple, practical guides for clearer water, healthier fish, and fewer headaches.</p>
          <div style={{ marginTop: 'var(--spacing-md)' }}>
            <Link href="/book" className="btn btn-primary">Need Professional Help?</Link>
          </div>
        </div>
      </section>

      <section className="how-it-works" style={{ padding: 'var(--spacing-xl) 0' }}>
        <div className="container">
          {Object.entries(guidesByCategory).map(([category, guides]) => (
            <div key={category} style={{ marginBottom: 'var(--spacing-xl)' }}>
              <h2>{categoryLabels[category] || category}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-md)' }}>
                {guides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/diy/${guide.slug}`}
                    className="service-card"
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <h3 style={{ marginTop: 0 }}>{guide.title}</h3>
                    <p style={{ color: 'var(--color-text-light)', marginBottom: 0 }}>{guide.shortDescription}</p>
                    <span style={{ color: 'var(--color-primary)', fontWeight: 600, marginTop: 'var(--spacing-xs)', display: 'inline-block' }}>
                      Read Guide →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div style={{ marginTop: 'var(--spacing-xl)', padding: 'var(--spacing-md)', backgroundColor: 'var(--color-bg-light)', borderRadius: 'var(--border-radius-lg)' }}>
            <h2>We Teach You, or We Know a Guy</h2>
            <p style={{ color: 'var(--color-text-light)' }}>
              These guides help you handle common tasks yourself. But if you'd rather have a professional handle it, we can connect you with qualified pond contractors in your area.
            </p>
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap', marginTop: 'var(--spacing-sm)' }}>
              <Link href="/contractors" className="btn btn-primary">
                Find a Contractor
              </Link>
              <Link href="/book" className="btn btn-secondary">
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


