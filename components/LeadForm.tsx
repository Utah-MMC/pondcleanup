'use client';

import { useMemo, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

type SubmitState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success'; leadId: string }
  | { status: 'error'; message: string };

export default function LeadForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const initialLocation = searchParams?.get('location') ?? '';
  const initialService = searchParams?.get('service') ?? '';

  const source = useMemo(() => {
    if (pathname?.startsWith('/contractors')) return 'contractor-network';
    if (pathname?.startsWith('/shop')) return 'ecommerce';
    if (pathname?.startsWith('/diy')) return 'diy';
    if (pathname?.startsWith('/book')) return 'book';
    return 'site';
  }, [pathname]);

  const [state, setState] = useState<SubmitState>({ status: 'idle' });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState({ status: 'submitting' });

    const fd = new FormData(e.currentTarget);
    const body = {
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      location: String(fd.get('location') ?? ''),
      pond_type: String(fd.get('pond_type') ?? ''),
      service: String(fd.get('service') ?? ''),
      pond_size: String(fd.get('pond_size') ?? ''),
      description: String(fd.get('description') ?? ''),
      contact_method: String(fd.get('contact_method') ?? ''),
      source,
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = (await res.json()) as { ok: boolean; error?: string; lead?: { id: string } };
      if (!res.ok || !json.ok) {
        setState({ status: 'error', message: json.error || 'Unable to submit. Please try again.' });
        return;
      }
      setState({ status: 'success', leadId: json.lead?.id ?? 'submitted' });
      e.currentTarget.reset();
    } catch {
      setState({ status: 'error', message: 'Network error. Please try again.' });
    }
  }

  if (state.status === 'success') {
    return (
      <div className="quote-form" style={{ position: 'static', maxWidth: '100%' }}>
        <h2>Request received</h2>
        <p style={{ color: 'var(--color-text-light)' }}>
          Thanks—our team will follow up shortly. Your reference: <strong>{state.leadId}</strong>
        </p>
      </div>
    );
  }

  return (
    <form className="quote-form" style={{ position: 'static', maxWidth: '100%' }} onSubmit={onSubmit}>
      <h2>Tell Us About Your Pond</h2>

      <label>
        Your Name *
        <input type="text" name="name" required />
      </label>

      <label>
        Email *
        <input type="email" name="email" required />
      </label>

      <label>
        Phone *
        <input type="tel" name="phone" required />
      </label>

      <label>
        City or ZIP Code *
        <input type="text" name="location" placeholder="e.g. Austin, TX or 73301" required defaultValue={initialLocation} />
      </label>

      <label>
        Pond Type
        <select name="pond_type" defaultValue="">
          <option value="">Select pond type</option>
          <option value="koi">Koi pond</option>
          <option value="decorative">Decorative pond</option>
          <option value="water-garden">Water garden</option>
          <option value="other">Other / not sure</option>
        </select>
      </label>

      <label>
        Service Needed
        <select name="service" defaultValue={initialService || ''}>
          <option value="">Select service</option>
          <option value="cleaning">Pond cleaning / muck removal</option>
          <option value="maintenance">Maintenance plan</option>
          <option value="opening-closing">Opening / closing</option>
          <option value="restoration">Deep clean / restoration</option>
          <option value="not-sure">Not sure, need advice</option>
        </select>
      </label>

      <label>
        Pond Size (approximate)
        <select name="pond_size" defaultValue="">
          <option value="">Select size</option>
          <option value="small">Small (under 500 gallons)</option>
          <option value="medium">Medium (500-2000 gallons)</option>
          <option value="large">Large (2000-5000 gallons)</option>
          <option value="xlarge">Extra Large (5000+ gallons)</option>
          <option value="unknown">Not sure</option>
        </select>
      </label>

      <label>
        What&apos;s going on with your pond?
        <textarea name="description" rows={4} placeholder="Describe any issues: murky water, algae, sludge, equipment problems, etc." />
      </label>

      <label>
        Preferred Contact Method
        <select name="contact_method" defaultValue="email">
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="either">Either</option>
        </select>
      </label>

      <button type="submit" className="btn btn-primary btn-full" disabled={state.status === 'submitting'}>
        {state.status === 'submitting' ? 'Submitting…' : 'Get a Free Quote'}
      </button>

      {state.status === 'error' && (
        <p style={{ color: 'var(--color-danger)', marginTop: 'var(--spacing-sm)' }}>
          {state.message}
        </p>
      )}

      <p style={{ fontSize: 'var(--font-size-small)', color: 'var(--color-text-light)', textAlign: 'center', marginTop: 'var(--spacing-sm)' }}>
        No obligation. We&apos;ll follow up with a clear, upfront quote.
      </p>
    </form>
  );
}


