import { slugify } from '@/lib/slugify';

export type ProductImportRow = Record<string, unknown>;

export type NormalizedProduct = {
  source: string;
  externalId: string | null;
  slug: string;
  name: string;
  shortDescription: string | null;
  description: string | null;
  priceCents: number;
  imageUrl: string | null;
  active: boolean;
  raw: ProductImportRow;
};

export type ImportResult = {
  created: number;
  updated: number;
  skipped: number;
  errors: Array<{ row: number; message: string }>;
};

function parseNumberToCents(n: number): number | null {
  if (!Number.isFinite(n) || n < 0) return null;
  // Heuristic: if it's a large integer (e.g. 1999), treat as cents; otherwise dollars.
  if (Number.isInteger(n) && n >= 500) return n;
  return Math.round(n * 100);
}

function parseMoneyToCents(v: unknown): number | null {
  if (typeof v === 'number') return parseNumberToCents(v);
  if (typeof v === 'string') {
    const s = v.trim().replace(/[^0-9.]/g, '');
    if (!s) return null;
    const n = Number(s);
    return parseNumberToCents(n);
  }
  // Common API shapes: { amount: 12.34 }, { value: "12.34" }, { price: { amount: ... } }
  if (v && typeof v === 'object') {
    const obj = v as Record<string, unknown>;
    const direct = obj.amount ?? obj.value ?? obj.price ?? obj.cost;
    if (direct != null) return parseMoneyToCents(direct);
  }
  return null;
}

function pickFirst(row: Record<string, unknown>, keys: string[]): unknown {
  for (const k of keys) {
    if (row[k] != null && String(row[k]).trim() !== '') return row[k];
  }
  return undefined;
}

function collectPriceCandidates(row: ProductImportRow): Array<{ path: string; value: unknown }> {
  const out: Array<{ path: string; value: unknown }> = [];
  const seen = new Set<unknown>();

  function walk(v: unknown, path: string, depth: number) {
    if (depth > 4) return;
    if (v == null) return;
    if (typeof v !== 'object') return;
    if (seen.has(v)) return;
    seen.add(v);

    if (Array.isArray(v)) {
      for (let i = 0; i < Math.min(v.length, 25); i++) {
        walk(v[i], `${path}[${i}]`, depth + 1);
      }
      return;
    }

    const obj = v as Record<string, unknown>;
    for (const [k, val] of Object.entries(obj)) {
      const nextPath = path ? `${path}.${k}` : k;
      const key = k.toLowerCase();
      if (key.includes('price') || key.includes('cost') || key.includes('amount')) {
        out.push({ path: nextPath, value: val });
      }
      walk(val, nextPath, depth + 1);
    }
  }

  walk(row, '', 0);
  return out;
}

function extractPriceCents(row: ProductImportRow, preferredKeys: string[]): { priceCents: number | null; hint?: string } {
  // 1) direct preferred keys
  const direct = pickFirst(row, preferredKeys);
  const directCents = parseMoneyToCents(direct);
  if (directCents != null) return { priceCents: directCents };

  // 2) nested scan: find the first candidate that parses
  const candidates = collectPriceCandidates(row);
  for (const c of candidates) {
    const cents = parseMoneyToCents(c.value);
    if (cents != null) return { priceCents: cents };
  }

  // 3) hint: show a few candidate paths to help mapping
  const samplePaths = candidates.slice(0, 6).map((c) => c.path).filter(Boolean);
  const hint = samplePaths.length ? ` (found price-like fields: ${samplePaths.join(', ')})` : '';
  return { priceCents: null, hint };
}

function isLikelyImageUrl(s: string): boolean {
  const v = s.trim();
  if (!v) return false;
  if (!(v.startsWith('http://') || v.startsWith('https://') || v.startsWith('//'))) return false;
  return true;
}

function normalizeUrl(s: string): string {
  const v = s.trim();
  if (v.startsWith('//')) return `https:${v}`;
  return v;
}

function collectImageCandidates(row: ProductImportRow): Array<{ path: string; value: unknown }> {
  const out: Array<{ path: string; value: unknown }> = [];
  const seen = new Set<unknown>();

  function walk(v: unknown, path: string, depth: number) {
    if (depth > 5) return;
    if (v == null) return;
    if (seen.has(v)) return;

    if (typeof v === 'string') {
      const keyHint = path.toLowerCase();
      if ((keyHint.includes('image') || keyHint.includes('img') || keyHint.includes('thumb') || keyHint.includes('photo')) && isLikelyImageUrl(v)) {
        out.push({ path, value: v });
      }
      return;
    }

    if (typeof v !== 'object') return;
    seen.add(v);

    if (Array.isArray(v)) {
      for (let i = 0; i < Math.min(v.length, 25); i++) {
        walk(v[i], `${path}[${i}]`, depth + 1);
      }
      return;
    }

    const obj = v as Record<string, unknown>;
    for (const [k, val] of Object.entries(obj)) {
      const nextPath = path ? `${path}.${k}` : k;
      const key = k.toLowerCase();

      if (key.includes('image') || key.includes('img') || key.includes('thumb') || key.includes('photo') || key === 'url' || key === 'src') {
        out.push({ path: nextPath, value: val });
      }
      walk(val, nextPath, depth + 1);
    }
  }

  walk(row, '', 0);
  return out;
}

function extractImageUrl(row: ProductImportRow, preferredKeys: string[]): string | null {
  const direct = pickFirst(row, preferredKeys);
  if (typeof direct === 'string' && isLikelyImageUrl(direct)) return normalizeUrl(direct);

  // Common shapes: images: [{url:...}], image: {url:...}, gallery: [...]
  if (direct && typeof direct === 'object') {
    const obj = direct as Record<string, unknown>;
    const candidate = obj.url ?? obj.src ?? obj.image ?? obj.imageUrl;
    if (typeof candidate === 'string' && isLikelyImageUrl(candidate)) return normalizeUrl(candidate);
  }
  if (Array.isArray(direct)) {
    for (const el of direct) {
      if (typeof el === 'string' && isLikelyImageUrl(el)) return normalizeUrl(el);
      if (el && typeof el === 'object') {
        const o = el as Record<string, unknown>;
        const candidate = o.url ?? o.src ?? o.image ?? o.imageUrl;
        if (typeof candidate === 'string' && isLikelyImageUrl(candidate)) return normalizeUrl(candidate);
      }
    }
  }

  const candidates = collectImageCandidates(row);
  for (const c of candidates) {
    if (typeof c.value === 'string' && isLikelyImageUrl(c.value)) return normalizeUrl(c.value);
    if (Array.isArray(c.value)) {
      for (const el of c.value) {
        if (typeof el === 'string' && isLikelyImageUrl(el)) return normalizeUrl(el);
        if (el && typeof el === 'object') {
          const o = el as Record<string, unknown>;
          const candidate = o.url ?? o.src ?? o.image ?? o.imageUrl;
          if (typeof candidate === 'string' && isLikelyImageUrl(candidate)) return normalizeUrl(candidate);
        }
      }
    }
    if (c.value && typeof c.value === 'object') {
      const o = c.value as Record<string, unknown>;
      const candidate = o.url ?? o.src ?? o.image ?? o.imageUrl;
      if (typeof candidate === 'string' && isLikelyImageUrl(candidate)) return normalizeUrl(candidate);
    }
  }

  return null;
}

export function extractImageUrlFromRow(row: ProductImportRow): string | null {
  const imageKeys = [
    'image',
    'image_url',
    'Image Src',
    'featured_image',
    'main_image',
    'imageUrl',
    'image_url_1',
    'thumbnail',
    'thumb',
    'thumb_url',
    'mainImage',
    'images',
  ];
  return extractImageUrl(row, imageKeys);
}

export function normalizeImportRows(rows: ProductImportRow[], source: string): { items: NormalizedProduct[]; result: ImportResult } {
  const result: ImportResult = { created: 0, updated: 0, skipped: 0, errors: [] };
  const items: NormalizedProduct[] = [];

  // Common column names across exporters + APIs
  const nameKeys = ['title', 'name', 'product_name', 'Product Name'];
  const slugKeys = ['handle', 'slug', 'url_handle', 'Handle'];
  const priceKeys = [
    'price',
    'Price',
    'variant_price',
    'regular_price',
    'sale_price',
    'salePrice',
    'regularPrice',
    'priceCents',
    'price_cents',
    'min_price',
    'max_price',
    'price_min',
    'price_max',
  ];
  const shortKeys = ['short_description', 'Short Description', 'summary'];
  const descKeys = ['description', 'body_html', 'Description', 'Body (HTML)'];
  const imageKeys = [
    'image',
    'image_url',
    'Image Src',
    'featured_image',
    'main_image',
    'imageUrl',
    'image_url_1',
    'thumbnail',
    'thumb',
    'thumb_url',
    'mainImage',
    'images',
  ];
  const idKeys = ['id', 'product_id', 'external_id', 'Product ID'];
  const activeKeys = ['active', 'status', 'published', 'Visible', 'Published'];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i] || {};
    const rowNumber = i + 1;

    const name = String(pickFirst(row, nameKeys) ?? '').trim();
    if (!name) {
      result.skipped++;
      continue;
    }

    const explicitSlug = String(pickFirst(row, slugKeys) ?? '').trim();
    const slugBase = explicitSlug || slugify(name);
    if (!slugBase) {
      result.errors.push({ row: rowNumber, message: 'Unable to generate slug' });
      continue;
    }

    const price = extractPriceCents(row, priceKeys);
    if (price.priceCents == null) {
      result.errors.push({ row: rowNumber, message: `Missing/invalid price${price.hint ?? ''}` });
      continue;
    }

    const shortDescription = String(pickFirst(row, shortKeys) ?? '').trim() || null;
    const description = String(pickFirst(row, descKeys) ?? '').trim() || null;
    const imageUrl = extractImageUrl(row, imageKeys);
    const externalId = String(pickFirst(row, idKeys) ?? '').trim() || null;

    const activeRaw = pickFirst(row, activeKeys);
    const active =
      activeRaw == null
        ? true
        : ['true', '1', 'yes', 'active', 'published'].includes(String(activeRaw).toLowerCase().trim());

    items.push({
      source,
      externalId,
      slug: slugBase,
      name,
      shortDescription,
      description,
      priceCents: price.priceCents,
      imageUrl,
      active,
      raw: row,
    });
  }

  return { items, result };
}


