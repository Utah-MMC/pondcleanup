import Link from 'next/link';
import AdminAliDropImport from '@/components/admin/AdminAliDropImport';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'AliDrop Import | Admin',
  description: 'Import products from AliDrop into the Pond Cleanup shop.',
};

export default function AdminAliDropPage() {
  return (
    <main>
      <section className="directory-hero">
        <div className="container">
          <h1>AliDrop Product Import</h1>
          <p>Upload a CSV export from AliDrop to populate your shop (up to 50 products).</p>
          <div style={{ marginTop: 'var(--spacing-md)' }}>
            <Link href="/shop" className="btn btn-secondary">View Shop</Link>
          </div>
        </div>
      </section>

      <section className="how-it-works" style={{ padding: 'var(--spacing-xl) 0' }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <AdminAliDropImport />
          <div className="service-card" style={{ marginTop: 'var(--spacing-md)' }}>
            <h2 style={{ marginTop: 0 }}>CSV requirements</h2>
            <p style={{ color: 'var(--color-text-light)' }}>
              Export a product CSV from AliDrop. The importer will look for common columns like:
              <br />
              <strong>name/title</strong>, <strong>price</strong>, <strong>description</strong>, <strong>image url</strong>, and optional <strong>handle/slug</strong>.
            </p>
            <p style={{ color: 'var(--color-text-light)', marginBottom: 0 }}>
              If your export uses different column names, send me one sample row and I’ll map it perfectly.
            </p>
          </div>

          <div className="service-card" style={{ marginTop: 'var(--spacing-md)' }}>
            <h2 style={{ marginTop: 0 }}>Why did only 20 import?</h2>
            <p style={{ color: 'var(--color-text-light)', marginBottom: 0 }}>
              AliDrop’s import list is paginated (often 20 per page). Import page 2, 3, etc by copying the JSON response for
              <strong> `imported-products/?page=2`</strong>, then paste+import again. It will upsert into the same DB.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}


