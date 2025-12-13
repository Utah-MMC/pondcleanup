import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function ProductPage() {
  redirect('https://pond-cleanup.myshopify.com');
}


