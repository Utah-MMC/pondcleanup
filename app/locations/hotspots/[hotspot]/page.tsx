import type { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { hotspot: string } }): Promise<Metadata> {
  const hotspot = params.hotspot.replace(/-/g, ' ');
  return {
    title: `Pond Service Hotspot: ${hotspot} | Pond Cleanup`,
    description: `Hotspot pages highlight high-intent areas and common pond problems. Request service near ${hotspot}.`,
  };
}

export default function HotspotPage({ params }: { params: { hotspot: string } }) {
  const hotspot = params.hotspot.replace(/-/g, ' ');
  return (
    <main>
      <section className="directory-hero">
        <div className="container">
          <h1>{hotspot}</h1>
          <p>Hotspot pages are being rolled out. If you&apos;re in this area, request a match and we&apos;ll connect you.</p>
          <div style={{ marginTop: 'var(--spacing-md)', display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
            <Link className="btn btn-primary" href={`/book?location=${encodeURIComponent(hotspot)}`}>Request Service</Link>
            <Link className="btn btn-secondary" href="/diy">DIY Guides</Link>
          </div>
        </div>
      </section>
    </main>
  );
}


