# Product Import Guide - AliDrop CSV Export

## ✅ Your CSV is Ready to Import!

Your `products_export_1.csv` file is **fully compatible** with the import system. The importer automatically recognizes all the columns from your AliDrop export.

## 📋 Column Mapping

Your CSV columns map perfectly to the database:

| CSV Column | Database Field | Status |
|------------|----------------|--------|
| `Handle` | `slug` | ✅ Supported |
| `Title` | `name` | ✅ Supported |
| `Body (HTML)` | `description` | ✅ Supported |
| `Variant Price` | `priceCents` | ✅ Supported (auto-converts to cents) |
| `Image Src` | `imageUrl` | ✅ Supported |
| `Published` | `active` | ✅ Supported |

## 🚀 How to Import

### Step 1: Access Admin Import Page
1. Navigate to: `https://pondcleanup.com/admin/alidrop` (or `http://localhost:3000/admin/alidrop` locally)
2. You'll need your `ADMIN_TOKEN` from your `.env` file

### Step 2: Upload CSV
1. Click **"Choose CSV File"**
2. Select `products_export_1.csv`
3. Enter your `ADMIN_TOKEN` in the token field
4. Click **"Import CSV"**

### Step 3: Review Results
The import will show you:
- ✅ **Created**: New products added
- 🔄 **Updated**: Existing products updated (matched by slug)
- ⚠️ **Skipped**: Products without required fields
- ❌ **Errors**: Products with validation errors

## 📊 What Happens During Import

1. **CSV Parsing**: The system reads your CSV and extracts product data
2. **Data Normalization**: 
   - Prices converted to cents (e.g., `23.99` → `2399`)
   - HTML descriptions preserved
   - Image URLs validated
   - Slugs generated from Handle or Title
3. **Database Upsert**: 
   - If product with same slug exists → **Updates** it
   - If product is new → **Creates** it
4. **Result Summary**: Shows how many products were imported

## ⚠️ Important Notes

### Price Conversion
- Prices in CSV (e.g., `23.99`) are automatically converted to cents (`2399`)
- The system handles both dollar amounts and cent values

### Product Status
- Products with `Published = true` → `active = true`
- Products with `Published = false` → `active = false`
- Products without Published field → `active = true` (default)

### Image URLs
- The system extracts the first valid image URL from `Image Src`
- Images must be valid HTTP/HTTPS URLs
- If no image found, product will still import (image will be null)

### Duplicate Handling
- Products are matched by `slug` (from `Handle` column)
- If slug exists but name differs, a new slug is generated: `{original-slug}-{row-number}`

## 🔍 Troubleshooting

### "Missing/invalid price" Error
- **Cause**: Product row has no valid price in `Variant Price` column
- **Fix**: Check CSV for empty price fields

### "Unable to generate slug" Error
- **Cause**: Product has no `Handle` and `Title` is empty
- **Fix**: Ensure all products have at least a `Title`

### Import Shows 0 Products
- **Cause**: CSV might be empty or malformed
- **Fix**: 
  1. Open CSV in Excel/Google Sheets
  2. Verify it has data rows (not just header)
  3. Save as CSV (UTF-8 encoding)

### Products Not Showing in Shop
- **Cause**: Products imported with `active = false`
- **Fix**: Check `Published` column in CSV, or update products in database

## 📈 After Import

Once imported, your products will:
- ✅ Appear in `/shop` page
- ✅ Have individual product pages at `/shop/{slug}`
- ✅ Be included in sitemap (`/sitemap-products.xml`)
- ✅ Be searchable and indexable by Google
- ✅ Fix the 500 errors we found in the SEO audit

## 🎯 Next Steps

1. **Import the CSV** using the steps above
2. **Verify products** by visiting `/shop`
3. **Check product pages** (e.g., `/shop/{product-slug}`)
4. **Monitor sitemap** - products should appear in `/sitemap-products.xml`
5. **Test SEO** - product pages should now return 200 (not 500)

## 💡 Pro Tips

### Batch Importing
If you have multiple CSV files:
1. Import first file
2. Import second file (will update/create as needed)
3. Repeat for all files

### Updating Products
- Re-import the same CSV to update existing products
- Products are matched by `slug`, so changes to name/price/description will update

### Image Backfill
After importing, you can use the **"Backfill Missing Images"** button to:
- Find products without images
- Attempt to extract images from description HTML
- Update products with found images

## 🔗 Related Documentation

- [SEO Audit](./SEO-AUDIT.md) - See how product import fixes 500 errors
- [Environment Setup](./ENVIRONMENT.md) - Admin token configuration
- [Admin Guide](./ADMIN-CONTRACTOR-GUIDE.md) - Full admin documentation

---

**Last Updated**: December 2024  
**CSV Format**: AliDrop Export (Shopify-compatible)

