# Environment Variables

## Database (Prisma)

Create a `.env` file in the project root with:

```
DATABASE_URL="file:./dev.db"
```

This uses SQLite for local development. Prisma will create `prisma/dev.db` when you run migrations.

## Admin (AliDrop import)

To protect admin-only endpoints, set:

```
ADMIN_TOKEN="change-me"
```

You’ll need it to access the import page and to call the import API.

## AliDrop “no export” workaround

If AliDrop doesn’t provide a CSV export, you can still import products:

- Log into AliDrop and open the “Import List” page (`https://app.alidrop.co/import-list`)
- Open DevTools → **Network**
- Filter for requests to `api.alidrop.co`
- Click the request that returns your product list (it will be JSON)
- Copy the response body (or “Copy as fetch” and grab the JSON)
- Paste it into `/admin/alidrop` under **Paste JSON** and import

This avoids brittle scraping and works with authenticated data.


