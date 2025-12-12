import Link from 'next/link';

export const metadata = {
  title: 'DIY Funnel | Pond Cleanup',
  description: 'Learn how to care for your pond yourself—guides, checklists, and practical fixes.',
};

export default function DiyFunnelPage() {
  return (
    <main>
      <section className="directory-hero">
        <div className="container">
          <h1>DIY</h1>
          <p>We teach you: simple, safe steps you can follow today.</p>
          <div style={{ marginTop: 'var(--spacing-md)', display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
            <Link className="btn btn-primary" href="/diy">Start DIY Guides</Link>
            <Link className="btn btn-secondary" href="/book">Still want a pro?</Link>
          </div>
        </div>
      </section>
    </main>
  );
}


