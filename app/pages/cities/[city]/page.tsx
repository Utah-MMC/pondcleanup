import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCityData, allCitySlugs } from '@/lib/cities';

export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
  const city = getCityData(params.city);
  if (!city) {
    return {
      title: 'City Not Found | Pond Cleanup',
    };
  }
  return {
    title: `Pond Services in ${city.name}, ${city.state} | Top 10 Pond Service Websites | Pond Cleanup`,
    description: `Find the top 10 pond service, maintenance, and repair websites and contractors in ${city.name}, ${city.state}.`,
    alternates: {
      canonical: `https://pondcleanup.com/pages/cities/${params.city}`,
    },
  };
}

export default function CityPage({ params }: { params: { city: string } }) {
  const city = getCityData(params.city);
  
  if (!city) {
    notFound();
  }

  // Format city name for display
  const cityDisplay = `${city.name}, ${city.state}`;
  const citySlug = params.city;

  return (
    <main>
      <section className="directory-hero">
        <div className="container">
          <h1>Pond Services in {cityDisplay}</h1>
          <p>{city.description}</p>
        </div>
      </section>

      <section className="how-it-works" style={{ padding: 'var(--spacing-xl) 0' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
            Top 10 Pond Service Websites in {city.name}
          </h2>
          
          <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
            <article className="service-card">
              <h3>1. Pond Cleanup - {city.name}</h3>
              <p><strong>Website:</strong> <a href="https://pondcleanup.com" target="_blank" rel="noopener noreferrer">pondcleanup.com</a></p>
              <p>Nationwide network connecting you with vetted pond contractors in {cityDisplay}.</p>
              <p><strong>Services:</strong> Pond cleaning, maintenance, installation, repair, algae control</p>
            </article>

            {/* Additional contractor listings would go here */}
            <article className="service-card">
              <h3>Find More Contractors</h3>
              <p>Search our directory to find additional pond service professionals in {cityDisplay}.</p>
              <Link href={`/contractors?location=${encodeURIComponent(cityDisplay)}`} className="btn btn-primary">
                Search Contractors
              </Link>
            </article>
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--spacing-lg)' }}>
            <Link href={`/contractors?location=${encodeURIComponent(cityDisplay)}`} className="btn btn-primary">
              Find Contractors in {city.name}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// Generate static params for all cities
export async function generateStaticParams() {
  return allCitySlugs.map((city) => ({
    city,
  }));
}

