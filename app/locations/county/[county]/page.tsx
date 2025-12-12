import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { county: string } }): Promise<Metadata> {
  const county = params.county.replace(/-/g, ' ');
  return {
    title: `Pond Services in ${county} County | Pond Cleanup`,
    description: `County-level location pages are being rolled out. Request service in ${county} County and we’ll route you correctly.`,
  };
}

export default function CountyPage({ params }: { params: { county: string } }) {
  const county = params.county.replace(/-/g, ' ');
  return (
    <main>
      <section className="directory-hero">
        <div className="container">
          <h1>{county} County</h1>
          <p>County pages are coming next. For now, request service and we’ll route you correctly.</p>
          <form className="hero-search" action="/book" method="GET" style={{ maxWidth: '600px', margin: 'var(--spacing-md) auto 0' }}>
            <div className="form-row">
              <label htmlFor="location">Your City or ZIP</label>
              <input type="text" id="location" name="location" placeholder="e.g. 80202" required />
            </div>
            <button type="submit" className="btn btn-primary btn-full">Request Service</button>
          </form>
        </div>
      </section>
    </main>
  );
}


