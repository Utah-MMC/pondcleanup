'use client';

import Link from 'next/link';
import { useCart } from '@/components/cart/CartProvider';

export default function CartButton() {
  const { items } = useCart();
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <Link href="/cart" className="cart-button" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      <span>Cart</span>
      {count > 0 && (
        <span
          style={{
            position: 'absolute',
            top: -8,
            right: -8,
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            borderRadius: '50%',
            width: 20,
            height: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 700,
          }}
        >
          {count}
        </span>
      )}
    </Link>
  );
}

