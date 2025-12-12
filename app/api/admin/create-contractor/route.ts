import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdminToken } from '@/lib/adminAuth';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const authResult = await requireAdminToken(req);
  if (authResult && 'response' in authResult) return authResult.response;

  try {
    const { email, password, name, companyName, location, city, state, zip, phone, website, services } = await req.json();

    if (!email || !password || !name || !location || !city || !state) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
    }

    // Check if email already exists
    const existing = await prisma.contractor.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existing) {
      return NextResponse.json({ ok: false, error: 'Email already registered' }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const contractor = await prisma.contractor.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        name,
        companyName: companyName || null,
        location,
        city,
        state,
        zip: zip ? JSON.parse(JSON.stringify(zip)) : null,
        phone: phone || null,
        website: website || null,
        services: services ? JSON.parse(JSON.stringify(services)) : null,
        active: true,
      },
      select: {
        id: true,
        email: true,
        name: true,
        companyName: true,
        location: true,
      },
    });

    return NextResponse.json({ ok: true, contractor });
  } catch (error) {
    console.error('Create contractor error:', error);
    return NextResponse.json({ ok: false, error: 'Failed to create contractor' }, { status: 500 });
  }
}

