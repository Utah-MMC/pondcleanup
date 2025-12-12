import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdminToken } from '@/lib/adminAuth';
import { extractImageUrlFromRow } from '@/lib/productImport';

export async function POST(req: Request) {
  const auth = requireAdminToken(req);
  if (!auth.ok) return auth.response;

  const products = await prisma.product.findMany({
    where: { active: true, imageUrl: null },
    select: { id: true, slug: true, raw: true },
    take: 500,
  });

  let updated = 0;
  let stillMissing = 0;

  for (const p of products) {
    const raw = p.raw as unknown;
    const imageUrl = raw && typeof raw === 'object' ? extractImageUrlFromRow(raw as Record<string, unknown>) : null;
    if (!imageUrl) {
      stillMissing++;
      continue;
    }
    // eslint-disable-next-line no-await-in-loop
    await prisma.product.update({
      where: { id: p.id },
      data: { imageUrl },
    });
    updated++;
  }

  return NextResponse.json({
    ok: true,
    scanned: products.length,
    updated,
    stillMissing,
    note: products.length === 500 ? 'Scanned first 500 missing-image products; run again if needed.' : undefined,
  });
}


