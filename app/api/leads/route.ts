import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

type LeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  pond_type?: string;
  service?: string;
  pond_size?: string;
  description?: string;
  contact_method?: string;
  source?: string;
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0;
}

export async function POST(req: Request) {
  let payload: LeadPayload;
  try {
    payload = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  if (!isNonEmptyString(payload.name)) return NextResponse.json({ ok: false, error: 'Name is required' }, { status: 400 });
  if (!isNonEmptyString(payload.email)) return NextResponse.json({ ok: false, error: 'Email is required' }, { status: 400 });
  if (!isNonEmptyString(payload.phone)) return NextResponse.json({ ok: false, error: 'Phone is required' }, { status: 400 });
  if (!isNonEmptyString(payload.location)) return NextResponse.json({ ok: false, error: 'Location is required' }, { status: 400 });

  const headers = req.headers;
  const referrer = headers.get('referer') ?? undefined;
  const userAgent = headers.get('user-agent') ?? undefined;

  const lead = await prisma.lead.create({
    data: {
      name: payload.name.trim(),
      email: payload.email.trim(),
      phone: payload.phone.trim(),
      location: payload.location.trim(),
      pondType: isNonEmptyString(payload.pond_type) ? payload.pond_type.trim() : undefined,
      service: isNonEmptyString(payload.service) ? payload.service.trim() : undefined,
      pondSize: isNonEmptyString(payload.pond_size) ? payload.pond_size.trim() : undefined,
      description: isNonEmptyString(payload.description) ? payload.description.trim() : undefined,
      contactMethod: isNonEmptyString(payload.contact_method) ? payload.contact_method.trim() : undefined,
      source: isNonEmptyString(payload.source) ? payload.source.trim() : undefined,
      referrer,
      userAgent,
    },
    select: { id: true, createdAt: true },
  });

  return NextResponse.json({ ok: true, lead });
}


