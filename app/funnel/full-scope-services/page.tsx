import Link from 'next/link';

export const metadata = {
  title: 'Full Scope Pond Services | Pond Cleanup',
  description: 'Full-scope pond cleaning, maintenance, repair, and restoration—done right with a nationwide network and consistent standards.',
};

export default function FullScopeServicesFunnelPage() {
  return (
    <main>
      <section className="directory-hero">
        <div className="container">
          <h1>Full Scope Services</h1>
          <p>Cleaning, maintenance, opening/closing, clarity restoration, and equipment troubleshooting—one place.</p>
          <div style={{ marginTop: 'var(--spacing-md)', display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
            <Link className="btn btn-primary" href="/book">Get a Quote</Link>
            <Link className="btn btn-secondary" href="/services">Browse Services</Link>
          </div>
        </div>
      </section>
    </main>
  );
}


