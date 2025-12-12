import type { Metadata } from 'next';
import { Suspense } from 'react';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'Book a Pond Cleaning | Pond Cleanup',
  description: 'Book a pond cleaning or get a free quote from Pond Cleanup. Professional pond cleaning and maintenance services nationwide.',
  alternates: {
    canonical: 'https://pondcleanup.com/pages/book',
  },
};

export default function BookPage() {
  return (
    <main>
      <section className="directory-hero">
        <div className="container">
          <h1>Book a Pond Cleaning</h1>
          <p>Get a free, no-obligation quote for your pond cleaning or maintenance service.</p>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container" style={{ maxWidth: '800px' }}>
          <Suspense fallback={<div className="quote-form" style={{ position: 'static', maxWidth: '100%' }}>Loading…</div>}>
            <LeadForm />
          </Suspense>

          <div style={{ background: 'var(--color-bg-light)', padding: 'var(--spacing-md)', borderRadius: 'var(--border-radius-lg)', marginTop: 'var(--spacing-lg)' }}>
            <h2>What Happens Next?</h2>
            <ol style={{ paddingLeft: 'var(--spacing-md)', color: 'var(--color-text-light)' }}>
              <li style={{ marginBottom: 'var(--spacing-xs)' }}>We&apos;ll review your information and match you with a Pond Cleanup tech in your area.</li>
              <li style={{ marginBottom: 'var(--spacing-xs)' }}>You&apos;ll receive a clear, upfront quote with no surprise charges.</li>
              <li style={{ marginBottom: 'var(--spacing-xs)' }}>Schedule your appointment at a time that works for you.</li>
              <li>Enjoy a cleaner, healthier pond!</li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}

