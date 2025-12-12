import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FAQ | Pond Cleanup',
  description: 'Frequently asked questions about Pond Cleanup services, pricing, scheduling, and pond care.',
  alternates: {
    canonical: 'https://pondcleanup.com/pages/faq',
  },
};

export default function FAQPage() {
  return (
    <main>
      <section className="directory-hero">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p>Common questions about our pond cleaning and maintenance services.</p>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2>General Questions</h2>
          
          <h3>What areas do you serve?</h3>
          <p>Pond Cleanup provides service nationwide across the United States. Enter your location when requesting a quote to check availability in your area.</p>

          <h3>How much does pond cleaning cost?</h3>
          <p>Pricing depends on several factors including pond size, depth, access, and how much buildup has accumulated. Most cleanings start at a few hundred dollars. We provide free, no-obligation quotes so you know the cost upfront.</p>

          <h3>How long does a pond cleaning take?</h3>
          <p>Most standard cleanings take 2-4 hours. Deep cleanings or restorations may take a full day. We&apos;ll give you a timeline when we assess your pond.</p>

          <h2>Service Questions</h2>

          <h3>Will my fish be safe during cleaning?</h3>
          <p>Yes. We take great care to protect your fish and aquatic plants during the cleaning process. For larger or heavily stocked ponds, we may recommend temporary holding tanks or a partial drain instead of a full drain.</p>

          <h3>How often should I have my pond cleaned?</h3>
          <p>Many ponds benefit from at least one thorough cleaning per year, often in spring, with lighter maintenance or checkups in between. We can help you decide what schedule makes sense for your pond.</p>

          <h3>What&apos;s the difference between cleaning and maintenance?</h3>
          <p>Cleaning is a deeper service when buildup has already occurred. Maintenance is ongoing care to prevent problems. Many customers combine both: regular maintenance plus an annual deep cleaning.</p>

          <h3>Do you offer seasonal services?</h3>
          <p>Yes. We offer spring pond opening and fall pond closing services to prepare your pond for the season ahead or safely shut it down for winter.</p>

          <h2>Scheduling & Process</h2>

          <h3>How do I schedule a service?</h3>
          <p>Simply fill out our booking form with your location, pond details, and service needed. We&apos;ll follow up with a quote and available appointment times.</p>

          <h3>Do I need to be home during the service?</h3>
          <p>We recommend being available at the start and end of service to discuss your pond and any recommendations. However, if you have secure access, we can work while you&apos;re away.</p>

          <h3>What should I do to prepare for a cleaning?</h3>
          <p>Generally, no special preparation is needed. If you have specific concerns or questions, we&apos;ll discuss them when we confirm your appointment.</p>

          <h2>Pond Care Questions</h2>

          <h3>How can I keep my pond cleaner longer?</h3>
          <p>Regular maintenance, proper filtration, and managing debris (like leaves) are key. We&apos;ll provide specific care tips after your cleaning based on your pond&apos;s setup.</p>

          <h3>What causes murky water and algae?</h3>
          <p>Common causes include excess organic matter (leaves, debris), imbalanced water chemistry, insufficient filtration, or too much sunlight. We can help identify and address the specific issues in your pond.</p>

          <h3>Can you help with equipment problems?</h3>
          <p>Yes. We check pumps, filters, and basic plumbing during service. We can identify problems and provide repair recommendations or basic fixes.</p>
        </div>
      </section>

      <section className="bottom-cta" style={{ backgroundImage: `linear-gradient(rgba(0, 102, 204, 0.9), rgba(0, 163, 163, 0.85)), url('/images/PXL_20250628_171207914.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <div className="container">
          <h2>Still have questions?</h2>
          <p>Get in touch and we&apos;ll be happy to help.</p>
          <Link href="/contact" className="btn btn-primary">Contact Us</Link>
        </div>
      </section>
    </main>
  );
}

