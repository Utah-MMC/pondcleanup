# Pond Authority

This is a mirrored version of nationalpondservice.com, rebranded as Pond Authority.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Mirror the site (if needed):
   ```bash
   npm run mirror
   ```

3. Replace branding:
   ```bash
   npm run replace-branding
   ```

## Deployment

This site is configured for deployment on Vercel. The static files are located in the `nationalpondservice.com` directory.

### Deploy to Vercel

1. Push to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically deploy the site

Or use the Vercel CLI:
```bash
npm i -g vercel
vercel
```

## Project Structure

- `nationalpondservice.com/` - Mirrored website files (HTML, CSS, JS, images)
- `mirror-with-playwright.js` - Script to mirror the website using Playwright
- `replace-branding.js` - Script to replace branding and URLs
- `vercel.json` - Vercel deployment configuration


