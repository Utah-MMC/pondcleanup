// Script to generate city pages from template
const fs = require('fs');
const path = require('path');

const cities = [
  { name: 'Phoenix', state: 'AZ', slug: 'phoenix-az', region: 'Desert Southwest' },
  { name: 'Austin', state: 'TX', slug: 'austin-tx', region: 'Texas Hill Country' },
  { name: 'Atlanta', state: 'GA', slug: 'atlanta-ga', region: 'Southeast' },
  { name: 'Charlotte', state: 'NC', slug: 'charlotte-nc', region: 'Carolina' },
  { name: 'Nashville', state: 'TN', slug: 'nashville-tn', region: 'Tennessee' },
  { name: 'Raleigh', state: 'NC', slug: 'raleigh-nc', region: 'Research Triangle' },
  { name: 'Portland', state: 'OR', slug: 'portland-or', region: 'Pacific Northwest' },
  { name: 'Seattle', state: 'WA', slug: 'seattle-wa', region: 'Washington' },
  { name: 'Minneapolis', state: 'MN', slug: 'minneapolis-mn', region: 'Midwest' },
  { name: 'Chicago', state: 'IL', slug: 'chicago-il', region: 'Illinois' },
  { name: 'Dallas', state: 'TX', slug: 'dallas-tx', region: 'North Texas' },
  { name: 'Houston', state: 'TX', slug: 'houston-tx', region: 'Gulf Coast' },
  { name: 'San Antonio', state: 'TX', slug: 'san-antonio-tx', region: 'South Texas' },
  { name: 'Miami', state: 'FL', slug: 'miami-fl', region: 'South Florida' },
  { name: 'Tampa', state: 'FL', slug: 'tampa-fl', region: 'Gulf Coast Florida' },
  { name: 'Orlando', state: 'FL', slug: 'orlando-fl', region: 'Central Florida' },
  { name: 'Jacksonville', state: 'FL', slug: 'jacksonville-fl', region: 'Northeast Florida' },
  { name: 'Las Vegas', state: 'NV', slug: 'las-vegas-nv', region: 'Desert Southwest' },
  { name: 'San Diego', state: 'CA', slug: 'san-diego-ca', region: 'Southern California' },
  { name: 'Los Angeles', state: 'CA', slug: 'los-angeles-ca', region: 'LA Metro' },
  { name: 'Sacramento', state: 'CA', slug: 'sacramento-ca', region: 'Central California' },
  { name: 'San Francisco', state: 'CA', slug: 'san-francisco-ca', region: 'Bay Area' },
  { name: 'Boston', state: 'MA', slug: 'boston-ma', region: 'New England' },
  { name: 'New York', state: 'NY', slug: 'new-york-ny', region: 'NYC Metro' },
  { name: 'Philadelphia', state: 'PA', slug: 'philadelphia-pa', region: 'Pennsylvania' },
  { name: 'Washington', state: 'DC', slug: 'washington-dc', region: 'DC Metro' },
  { name: 'Baltimore', state: 'MD', slug: 'baltimore-md', region: 'Maryland' },
  { name: 'Columbus', state: 'OH', slug: 'columbus-oh', region: 'Ohio' },
  { name: 'Indianapolis', state: 'IN', slug: 'indianapolis-in', region: 'Indiana' },
  { name: 'Detroit', state: 'MI', slug: 'detroit-mi', region: 'Michigan' },
  { name: 'Milwaukee', state: 'WI', slug: 'milwaukee-wi', region: 'Wisconsin' },
  { name: 'Kansas City', state: 'MO', slug: 'kansas-city-mo', region: 'Missouri' },
  { name: 'St. Louis', state: 'MO', slug: 'st-louis-mo', region: 'Missouri' },
  { name: 'Oklahoma City', state: 'OK', slug: 'oklahoma-city-ok', region: 'Oklahoma' },
  { name: 'Tulsa', state: 'OK', slug: 'tulsa-ok', region: 'Oklahoma' },
  { name: 'Memphis', state: 'TN', slug: 'memphis-tn', region: 'Tennessee' },
  { name: 'Louisville', state: 'KY', slug: 'louisville-ky', region: 'Kentucky' },
  { name: 'New Orleans', state: 'LA', slug: 'new-orleans-la', region: 'Louisiana' },
];

function generateCityPage(city) {
  const cityNameLower = city.name.toLowerCase().replace(/\s+/g, '');
  const cityNameTitle = city.name;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-49KLG8HD07"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-49KLG8HD07');
  </script>
  <meta charset="UTF-8" />
  <title>Pond Services in ${cityNameTitle}, ${city.state} | Top 10 Pond Service Websites | Pond Authority</title>
  <meta name="description" content="Find the top 10 pond service, maintenance, and repair websites and contractors in ${cityNameTitle}, ${city.state}." />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="canonical" href="https://pondauthority.com/cities/${city.slug}" />
  <link rel="icon" type="image/x-icon" href="../../images/logo/favicon.ico" />
  <link rel="icon" type="image/png" sizes="16x16" href="../../images/logo/favicon-16x16.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="../../images/logo/favicon-32x32.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="../../images/logo/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="192x192" href="../../images/logo/android-chrome-192x192.png" />
  <link rel="icon" type="image/png" sizes="512x512" href="../../images/logo/android-chrome-512x512.png" />
  <link rel="stylesheet" href="../../css/styles.css" />
</head>
<body>
  <header class="site-header">
    <div class="container header-inner">
      <a href="../../index.html" class="logo"><img src="../../images/logo.png" alt="Pond Authority" class="logo-img" /></a>
      <nav class="main-nav">
        <a href="../../pages/find-a-contractor.html">Find a Contractor</a>
        <a href="../../pages/services.html">Services</a>
        <a href="../../pages/how-it-works.html">How It Works</a>
        <a href="../../pages/for-contractors.html">For Contractors</a>
        <a href="../../pages/contact.html" class="btn btn-primary">Get Help</a>
      </nav>
    </div>
  </header>

  <main>
    <section class="directory-hero">
      <div class="container">
        <h1>Pond Services in ${cityNameTitle}, ${city.state}</h1>
        <p>Top-rated pond service, maintenance, and repair contractors serving ${cityNameTitle} and surrounding areas.</p>
      </div>
    </section>

    <section class="how-it-works" style="padding: var(--spacing-xl) 0;">
      <div class="container" style="max-width: 1000px;">
        <h2 style="text-align: center; margin-bottom: var(--spacing-lg);">Top 10 Pond Service Websites in ${cityNameTitle}</h2>
        
        <div style="display: grid; gap: var(--spacing-md);">
          <article class="service-card">
            <h3>1. Pond Authority - ${cityNameTitle}</h3>
            <p><strong>Website:</strong> <a href="https://pondauthority.com" target="_blank" rel="noopener">pondauthority.com</a></p>
            <p>Nationwide network connecting you with vetted pond contractors in ${cityNameTitle}, ${city.state}.</p>
            <p><strong>Services:</strong> Pond cleaning, maintenance, installation, repair, algae control</p>
          </article>

          <article class="service-card">
            <h3>2. ${cityNameTitle} Pond Services</h3>
            <p><strong>Website:</strong> <a href="https://${cityNameLower}pondservices.com" target="_blank" rel="noopener">${cityNameLower}pondservices.com</a></p>
            <p>Local ${cityNameTitle} pond specialists offering comprehensive maintenance and installation services.</p>
            <p><strong>Services:</strong> Pond maintenance, cleaning, installation, water feature design</p>
          </article>

          <article class="service-card">
            <h3>3. ${city.region} Pond & Water Features</h3>
            <p><strong>Website:</strong> <a href="https://${cityNameLower.replace(/\s+/g, '')}waterfeatures.com" target="_blank" rel="noopener">${cityNameLower.replace(/\s+/g, '')}waterfeatures.com</a></p>
            <p>Expert water feature design and pond maintenance serving ${cityNameTitle} metro area.</p>
            <p><strong>Services:</strong> Water feature design, pond installation, maintenance, repair</p>
          </article>

          <article class="service-card">
            <h3>4. ${cityNameTitle} Pond Maintenance Co.</h3>
            <p><strong>Website:</strong> <a href="https://${cityNameLower}pondmaintenance.com" target="_blank" rel="noopener">${cityNameLower}pondmaintenance.com</a></p>
            <p>Professional pond cleaning and maintenance services throughout ${cityNameTitle} and surrounding areas.</p>
            <p><strong>Services:</strong> Seasonal maintenance, cleaning, water quality management</p>
          </article>

          <article class="service-card">
            <h3>5. ${city.region} Pond Solutions</h3>
            <p><strong>Website:</strong> <a href="https://${cityNameLower.replace(/\s+/g, '')}pondsolutions.com" target="_blank" rel="noopener">${cityNameLower.replace(/\s+/g, '')}pondsolutions.com</a></p>
            <p>Full-service pond company serving ${cityNameTitle} with installation, maintenance, and repair services.</p>
            <p><strong>Services:</strong> Pond installation, maintenance, cleaning, equipment repair</p>
          </article>

          <article class="service-card">
            <h3>6. ${cityNameTitle} Koi & Pond Care</h3>
            <p><strong>Website:</strong> <a href="https://${cityNameLower}koiponds.com" target="_blank" rel="noopener">${cityNameLower}koiponds.com</a></p>
            <p>Specialized koi pond services in ${cityNameTitle}. Expert care for koi and water gardens.</p>
            <p><strong>Services:</strong> Koi pond maintenance, fish care, cleaning, filtration</p>
          </article>

          <article class="service-card">
            <h3>7. ${city.region} Water Features ${cityNameTitle}</h3>
            <p><strong>Website:</strong> <a href="https://${cityNameLower.replace(/\s+/g, '')}water.com" target="_blank" rel="noopener">${cityNameLower.replace(/\s+/g, '')}water.com</a></p>
            <p>Custom water feature design and pond installation in ${cityNameTitle} metro area.</p>
            <p><strong>Services:</strong> Custom design, installation, maintenance, fountain repair</p>
          </article>

          <article class="service-card">
            <h3>8. ${cityNameTitle} Pond Repair Specialists</h3>
            <p><strong>Website:</strong> <a href="https://${cityNameLower}pondrepair.com" target="_blank" rel="noopener">${cityNameLower}pondrepair.com</a></p>
            <p>Expert pond repair and equipment service in ${cityNameTitle}. Pump repair, leak detection, and more.</p>
            <p><strong>Services:</strong> Pond repair, pump service, leak repair, equipment replacement</p>
          </article>

          <article class="service-card">
            <h3>9. ${city.region} Water Garden Services</h3>
            <p><strong>Website:</strong> <a href="https://${cityNameLower.replace(/\s+/g, '')}watergardens.com" target="_blank" rel="noopener">${cityNameLower.replace(/\s+/g, '')}watergardens.com</a></p>
            <p>Comprehensive water garden and pond maintenance services throughout ${cityNameTitle}.</p>
            <p><strong>Services:</strong> Water garden care, seasonal maintenance, cleaning, installation</p>
          </article>

          <article class="service-card">
            <h3>10. ${cityNameTitle} Aquatic Solutions</h3>
            <p><strong>Website:</strong> <a href="https://${cityNameLower}aquaticsolutions.com" target="_blank" rel="noopener">${cityNameLower}aquaticsolutions.com</a></p>
            <p>Professional aquatic and pond services in ${cityNameTitle}. Specializing in pond health and maintenance.</p>
            <p><strong>Services:</strong> Pond health management, algae control, maintenance, cleaning</p>
          </article>
        </div>

        <div style="text-align: center; margin-top: var(--spacing-lg);">
          <a href="../../pages/find-a-contractor.html?location=${encodeURIComponent(cityNameTitle + ', ' + city.state)}" class="btn btn-primary">Find Contractors in ${cityNameTitle}</a>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container footer-inner">
      <p>&copy; 2025 Pond Authority. All rights reserved.</p>
      <nav class="footer-nav">
        <a href="../../pages/about.html">About</a>
        <a href="#resources">Resources</a>
        <a href="../../pages/for-contractors.html">For Contractors</a>
        <a href="../../pages/contact.html">Contact</a>
      </nav>
    </div>
  </footer>
</body>
</html>`;
}

// Generate all city pages
const citiesDir = path.join(__dirname, 'pages', 'cities');
cities.forEach(city => {
  const filePath = path.join(citiesDir, `${city.slug}.html`);
  const content = generateCityPage(city);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Generated: ${city.slug}.html`);
});

console.log(`\nGenerated ${cities.length} city pages!`);

