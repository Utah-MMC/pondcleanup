import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'For Contractors | Join Our Network | Pond Cleanup',
  description: 'Join Pond Cleanup and connect with homeowners looking for pond and water-feature services.',
  alternates: {
    canonical: 'https://pondcleanup.com/pages/for-contractors',
  },
};

export default function ForContractorsPage() {
  return (
    <main>
      <section className="directory-hero">
        <div className="container">
          <h1>Join Our Network of Pond Professionals</h1>
          <p>Connect with homeowners looking for pond and water-feature services in your area.</p>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-lg)' }}>
            <div>
              <h2>Why Join Pond Cleanup?</h2>
              <ul className="services-list" style={{ marginBottom: 'var(--spacing-md)' }}>
                <li><strong>Qualified Leads:</strong> Connect with homeowners actively looking for pond services</li>
                <li><strong>Free Profile:</strong> Create a professional profile showcasing your work and expertise</li>
                <li><strong>Customer Reviews:</strong> Build your reputation with verified customer reviews</li>
                <li><strong>Nationwide Reach:</strong> Be discovered by customers across the country</li>
                <li><strong>Easy Management:</strong> Simple tools to manage your profile and respond to inquiries</li>
              </ul>
            </div>

            <div>
              <form className="quote-form" style={{ position: 'static' }}>
                <h2>Apply to Join</h2>
                <p style={{ fontSize: 'var(--font-size-small)', color: 'var(--color-text-light)', marginBottom: 'var(--spacing-md)' }}>
                  Fill out the form below and we&apos;ll get back to you within 2 business days.
                </p>
                <label>
                  Business Name
                  <input type="text" name="business_name" required />
                </label>
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
                  Service Area (City/State)
                  <input type="text" name="service_area" required />
                </label>
                <label>
                  Years in Business
                  <input type="number" name="years" min={1} required />
                </label>
                <label>
                  Services Offered
                  <select name="services" multiple style={{ height: '100px' }}>
                    <option value="cleaning">Pond Cleaning</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="installation">Installation</option>
                    <option value="repair">Repair</option>
                    <option value="algae-control">Algae Control</option>
                    <option value="design">Design</option>
                  </select>
                </label>
                <label>
                  Website (optional)
                  <input type="url" name="website" />
                </label>
                <label>
                  Tell us about your business
                  <textarea name="description" rows={4}></textarea>
                </label>
                <button type="submit" className="btn btn-primary">Submit Application</button>
              </form>
            </div>
          </div>

          <div style={{ background: 'var(--color-bg-light)', padding: 'var(--spacing-md)', borderRadius: 'var(--border-radius-lg)' }}>
            <h2>What to Expect</h2>
            <ol style={{ paddingLeft: 'var(--spacing-md)', color: 'var(--color-text-light)' }}>
              <li style={{ marginBottom: 'var(--spacing-xs)' }}>We review your application and verify your credentials</li>
              <li style={{ marginBottom: 'var(--spacing-xs)' }}>If approved, we&apos;ll help you set up your profile</li>
              <li style={{ marginBottom: 'var(--spacing-xs)' }}>You&apos;ll start receiving qualified leads in your area</li>
              <li>Build your reputation through customer reviews and completed jobs</li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}

