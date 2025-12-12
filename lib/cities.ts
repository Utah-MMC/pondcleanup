// City slug to city data mapping
// Format: "city-state" -> { name: "City", state: "ST", region: "Region Name" }

export interface CityData {
  name: string;
  state: string;
  region: string;
  description: string;
}

// Parse city slug (e.g., "austin-tx" -> "Austin, TX")
export function parseCitySlug(slug: string): { name: string; state: string } | null {
  const parts = slug.split('-');
  if (parts.length < 2) return null;
  
  const state = parts[parts.length - 1].toUpperCase();
  const cityParts = parts.slice(0, -1);
  const name = cityParts
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
  
  return { name, state };
}

// Get region for a state
function getRegion(state: string): string {
  const regions: Record<string, string> = {
    // West Coast
    'CA': 'California',
    'WA': 'Washington',
    'OR': 'Oregon',
    // Southwest & Texas
    'TX': 'Texas',
    'AZ': 'Arizona',
    'NV': 'Nevada',
    // Midwest
    'IL': 'Illinois',
    'CO': 'Colorado',
    'MN': 'Minnesota',
    'MO': 'Missouri',
    'IN': 'Indiana',
    'OH': 'Ohio',
    'MI': 'Michigan',
    'WI': 'Wisconsin',
    'NE': 'Nebraska',
    'KS': 'Kansas',
    // Southeast
    'GA': 'Georgia',
    'FL': 'Florida',
    'NC': 'North Carolina',
    'TN': 'Tennessee',
    'KY': 'Kentucky',
    // Northeast
    'NY': 'New York',
    'MA': 'Massachusetts',
    'PA': 'Pennsylvania',
    'DC': 'District of Columbia',
    'MD': 'Maryland',
    'VA': 'Virginia',
    'NJ': 'New Jersey',
    // Other
    'LA': 'Louisiana',
    'OK': 'Oklahoma',
    'AK': 'Alaska',
    'UT': 'Utah',
  };
  
  return regions[state] || state;
}

// Generate city data from slug
export function getCityData(slug: string): CityData | null {
  const parsed = parseCitySlug(slug);
  if (!parsed) return null;
  
  const { name, state } = parsed;
  const region = getRegion(state);
  
  // Generate description based on region
  let description = `Top-rated pond service, maintenance, and repair contractors serving ${name} and the ${region} area.`;
  
  // Special cases for major cities
  const specialDescriptions: Record<string, string> = {
    'austin-tx': 'Top-rated pond service, maintenance, and repair contractors serving Austin and the Texas Hill Country.',
    'denver-co': 'Top-rated pond service, maintenance, and repair contractors serving Denver and the Front Range.',
    'chicago-il': 'Top-rated pond service, maintenance, and repair contractors serving Chicago and the Illinois area.',
    'salt-lake-city-ut': 'Top-rated pond service, maintenance, and repair contractors serving Salt Lake City and the Salt Lake Valley.',
  };
  
  if (specialDescriptions[slug]) {
    description = specialDescriptions[slug];
  }
  
  return {
    name,
    state,
    region,
    description,
  };
}

// All city slugs from the sitemap
export const allCitySlugs = [
  'anaheim-ca', 'anchorage-ak', 'arlington-tx', 'arlington-va', 'atlanta-ga',
  'aurora-co', 'austin-tx', 'bakersfield-ca', 'baltimore-md', 'boston-ma',
  'buffalo-ny', 'charlotte-nc', 'chicago-il', 'chula-vista-ca', 'cincinnati-oh',
  'cleveland-oh', 'colorado-springs-co', 'columbus-oh', 'corpus-christi-tx',
  'dallas-tx', 'denver-co', 'detroit-mi', 'fort-worth-tx', 'greensboro-nc',
  'henderson-nv', 'houston-tx', 'indianapolis-in', 'jacksonville-fl',
  'jersey-city-nj', 'kansas-city-mo', 'las-vegas-nv', 'lexington-ky',
  'lincoln-ne', 'los-angeles-ca', 'louisville-ky', 'memphis-tn', 'mesa-az',
  'miami-fl', 'milwaukee-wi', 'minneapolis-mn', 'nashville-tn',
  'new-orleans-la', 'new-york-ny', 'norfolk-va', 'oakland-ca',
  'oklahoma-city-ok', 'omaha-ne', 'orlando-fl', 'philadelphia-pa',
  'phoenix-az', 'pittsburgh-pa', 'plano-tx', 'portland-or', 'raleigh-nc',
  'riverside-ca', 'sacramento-ca', 'salt-lake-city-ut', 'san-antonio-tx',
  'san-diego-ca', 'san-francisco-ca', 'santa-ana-ca', 'seattle-wa',
  'st-louis-mo', 'st-paul-mn', 'stockton-ca', 'tampa-fl', 'toledo-oh',
  'tulsa-ok', 'washington-dc', 'wichita-ks',
];

