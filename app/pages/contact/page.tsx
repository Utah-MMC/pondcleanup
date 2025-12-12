import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Pond Cleanup',
  description: 'Get in touch with Pond Cleanup. We\'re here to help with your pond cleaning and maintenance needs.',
  alternates: {
    canonical: 'https://pondcleanup.com/pages/contact',
  },
};

export default function ContactPage() {
  return (
    <main>
      <section className="directory-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Have questions? We&apos;re here to help.</p>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-lg)' }}>
            <div>
              <h2>Get in Touch</h2>
              <p style={{ marginBottom: 'var(--spacing-md)' }}>
                Have a question about our service? Need help with your pond? Want to provide feedback? We&apos;d love to hear from you.
              </p>
              <div style={{ marginBottom: 'var(--spacing-md)' }}>
                <h3>Email</h3>
                <p><a href="mailto:info@pondcleanup.com" style={{ color: 'var(--color-primary)' }}>info@pondcleanup.com</a></p>
              </div>
              <div>
                <h3>Phone</h3>
                <p><a href="tel:+18005551234" style={{ color: 'var(--color-primary)' }}>1-800-555-1234</a></p>
                <p style={{ fontSize: 'var(--font-size-small)', color: 'var(--color-text-light)' }}>Monday - Friday, 9am - 5pm EST</p>
              </div>
            </div>

            <div>
              <form className="quote-form" style={{ position: 'static' }}>
                <h2>Send Us a Message</h2>
                <label>
                  Your Name
                  <input type="text" name="name" required />
                </label>
                <label>
                  Email
                  <input type="email" name="email" required />
                </label>
                <label>
                  Phone (optional)
                  <input type="tel" name="phone" />
                </label>
                <label>
                  Subject
                  <select name="subject">
                    <option value="general">General Inquiry</option>
                    <option value="service">Service Question</option>
                    <option value="support">Support</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </label>
                <label>
                  Message
                  <textarea name="message" rows={5} required></textarea>
                </label>
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

