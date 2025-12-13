import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Pond Supplies | Pond Cleanup Shop',
  description: 'Shop pond care essentials—filters, treatments, and tools recommended by Pond Cleanup.',
};

export const dynamic = 'force-dynamic';

export default function ShopPage() {
  redirect('https://pond-cleanup.myshopify.com');
}


