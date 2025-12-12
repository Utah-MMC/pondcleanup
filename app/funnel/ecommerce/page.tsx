import Link from 'next/link';

export const metadata = {
  title: 'Ecommerce Funnel | Pond Cleanup',
  description: 'Shop pond care essentials and get the right products for your specific pond.',
};

export default function EcommerceFunnelPage() {
  return (
    <main>
      <section className="directory-hero">
        <div className="container">
          <h1>Ecommerce</h1>
          <p>Buy the right supplies—recommended for your pond and goals.</p>
          <div style={{ marginTop: 'var(--spacing-md)', display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
            <Link className="btn btn-primary" href="/shop">Go to Shop</Link>
            <Link className="btn btn-secondary" href="/book">Ask for Recommendations</Link>
          </div>
        </div>
      </section>
    </main>
  );
}


