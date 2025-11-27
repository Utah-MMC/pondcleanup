const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

const OUTPUT_DIR = path.resolve(__dirname, 'nationalpondservice.com');
const BASE_URL = 'https://nationalpondservice.com';
const visited = new Set();
const toDownload = new Set();

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': '*/*',
  'Accept-Language': 'en-US,en;q=0.9',
  'Connection': 'keep-alive',
};

function extractAssets(html, baseUrl) {
  const assets = new Set();
  
  // Extract CSS files
  const cssRegex = /<link[^>]+href=["']([^"']+\.css[^"']*)["']/gi;
  let match;
  while ((match = cssRegex.exec(html)) !== null) {
    try {
      const url = new URL(match[1], baseUrl).href;
      if (url.includes('nationalpondservice.com')) {
        assets.add(url);
      }
    } catch (e) {}
  }
  
  // Extract JS files
  const jsRegex = /<script[^>]+src=["']([^"']+\.js[^"']*)["']/gi;
  while ((match = jsRegex.exec(html)) !== null) {
    try {
      const url = new URL(match[1], baseUrl).href;
      if (url.includes('nationalpondservice.com')) {
        assets.add(url);
      }
    } catch (e) {}
  }
  
  // Extract images
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  while ((match = imgRegex.exec(html)) !== null) {
    try {
      const url = new URL(match[1], baseUrl).href;
      if (url.includes('nationalpondservice.com') && !url.includes('data:')) {
        assets.add(url);
      }
    } catch (e) {}
  }
  
  // Extract background images from style attributes
  const styleRegex = /style=["'][^"']*url\(["']?([^"')]+)["']?\)/gi;
  while ((match = styleRegex.exec(html)) !== null) {
    try {
      const url = new URL(match[1], baseUrl).href;
      if (url.includes('nationalpondservice.com')) {
        assets.add(url);
      }
    } catch (e) {}
  }
  
  // Extract CSS url() references
  const cssUrlRegex = /url\(["']?([^"')]+)["']?\)/gi;
  while ((match = cssUrlRegex.exec(html)) !== null) {
    try {
      const url = new URL(match[1], baseUrl).href;
      if (url.includes('nationalpondservice.com') && !url.includes('data:')) {
        assets.add(url);
      }
    } catch (e) {}
  }
  
  return assets;
}

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
      res.on('data', (chunk) => data.push(chunk));
      res.on('end', () => resolve(Buffer.concat(data)));
    });

    req.on('error', reject);
    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
    req.end();
  });
}

function saveFile(url, content) {
  const parsed = new URL(url);
  let filepath = parsed.pathname;
  
  // Remove query strings
  filepath = filepath.split('?')[0];
  
  if (!filepath || filepath === '/') {
    filepath = '/index.html';
  }
  
  // Remove leading slash
  filepath = filepath.substring(1);
  
  const fullPath = path.join(OUTPUT_DIR, filepath);
  const dir = path.dirname(fullPath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(fullPath, content);
  console.log(`✓ Saved: ${filepath}`);
}

async function processAsset(url) {
  if (visited.has(url)) {
    return;
  }
  
  visited.add(url);
  
  try {
    console.log(`Fetching: ${url}`);
    const content = await downloadFile(url);
    saveFile(url, content);
    
    // If it's a CSS file, extract more assets from it
    if (url.endsWith('.css')) {
      const css = content.toString('utf-8');
      const cssAssets = extractAssets(css, url);
      cssAssets.forEach(asset => {
        if (!visited.has(asset)) {
          toDownload.add(asset);
        }
      });
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
  } catch (error) {
    console.error(`✗ Error: ${url} - ${error.message}`);
  }
}

async function main() {
  console.log('Extracting assets from downloaded HTML files...\n');
  
  // Find all HTML files
  function findHtmlFiles(dir) {
    const files = [];
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...findHtmlFiles(fullPath));
      } else if (item.endsWith('.html')) {
        files.push(fullPath);
      }
    }
    
    return files;
  }
  
  const htmlFiles = findHtmlFiles(OUTPUT_DIR);
  
  // Extract assets from each HTML file
  for (const htmlFile of htmlFiles) {
    const html = fs.readFileSync(htmlFile, 'utf-8');
    const relativePath = path.relative(OUTPUT_DIR, htmlFile);
    const baseUrl = new URL(relativePath.replace(/\\/g, '/'), BASE_URL).href;
    const assets = extractAssets(html, baseUrl);
    assets.forEach(asset => toDownload.add(asset));
  }
  
  console.log(`Found ${toDownload.size} assets to download\n`);
  
  // Download all assets
  let count = 0;
  for (const url of toDownload) {
    await processAsset(url);
    count++;
  }
  
  console.log(`\n✓ Asset download complete! Processed ${count} assets`);
}

main().catch(console.error);


