# Next.js Conversion Guide

This document explains the Next.js conversion and how to continue converting the remaining pages.

## Project Structure

```
pondcleanup/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with Header/Footer
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Global styles
│   └── pages/             # Page routes
│       ├── about/
│       ├── services/
│       └── ...
├── components/            # React components
│   ├── Header.tsx
│   └── Footer.tsx
├── public/               # Static assets
│   └── images/          # Images (copied from root)
└── pages/               # Original HTML files (keep for reference)
```

## What's Been Converted

✅ **Completed:**
- Next.js project setup with TypeScript
- Global CSS styles
- Root layout with Header/Footer components
- Homepage (app/page.tsx)
- About page (app/pages/about/page.tsx)
- Services listing page (app/pages/services/page.tsx)
- Dynamic service pages (app/pages/services/[service]/page.tsx)
- Google Analytics integration
- SEO metadata setup

## Remaining Work

### 1. Static Pages
Convert these HTML files to Next.js pages in `app/pages/`:

- `pages/book.html` → `app/pages/book/page.tsx`
- `pages/gallery.html` → `app/pages/gallery/page.tsx`
- `pages/locations.html` → `app/pages/locations/page.tsx`
- `pages/how-it-works.html` → `app/pages/how-it-works/page.tsx`
- `pages/faq.html` → `app/pages/faq/page.tsx`
- `pages/contact.html` → `app/pages/contact/page.tsx`
- `pages/find-a-contractor.html` → `app/pages/find-a-contractor/page.tsx`
- `pages/for-contractors.html` → `app/pages/for-contractors/page.tsx`

### 2. Dynamic City Pages
Convert city pages to a dynamic route:

- Create `app/pages/cities/[city]/page.tsx`
- Extract city data from existing HTML files
- Map city slugs (e.g., `austin-tx.html` → `austin-tx`)

Example structure:
```typescript
// app/pages/cities/[city]/page.tsx
export default function CityPage({ params }: { params: { city: string } }) {
  // Load city data based on params.city
  // Render city-specific content
}
```

### 3. Contractor Pages
Convert contractor pages:

- `pages/contractor/bluewater-pond-garden.html` → `app/pages/contractor/[contractor]/page.tsx`
- `pages/contractor/utah-water-gardens.html` → Use same dynamic route

### 4. Search Functionality
Convert `js/search.js` to a React component:

- Create `components/ContractorSearch.tsx`
- Convert vanilla JS to React hooks (useState, useEffect)
- Use Next.js router for navigation

### 5. Sitemap & Robots.txt
- Move `sitemap.xml` to `public/sitemap.xml`
- Move `robots.txt` to `public/robots.txt`
- Update URLs to match Next.js routing

## Conversion Pattern

### For Static Pages:

1. Create the page file: `app/pages/[page-name]/page.tsx`
2. Add metadata export:
```typescript
export const metadata: Metadata = {
  title: 'Page Title | Pond Cleanup',
  description: 'Page description',
  alternates: {
    canonical: 'https://pondcleanup.com/pages/[page-name]',
  },
};
```
3. Convert HTML to JSX:
   - `class` → `className`
   - `for` → `htmlFor`
   - `&amp;` → `&amp;` or use `&` directly
   - Self-closing tags need `/`
   - Use Next.js `Link` and `Image` components
4. Replace relative paths:
   - `../images/` → `/images/`
   - `pages/book.html` → `/pages/book`

### For Dynamic Pages:

1. Create dynamic route: `app/pages/[param]/page.tsx`
2. Use `generateMetadata` for SEO:
```typescript
export async function generateMetadata({ params }: { params: { param: string } }): Promise<Metadata> {
  // Generate metadata based on params
}
```
3. Load data based on params
4. Handle 404 with `notFound()`

## Running the Development Server

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to see the site.

## Building for Production

```bash
npm run build
npm start
```

## Image Optimization

Images are currently set to `unoptimized: true` in `next.config.js`. For production, you may want to:
1. Enable Next.js Image Optimization
2. Ensure images are properly sized
3. Use WebP format where possible

## SEO Considerations

- All pages include proper metadata
- Canonical URLs are set
- Structured data (JSON-LD) is in the root layout
- Google Analytics is integrated
- Sitemap and robots.txt need to be updated with new URLs

## Notes

- Original HTML files are preserved in `pages/` for reference
- CSS is in `app/globals.css` (converted from `css/styles.css`)
- Images are in `public/images/` (copied from root `images/`)
- All routes maintain the same URL structure for SEO

## Next Steps

1. Convert remaining static pages
2. Set up dynamic city pages
3. Convert contractor pages
4. Migrate search functionality
5. Update sitemap and robots.txt
6. Test all routes
7. Deploy to production

