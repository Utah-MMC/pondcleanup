const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

const BASE_URL = 'https://nationalpondservice.com';
const OUTPUT_DIR = path.resolve(__dirname, 'nationalpondservice.com');
const visited = new Set();
const toVisit = new Set([BASE_URL]);

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  'Connection': 'keep-alive',
  'Upgrade-Insecure-Requests': '1',
  'Sec-Fetch-Dest': 'document',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'none',
  'Cache-Control': 'max-age=0'
};

function downloadFile(url) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const client = parsed.protocol === 'https:' ? https : http;
    
    const options = {
      hostname: parsed.hostname,
      port: parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
      path: parsed.pathname + (parsed.search || ''),
      method: 'GET',
      headers: headers
    };

    const req = client.request(options, (res) => {
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

    req.end();
  });
}

function saveFile(url, content) {
  const parsed = new URL(url);
  let filepath = parsed.pathname;
  
  if (!filepath || filepath === '/') {
    filepath = '/index.html';
  }
  
  if (filepath.endsWith('/')) {
    filepath += 'index.html';
  }
  
  // Remove leading slash
  filepath = filepath.substring(1);
  
  const fullPath = path.join(OUTPUT_DIR, filepath);
  const dir = path.dirname(fullPath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(fullPath, content);
  console.log(`Saved: ${filepath}`);
}

function extractLinks(html, baseUrl) {
  const links = new Set();
  
  // Extract href links
  const hrefRegex = /href=["']([^"']+)["']/gi;
  let match;
  while ((match = hrefRegex.exec(html)) !== null) {
    const link = match[1];
    if (link && !link.startsWith('javascript:') && !link.startsWith('mailto:') && !link.startsWith('tel:')) {
      try {
        const absoluteUrl = new URL(link, baseUrl).href;
        const parsed = new URL(absoluteUrl);
        if (parsed.hostname === 'nationalpondservice.com' || parsed.hostname === 'www.nationalpondservice.com') {
          links.add(absoluteUrl);
        }
      } catch (e) {
        // Invalid URL, skip
      }
    }
  }
  
  // Extract src links (images, scripts, etc.)
  const srcRegex = /src=["']([^"']+)["']/gi;
  while ((match = srcRegex.exec(html)) !== null) {
    const link = match[1];
    if (link && !link.startsWith('data:')) {
      try {
        const absoluteUrl = new URL(link, baseUrl).href;
        const parsed = new URL(absoluteUrl);
        if (parsed.hostname === 'nationalpondservice.com' || parsed.hostname === 'www.nationalpondservice.com') {
          links.add(absoluteUrl);
        }
      } catch (e) {
        // Invalid URL, skip
      }
    }
  }
  
  // Extract CSS url() links
  const cssUrlRegex = /url\(["']?([^"')]+)["']?\)/gi;
  while ((match = cssUrlRegex.exec(html)) !== null) {
    const link = match[1];
    if (link && !link.startsWith('data:')) {
      try {
        const absoluteUrl = new URL(link, baseUrl).href;
        const parsed = new URL(absoluteUrl);
        if (parsed.hostname === 'nationalpondservice.com' || parsed.hostname === 'www.nationalpondservice.com') {
          links.add(absoluteUrl);
        }
      } catch (e) {
        // Invalid URL, skip
      }
    }
  }
  
  return links;
}

async function processUrl(url) {
  if (visited.has(url)) {
    return;
  }
  
  visited.add(url);
  
  try {
    console.log(`Fetching: ${url}`);
    const content = await downloadFile(url);
    
    // Determine if it's HTML
    const parsed = new URL(url);
    const isHtml = parsed.pathname.endsWith('/') || 
                   parsed.pathname.endsWith('.html') || 
                   !parsed.pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|css|js|woff|woff2|ttf|eot|pdf|zip)$/i);
    
    if (isHtml) {
      const html = content.toString('utf-8');
      saveFile(url, html);
      
      // Extract links
      const links = extractLinks(html, url);
      links.forEach(link => {
        if (!visited.has(link)) {
          toVisit.add(link);
        }
      });
    } else {
      // Binary file
      saveFile(url, content);
    }
    
    // Small delay to be polite
    await new Promise(resolve => setTimeout(resolve, 500));
    
  } catch (error) {
    console.error(`Error fetching ${url}: ${error.message}`);
  }
}

async function main() {
  console.log('Starting to mirror nationalpondservice.com...');
  console.log('This may take several minutes...\n');
  
  const maxPages = 200;
  let processed = 0;
  
  while (toVisit.size > 0 && processed < maxPages) {
    const url = Array.from(toVisit)[0];
    toVisit.delete(url);
    
    await processUrl(url);
    processed++;
  }
  
  console.log(`\nMirroring complete!`);
  console.log(`Processed ${processed} URLs`);
}

main().catch(console.error);


