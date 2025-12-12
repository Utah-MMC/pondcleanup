import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pond Services | Pond Cleanup',
  description: 'Professional pond cleaning, maintenance, and restoration services. Learn about our comprehensive pond care solutions.',
  alternates: {
    canonical: 'https://pondcleanup.com/pages/services',
  },
};

export default function ServicesPage() {
  return (
    <main>
      <section className="directory-hero">
        <div className="container">
          <h1>Pond Services</h1>
          <p>Comprehensive pond cleaning, maintenance, and care services to keep your water feature beautiful and healthy.</p>
        </div>
      </section>

      <section className="what-we-do">
        <div className="container">
          <h2>Our Services</h2>
          <div className="services-grid">
            <article className="service-card">
              <h3>Pond Cleaning &amp; Muck Removal</h3>
              <p>Remove sludge, leaves, and debris that cloud water and cause odors.</p>
              <Link href="/services/pond-cleaning" className="service-link">Learn more →</Link>
            </article>
            <article className="service-card">
              <h3>Seasonal Pond Maintenance</h3>
              <p>Spring start-ups, fall shut-downs, and routine health checks.</p>
              <Link href="/services/pond-maintenance" className="service-link">Learn more →</Link>
            </article>
            <article className="service-card">
              <h3>Water Clarity &amp; Algae Management</h3>
              <p>Help control algae, balance water quality, and improve visibility.</p>
              <Link href="/services/pond-restoration" className="service-link">Learn more →</Link>
            </article>
            <article className="service-card">
              <h3>Pond Opening &amp; Closing</h3>
              <p>Prepare your pond for the season ahead or safely shut it down for winter.</p>
              <Link href="/services/pond-opening-closing" className="service-link">Learn more →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="bottom-cta" style={{ backgroundImage: `linear-gradient(rgba(0, 102, 204, 0.9), rgba(0, 163, 163, 0.85)), url('/images/PXL_20250628_171207914.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <div className="container">
          <h2>Ready to get started?</h2>
          <p>Get a free, no-obligation quote for your pond service needs.</p>
          <Link href="/book" className="btn btn-primary">Get a Free Quote</Link>
        </div>
      </section>
    </main>
  );
}

