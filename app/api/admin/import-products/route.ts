import Papa from 'papaparse';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdminToken } from '@/lib/adminAuth';
import { normalizeImportRows } from '@/lib/productImport';

export async function POST(req: Request) {
  const auth = requireAdminToken(req);
  if (!auth.ok) return auth.response;

  const contentType = req.headers.get('content-type') || '';
  if (!contentType.includes('multipart/form-data')) {
    return NextResponse.json({ ok: false, error: 'Expected multipart/form-data' }, { status: 400 });
  }

  const form = await req.formData();
  const file = form.get('file');
  const source = String(form.get('source') || 'alidrop');

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: 'Missing file' }, { status: 400 });
  }

  const text = await file.text();
  const parsed = Papa.parse<Record<string, unknown>>(text, {
    header: true,
    skipEmptyLines: true,
  });

  if (parsed.errors?.length) {
    return NextResponse.json({ ok: false, error: parsed.errors[0]?.message || 'CSV parse error' }, { status: 400 });
  }

  const rows = parsed.data ?? [];
  const { items, result } = normalizeImportRows(rows, source);

  for (let i = 0; i < items.length; i++) {
    const item = items[i]!;
    // CSV row numbers: +1 header, +1 1-based -> +2 overall
    const rowNumber = i + 2;

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


