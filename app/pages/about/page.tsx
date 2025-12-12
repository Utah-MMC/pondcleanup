import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Pond Cleanup | Nationwide Pond Cleaning Service',
  description: 'Learn about Pond Cleanup, a nationwide pond cleaning and maintenance service. Professional pond specialists keeping your water clear and healthy.',
  alternates: {
    canonical: 'https://pondcleanup.com/pages/about',
  },
};

export default function AboutPage() {
  return (
    <main>
      <section className="directory-hero">
        <div className="container">
          <h1>About Pond Cleanup</h1>
          <p>Nationwide pond cleaning and maintenance service. One brand, consistent standards, wherever you are.</p>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2>Our Mission</h2>
          <p style={{ fontSize: 'var(--font-size-large)', marginBottom: 'var(--spacing-md)' }}>
            At Pond Cleanup, we believe that keeping your pond clean and healthy shouldn&apos;t be complicated. We&apos;re a nationwide service that connects you with professional pond specialists who understand water gardens, koi ponds, and decorative ponds.
          </p>

          <h2>What We Do</h2>
          <p style={{ marginBottom: 'var(--spacing-md)' }}>
            We provide professional pond cleaning, muck removal, seasonal maintenance, and water quality management. Whether you need a one-time deep clean or ongoing maintenance, we match you with experienced pond techs in your area who follow our standards for quality and customer service.
          </p>

          <h2>Why Choose Pond Cleanup</h2>
          <ul className="services-list" style={{ marginBottom: 'var(--spacing-md)' }}>
            <li><strong>Pond Specialists:</strong> We work with techs who specialize in ponds and water gardens, not generic landscapers</li>
            <li><strong>Nationwide Service:</strong> One brand, consistent standards, coverage across the U.S.</li>
            <li><strong>Clear Pricing:</strong> Transparent estimates before work begins, no surprise add-ons</li>
            <li><strong>Quality Guaranteed:</strong> We stand behind our work and ensure your satisfaction</li>
            <li><strong>Fish-Safe Process:</strong> We take care to protect your fish and aquatic plants</li>
          </ul>

          <h2>How We Work</h2>
          <p style={{ marginBottom: 'var(--spacing-md)' }}>
            While Pond Cleanup appears as one unified company, we work with local pond specialists in each area to provide service. This allows us to maintain consistent standards and customer experience while ensuring you get local expertise. Behind the scenes, we carefully vet and train our partner techs to meet our quality standards.
          </p>
        </div>
      </section>

      <section className="bottom-cta" style={{ backgroundImage: `linear-gradient(rgba(0, 102, 204, 0.9), rgba(0, 163, 163, 0.85)), url('/images/735e2dfc82cdc5f4ee2cede5bd9c631f-enhance-4x.jpeg')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <div className="container">
          <h2>Ready to clean up your pond?</h2>
          <p>Get a free, no-obligation quote from Pond Cleanup today.</p>
          <Link href="/book" className="btn btn-primary">Get a Free Quote</Link>
        </div>
      </section>
    </main>
  );
}

