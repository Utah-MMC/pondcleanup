'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { filterContractors, getStarRating, type Contractor } from '@/lib/contractors';
import LeadForm from '@/components/LeadForm';

export default function ContractorSearch() {
  const searchParams = useSearchParams();
  const [location, setLocation] = useState(searchParams?.get('location') || '');
  const [service, setService] = useState(searchParams?.get('service') || '');
  const [filtered, setFiltered] = useState<Contractor[]>([]);

  useEffect(() => {
    // filterContractors already excludes placement contractors, sorts properly, and limits to top 10
    const results = filterContractors(location, service, 10);
    setFiltered(results);
  }, [location, service]);

  return (
    <>
      <header className="results-header">
        <h2>
          Contractors near <span className="results-location">{location || 'your area'}</span>
        </h2>
        <p>Showing <strong>{filtered.length}</strong> results</p>
      </header>

      <div className="results-list">
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
            <h3>No contractors found in our network (yet)</h3>
            <p style={{ color: 'var(--color-text-light)' }}>
              Two options: we can teach you the basics, or you can tell us what you need and we&apos;ll try to connect you with the right pro.
            </p>

            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', justifyContent: 'center', flexWrap: 'wrap', marginTop: 'var(--spacing-md)' }}>
              <Link href="/diy" className="btn btn-secondary">DIY Guides</Link>
              <Link href={`/book?location=${encodeURIComponent(location || '')}`} className="btn btn-primary">Request a Match</Link>
            </div>

            <div style={{ maxWidth: 700, margin: 'var(--spacing-lg) auto 0', textAlign: 'left' }}>
              <LeadForm />
            </div>
          </div>
        ) : (
          filtered.map((contractor) => (
            <article key={contractor.id} className="contractor-card">
              <div className="card-main">
                <h3><Link href={contractor.url}>{contractor.name}</Link></h3>
                <p className="card-location">{contractor.location} • {contractor.distance}</p>
                <p className="card-rating">
                  {getStarRating(contractor.rating)} {contractor.rating} ({contractor.reviews} reviews)
                </p>
                <p className="card-description">{contractor.description}</p>
                <p className="card-services">{contractor.services.join(' • ')}</p>
                {contractor.website && (
                  <p className="card-website">
                    <a href={contractor.website} target="_blank" rel="noopener noreferrer">
                      {contractor.website}
                    </a>
                  </p>
                )}
              </div>
              <div className="card-actions">
                <Link href={contractor.url} className="btn btn-secondary">View Profile</Link>
                <button className="btn btn-primary">Request Quote</button>
              </div>
            </article>
          ))
        )}
      </div>
    </>
  );
}

