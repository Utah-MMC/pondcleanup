# PostgreSQL Migration Checklist

This doc captures the Priority 1 action items for switching the app from SQLite to PostgreSQL and keeping the sitemaps and product pages healthy once the new database is online.

## 1. Provision PostgreSQL

1. Make sure the Postgres server you installed at `K:\Postgres` is running. On Windows this is usually an auto-start service; otherwise run `pg_ctl start -D "K:\Postgres\data"`.
2. Create the primary and shadow databases if they do not already exist:
   ```powershell
   psql -U postgres -c "CREATE DATABASE pondcleanup;"
   psql -U postgres -c "CREATE DATABASE pondcleanup_shadow;"
   ```
3. Confirm connectivity:
   ```powershell
   psql "postgresql://postgres:LaFaverFam420!@localhost:5432/pondcleanup?schema=public" -c '\dt'
   ```

## 2. Environment variables

- The repo now expects `DATABASE_URL` and `SHADOW_DATABASE_URL` to point at PostgreSQL (see `.env` for the default format). Update the password/host/port/database to match your install if different.
- On Vercel/additional environments, set the same variables in the dashboard **and** ensure the database is accessible from Vercel (e.g., via Vercel Postgres or an external Postgres provider).

## 3. Prisma schema + migration

1. Regenerate the Prisma client (already wired via `npm run build` or `npm run prisma generate`).
2. Run the migrations against the new Postgres database:
   ```bash
   npx prisma migrate dev --name init --preview-feature
   ```
   (If you already have migrations, replace `init` with the appropriate name.)
3. After the migration succeeds, you can seed the migrations with admin data if needed.

## 4. Verification checklist

1. `npm run build` (should now hit Postgres instead of SQLite).
2. Hit `/shop`, `/shop/{any-product}`, and `/sitemap-products.xml`:
   - Product pages should respond with 200/200/200 and not 500.
   - `/sitemap-products.xml` should include entries as soon as the `Product` table has rows.
3. Revisit Search Console/Bing Webmaster and resubmit `https://pondcleanup.com/sitemap.xml`.
4. Use the Postgres CLI to inspect the `Product` table:
   ```powershell
   psql -U postgres -d pondcleanup -c "SELECT slug, name, active FROM Product LIMIT 5;"
   ```

## 5. Deployment notes

- Vercel: add `DATABASE_URL`, `SHADOW_DATABASE_URL`, and any other Postgres secrets via the project dashboard, then redeploy.
- If you are using `vercel dev` locally, make sure the same `.env` is loaded (or supply overrides via `vercel env add`).
