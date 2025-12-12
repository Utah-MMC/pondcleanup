import Link from 'next/link';
import { getStates } from '@/lib/locationIndex';

export const metadata = {
  title: 'Locations | Pond Cleanup',
  description: 'Browse pond service locations by state and city, or request service in your area.',
};

export default function LocationsIndexPage() {
  const states = getStates();

  return (
    <main>
      <section className="directory-hero">
        <div className="container">
          <h1>Locations</h1>
          <p>Browse by state and city. If you don’t see your area, request a match and we’ll do our best.</p>

          <form className="hero-search" action="/book" method="GET" style={{ maxWidth: '600px', margin: 'var(--spacing-md) auto 0' }}>
            <div className="form-row">
              <label htmlFor="location">Your City or ZIP</label>
              <input type="text" id="location" name="location" placeholder="e.g. Denver, CO or 80202" required />
            </div>
            <button type="submit" className="btn btn-primary btn-full">Check Availability</button>
          </form>
        </div>
      </section>

      <section className="popular-services">
        <div className="container">
          <h2>Browse by State</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--spacing-md)' }}>
            {states.map((s) => (
              <Link key={s.code} href={`/locations/state/${s.code.toLowerCase()}`} className="service-card" style={{ textDecoration: 'none' }}>
                <h3 style={{ marginTop: 0 }}>{s.name}</h3>
                <p style={{ color: 'var(--color-text-light)', marginBottom: 0 }}>{s.cityCount} cities</p>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: 'var(--spacing-lg)', textAlign: 'center' }}>
            <Link href="/contractors" className="btn btn-secondary">Search Contractor Network</Link>
          </div>
        </div>
      </section>
    </main>
  );
}


