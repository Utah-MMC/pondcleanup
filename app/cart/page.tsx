import CartView from '@/components/cart/CartView';

export const metadata = {
  title: 'Cart | Pond Cleanup Shop',
  description: 'Review your cart and proceed to checkout.',
};

export default function CartPage() {
  return (
    <main>
      <section className="directory-hero">
        <div className="container">
          <h1>Cart</h1>
          <p>Review items and quantities.</p>
        </div>
      </section>

      <section className="how-it-works" style={{ padding: 'var(--spacing-xl) 0' }}>
        <div className="container" style={{ maxWidth: 1000 }}>
          <CartView />
        </div>
      </section>
    </main>
  );
}


