import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdminToken } from '@/lib/adminAuth';
import { normalizeImportRows, type ProductImportRow } from '@/lib/productImport';

export async function POST(req: Request) {
  const auth = requireAdminToken(req);
  if (!auth.ok) return auth.response;

  let payload: { rows?: ProductImportRow[]; source?: string };
  try {
    payload = (await req.json()) as { rows?: ProductImportRow[]; source?: string };
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const rows = payload.rows;
  if (!Array.isArray(rows)) {
    return NextResponse.json({ ok: false, error: 'Expected { rows: [...] }' }, { status: 400 });
  }

  const source = String(payload.source || 'alidrop');
  const { items, result } = normalizeImportRows(rows, source);

  for (let i = 0; i < items.length; i++) {
    const item = items[i]!;
    const rowNumber = i + 1;

    let slug = item.slug;
    // eslint-disable-next-line no-await-in-loop
    const existing = await prisma.product.findUnique({ where: { slug } });
    if (existing && existing.name !== item.name) {
      slug = `${item.slug}-${rowNumber}`.slice(0, 80);
    }

    // eslint-disable-next-line no-await-in-loop
    const before = await prisma.product.findUnique({ where: { slug } });

    // eslint-disable-next-line no-await-in-loop
    await prisma.product.upsert({
      where: { slug },
      create: {
        source: item.source,
        externalId: item.externalId,
        slug,
        name: item.name,
        shortDescription: item.shortDescription,
        description: item.description,
        priceCents: item.priceCents,
        imageUrl: item.imageUrl,
        active: item.active,
        raw: item.raw as never,
      },
      update: {
        source: item.source,
        externalId: item.externalId,
        name: item.name,
        shortDescription: item.shortDescription,
        description: item.description,
        priceCents: item.priceCents,
        imageUrl: item.imageUrl,
        active: item.active,
        raw: item.raw as never,
      },
    });

    if (before) result.updated++;
    else result.created++;
  }

  return NextResponse.json({ ok: true, result });
}


