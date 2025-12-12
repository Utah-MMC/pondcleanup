import { NextResponse } from 'next/server';
import { filterContractors } from '@/lib/contractors';

export function GET(req: Request) {
  const url = new URL(req.url);
  const location = url.searchParams.get('location') ?? '';
  const service = url.searchParams.get('service') ?? '';
  // filterContractors already excludes placement contractors, sorts properly, and limits to top 10
  const results = filterContractors(location, service, 10);
  return NextResponse.json({ ok: true, contractors: results });
}


