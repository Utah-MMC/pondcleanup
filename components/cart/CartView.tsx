'use client';

import Link from 'next/link';
import { useCart } from '@/components/cart/CartProvider';

function formatPrice(cents: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
}

export default function CartView() {
  const { items, remove, setQty, clear } = useCart();

  const subtotalCents = items.reduce((sum, i) => sum + i.product.priceCents * i.qty, 0);

  if (items.length === 0) {
    return (
      <div className="service-card" style={{ maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ marginTop: 0 }}>Your cart is empty</h2>
        <p style={{ color: 'var(--color-text-light)' }}>Browse the shop to add products.</p>
        <Link href="/shop" className="btn btn-primary">Go to Shop</Link>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
      {items.map((i) => (
        <div key={i.product.slug} className="service-card" style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--spacing-md)' }}>
          <div>
            <h3 style={{ marginTop: 0 }}>{i.product.name}</h3>
            <p style={{ color: 'var(--color-text-light)' }}>{formatPrice(i.product.priceCents)}</p>
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center', flexWrap: 'wrap' }}>
              <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                Qty
                <input
                  type="number"
                  min={1}
                  value={i.qty}
                  onChange={(e) => setQty(i.product.slug, Number(e.target.value))}
                  style={{ width: 80 }}
                />
              </label>
              <button type="button" className="btn btn-secondary" onClick={() => remove(i.product.slug)}>
                Remove
              </button>
            </div>
          </div>

          <div style={{ textAlign: 'right', minWidth: 140 }}>
            <p style={{ fontWeight: 800, marginTop: 0 }}>
              {formatPrice(i.product.priceCents * i.qty)}
            </p>
          </div>
        </div>
      ))}

      <div className="service-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ marginTop: 0 }}>Subtotal</h3>
          <p style={{ color: 'var(--color-text-light)', marginBottom: 0 }}>Checkout wiring comes next (Stripe).</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontWeight: 900, fontSize: '1.25rem', marginTop: 0 }}>{formatPrice(subtotalCents)}</p>
          <div style={{ display: 'flex', gap: 'var(--spacing-sm)', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <Link href="/shop" className="btn btn-secondary">Keep Shopping</Link>
            <Link href="/book" className="btn btn-primary">Checkout (Request Help)</Link>
            <button type="button" className="btn btn-secondary" onClick={clear}>Clear</button>
          </div>
        </div>
      </div>
    </div>
  );
}


