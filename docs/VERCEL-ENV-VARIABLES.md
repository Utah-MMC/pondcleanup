# Vercel Environment Variables for PostgreSQL

## ⚠️ Important: Local vs Production

Your local `.env` file uses `localhost`, which works for local development but **won't work on Vercel**. Vercel needs a cloud-hosted PostgreSQL database.

## Current Local .env Values

```env
DATABASE_URL="postgresql://postgres:LaFaverFam420!@localhost:5432/pondcleanup?schema=public"
SHADOW_DATABASE_URL="postgresql://postgres:LaFaverFam420!@localhost:5432/pondcleanup_shadow?schema=public"
ADMIN_TOKEN="change-me"
```

## Vercel Environment Variables Setup

### Option 1: Vercel Postgres (Recommended)

1. **Go to Vercel Dashboard** → Your Project → Settings → Storage
2. **Click "Create Database"** → Select "Postgres"
3. **Vercel will automatically:**
   - Create the database
   - Add `POSTGRES_URL` environment variable
   - Add `POSTGRES_PRISMA_URL` environment variable
   - Add `POSTGRES_URL_NON_POOLING` environment variable

4. **Map to Prisma variables:**
   - `DATABASE_URL` = `POSTGRES_PRISMA_URL` (or `POSTGRES_URL_NON_POOLING`)
   - `SHADOW_DATABASE_URL` = `POSTGRES_URL_NON_POOLING` (same as DATABASE_URL for Vercel Postgres)

### Option 2: External PostgreSQL Provider

If using an external provider (Supabase, Railway, Neon, etc.):

1. **Get your connection string** from your provider**
   - Format: `postgresql://user:password@host:port/database?schema=public`

2. **Add to Vercel:**
   - Go to Project → Settings → Environment Variables
   - Add:
     - **Name:** `DATABASE_URL`
     - **Value:** Your PostgreSQL connection string
     - **Environments:** Production, Preview, Development
   
   - Add:
     - **Name:** `SHADOW_DATABASE_URL`
     - **Value:** Same as DATABASE_URL (or separate shadow database)
     - **Environments:** Production, Preview, Development

3. **Add ADMIN_TOKEN:**
   - **Name:** `ADMIN_TOKEN`
   - **Value:** Your secure admin token (change from "change-me")
   - **Environments:** Production, Preview, Development

## Environment Variables Summary

### Required for Vercel:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Main PostgreSQL connection string | `postgresql://user:pass@host:5432/db?schema=public` |
| `SHADOW_DATABASE_URL` | Shadow database for migrations | Same as DATABASE_URL (or separate DB) |
| `ADMIN_TOKEN` | Admin authentication token | `your-secure-token-here` |

## Setup Steps for Vercel

1. **Create/Connect PostgreSQL Database**
   - Use Vercel Postgres (easiest) OR
   - Use external provider (Supabase, Railway, Neon, etc.)

2. **Add Environment Variables in Vercel Dashboard**
   - Project → Settings → Environment Variables
   - Add all three variables above

3. **Run Migrations on Vercel**
   - After deployment, migrations run automatically via `postinstall` script
   - Or manually: `npx prisma migrate deploy` in Vercel build

4. **Verify Connection**
   - Check Vercel build logs for "Database connection successful"
   - Test `/shop` page loads products
   - Test `/sitemap-products.xml` includes products

## Migration Command for Vercel

If you need to run migrations manually on Vercel:

```bash
# In Vercel build command or via Vercel CLI
npx prisma migrate deploy
```

Or add to `package.json`:

```json
{
  "scripts": {
    "postinstall": "prisma generate && prisma migrate deploy"
  }
}
```

## Security Notes

- ✅ **Never commit `.env` file** (already in `.gitignore`)
- ✅ **Use strong ADMIN_TOKEN** (not "change-me")
- ✅ **Use connection pooling** for production (Vercel Postgres handles this)
- ✅ **Rotate passwords** regularly

## Troubleshooting

### "Can't reach database server"
- Check connection string is correct
- Verify database is accessible from internet (not localhost)
- Check firewall/security settings

### "Migration failed"
- Ensure `SHADOW_DATABASE_URL` is set
- Check database has proper permissions
- Verify Prisma schema matches database

### "Products not showing"
- Check `DATABASE_URL` is set in Vercel
- Verify migrations ran successfully
- Check build logs for errors

---

**Last Updated:** December 2024

