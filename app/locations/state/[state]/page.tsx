import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCitiesForState, getStateName, getStates } from '@/lib/locationIndex';

export async function generateStaticParams() {
  return getStates().map((s) => ({ state: s.code.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: { state: string } }): Promise<Metadata> {
  const code = params.state.toUpperCase();
  const name = getStateName(code);
  return {
    title: `Pond Services in ${name} | Pond Cleanup`,
    description: `Browse pond service locations in ${name}. Find nearby cities or request service.`,
  };
}

export default function StatePage({ params }: { params: { state: string } }) {
  const code = params.state.toUpperCase();
  const cities = getCitiesForState(code);
  if (cities.length === 0) notFound();

  const stateName = getStateName(code);

  return (
    <main>
      <section className="directory-hero">
        <div className="container">
          <h1>{stateName}</h1>
          <p>Browse cities we currently cover in {stateName}.</p>
          <div style={{ marginTop: 'var(--spacing-md)', display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
            <Link className="btn btn-primary" href={`/book?location=${encodeURIComponent(stateName)}`}>Request Service</Link>
            <Link className="btn btn-secondary" href="/contractors">Search Contractors</Link>
          </div>
        </div>
      </section>

      <section className="how-it-works" style={{ padding: 'var(--spacing-xl) 0' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>Cities</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--spacing-sm)' }}>
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/locations/city/${c.slug}`}
                className="service-card"
                style={{ textDecoration: 'none' }}
              >
                <h3 style={{ marginTop: 0 }}>{c.name}</h3>
                <p style={{ color: 'var(--color-text-light)', marginBottom: 0 }}>{c.state}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}


