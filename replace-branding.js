const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.resolve(__dirname, 'nationalpondservice.com');

// Replacement mappings
const replacements = [
  // Domain replacements
  { from: /nationalpondservice\.com/gi, to: 'pondauthority.com' },
  { from: /www\.nationalpondservice\.com/gi, to: 'www.pondauthority.com' },
  { from: /http:\/\/nationalpondservice\.com/gi, to: 'https://pondauthority.com' },
  { from: /https:\/\/nationalpondservice\.com/gi, to: 'https://pondauthority.com' },
  { from: /http:\/\/www\.nationalpondservice\.com/gi, to: 'https://www.pondauthority.com' },
  { from: /https:\/\/www\.nationalpondservice\.com/gi, to: 'https://www.pondauthority.com' },
  
  // Brand name replacements
  { from: /National Pond Service/gi, to: 'Pond Authority' },
  { from: /National Pond/gi, to: 'Pond Authority' },
  { from: /NPS/gi, to: 'PA' }, // Only if it's clearly referring to the company
  
  // Email replacements (if any)
  { from: /@nationalpondservice\.com/gi, to: '@pondauthority.com' },
  
  // Social media URLs (if they need to be updated)
  // Note: You may want to keep these as-is or update to new accounts
];

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    let newContent = content;
    let changed = false;
    
    replacements.forEach(({ from, to }) => {
      if (from.test(newContent)) {
        newContent = newContent.replace(from, to);
        changed = true;
      }
    });
    
    if (changed) {
      fs.writeFileSync(filePath, newContent, 'utf-8');
      console.log(`✓ Updated: ${path.relative(OUTPUT_DIR, filePath)}`);
      return true;
    }
    
    return false;
  } catch (error) {
    // Skip binary files
    if (error.code === 'ENOENT') {
      return false;
    }
    // If it's a binary file error, skip it
    return false;
  }
}

function processDirectory(dir) {
  const items = fs.readdirSync(dir);
  let totalUpdated = 0;
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      totalUpdated += processDirectory(fullPath);
    } else if (stat.isFile()) {
      // Process text files (HTML, CSS, JS, etc.)
      const ext = path.extname(item).toLowerCase();
      if (['.html', '.htm', '.css', '.js', '.json', '.txt', '.xml', '.svg'].includes(ext)) {
        if (processFile(fullPath)) {
          totalUpdated++;
        }
      }
    }
  }
  
  return totalUpdated;
}

function main() {
  console.log('Starting branding replacement...\n');
  console.log('Replacing: nationalpondservice.com → pondauthority.com');
  console.log('Replacing: National Pond Service → Pond Authority\n');
  
  if (!fs.existsSync(OUTPUT_DIR)) {
    console.error(`Error: Directory ${OUTPUT_DIR} does not exist!`);
    process.exit(1);
  }
  
  const totalUpdated = processDirectory(OUTPUT_DIR);
  
  console.log(`\n✓ Branding replacement complete!`);
  console.log(`Updated ${totalUpdated} files`);
}

main();


