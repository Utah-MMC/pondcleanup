import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { updatedAt: 'desc' },
  });
  return NextResponse.json({ ok: true, products });
}


