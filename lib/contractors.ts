export interface Contractor {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  zip: string[];
  distance: string;
  rating: number;
  reviews: number;
  description: string;
  services: string[];
  url: string;
  website?: string;
  isPlacement?: boolean; // If true, this is a paid placement/advertisement, not a legitimate top contractor
}

export const contractors: Contractor[] = [
  {
    id: 'bluewater-pond-garden',
    name: 'Bluewater Pond & Garden',
    location: 'Denver, CO',
    city: 'denver',
    state: 'co',
    zip: ['80202', '80203', '80204'],
    distance: '12 miles away',
    rating: 4.9,
    reviews: 32,
    description: 'Specializing in residential pond cleaning, maintenance, and new installations. Over 10 years of experience serving the Front Range.',
    services: ['Pond Cleaning', 'Maintenance', 'Installation'],
    url: '/pages/contractor/bluewater-pond-garden',
  },
  {
    id: 'mountain-pond-solutions',
    name: 'Mountain Pond Solutions',
    location: 'Boulder, CO',
    city: 'boulder',
    state: 'co',
    zip: ['80301', '80302'],
    distance: '25 miles away',
    rating: 4.7,
    reviews: 18,
    description: 'Expert in alpine pond systems and natural water features. Specializes in eco-friendly maintenance and algae control.',
    services: ['Maintenance', 'Algae Control', 'Repair'],
    url: '/pages/contractor/mountain-pond-solutions',
  },
  {
    id: 'rocky-mountain-waterworks',
    name: 'Rocky Mountain Waterworks',
    location: 'Denver, CO',
    city: 'denver',
    state: 'co',
    zip: ['80202', '80203', '80204'],
    distance: '8 miles away',
    rating: 4.8,
    reviews: 41,
    description: 'Full-service pond and water feature company. From design to installation to ongoing maintenance.',
    services: ['Installation', 'Design', 'Maintenance', 'Cleaning'],
    url: '/pages/contractor/rocky-mountain-waterworks',
  },
  {
    id: 'clearwater-pond-care',
    name: 'Clearwater Pond Care',
    location: 'Aurora, CO',
    city: 'aurora',
    state: 'co',
    zip: ['80010', '80011'],
    distance: '15 miles away',
    rating: 4.9,
    reviews: 27,
    description: 'Focused on koi pond maintenance and cleaning. Seasonal service plans available.',
    services: ['Cleaning', 'Maintenance', 'Repair'],
    url: '/pages/contractor/clearwater-pond-care',
  },
  {
    id: 'aquatic-designs-co',
    name: 'Aquatic Designs Co.',
    location: 'Littleton, CO',
    city: 'littleton',
    state: 'co',
    zip: ['80120', '80121'],
    distance: '20 miles away',
    rating: 4.6,
    reviews: 22,
    description: 'Custom water feature design and installation. Specializes in large-scale commercial and residential projects.',
    services: ['Installation', 'Design', 'Water Features'],
    url: '/pages/contractor/aquatic-designs-co',
  },
  {
    id: 'utah-water-gardens',
    name: 'Utah Water Gardens',
    location: 'Salt Lake City, UT',
    city: 'salt lake city',
    state: 'ut',
    zip: ['84101', '84102', '84103', '84104', '84105', '84106', '84107', '84108', '84109', '84110', '84111', '84112', '84113', '84114', '84115', '84116', '84117', '84118', '84119', '84120', '84121', '84123', '84124', '84128'],
    distance: '0 miles away',
    rating: 4.9,
    reviews: 45,
    description: 'Utah\'s premier pond and water feature specialists. Expert installation, maintenance, and repair services for residential and commercial properties throughout the Salt Lake Valley.',
    services: ['Installation', 'Maintenance', 'Cleaning', 'Repair', 'Algae Control', 'Design'],
    url: '/pages/contractor/utah-water-gardens',
    website: 'https://utahwatergardens.com',
  },
];

export function normalizeLocation(location: string): string {
  return location.toLowerCase().trim();
}

export function locationMatches(searchLocation: string, contractor: Contractor): boolean {
  if (!searchLocation) return true;
  
  const normalized = normalizeLocation(searchLocation);
  
  // Check city
  if (normalized.includes(contractor.city)) return true;
  
  // Check state
  if (normalized.includes(contractor.state)) return true;
  
  // Check full location
  if (normalized.includes(normalizeLocation(contractor.location))) return true;
  
  // Check ZIP codes
  if (contractor.zip && contractor.zip.some(zip => normalized.includes(zip))) return true;
  
  // Check common variations
  if (normalized.includes('salt lake') && contractor.city.includes('salt lake')) return true;
  if (normalized.includes('slc') && contractor.city.includes('salt lake')) return true;
  
  return false;
}

/**
 * Extract numeric distance from distance string (e.g., "12 miles away" -> 12)
 */
function parseDistance(distance: string): number {
  const match = distance.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : Infinity;
}

export function filterContractors(location: string, service: string, limit: number = 10): Contractor[] {
  // Filter out placement contractors and apply location/service filters
  const filtered = contractors.filter(contractor => {
    // Exclude placement contractors - only show legitimate top contractors
    if (contractor.isPlacement === true) {
      return false;
    }
    
    const locationMatch = !location || locationMatches(location, contractor);
    const serviceMatch = !service || contractor.services.some(s => 
      s.toLowerCase().includes(service.toLowerCase()) || 
      service.toLowerCase().includes(s.toLowerCase())
    );
    return locationMatch && serviceMatch;
  });

  // Sort by: distance (closest first), then rating (highest first), then reviews (most first)
  filtered.sort((a, b) => {
    const distanceA = parseDistance(a.distance);
    const distanceB = parseDistance(b.distance);
    
    // Prioritize contractors with 0 miles (exact location match)
    if (distanceA === 0 && distanceB !== 0) return -1;
    if (distanceB === 0 && distanceA !== 0) return 1;
    
    // Then sort by distance
    if (distanceA !== distanceB) {
      return distanceA - distanceB;
    }
    
    // Then by rating (higher is better)
    if (b.rating !== a.rating) {
      return b.rating - a.rating;
    }
    
    // Finally by number of reviews (more is better)
    return b.reviews - a.reviews;
  });

  // Return top N legitimate contractors
  return filtered.slice(0, limit);
}

export function getStarRating(rating: number): string {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  let stars = '★'.repeat(fullStars);
  if (hasHalfStar) stars += '☆';
  stars += '☆'.repeat(emptyStars);
  
  return stars;
}

