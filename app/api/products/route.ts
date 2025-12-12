import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { active: true },
      orderBy: { updatedAt: 'desc' },
    });
    return NextResponse.json({ ok: true, products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ ok: false, error: 'Internal server error', products: [] }, { status: 500 });
  }
}


