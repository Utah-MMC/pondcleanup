const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const BASE_URL = 'https://nationalpondservice.com';
const OUTPUT_DIR = path.resolve(__dirname, 'nationalpondservice.com');
const visited = new Set();
const toVisit = [
  BASE_URL,
  BASE_URL + '/schedule-consultation/',
  BASE_URL + '/my-account/',
  BASE_URL + '/cart/',
  BASE_URL + '/cyanobacteria-blue-green-algae-pond-water-treatment-management/',
  BASE_URL + '/markets-served/',
  BASE_URL + '/pond-water-garden-maintenance-treatment-supplies-products/',
  BASE_URL + '/contact-us/',
  BASE_URL + '/member-main/',
  BASE_URL + '/pond-supplies-products/cyanobacteria-pond-treatment-products/',
  BASE_URL + '/pond-water-feature-cleaning-repair-service/',
  BASE_URL + '/pond-fountains-aerators/',
  BASE_URL + '/pond-water-filtration/',
  BASE_URL + '/pond-muck-sludge-removal-algae-control/',
  BASE_URL + '/pond-dye-precautions/',
  BASE_URL + '/dissolved-organic-carbon-is-important/',
  BASE_URL + '/black-muck-composition/',
  BASE_URL + '/dissolved-oxygen-levels-for-natural-ponds/',
  BASE_URL + '/september-surge-how-algal-blooms-disrupt-the-pond-food-chain/',
  BASE_URL + '/top-5-natural-solutions-for-large-pond-muck-algae-management/',
  BASE_URL + '/privacy-policy/',
  BASE_URL + '/about-this-website/',
];

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function saveFile(url, content) {
  const parsed = new URL(url);
  let filepath = parsed.pathname;
  
  if (!filepath || filepath === '/') {
    filepath = '/index.html';
  } else if (filepath.endsWith('/')) {
    filepath += 'index.html';
  }
  
  filepath = filepath.substring(1);
  const fullPath = path.join(OUTPUT_DIR, filepath);
  const dir = path.dirname(fullPath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(fullPath, content);
  console.log(`✓ Saved: ${filepath}`);
}

async function downloadPage(browser, url) {
  if (visited.has(url)) {
    return;
  }
  
  visited.add(url);
  
  try {
    console.log(`Fetching: ${url}`);
    const page = await browser.newPage();
    
    // Set a realistic viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Navigate to the page
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    
    // Get the HTML content
    const html = await page.content();
    saveFile(url, html);
    
    // Extract links from the page
    const links = await page.evaluate(() => {
      const urls = new Set();
      document.querySelectorAll('a[href]').forEach(a => {
        const href = a.getAttribute('href');
        if (href && href.startsWith('/') || href.includes('nationalpondservice.com')) {
          try {
            const url = new URL(href, window.location.origin).href;
            if (url.includes('nationalpondservice.com')) {
              urls.add(url);
            }
          } catch (e) {}
        }
      });
      return Array.from(urls);
    });
    
    // Add new links to visit
    links.forEach(link => {
      if (!visited.has(link) && !toVisit.includes(link)) {
        toVisit.push(link);
      }
    });
    
    await page.close();
    await new Promise(resolve => setTimeout(resolve, 1000));
    
  } catch (error) {
    console.error(`✗ Error fetching ${url}: ${error.message}`);
  }
}

async function main() {
  console.log('Starting to mirror nationalpondservice.com with Playwright...\n');
  
  const browser = await chromium.launch({ headless: true });
  
  try {
    while (toVisit.length > 0 && visited.size < 100) {
      const url = toVisit.shift();
      await downloadPage(browser, url);
    }
  } finally {
    await browser.close();
  }
  
  console.log(`\n✓ Mirroring complete! Processed ${visited.size} pages`);
}

main().catch(console.error);


