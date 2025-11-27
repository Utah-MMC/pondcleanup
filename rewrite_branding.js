// rewrite_branding.js

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "nationalpondservice.com");

// Files we'll touch
const exts = [".html", ".htm", ".css", ".js", ".xml", ".txt", ".json"];

// Customize these for your exact naming
const replacements = [
  // Domain variants
  { from: "https://nationalpondservice.com", to: "https://pondauthority.com" },
  { from: "http://nationalpondservice.com",  to: "https://pondauthority.com" },
  { from: "nationalpondservice.com",        to: "pondauthority.com" },
  
  // Brand name (case-sensitive variants)
  { from: "National Pond Service", to: "Pond Authority" },
  { from: "NATIONAL POND SERVICE", to: "POND AUTHORITY" },
  { from: "National Pond service", to: "Pond Authority" },
  
  // Social media URLs - REMOVE or REPLACE with your new accounts
  // Uncomment and update these when you have new social media accounts:
  // { from: "https://www.facebook.com/NationalPondService/", to: "https://www.facebook.com/YOUR_NEW_PAGE" },
  // { from: "https://www.instagram.com/nationalpondservice", to: "https://www.instagram.com/YOUR_NEW_ACCOUNT" },
  // { from: "https://www.youtube.com/@Nationalpondservice", to: "https://www.youtube.com/@YOUR_NEW_CHANNEL" },
  // { from: "https://x.com/nationalpondsvc", to: "https://x.com/YOUR_NEW_ACCOUNT" },
  
  // For now, we'll remove/comment out social links - you can uncomment and update above when ready
  { from: 'href="https://www.facebook.com/NationalPondService/"', to: 'href="#" class="social-link-removed"' },
  { from: 'href="https://www.instagram.com/nationalpondservice"', to: 'href="#" class="social-link-removed"' },
  { from: 'href="https://www.youtube.com/@Nationalpondservice"', to: 'href="#" class="social-link-removed"' },
  { from: 'href="https://x.com/nationalpondsvc"', to: 'href="#" class="social-link-removed"' },
];

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walk(full, fileList);
    } else {
      fileList.push(full);
    }
  }
  return fileList;
}

function shouldProcess(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return exts.includes(ext);
}

function processFile(filePath) {
  if (!shouldProcess(filePath)) return;

  let contents = fs.readFileSync(filePath, "utf8");
  let changed = false;

  for (const { from, to } of replacements) {
    if (contents.includes(from)) {
      contents = contents.split(from).join(to);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, contents, "utf8");
    console.log("Updated:", path.relative(ROOT, filePath));
  }
}

function main() {
  const files = walk(ROOT);
  files.forEach(processFile);
  console.log("Branding / URL rewrite complete.");
}

main();

