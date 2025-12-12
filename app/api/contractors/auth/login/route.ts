import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ ok: false, error: 'Email and password required' }, { status: 400 });
    }

    const contractor = await prisma.contractor.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!contractor || !contractor.active) {
      return NextResponse.json({ ok: false, error: 'Invalid credentials' }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, contractor.passwordHash);
    if (!valid) {
      return NextResponse.json({ ok: false, error: 'Invalid credentials' }, { status: 401 });
    }

    // Return contractor info (without password hash)
    const { passwordHash, ...contractorInfo } = contractor;
    return NextResponse.json({
      ok: true,
      contractor: contractorInfo,
      token: contractor.id, // Simple token - in production, use JWT
    });
  } catch (error) {
    console.error('Contractor login error:', error);
    return NextResponse.json({ ok: false, error: 'Login failed' }, { status: 500 });
  }
}

