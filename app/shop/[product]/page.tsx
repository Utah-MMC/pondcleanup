import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/cart/AddToCartButton';
import SmartImage from '@/components/SmartImage';
import ShippingInfo from '@/components/shipping/ShippingInfo';
import { getActiveProductBySlug } from '@/lib/productStore';
import { sanitizeProductDescription } from '@/lib/safeHtml';

function formatPrice(cents: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { product: string } }): Promise<Metadata> {
  try {
    const p = await getActiveProductBySlug(params.product);
    if (!p) return { title: 'Product Not Found | Pond Cleanup Shop' };
    return {
      title: `${p.name} | Pond Cleanup Shop`,
      description: p.shortDescription ?? undefined,
    };
  } catch (error) {
    // Handle database errors gracefully
    console.error('Error loading product metadata:', error);
    return { title: 'Product | Pond Cleanup Shop' };
  }
}

export default async function ProductPage({ params }: { params: { product: string } }) {
  let p;
  try {
    p = await getActiveProductBySlug(params.product);
  } catch (error) {
    // Handle database errors gracefully (e.g., SQLite not available on Vercel)
    console.error('Error loading product:', error);
    notFound();
  }
  
  if (!p) notFound();

  const description = p.description ?? '';
  const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(description);
  const safeHtml = looksLikeHtml ? sanitizeProductDescription(description) : '';

  return (
    <main>
      <section className="directory-hero">
        <div className="container">
          <h1>{p.name}</h1>
          {p.shortDescription ? <p>{p.shortDescription}</p> : null}
          <div style={{ marginTop: 'var(--spacing-md)' }}>
            <Link href="/shop" className="btn btn-secondary">Back to Shop</Link>
          </div>
        </div>
      </section>

      <section className="how-it-works" style={{ padding: 'var(--spacing-xl) 0' }}>
        <div className="container" style={{ maxWidth: 1000 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 'var(--spacing-lg)', alignItems: 'start' }}>
            <div>
              {p.imageUrl ? (
                <SmartImage
                  src={p.imageUrl}
                  alt={p.name}
                  width={1200}
                  height={800}
                  style={{ width: '100%', height: 420, objectFit: 'cover', borderRadius: 'var(--border-radius-lg)' }}
                />
              ) : null}
              <div style={{ marginTop: 'var(--spacing-md)' }}>
                <h2>Details</h2>
                {p.description ? (
                  looksLikeHtml ? (
                    <div
                      className="product-details-html"
                      style={{ color: 'var(--color-text-light)' }}
                      dangerouslySetInnerHTML={{ __html: safeHtml }}
                    />
                  ) : (
                    <p style={{ color: 'var(--color-text-light)' }}>{p.description}</p>
                  )
                ) : null}
              </div>
            </div>

            <aside>
              <div className="sidebar-box">
                <h2>Price</h2>
                <p style={{ fontWeight: 800, fontSize: '1.25rem' }}>{formatPrice(p.priceCents)}</p>
                <AddToCartButton
                  product={{
                    slug: p.slug,
                    name: p.name,
                    priceCents: p.priceCents,
                    shortDescription: p.shortDescription ?? '',
                    description: p.description ?? '',
                    image: p.imageUrl ?? '',
                  }}
                />
                <div style={{ marginTop: 'var(--spacing-sm)' }}>
                  <Link href="/cart" className="btn btn-secondary" style={{ width: '100%', display: 'block', textAlign: 'center' }}>
                    View Cart
                  </Link>
                </div>
              </div>

              <div className="sidebar-box">
                <h2>Not sure?</h2>
                <p style={{ color: 'var(--color-text-light)' }}>
                  Tell us about your pond and we&apos;ll recommend the right products and service level.
                </p>
                <Link href="/book" className="btn btn-primary" style={{ width: '100%', display: 'block', textAlign: 'center' }}>
                  Get Recommendations
                </Link>
              </div>
            </aside>
          </div>

          <div style={{ marginTop: 'var(--spacing-lg)' }}>
            <ShippingInfo />
          </div>
        </div>
      </section>
    </main>
  );
}


