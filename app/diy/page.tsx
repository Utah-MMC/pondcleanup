import Link from 'next/link';

export const metadata = {
  title: 'DIY Pond Care Guides | Pond Cleanup',
  description: 'Learn how to maintain, clean, and troubleshoot your pond with practical step-by-step DIY guides from Pond Cleanup.',
};

export default function DiyPage() {
  return (
    <main>
      <section className="directory-hero">
        <div className="container">
          <h1>DIY Pond Care</h1>
          <p>We teach you—simple, practical guides for clearer water, healthier fish, and fewer headaches.</p>
        </div>
      </section>

      <section className="how-it-works" style={{ padding: 'var(--spacing-xl) 0' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
            <article className="service-card">
              <h2 style={{ marginTop: 0 }}>Start here</h2>
              <p>
                If you can&apos;t find a contractor in your area, or you&apos;re hands-on, these guides will help you diagnose and fix common
                pond issues.
              </p>
              <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
                <Link href="/book" className="btn btn-primary">Get Advice / Quote</Link>
                <Link href="/contractors" className="btn btn-secondary">Search Contractors</Link>
              </div>
            </article>

            <Link href="/diy/clarity-algae-basics" className="service-card" style={{ textDecoration: 'none', display: 'block' }}>
              <h3>Clarity & algae basics</h3>
              <p>Understand why water turns green, how filtration works, and what to change first.</p>
              <span className="service-link" style={{ display: 'inline-block', marginTop: 'var(--spacing-xs)' }}>Read guide →</span>
            </Link>

            <Link href="/diy/spring-opening-checklist" className="service-card" style={{ textDecoration: 'none', display: 'block' }}>
              <h3>Spring opening checklist</h3>
              <p>Step-by-step tasks to restart pumps, clean filters, and prep for warmer water.</p>
              <span className="service-link" style={{ display: 'inline-block', marginTop: 'var(--spacing-xs)' }}>Read guide →</span>
            </Link>

            <Link href="/diy/fall-closing-checklist" className="service-card" style={{ textDecoration: 'none', display: 'block' }}>
              <h3>Fall closing checklist</h3>
              <p>Protect equipment, reduce debris load, and set your pond up for a smooth winter.</p>
              <span className="service-link" style={{ display: 'inline-block', marginTop: 'var(--spacing-xs)' }}>Read guide →</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}


