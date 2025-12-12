# Admin Dashboard & Contractor Portal Guide

## Admin Dashboard

### Access
- URL: `/admin/dashboard`
- Authentication: Requires `ADMIN_TOKEN` from `.env` file
- Enter the token in the dashboard UI to view stats

### Features
- **Overview Stats**: Total leads, orders, products, and revenue
- **Recent Leads**: Last 10 leads with contact info, location, service, and source
- **Recent Orders**: Last 10 orders with customer info, items, status, and total
- **Product Stats**: Breakdown by active/inactive status
- **Order Stats**: Breakdown by status (pending, processing, shipped, completed, cancelled) with revenue

### Creating Contractors

Use the admin API to create contractor accounts:

```bash
curl -X POST http://localhost:3000/api/admin/create-contractor \
  -H "Content-Type: application/json" \
  -H "X-Admin-Token: YOUR_ADMIN_TOKEN" \
  -d '{
    "email": "contractor@example.com",
    "password": "secure-password",
    "name": "John Doe",
    "companyName": "Doe Pond Services",
    "location": "Denver, CO",
    "city": "denver",
    "state": "co",
    "zip": ["80202", "80203"],
    "phone": "555-1234",
    "website": "https://example.com",
    "services": ["Pond Cleaning", "Maintenance"]
  }'
```

## Contractor Portal

### Login
- URL: `/contractor/login`
- Contractors log in with email and password
- Token is stored in localStorage

### Dashboard
- URL: `/contractor/dashboard`
- Shows all leads assigned to the contractor
- Each lead displays:
  - Customer contact info (name, email, phone)
  - Location and service requested
  - Pond type and description
  - Date received

### Managing Leads
- **Update Status**: Dropdown to change status (new, contacted, quoted, scheduled, completed, lost)
- **Add Notes**: Text area to add private notes about the lead
- Changes save automatically when updated

### Assigning Leads to Contractors

Leads can be assigned to contractors via the database or by creating an API endpoint. For now, you can manually assign leads using Prisma:

```typescript
await prisma.contractorLead.create({
  data: {
    contractorId: 'contractor-id',
    leadId: 'lead-id',
    status: 'new',
  },
});
```

## DIY Content

### Guides Available
- **Spring Opening Checklist** (`/diy/spring-opening-checklist`)
- **Fall Closing Checklist** (`/diy/fall-closing-checklist`)
- **Water Clarity & Algae Control** (`/diy/clarity-algae-basics`)

### Adding New Guides

Edit `lib/diyGuides.ts` to add new guides:

```typescript
{
  slug: 'your-guide-slug',
  title: 'Your Guide Title',
  shortDescription: 'Brief description',
  category: 'maintenance' | 'troubleshooting' | 'seasonal' | 'setup',
  content: `# Your Guide Content (Markdown)`,
}
```

## Database Models

### Order
- Tracks ecommerce orders
- Links to OrderItems (products)
- Status: pending, processing, shipped, completed, cancelled

### Contractor
- Stores contractor account info
- Password hashed with bcrypt
- Services and ZIP codes stored as JSON

### ContractorLead
- Junction table linking contractors to leads
- Tracks assignment status and notes
- Status: new, contacted, quoted, scheduled, completed, lost

## Security Notes

- Admin token should be a long, random string in production
- Contractor passwords are hashed with bcrypt (10 rounds)
- Simple token-based auth for contractors (consider JWT for production)
- All API routes validate authentication before processing

