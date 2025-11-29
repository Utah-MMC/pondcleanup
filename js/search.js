// Contractor data
const contractors = [
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
    url: 'contractor/bluewater-pond-garden.html'
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
    url: 'contractor/mountain-pond-solutions.html'
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
    url: 'contractor/rocky-mountain-waterworks.html'
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
    url: 'contractor/clearwater-pond-care.html'
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
    url: 'contractor/aquatic-designs-co.html'
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
    url: 'contractor/utah-water-gardens.html',
    website: 'https://utahwatergardens.com'
  }
];

// Get URL parameters
function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    location: params.get('location') || '',
    service: params.get('service') || ''
  };
}

// Normalize location string for matching
function normalizeLocation(location) {
  return location.toLowerCase().trim();
}

// Check if location matches
function locationMatches(searchLocation, contractor) {
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

// Filter contractors based on search
function filterContractors(location, service) {
  return contractors.filter(contractor => {
    const locationMatch = !location || locationMatches(location, contractor);
    const serviceMatch = !service || contractor.services.some(s => 
      s.toLowerCase().includes(service.toLowerCase()) || 
      service.toLowerCase().includes(s.toLowerCase())
    );
    return locationMatch && serviceMatch;
  });
}

// Generate star rating HTML
function getStarRating(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  let stars = '★'.repeat(fullStars);
  if (hasHalfStar) stars += '☆';
  stars += '☆'.repeat(emptyStars);
  
  return stars;
}

// Render contractor card
function renderContractorCard(contractor) {
  return `
    <article class="contractor-card">
      <div class="card-main">
        <h3><a href="${contractor.url}">${contractor.name}</a></h3>
        <p class="card-location">${contractor.location} • ${contractor.distance}</p>
        <p class="card-rating">${getStarRating(contractor.rating)} ${contractor.rating} (${contractor.reviews} reviews)</p>
        <p class="card-description">${contractor.description}</p>
        <p class="card-services">${contractor.services.join(' • ')}</p>
        ${contractor.website ? `<p class="card-website"><a href="${contractor.website}" target="_blank" rel="noopener">${contractor.website}</a></p>` : ''}
      </div>
      <div class="card-actions">
        <a href="${contractor.url}" class="btn btn-secondary">View Profile</a>
        <button class="btn btn-primary">Request Quote</button>
      </div>
    </article>
  `;
}

// Update search results
function updateSearchResults() {
  const params = getUrlParams();
  const location = params.location;
  const service = params.service;
  
  // Update search form values
  if (location) {
    const locationInput = document.querySelector('input[name="location"]');
    if (locationInput) locationInput.value = location;
  }
  
  if (service) {
    const serviceSelect = document.querySelector('select[name="service"]');
    if (serviceSelect) serviceSelect.value = service;
  }
  
  // Filter contractors
  const filtered = filterContractors(location, service);
  
  // Sort by rating (highest first), then by reviews
  filtered.sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    return b.reviews - a.reviews;
  });
  
  // Update results header
  const resultsHeader = document.querySelector('.results-header h2');
  const resultsCount = document.querySelector('.results-header p strong');
  
  if (resultsHeader) {
    const locationText = location || 'your area';
    resultsHeader.innerHTML = `Contractors near <span class="results-location">${locationText}</span>`;
  }
  
  if (resultsCount) {
    resultsCount.textContent = filtered.length;
  }
  
  // Update results list
  const resultsList = document.querySelector('.results-list');
  if (resultsList) {
    if (filtered.length === 0) {
      resultsList.innerHTML = `
        <div style="text-align: center; padding: var(--spacing-xl);">
          <h3>No contractors found</h3>
          <p>Try searching with a different location or service type.</p>
        </div>
      `;
    } else {
      resultsList.innerHTML = filtered.map(renderContractorCard).join('');
    }
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  updateSearchResults();
});

// Handle form submission from homepage
if (window.location.pathname.includes('find-a-contractor.html')) {
  const form = document.querySelector('.directory-search');
  if (form) {
    form.addEventListener('submit', function(e) {
      // Form will submit naturally, but we can add validation here if needed
    });
  }
}

