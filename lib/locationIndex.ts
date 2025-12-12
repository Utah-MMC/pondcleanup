import { allCitySlugs, parseCitySlug } from '@/lib/cities';

export type StateEntry = { code: string; name: string; cityCount: number };
export type CityEntry = { slug: string; name: string; state: string };

// Minimal mapping; extend as needed.
const STATE_NAMES: Record<string, string> = {
  AK: 'Alaska',
  AZ: 'Arizona',
  CA: 'California',
  CO: 'Colorado',
  DC: 'District of Columbia',
  FL: 'Florida',
  GA: 'Georgia',
  IL: 'Illinois',
  IN: 'Indiana',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  MA: 'Massachusetts',
  MD: 'Maryland',
  MI: 'Michigan',
  MN: 'Minnesota',
  MO: 'Missouri',
  NC: 'North Carolina',
  NE: 'Nebraska',
  NJ: 'New Jersey',
  NV: 'Nevada',
  NY: 'New York',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VA: 'Virginia',
  WA: 'Washington',
  WI: 'Wisconsin',
};

export function getStateName(code: string): string {
  const upper = code.toUpperCase();
  return STATE_NAMES[upper] ?? upper;
}

export function getStates(): StateEntry[] {
  const counts = new Map<string, number>();
  for (const slug of allCitySlugs) {
    const parsed = parseCitySlug(slug);
    if (!parsed) continue;
    const code = parsed.state.toUpperCase();
    counts.set(code, (counts.get(code) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([code, cityCount]) => ({ code, name: getStateName(code), cityCount }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getCitiesForState(stateCode: string): CityEntry[] {
  const upper = stateCode.toUpperCase();
  const cities: CityEntry[] = [];
  for (const slug of allCitySlugs) {
    const parsed = parseCitySlug(slug);
    if (!parsed) continue;
    if (parsed.state.toUpperCase() !== upper) continue;
    cities.push({ slug, name: parsed.name, state: upper });
  }
  return cities.sort((a, b) => a.name.localeCompare(b.name));
}


