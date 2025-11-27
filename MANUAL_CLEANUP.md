# Manual Cleanup Checklist

This document lists items that need manual attention after the automated branding replacement.

## ✅ Completed Automatically
- Domain URLs (nationalpondservice.com → pondauthority.com)
- Brand name text (National Pond Service → Pond Authority)
- Social media links (disabled - pointing to #)

## 🔧 Items Requiring Manual Attention

### 1. Social Media Links
**Status:** Links have been disabled (pointing to #), but you should:
- Create new social media accounts for Pond Authority
- Update the links in all HTML files, or
- Remove the social media icons entirely

**Files affected:** 22 files contain social media links
- Search for: `social-link-removed` to find disabled links
- Common locations: Footer sections, header widgets

### 2. Meta Tags & SEO
**Check and update:**
- `<title>` tags - may still reference "National Pond Service"
- `<meta name="description">` tags
- Open Graph tags (`og:title`, `og:description`, `og:url`)
- Twitter Card tags
- Canonical URLs

**How to find:**
```bash
grep -r "<title>" nationalpondservice.com/
grep -r "meta.*description" nationalpondservice.com/
grep -r "og:" nationalpondservice.com/
```

### 3. Image Assets
**Check for:**
- Logo files (e.g., `national-pond-service-logo.png`)
- Image filenames containing "national" or "pond service"
- Alt text on images that may reference the old brand

**Action:** Replace with new Pond Authority logo and update alt text

### 4. Contact Information
**Review and update:**
- Phone numbers (if different)
- Physical addresses
- Email addresses (if you have new ones)
- Business hours
- Location-specific pages (Salt Lake City, Park City, Rochester, etc.)

**Files to check:**
- `contact-us/index.html`
- `contact-us-utah/index.html`
- `about-us/index.html`
- Location pages in the root directory

### 5. Email Addresses
**Search for:**
```bash
grep -r "@nationalpondservice.com" nationalpondservice.com/
```

**Action:** Replace with new email addresses (e.g., `@pondauthority.com`)

### 6. JavaScript References
**Check:**
- Analytics codes (Google Analytics, etc.)
- Tracking pixels
- Third-party integrations that may reference the old domain
- Custom JavaScript files

### 7. CSS References
**Check:**
- Background images in CSS
- Font references
- Any hardcoded URLs in stylesheets

### 8. Dynamic Features (Non-Functional)
**Note:** These features won't work in the static mirror:
- Shopping cart functionality
- User accounts/login
- Search functionality
- Contact forms (unless you add a new form handler)
- Checkout process

**Action:** Either:
- Remove these features entirely, or
- Replace with new backend services

### 9. External Links
**Review:**
- Links to `www.nationalpond.com` (consulting services)
- Any other external domains
- Decide if these should be kept, removed, or updated

### 10. Index.html Bot Protection
**Issue:** The main `index.html` file shows a bot protection page instead of the actual homepage.

**Action:** 
- Re-download the homepage using the browser automation script, or
- Manually copy the content from one of the other pages that loaded correctly

## Quick Search Commands

Find remaining instances:
```bash
# Search for any remaining "National Pond" references
grep -ri "national pond" nationalpondservice.com/ --include="*.html"

# Search for old domain in various formats
grep -ri "nationalpondservice" nationalpondservice.com/ --include="*.html"

# Find email addresses
grep -ri "@.*\.com" nationalpondservice.com/ --include="*.html" | grep -i email
```

## Next Steps

1. Review all items in this checklist
2. Update social media links or remove them
3. Replace logo and image assets
4. Update contact information
5. Test the site locally before deploying
6. Deploy to Vercel
7. Set up custom domain (pondauthority.com)

