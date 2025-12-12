'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Stats = {
  leads: { total: number };
  orders: { total: number };
  products: { total: number };
  productsByStatus: Record<string, number>;
  ordersByStatus: Record<string, { count: number; revenueCents: number }>;
};

type RecentLead = {
  id: string;
  name: string;
  email: string;
  location: string;
  service: string | null;
  source: string | null;
  createdAt: string;
};

type RecentOrder = {
  id: string;
  customerName: string;
  customerEmail: string;
  status: string;
  totalCents: number;
  createdAt: string;
  items: Array<{
    quantity: number;
    priceCents: number;
    product: { name: string; slug: string };
  }>;
};

function formatPrice(cents: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function AdminDashboard() {
  const [token, setToken] = useState('');
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentLeads, setRecentLeads] = useState<RecentLead[]>([]);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    if (!token.trim()) {
      setError('Please enter admin token');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/stats', {
        headers: { 'X-Admin-Token': token },
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error || 'Failed to load stats');
        return;
      }
      setStats(data.stats);
      setRecentLeads(data.recentLeads || []);
      setRecentOrders(data.recentOrders || []);
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-light)' }}>
      <section className="directory-hero" style={{ padding: 'var(--spacing-lg) 0' }}>
        <div className="container">
          <h1>Admin Dashboard</h1>
          <p>View leads, orders, and product statistics</p>

          <div style={{ marginTop: 'var(--spacing-md)', maxWidth: 400 }}>
            <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)' }}>
              Admin Token
            </label>
            <div style={{ display: 'flex', gap: 'var(--spacing-xs)' }}>
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchStats()}
                placeholder="Enter ADMIN_TOKEN"
                style={{ flex: 1, padding: 'var(--spacing-xs)', borderRadius: 'var(--border-radius)' }}
              />
              <button onClick={fetchStats} className="btn btn-primary" disabled={loading}>
                {loading ? 'Loading...' : 'Load Stats'}
              </button>
            </div>
            {error && <p style={{ color: 'var(--color-danger)', marginTop: 'var(--spacing-xs)' }}>{error}</p>}
          </div>
        </div>
      </section>

      {stats && (
        <section className="how-it-works" style={{ padding: 'var(--spacing-xl) 0' }}>
          <div className="container">
            {/* Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
              <div className="service-card">
                <h3 style={{ marginTop: 0, fontSize: '2rem' }}>{stats.leads.total}</h3>
                <p style={{ marginBottom: 0, color: 'var(--color-text-light)' }}>Total Leads</p>
              </div>
              <div className="service-card">
                <h3 style={{ marginTop: 0, fontSize: '2rem' }}>{stats.orders.total}</h3>
                <p style={{ marginBottom: 0, color: 'var(--color-text-light)' }}>Total Orders</p>
              </div>
              <div className="service-card">
                <h3 style={{ marginTop: 0, fontSize: '2rem' }}>{stats.products.total}</h3>
                <p style={{ marginBottom: 0, color: 'var(--color-text-light)' }}>Total Products</p>
              </div>
              <div className="service-card">
                <h3 style={{ marginTop: 0, fontSize: '2rem' }}>
                  {formatPrice(
                    Object.values(stats.ordersByStatus).reduce((sum, s) => sum + s.revenueCents, 0),
                  )}
                </h3>
                <p style={{ marginBottom: 0, color: 'var(--color-text-light)' }}>Total Revenue</p>
              </div>
            </div>

            {/* Recent Leads */}
            <div className="service-card" style={{ marginBottom: 'var(--spacing-lg)' }}>
              <h2 style={{ marginTop: 0 }}>Recent Leads</h2>
              {recentLeads.length === 0 ? (
                <p style={{ color: 'var(--color-text-light)' }}>No leads yet</p>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                        <th style={{ textAlign: 'left', padding: 'var(--spacing-xs)' }}>Name</th>
                        <th style={{ textAlign: 'left', padding: 'var(--spacing-xs)' }}>Email</th>
                        <th style={{ textAlign: 'left', padding: 'var(--spacing-xs)' }}>Location</th>
                        <th style={{ textAlign: 'left', padding: 'var(--spacing-xs)' }}>Service</th>
                        <th style={{ textAlign: 'left', padding: 'var(--spacing-xs)' }}>Source</th>
                        <th style={{ textAlign: 'left', padding: 'var(--spacing-xs)' }}>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentLeads.map((lead) => (
                        <tr key={lead.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                          <td style={{ padding: 'var(--spacing-xs)' }}>{lead.name}</td>
                          <td style={{ padding: 'var(--spacing-xs)' }}>{lead.email}</td>
                          <td style={{ padding: 'var(--spacing-xs)' }}>{lead.location}</td>
                          <td style={{ padding: 'var(--spacing-xs)' }}>{lead.service || '—'}</td>
                          <td style={{ padding: 'var(--spacing-xs)' }}>{lead.source || '—'}</td>
                          <td style={{ padding: 'var(--spacing-xs)' }}>{formatDate(lead.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Recent Orders */}
            <div className="service-card">
              <h2 style={{ marginTop: 0 }}>Recent Orders</h2>
              {recentOrders.length === 0 ? (
                <p style={{ color: 'var(--color-text-light)' }}>No orders yet</p>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                        <th style={{ textAlign: 'left', padding: 'var(--spacing-xs)' }}>Order ID</th>
                        <th style={{ textAlign: 'left', padding: 'var(--spacing-xs)' }}>Customer</th>
                        <th style={{ textAlign: 'left', padding: 'var(--spacing-xs)' }}>Items</th>
                        <th style={{ textAlign: 'left', padding: 'var(--spacing-xs)' }}>Status</th>
                        <th style={{ textAlign: 'left', padding: 'var(--spacing-xs)' }}>Total</th>
                        <th style={{ textAlign: 'left', padding: 'var(--spacing-xs)' }}>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                          <td style={{ padding: 'var(--spacing-xs)' }}>{order.id.slice(0, 8)}...</td>
                          <td style={{ padding: 'var(--spacing-xs)' }}>{order.customerName}</td>
                          <td style={{ padding: 'var(--spacing-xs)' }}>
                            {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                          </td>
                          <td style={{ padding: 'var(--spacing-xs)' }}>
                            <span
                              style={{
                                padding: '2px 8px',
                                borderRadius: 'var(--border-radius)',
                                backgroundColor:
                                  order.status === 'completed'
                                    ? 'var(--color-success)'
                                    : order.status === 'cancelled'
                                      ? '#d93025'
                                      : '#ffc107',
                                color: 'white',
                                fontSize: '0.875rem',
                              }}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td style={{ padding: 'var(--spacing-xs)' }}>{formatPrice(order.totalCents)}</td>
                          <td style={{ padding: 'var(--spacing-xs)' }}>{formatDate(order.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div style={{ marginTop: 'var(--spacing-lg)', textAlign: 'center' }}>
              <Link href="/admin/alidrop" className="btn btn-secondary">
                Manage Products
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

