import { getShippingOptions } from '@/lib/shipping';

export default function ShippingInfo() {
  const shippingOptions = getShippingOptions();

  return (
    <div className="service-card" style={{ marginTop: 'var(--spacing-md)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
        <span style={{ fontSize: '1.5rem' }}>🚚</span>
        <h3 style={{ margin: 0 }}>Shipping & Delivery Details</h3>
        <span style={{ fontSize: '1rem', color: 'var(--color-text-light)', cursor: 'help' }} title="Estimated delivery times">ℹ️</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
        {shippingOptions.map((option) => (
          <div
            key={option.country}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 'var(--spacing-xs) 0',
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
              <span style={{ fontSize: '1rem', color: 'var(--color-text-light)' }}>🚚</span>
              <span style={{ fontWeight: 500 }}>{option.country}</span>
            </div>
            <span style={{ color: 'var(--color-text-light)', fontSize: '0.9rem' }}>{option.days}</span>
          </div>
        ))}
      </div>
      <p style={{ marginTop: 'var(--spacing-sm)', marginBottom: 0, color: 'var(--color-text-light)', fontSize: '0.9rem' }}>
        Delivery times are estimates and may vary based on location and processing time.
      </p>
    </div>
  );
}

