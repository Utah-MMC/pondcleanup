import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Locations | Pond Cleanup',
  description: 'Pond Cleanup provides pond cleaning and maintenance in cities across the U.S. Find service in your area.',
  alternates: {
    canonical: 'https://pondcleanup.com/pages/locations',
  },
};

export default function LocationsPage() {
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
            <div>
              <h3>West Coast</h3>
              <ul className="services-list">
                <li><Link href="/locations/city/los-angeles-ca">Los Angeles, CA</Link></li>
                <li><Link href="/locations/city/san-diego-ca">San Diego, CA</Link></li>
                <li><Link href="/locations/city/san-francisco-ca">San Francisco, CA</Link></li>
                <li><Link href="/locations/city/seattle-wa">Seattle, WA</Link></li>
                <li><Link href="/locations/city/portland-or">Portland, OR</Link></li>
                <li><Link href="/locations/city/phoenix-az">Phoenix, AZ</Link></li>
              </ul>
            </div>
            <div>
              <h3>Southwest & Texas</h3>
              <ul className="services-list">
                <li><Link href="/locations/city/austin-tx">Austin, TX</Link></li>
                <li><Link href="/locations/city/dallas-tx">Dallas, TX</Link></li>
                <li><Link href="/locations/city/houston-tx">Houston, TX</Link></li>
                <li><Link href="/locations/city/san-antonio-tx">San Antonio, TX</Link></li>
                <li><Link href="/locations/city/las-vegas-nv">Las Vegas, NV</Link></li>
              </ul>
            </div>
            <div>
              <h3>Midwest</h3>
              <ul className="services-list">
                <li><Link href="/locations/city/chicago-il">Chicago, IL</Link></li>
                <li><Link href="/locations/city/denver-co">Denver, CO</Link></li>
                <li><Link href="/locations/city/minneapolis-mn">Minneapolis, MN</Link></li>
                <li><Link href="/locations/city/kansas-city-mo">Kansas City, MO</Link></li>
                <li><Link href="/locations/city/indianapolis-in">Indianapolis, IN</Link></li>
              </ul>
            </div>
            <div>
              <h3>Southeast</h3>
              <ul className="services-list">
                <li><Link href="/locations/city/atlanta-ga">Atlanta, GA</Link></li>
                <li><Link href="/locations/city/miami-fl">Miami, FL</Link></li>
                <li><Link href="/locations/city/orlando-fl">Orlando, FL</Link></li>
                <li><Link href="/locations/city/charlotte-nc">Charlotte, NC</Link></li>
                <li><Link href="/locations/city/nashville-tn">Nashville, TN</Link></li>
              </ul>
            </div>
            <div>
              <h3>Northeast</h3>
              <ul className="services-list">
                <li><Link href="/locations/city/new-york-ny">New York, NY</Link></li>
                <li><Link href="/locations/city/boston-ma">Boston, MA</Link></li>
                <li><Link href="/locations/city/philadelphia-pa">Philadelphia, PA</Link></li>
                <li><Link href="/locations/city/washington-dc">Washington, DC</Link></li>
                <li><Link href="/locations/city/baltimore-md">Baltimore, MD</Link></li>
              </ul>
            </div>
            <div>
              <h3>More Cities</h3>
              <ul className="services-list">
                <li><Link href="/locations/city/columbus-oh">Columbus, OH</Link></li>
                <li><Link href="/locations/city/detroit-mi">Detroit, MI</Link></li>
                <li><Link href="/locations/city/milwaukee-wi">Milwaukee, WI</Link></li>
                <li><Link href="/locations/city/oklahoma-city-ok">Oklahoma City, OK</Link></li>
                <li><Link href="/locations/city/memphis-tn">Memphis, TN</Link></li>
              </ul>
            </div>
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

