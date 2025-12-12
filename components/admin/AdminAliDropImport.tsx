'use client';

import { useState } from 'react';

type Result = {
  created: number;
  updated: number;
  skipped: number;
  errors: Array<{ row: number; message: string }>;
};

export default function AdminAliDropImport() {
  const [token, setToken] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [jsonText, setJsonText] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');
  const [result, setResult] = useState<Result | null>(null);
  const [backfillMsg, setBackfillMsg] = useState<string>('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('uploading');
    setMessage('');
    setResult(null);

    if (!file) {
      setStatus('error');
      setMessage('Please choose a CSV file.');
      return;
    }
    if (!token) {
      setStatus('error');
      setMessage('Enter your ADMIN_TOKEN.');
      return;
    }

    const fd = new FormData();
    fd.append('file', file);
    fd.append('source', 'alidrop');

    try {
      const res = await fetch('/api/admin/import-products', {
        method: 'POST',
        headers: { 'x-admin-token': token },
        body: fd,
      });
      const json = (await res.json()) as { ok: boolean; error?: string; result?: Result };
      if (!res.ok || !json.ok) {
        setStatus('error');
        setMessage(json.error || 'Import failed.');
        return;
      }
      setStatus('done');
      setResult(json.result || null);
      setMessage('Import complete.');
    } catch {
      setStatus('error');
      setMessage('Network error.');
    }
  }

  async function onSubmitJson(e: React.FormEvent) {
    e.preventDefault();
    setStatus('uploading');
    setMessage('');
    setResult(null);

    if (!token) {
      setStatus('error');
      setMessage('Enter your ADMIN_TOKEN.');
      return;
    }
    if (!jsonText.trim()) {
      setStatus('error');
      setMessage('Paste JSON first.');
      return;
    }

    try {
      const parsed = JSON.parse(jsonText) as unknown;
      const candidate =
        Array.isArray(parsed)
          ? parsed
          : (
              parsed as {
                rows?: unknown;
                results?: unknown;
                data?: unknown;
                items?: unknown;
                products?: unknown;
                list?: unknown;
              }
            );
      const rows =
        Array.isArray(candidate)
          ? candidate
          : (candidate.rows ??
              candidate.results ??
              candidate.data ??
              candidate.items ??
              candidate.products ??
              candidate.list);

      if (!Array.isArray(rows)) {
        setStatus('error');
        setMessage('JSON must be an array, or an object containing an array like { rows/results/data/items/products/list: [...] }.');
        return;
      }

      const res = await fetch('/api/admin/import-products-json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
        body: JSON.stringify({ source: 'alidrop', rows }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string; result?: Result };
      if (!res.ok || !json.ok) {
        setStatus('error');
        setMessage(json.error || 'Import failed.');
        return;
      }
      setStatus('done');
      setResult(json.result || null);
      setMessage('Import complete.');
    } catch {
      setStatus('error');
      setMessage('Invalid JSON.');
    }
  }

  async function backfillImages() {
    setBackfillMsg('');
    if (!token) {
      setBackfillMsg('Enter your ADMIN_TOKEN first.');
      return;
    }
    try {
      const res = await fetch('/api/admin/backfill-product-images', {
        method: 'POST',
        headers: { 'x-admin-token': token },
      });
      const json = (await res.json()) as { ok: boolean; error?: string; scanned?: number; updated?: number; stillMissing?: number; note?: string };
      if (!res.ok || !json.ok) {
        setBackfillMsg(json.error || 'Backfill failed.');
        return;
      }
      setBackfillMsg(`Backfill complete. Scanned: ${json.scanned} Updated: ${json.updated} Still missing: ${json.stillMissing}${json.note ? ` — ${json.note}` : ''}`);
    } catch {
      setBackfillMsg('Network error running backfill.');
    }
  }

  return (
    <div className="service-card">
      <h2 style={{ marginTop: 0 }}>Import CSV</h2>

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-sm)' }}>
        <label>
          Admin token (from `.env`)
          <input value={token} onChange={(e) => setToken(e.target.value)} placeholder="ADMIN_TOKEN" />
        </label>

        <label>
          AliDrop export (CSV)
          <input
            type="file"
            accept=".csv,text/csv"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </label>

        <button className="btn btn-primary" type="submit" disabled={status === 'uploading'}>
          {status === 'uploading' ? 'Importing…' : 'Import Products'}
        </button>
      </form>

      <hr style={{ margin: 'var(--spacing-md) 0' }} />

      <h2 style={{ marginTop: 0 }}>Paste JSON (no-export workaround)</h2>
      <p style={{ color: 'var(--color-text-light)' }}>
        On AliDrop’s import list page, open DevTools → Network, find the request that returns your product list, and copy the JSON response.
        Paste it here and import.
      </p>
      <form onSubmit={onSubmitJson} style={{ display: 'grid', gap: 'var(--spacing-sm)' }}>
        <label>
          JSON (array of product rows, or {`{ rows: [...] }`})
          <textarea
            rows={10}
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            placeholder='[{"title":"...", "price":"19.99", "image_url":"..."}, ...]'
          />
        </label>
        <button className="btn btn-primary" type="submit" disabled={status === 'uploading'}>
          {status === 'uploading' ? 'Importing…' : 'Import from JSON'}
        </button>
      </form>

      {message && (
        <p style={{ marginTop: 'var(--spacing-sm)', color: status === 'error' ? 'var(--color-danger)' : 'var(--color-text-light)' }}>
          {message}
        </p>
      )}

      {result && (
        <div style={{ marginTop: 'var(--spacing-sm)', color: 'var(--color-text-light)' }}>
          <p><strong>Created:</strong> {result.created} <strong>Updated:</strong> {result.updated} <strong>Skipped:</strong> {result.skipped}</p>
          {result.errors.length > 0 && (
            <details>
              <summary>Row errors ({result.errors.length})</summary>
              <ul>
                {result.errors.slice(0, 20).map((e, idx) => (
                  <li key={idx}>Row {e.row}: {e.message}</li>
                ))}
              </ul>
              {result.errors.length > 20 && <p>Showing first 20 errors.</p>}
            </details>
          )}
        </div>
      )}

      <hr style={{ margin: 'var(--spacing-md) 0' }} />
      <h2 style={{ marginTop: 0 }}>Fix missing images (recommended)</h2>
      <p style={{ color: 'var(--color-text-light)' }}>
        If you imported page 2/3 before image support was added, this will backfill missing product images from the stored raw AliDrop JSON.
      </p>
      <button type="button" className="btn btn-secondary" onClick={backfillImages}>
        Backfill Images
      </button>
      {backfillMsg ? <p style={{ marginTop: 'var(--spacing-sm)', color: 'var(--color-text-light)' }}>{backfillMsg}</p> : null}
    </div>
  );
}


