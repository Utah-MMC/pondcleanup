import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  try {
    const p = await prisma.product.findFirst({ where: { slug: params.slug, active: true } });
    if (!p) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
    return NextResponse.json({ ok: true, product: p });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 });
  }
}


