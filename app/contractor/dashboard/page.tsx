'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Contractor = {
  id: string;
  name: string;
  companyName: string | null;
  email: string;
  location: string;
};

type LeadAssignment = {
  id: string;
  status: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  lead: {
    id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    service: string | null;
    pondType: string | null;
    description: string | null;
    createdAt: string;
  };
};

const statusOptions = ['new', 'contacted', 'quoted', 'scheduled', 'completed', 'lost'];
const statusLabels: Record<string, string> = {
  new: 'New',
  contacted: 'Contacted',
  quoted: 'Quoted',
  scheduled: 'Scheduled',
  completed: 'Completed',
  lost: 'Lost',
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function ContractorDashboard() {
  const router = useRouter();
  const [contractor, setContractor] = useState<Contractor | null>(null);
  const [leads, setLeads] = useState<LeadAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('contractor_token');
    if (!token) {
      router.push('/contractor/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [contractorRes, leadsRes] = await Promise.all([
          fetch(`/api/contractors/me?token=${token}`),
          fetch(`/api/contractors/leads?token=${token}`),
        ]);

        const contractorData = await contractorRes.json();
        const leadsData = await leadsRes.json();

        if (!contractorData.ok) {
          localStorage.removeItem('contractor_token');
          router.push('/contractor/login');
          return;
        }

        setContractor(contractorData.contractor);
        if (leadsData.ok) {
          setLeads(leadsData.leads || []);
        }
      } catch (err) {
        setError('Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const updateStatus = async (assignmentId: string, status: string, notes?: string) => {
    const token = localStorage.getItem('contractor_token');
    if (!token) return;

    try {
      const res = await fetch('/api/contractors/leads', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ assignmentId, status, notes }),
      });

      const data = await res.json();
      if (data.ok) {
        setLeads((prev) => prev.map((l) => (l.id === assignmentId ? data.assignment : l)));
      } else {
        alert(data.error || 'Failed to update status');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('contractor_token');
    router.push('/contractor/login');
  };

  if (loading) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading...</p>
      </main>
    );
  }

  if (!contractor) {
    return null;
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-light)' }}>
      <section className="directory-hero" style={{ padding: 'var(--spacing-lg) 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
            <div>
              <h1 style={{ marginBottom: 'var(--spacing-xs)' }}>Contractor Dashboard</h1>
              <p style={{ marginBottom: 0 }}>
                {contractor.companyName || contractor.name} • {contractor.location}
              </p>
            </div>
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </section>

      <section className="how-it-works" style={{ padding: 'var(--spacing-xl) 0' }}>
        <div className="container">
          {error && (
            <div style={{ padding: 'var(--spacing-md)', backgroundColor: '#fee', color: '#c00', borderRadius: 'var(--border-radius)', marginBottom: 'var(--spacing-md)' }}>
              {error}
            </div>
          )}

          <div className="service-card" style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h2 style={{ marginTop: 0 }}>Assigned Leads ({leads.length})</h2>
            {leads.length === 0 ? (
              <p style={{ color: 'var(--color-text-light)' }}>No leads assigned yet.</p>
            ) : (
              <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                {leads.map((assignment) => (
                  <div key={assignment.id} className="service-card" style={{ backgroundColor: 'var(--color-bg)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
                      <div style={{ flex: 1, minWidth: 250 }}>
                        <h3 style={{ marginTop: 0 }}>{assignment.lead.name}</h3>
                        <p style={{ marginBottom: 'var(--spacing-xs)' }}>
                          <strong>Location:</strong> {assignment.lead.location}
                        </p>
                        <p style={{ marginBottom: 'var(--spacing-xs)' }}>
                          <strong>Service:</strong> {assignment.lead.service || 'Not specified'}
                        </p>
                        {assignment.lead.pondType && (
                          <p style={{ marginBottom: 'var(--spacing-xs)' }}>
                            <strong>Pond Type:</strong> {assignment.lead.pondType}
                          </p>
                        )}
                        {assignment.lead.description && (
                          <p style={{ marginBottom: 'var(--spacing-xs)', color: 'var(--color-text-light)' }}>
                            {assignment.lead.description}
                          </p>
                        )}
                        <div style={{ marginTop: 'var(--spacing-sm)', fontSize: '0.875rem', color: 'var(--color-text-light)' }}>
                          <p style={{ marginBottom: 'var(--spacing-xs)' }}>
                            <strong>Contact:</strong> {assignment.lead.email} • {assignment.lead.phone}
                          </p>
                          <p style={{ marginBottom: 0 }}>
                            <strong>Received:</strong> {formatDate(assignment.lead.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div style={{ minWidth: 200 }}>
                        <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)' }}>
                          <strong>Status</strong>
                        </label>
                        <select
                          value={assignment.status}
                          onChange={(e) => updateStatus(assignment.id, e.target.value)}
                          style={{ width: '100%', padding: 'var(--spacing-xs)', borderRadius: 'var(--border-radius)', marginBottom: 'var(--spacing-sm)' }}
                        >
                          {statusOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {statusLabels[opt] || opt}
                            </option>
                          ))}
                        </select>

                        <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)' }}>
                          <strong>Notes</strong>
                        </label>
                        <textarea
                          value={assignment.notes || ''}
                          onChange={(e) => updateStatus(assignment.id, assignment.status, e.target.value)}
                          placeholder="Add notes..."
                          rows={3}
                          style={{ width: '100%', padding: 'var(--spacing-xs)', borderRadius: 'var(--border-radius)', fontFamily: 'inherit' }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

