import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || new URL(req.url).searchParams.get('token');

    if (!token) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const contractor = await prisma.contractor.findUnique({
      where: { id: token },
      select: {
        id: true,
        email: true,
        name: true,
        companyName: true,
        location: true,
        city: true,
        state: true,
        phone: true,
        website: true,
        services: true,
        active: true,
      },
    });

    if (!contractor || !contractor.active) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ ok: true, contractor });
  } catch (error) {
    console.error('Contractor auth error:', error);
    return NextResponse.json({ ok: false, error: 'Auth failed' }, { status: 500 });
  }
}

