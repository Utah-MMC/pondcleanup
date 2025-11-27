const fs = require('fs');
const path = require('path');
const https = require('https');
const { URL } = require('url');
const { execSync } = require('child_process');

// URLs extracted from the browser snapshot
const urlsToDownload = [
  'https://nationalpondservice.com/',
  'https://nationalpondservice.com/schedule-consultation/',
  'https://nationalpondservice.com/my-account/',
  'https://nationalpondservice.com/cart/',
  'https://nationalpondservice.com/cyanobacteria-blue-green-algae-pond-water-treatment-management/',
  'https://nationalpondservice.com/markets-served/',
  'https://nationalpondservice.com/pond-water-garden-maintenance-treatment-supplies-products/',
  'https://nationalpondservice.com/contact-us/',
  'https://nationalpondservice.com/member-main/',
  'https://nationalpondservice.com/pond-supplies-products/cyanobacteria-pond-treatment-products/',
  'https://nationalpondservice.com/pond-water-feature-cleaning-repair-service/',
  'https://nationalpondservice.com/pond-fountains-aerators/',
  'https://nationalpondservice.com/pond-water-filtration/',
  'https://nationalpondservice.com/pond-muck-sludge-removal-algae-control/',
  'https://nationalpondservice.com/pond-dye-precautions/',
  'https://nationalpondservice.com/dissolved-organic-carbon-is-important/',
  'https://nationalpondservice.com/black-muck-composition/',
  'https://nationalpondservice.com/dissolved-oxygen-levels-for-natural-ponds/',
  'https://nationalpondservice.com/september-surge-how-algal-blooms-disrupt-the-pond-food-chain/',
  'https://nationalpondservice.com/top-5-natural-solutions-for-large-pond-muck-algae-management/',
  'https://nationalpondservice.com/privacy-policy/',
  'https://nationalpondservice.com/about-this-website/',
];

const OUTPUT_DIR = path.resolve(__dirname, 'nationalpondservice.com');
const visited = new Set();

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Connection': 'keep-alive',
};

function downloadFile(url) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    
    const options = {
      hostname: parsed.hostname,
      port: 443,
      path: parsed.pathname + (parsed.search || ''),
      method: 'GET',
      headers: headers
    };

    const req = https.request(options, (res) => {
      let data = [];
      
      res.on('data', (chunk) => {
        data.push(chunk);
      });
      
      res.on('end', () => {
        resolve(Buffer.concat(data));
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

function saveFile(url, content) {
  const parsed = new URL(url);
  let filepath = parsed.pathname;
  
  if (!filepath || filepath === '/') {
    filepath = '/index.html';
  } else if (filepath.endsWith('/')) {
    filepath += 'index.html';
  } else if (!filepath.match(/\.(html|htm|css|js|jpg|jpeg|png|gif|svg|webp|woff|woff2|ttf|eot|pdf)$/i)) {
    filepath += '/index.html';
  }
  
  filepath = filepath.substring(1); // Remove leading slash
  const fullPath = path.join(OUTPUT_DIR, filepath);
  const dir = path.dirname(fullPath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(fullPath, content);
  console.log(`✓ Saved: ${filepath}`);
}

async function processUrl(url) {
  if (visited.has(url)) {
    return;
  }
  
  visited.add(url);
  
  try {
    console.log(`Fetching: ${url}`);
    const content = await downloadFile(url);
    saveFile(url, content);
    
    // Extract more links from HTML
    if (content.toString('utf-8').includes('<html')) {
      const html = content.toString('utf-8');
      const linkRegex = /href=["']([^"']+)["']/gi;
      let match;
      while ((match = linkRegex.exec(html)) !== null) {
        const link = match[1];
        if (link && link.includes('nationalpondservice.com') && !visited.has(link)) {
          try {
            const absoluteUrl = new URL(link, url).href;
            if (absoluteUrl.includes('nationalpondservice.com') && !urlsToDownload.includes(absoluteUrl)) {
              urlsToDownload.push(absoluteUrl);
            }
          } catch (e) {
            // Skip invalid URLs
          }
        }
      }
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
  } catch (error) {
    console.error(`✗ Error fetching ${url}: ${error.message}`);
  }
}

async function main() {
  console.log('Starting to download pages from nationalpondservice.com...\n');
  
  for (const url of urlsToDownload) {
    await processUrl(url);
  }
  
  console.log(`\n✓ Download complete! Processed ${visited.size} URLs`);
}

main().catch(console.error);


