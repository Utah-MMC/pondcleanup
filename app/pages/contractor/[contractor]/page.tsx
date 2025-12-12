import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { contractors, getStarRating, type Contractor } from '@/lib/contractors';

export async function generateMetadata({ params }: { params: { contractor: string } }): Promise<Metadata> {
  const contractor = contractors.find(c => c.id === params.contractor);
  if (!contractor) {
    return {
      title: 'Contractor Not Found | Pond Cleanup',
    };
  }
  return {
    title: `${contractor.name} | Pond Contractor in ${contractor.location} | Pond Cleanup`,
    description: `${contractor.name} - ${contractor.description} Rated ${contractor.rating} stars with ${contractor.reviews} reviews.`,
    alternates: {
      canonical: `https://pondcleanup.com/pages/contractor/${params.contractor}`,
    },
  };
}

export default function ContractorPage({ params }: { params: { contractor: string } }) {
  const contractor = contractors.find(c => c.id === params.contractor);
  
  if (!contractor) {
    notFound();
  }

  return (
    <main className="contractor-profile">
      <section className="contractor-hero">
        <div className="container contractor-hero-inner">
          <div className="hero-main">
            <h1>{contractor.name}</h1>
            <p className="contractor-location">{contractor.location} • {contractor.distance}</p>
            <p className="contractor-rating">
              {getStarRating(contractor.rating)} {contractor.rating} ({contractor.reviews} reviews)
            </p>
            <p className="contractor-services">{contractor.services.join(' • ')}</p>
            {contractor.website && (
              <p style={{ marginTop: 'var(--spacing-xs)' }}>
                <a href={contractor.website} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                  Visit Website: {contractor.website.replace('https://', '')}
                </a>
              </p>
            )}
          </div>
          <div className="hero-actions">
            <a href="#quote-form" className="btn btn-primary">Request a Quote</a>
            <p className="response-note">Typical response time: under 24 hours</p>
          </div>
        </div>
      </section>

      <section className="contractor-body">
        <div className="container contractor-layout">
          {/* MAIN CONTENT */}
          <section className="contractor-main">
            {/* About */}
            <section id="overview">
              <h2>Overview</h2>
              <p>{contractor.description}</p>
            </section>

            {/* Services */}
            <section id="services">
              <h2>Services</h2>
              <ul className="services-list">
                {contractor.services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </section>

            {/* Gallery */}
            <section id="gallery">
              <h2>Project Photos</h2>
              <div className="gallery-grid">
                <figure className="gallery-item">
                  <Image
                    src="/images/65f25c8086c8955b83251f79c1f77da1-enhance-4x.jpeg"
                    alt={`${contractor.name} project`}
                    width={200}
                    height={200}
                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 'var(--border-radius)', marginBottom: 'var(--spacing-xs)' }}
                  />
                  <figcaption>Project by {contractor.name}</figcaption>
                </figure>
                <figure className="gallery-item">
                  <Image
                    src="/images/735e2dfc82cdc5f4ee2cede5bd9c631f-enhance-4x.jpeg"
                    alt={`${contractor.name} project`}
                    width={200}
                    height={200}
                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 'var(--border-radius)', marginBottom: 'var(--spacing-xs)' }}
                  />
                  <figcaption>Water feature project</figcaption>
                </figure>
              </div>
            </section>

            {/* Reviews */}
            <section id="reviews">
              <h2>Customer Reviews</h2>
              <article className="review">
                <p className="review-rating">★★★★★</p>
                <p className="review-text">&quot;Excellent service and professional work. Highly recommend!&quot;</p>
                <p className="review-meta">— Customer Review</p>
              </article>
            </section>
          </section>

          {/* SIDEBAR */}
          <aside className="contractor-sidebar">
            <section className="business-details">
              <h2>Business Details</h2>
              <ul>
                {contractor.website && (
                  <li><strong>Website:</strong> <a href={contractor.website} target="_blank" rel="noopener noreferrer">{contractor.website}</a></li>
                )}
                <li><strong>Service area:</strong> {contractor.location}</li>
                <li><strong>Rating:</strong> {contractor.rating} stars ({contractor.reviews} reviews)</li>
              </ul>
            </section>

            <form id="quote-form" className="quote-form">
              <h2>Request a Quote</h2>
              <label>
                Your Name
                <input type="text" name="name" required />
              </label>
              <label>
                Email
                <input type="email" name="email" required />
              </label>
              <label>
                Phone
                <input type="tel" name="phone" required />
              </label>
              <label>
                Service Needed
                <select name="service" required>
                  <option value="">Select service</option>
                  {contractor.services.map((service, index) => (
                    <option key={index} value={service.toLowerCase()}>{service}</option>
                  ))}
                </select>
              </label>
              <label>
                Message
                <textarea name="message" rows={4} placeholder="Tell us about your pond and what you need..."></textarea>
              </label>
              <button type="submit" className="btn btn-primary">Send Request</button>
              <p style={{ fontSize: 'var(--font-size-small)', color: 'var(--color-text-light)', marginTop: 'var(--spacing-xs)' }}>
                We&apos;ll connect you with {contractor.name} directly.
              </p>
            </form>
          </aside>
        </div>
      </section>
    </main>
  );
}

// Generate static params for known contractors
export async function generateStaticParams() {
  return contractors.map((contractor) => ({
    contractor: contractor.id,
  }));
}

