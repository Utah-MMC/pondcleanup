'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ContractorSearch from '@/components/ContractorSearch';

function FindContractorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const location = searchParams?.get('location') || '';
  const service = searchParams?.get('service') || '';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newLocation = formData.get('location') as string;
    const newService = formData.get('service') as string;
    
    const params = new URLSearchParams();
    if (newLocation) params.set('location', newLocation);
    if (newService) params.set('service', newService);
    
    router.push(`/contractors?${params.toString()}`);
  };

  return (
    <main className="directory">
      <section className="directory-hero">
        <div className="container">
          <h1>Find Pond Contractors Near You</h1>
          <p>Search our nationwide network of pond and water-feature experts.</p>

          <form className="directory-search" onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="location" 
              placeholder="City or ZIP" 
              defaultValue={location}
              required 
            />
            <select name="service" defaultValue={service}>
              <option value="">Any service</option>
              <option value="cleaning">Pond Cleaning</option>
              <option value="maintenance">Maintenance</option>
              <option value="installation">Installation</option>
              <option value="repair">Repair</option>
              <option value="algae-control">Algae & Weed Control</option>
            </select>
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
        </div>
      </section>

      <section className="directory-content">
        <div className="container directory-layout">
          {/* FILTERS SIDEBAR */}
          <aside className="filters">
            <h2>Filter Results</h2>
            <div className="filter-group">
              <h3>Rating</h3>
              <label><input type="checkbox" name="rating" value="4plus" /> 4 stars & up</label>
              <label><input type="checkbox" name="rating" value="3plus" /> 3 stars & up</label>
            </div>

            <div className="filter-group">
              <h3>Services</h3>
              <label><input type="checkbox" name="services" value="cleaning" /> Cleaning</label>
              <label><input type="checkbox" name="services" value="maintenance" /> Maintenance</label>
              <label><input type="checkbox" name="services" value="installation" /> Installation</label>
              <label><input type="checkbox" name="services" value="repair" /> Repair</label>
              <label><input type="checkbox" name="services" value="algae-control" /> Algae Control</label>
            </div>

            <div className="filter-group">
              <h3>Type</h3>
              <label><input type="checkbox" name="type" value="residential" /> Residential</label>
              <label><input type="checkbox" name="type" value="commercial" /> Commercial</label>
            </div>
          </aside>

          {/* RESULTS LIST */}
          <section className="results">
            <Suspense fallback={<div>Loading...</div>}>
              <ContractorSearch />
            </Suspense>

            {/* Pagination */}
            <nav className="pagination">
              <a href="#" className="page-link active">1</a>
              <a href="#" className="page-link">2</a>
              <a href="#" className="page-link">Next →</a>
            </nav>
          </section>
        </div>
      </section>
    </main>
  );
}

export default function FindContractorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FindContractorContent />
    </Suspense>
  );
}

