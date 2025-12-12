import Link from 'next/link';

export const metadata = {
  title: 'Utah Water Gardens Field | Pond Cleanup',
  description: 'Utah field operations and partner network—service, installs, and maintenance across the Salt Lake Valley.',
};

export default function UtahWaterGardensFieldPage() {
  return (
    <main>
      <section className="directory-hero">
        <div className="container">
          <h1>Utah Water Gardens Field</h1>
          <p>Our Utah partner focus—high standards, fast response, and pond specialists.</p>
          <div style={{ marginTop: 'var(--spacing-md)', display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
            <Link className="btn btn-primary" href="/contractors/utah-water-gardens">View Utah Water Gardens</Link>
            <Link className="btn btn-secondary" href="/book?location=Salt%20Lake%20City%2C%20UT">Request Service in Utah</Link>
          </div>
        </div>
      </section>
    </main>
  );
}


