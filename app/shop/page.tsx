import Link from 'next/link';
import SmartImage from '@/components/SmartImage';
import { listActiveProducts } from '@/lib/productStore';

export const metadata = {
  title: 'Pond Supplies | Pond Cleanup Shop',
  description: 'Shop pond care essentials—filters, treatments, and tools recommended by Pond Cleanup.',
};

export const dynamic = 'force-dynamic';

function formatPrice(cents: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
}

export default async function ShopPage() {
  const products = await listActiveProducts();

  return (
    <main>
      <div style={{
        backgroundColor: '#ff6b35',
        color: 'white',
        padding: 'var(--spacing-md)',
        textAlign: 'center',
        fontWeight: 600,
        fontSize: '1.1rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        ⚠️ Store Under Maintenance: Payment systems are currently down. Please check back soon.
      </div>
      <section className="directory-hero">
        <div className="container">
          <h1>Shop</h1>
          <p>Recommended pond care essentials—hand-picked to solve common problems fast.</p>
          <div style={{ marginTop: 'var(--spacing-md)' }}>
            <Link href="/cart" className="btn btn-secondary">View Cart</Link>
          </div>
        </div>
      </section>

      <section className="how-it-works" style={{ padding: 'var(--spacing-xl) 0' }}>
        <div className="container">
          {products.length === 0 ? (
            <div className="service-card" style={{ maxWidth: 900, margin: '0 auto' }}>
              <h2 style={{ marginTop: 0 }}>No products yet</h2>
              <p style={{ color: 'var(--color-text-light)' }}>
                Import your AliDrop CSV in the admin area to populate the shop.
              </p>
              <Link href="/admin/alidrop" className="btn btn-primary">Import Products</Link>
            </div>
          ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--spacing-md)' }}>
            {products.map((p) => (
              <Link key={p.slug} href={`/shop/${p.slug}`} className="service-card" style={{ textDecoration: 'none' }}>
                {p.imageUrl ? (
                  <SmartImage
                    src={p.imageUrl}
                    alt={p.name}
                    width={600}
                    height={400}
                    style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 'var(--border-radius)', marginBottom: 'var(--spacing-sm)' }}
                  />
                ) : null}
                <h3 style={{ marginTop: 0 }}>{p.name}</h3>
                {p.shortDescription ? <p style={{ color: 'var(--color-text-light)' }}>{p.shortDescription}</p> : null}
                <p style={{ fontWeight: 700, marginBottom: 0 }}>{formatPrice(p.priceCents)}</p>
              </Link>
            ))}
          </div>
          )}

          <div style={{ marginTop: 'var(--spacing-xl)', textAlign: 'center' }}>
            <p style={{ color: 'var(--color-text-light)' }}>Not sure what you need? Tell us about your pond and we’ll recommend the right setup.</p>
            <Link href="/book" className="btn btn-primary">Get Recommendations</Link>
          </div>
        </div>
      </section>
    </main>
  );
}


