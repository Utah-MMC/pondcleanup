const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.resolve(__dirname, 'nationalpondservice.com');
const BASE_URL = 'https://nationalpondservice.com';

async function downloadHomepage() {
  console.log('Downloading homepage with Playwright...');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    // Set a realistic viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Navigate to the homepage
    console.log('Navigating to homepage...');
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 60000 });
    
    // Wait a bit for any dynamic content
    await page.waitForTimeout(3000);
    
    // Get the HTML content
    const html = await page.content();
    
    // Save it
    const filepath = path.join(OUTPUT_DIR, 'index.html');
    fs.writeFileSync(filepath, html, 'utf-8');
    
    console.log('✓ Homepage downloaded successfully!');
    
  } catch (error) {
    console.error('Error downloading homepage:', error);
  } finally {
    await browser.close();
  }
}

downloadHomepage().catch(console.error);

