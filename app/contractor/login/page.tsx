'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ContractorLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contractors/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!data.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      // Store token in localStorage
      localStorage.setItem('contractor_token', data.token);
      router.push('/contractor/dashboard');
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', backgroundColor: 'var(--color-bg-light)' }}>
      <section className="directory-hero" style={{ width: '100%', padding: 'var(--spacing-xl) 0' }}>
        <div className="container" style={{ maxWidth: 400 }}>
          <h1>Contractor Login</h1>
          <p>Access your dashboard to view and manage assigned leads.</p>

          <form onSubmit={handleSubmit} style={{ marginTop: 'var(--spacing-lg)' }}>
            {error && (
              <div style={{ padding: 'var(--spacing-sm)', backgroundColor: '#fee', color: '#c00', borderRadius: 'var(--border-radius)', marginBottom: 'var(--spacing-md)' }}>
                {error}
              </div>
            )}

            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: 'var(--spacing-xs)' }}>
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: 'var(--spacing-xs)', borderRadius: 'var(--border-radius)' }}
              />
            </div>

            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: 'var(--spacing-xs)' }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: 'var(--spacing-xs)', borderRadius: 'var(--border-radius)' }}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p style={{ marginTop: 'var(--spacing-md)', textAlign: 'center', color: 'var(--color-text-light)' }}>
            <Link href="/">Back to Home</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

