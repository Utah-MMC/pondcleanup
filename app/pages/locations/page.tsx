import type { Metadata } from 'next';
import Link from 'next/link';
import { allCitySlugs, getCityData } from '@/lib/cities';

export const metadata: Metadata = {
  title: 'Locations | Pond Cleanup',
  description: 'Pond Cleanup provides pond cleaning and maintenance in cities across the U.S. Find service in your area.',
  alternates: {
    canonical: 'https://pondcleanup.com/pages/locations',
  },
};

// Group cities by region
function groupCitiesByRegion() {
  const regions: Record<string, Array<{ slug: string; name: string; state: string }>> = {
    'West Coast': [],
    'Southwest & Texas': [],
    'Midwest': [],
    'Southeast': [],
    'Northeast': [],
    'Other': [],
  };

  for (const slug of allCitySlugs) {
    const city = getCityData(slug);
    if (!city) continue;

    let region = 'Other';
    if (['CA', 'WA', 'OR'].includes(city.state)) {
      region = 'West Coast';
    } else if (['TX', 'AZ', 'NV'].includes(city.state)) {
      region = 'Southwest & Texas';
    } else if (['IL', 'CO', 'MN', 'MO', 'IN', 'OH', 'MI', 'WI', 'NE', 'KS'].includes(city.state)) {
      region = 'Midwest';
    } else if (['GA', 'FL', 'NC', 'TN', 'KY', 'LA'].includes(city.state)) {
      region = 'Southeast';
    } else if (['NY', 'MA', 'PA', 'DC', 'MD', 'VA', 'NJ'].includes(city.state)) {
      region = 'Northeast';
    }

    regions[region].push({
      slug,
      name: city.name,
      state: city.state,
    });
  }

  // Sort cities within each region alphabetically
  for (const region in regions) {
    regions[region].sort((a, b) => a.name.localeCompare(b.name));
  }

  return regions;
}

export default function LocationsPage() {
  const regions = groupCitiesByRegion();

  return (
    <main>
      <section className="directory-hero">
        <div className="container">
          <h1>Service Locations</h1>
          <p>Pond Cleanup provides pond cleaning and maintenance in cities across the U.S. Enter your ZIP code to check availability.</p>
          
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
          <h2>Areas We Serve</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-md)' }}>
            {Object.entries(regions).map(([regionName, cities]) => {
              if (cities.length === 0) return null;
              return (
                <div key={regionName}>
                  <h3>{regionName}</h3>
                  <ul className="services-list">
                    {cities.map((city) => (
                      <li key={city.slug}>
                        <Link href={`/pages/cities/${city.slug}`}>
                          {city.name}, {city.state}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bottom-cta" style={{ backgroundImage: `linear-gradient(rgba(0, 102, 204, 0.9), rgba(0, 163, 163, 0.85)), url('/images/PXL_20250628_171207914.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <div className="container">
          <h2>Don&apos;t see your city?</h2>
          <p>We&apos;re expanding! Check availability or contact us to see if we can serve your area.</p>
          <Link href="/book" className="btn btn-primary">Check Availability</Link>
        </div>
      </section>
    </main>
  );
}

