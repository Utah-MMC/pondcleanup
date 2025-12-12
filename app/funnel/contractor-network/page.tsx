import Link from 'next/link';

export const metadata = {
  title: 'Contractor Network | Pond Cleanup',
  description: 'Find vetted pond contractors near you, or tell us your location and we’ll connect you with the right pro.',
};

export default function ContractorNetworkFunnelPage() {
  return (
    <main>
      <section className="directory-hero">
        <div className="container">
          <h1>Contractor Network</h1>
          <p>We know a guy (or we&apos;ll find one). Search the network or request a match.</p>
          <div style={{ marginTop: 'var(--spacing-md)', display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
            <Link className="btn btn-primary" href="/contractors">Search Contractors</Link>
            <Link className="btn btn-secondary" href="/book">Request a Match</Link>
          </div>
        </div>
      </section>
    </main>
  );
}


