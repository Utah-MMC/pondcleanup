import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How It Works | Pond Cleanup',
  description: 'Learn how Pond Cleanup works. Simple process to get your pond cleaned and maintained by professional pond specialists.',
  alternates: {
    canonical: 'https://pondcleanup.com/pages/how-it-works',
  },
};

export default function HowItWorksPage() {
  return (
    <main>
      <section className="directory-hero">
        <div className="container">
          <h1>How Pond Cleanup Works</h1>
          <p>Getting your pond cleaned and maintained is simple. Here&apos;s our process.</p>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <div className="steps-grid">
            <div className="step">
              <Image
                src="/images/PXL_20250603_205115591.jpg"
                alt="Share pond details"
                width={400}
                height={200}
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 'var(--border-radius)', marginBottom: 'var(--spacing-sm)' }}
              />
              <span className="step-number">1</span>
              <h3>Tell us about your pond</h3>
              <p>Share your location, pond size, and what you&apos;re seeing (murky water, sludge, algae, etc.).</p>
            </div>
            <div className="step">
              <Image
                src="/images/0cc90ccee5b37dfa6aed153a01581727-enhance-4x.jpeg"
                alt="Get professional quote"
                width={400}
                height={200}
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 'var(--border-radius)', marginBottom: 'var(--spacing-sm)' }}
              />
              <span className="step-number">2</span>
              <h3>Get a clear, upfront quote</h3>
              <p>We&apos;ll recommend a service level and give you a no-obligation estimate.</p>
            </div>
            <div className="step">
              <Image
                src="/images/1c7c15865a8fd7d198a5c69c3087e91c-enhance-4x.jpeg"
                alt="Schedule appointment"
                width={400}
                height={200}
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 'var(--border-radius)', marginBottom: 'var(--spacing-sm)' }}
              />
              <span className="step-number">3</span>
              <h3>Schedule your cleaning</h3>
              <p>We match you with a Pond Cleanup tech in your area and confirm your appointment.</p>
            </div>
            <div className="step">
              <Image
                src="/images/PXL_20250628_171207914.jpg"
                alt="Enjoy clean pond"
                width={400}
                height={200}
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 'var(--border-radius)', marginBottom: 'var(--spacing-sm)' }}
              />
              <span className="step-number">4</span>
              <h3>Enjoy a cleaner, healthier pond</h3>
              <p>We clean, check equipment, and give you easy-to-follow care tips for after the visit.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="why-us">
        <div className="container">
          <h2>Our Guarantees</h2>
          <div className="why-grid">
            <div className="why-item">
              <h3>Clear Pricing</h3>
              <p>No surprise charges. You&apos;ll know the cost before we start work.</p>
            </div>
            <div className="why-item">
              <h3>Pond Specialists</h3>
              <p>We work with techs who specialize in ponds, not generic landscapers.</p>
            </div>
            <div className="why-item">
              <h3>Quality Work</h3>
              <p>We stand behind our work. If something&apos;s not right, we&apos;ll make it right.</p>
            </div>
            <div className="why-item">
              <h3>Fish-Safe Process</h3>
              <p>We take care to protect your fish and aquatic plants during service.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bottom-cta" style={{ backgroundImage: `linear-gradient(rgba(0, 102, 204, 0.9), rgba(0, 163, 163, 0.85)), url('/images/65f25c8086c8955b83251f79c1f77da1-enhance-4x.jpeg')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <div className="container">
          <h2>Ready to get started?</h2>
          <p>Get a free quote for your pond cleaning or maintenance today.</p>
          <Link href="/book" className="btn btn-primary">Get a Free Quote</Link>
        </div>
      </section>
    </main>
  );
}

