import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const services: Record<string, { title: string; description: string; content: string }> = {
  'pond-cleaning': {
    title: 'Pond Cleaning & Muck Removal | Pond Cleanup',
    description: 'Professional pond cleaning and muck removal services. Remove sludge, debris, and restore water clarity to your pond.',
    content: 'Our pond cleaning service removes accumulated sludge, leaves, and debris that cloud your water and cause unpleasant odors.',
  },
  'pond-maintenance': {
    title: 'Seasonal Pond Maintenance | Pond Cleanup',
    description: 'Professional seasonal pond maintenance services. Spring start-ups, fall shut-downs, and routine health checks.',
    content: 'Keep your pond healthy year-round with our seasonal maintenance plans. We handle spring start-ups, fall shut-downs, and routine health checks.',
  },
  'pond-opening-closing': {
    title: 'Pond Opening & Closing Services | Pond Cleanup',
    description: 'Professional pond opening and closing services. Prepare your pond for the season or safely shut it down for winter.',
    content: 'Properly prepare your pond for the season ahead or safely shut it down for winter with our opening and closing services.',
  },
  'pond-restoration': {
    title: 'Pond Restoration & Water Clarity | Pond Cleanup',
    description: 'Professional pond restoration and water clarity services. Control algae, balance water quality, and improve visibility.',
    content: 'Restore your pond to crystal clarity with our comprehensive restoration services. We help control algae, balance water quality, and improve visibility.',
  },
};

export async function generateMetadata({ params }: { params: { service: string } }): Promise<Metadata> {
  const service = services[params.service];
  if (!service) {
    return {
      title: 'Service Not Found | Pond Cleanup',
    };
  }
  return {
    title: service.title,
    description: service.description,
    alternates: {
      canonical: `https://pondcleanup.com/pages/services/${params.service}`,
    },
  };
}

export default function ServicePage({ params }: { params: { service: string } }) {
  const service = services[params.service];
  
  if (!service) {
    notFound();
  }

  return (
    <main>
      <section className="service-hero">
        <div className="container">
          <h1>{service.title.split(' | ')[0]}</h1>
          <p>{service.description}</p>
        </div>
      </section>

      <section className="service-content">
        <div className="container">
          <div className="service-layout">
            <div className="service-main">
              <p>{service.content}</p>
              <h2>What&apos;s Included</h2>
              <ul className="service-checklist">
                <li>Professional assessment of your pond</li>
                <li>Thorough cleaning and debris removal</li>
                <li>Water quality testing and treatment</li>
                <li>Equipment inspection and maintenance</li>
                <li>Post-service care recommendations</li>
              </ul>
            </div>
            <div className="service-sidebar">
              <div className="sidebar-box">
                <h2>Get a Quote</h2>
                <p>Ready to get started? Get a free, no-obligation quote for this service.</p>
                <Link href="/book" className="btn btn-primary" style={{ width: '100%', display: 'block', textAlign: 'center' }}>Get a Free Quote</Link>
              </div>
              <div className="sidebar-box">
                <h2>Related Services</h2>
                <ul className="related-services">
                  <li><Link href="/services">All Services</Link></li>
                  <li><Link href="/services/pond-cleaning">Pond Cleaning</Link></li>
                  <li><Link href="/services/pond-maintenance">Seasonal Maintenance</Link></li>
                  <li><Link href="/services/pond-opening-closing">Opening & Closing</Link></li>
                  <li><Link href="/services/pond-restoration">Restoration</Link></li>
                </ul>
              </div>
              <div className="sidebar-box">
                <h2>Other Resources</h2>
                <ul className="related-services">
                  <li><Link href="/locations">Service Locations</Link></li>
                  <li><Link href="/contractors">Find a Contractor</Link></li>
                  <li><Link href="/diy">DIY Guides</Link></li>
                  <li><Link href="/gallery">Gallery</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

