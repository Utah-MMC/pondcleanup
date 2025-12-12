import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export function GET(req: Request, { params }: { params: { slug: string } }) {
  return prisma.product
    .findFirst({ where: { slug: params.slug, active: true } })
    .then((p) => {
      if (!p) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
      return NextResponse.json({ ok: true, product: p });
    });
}


