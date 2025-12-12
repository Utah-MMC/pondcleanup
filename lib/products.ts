export type Product = {
  slug: string;
  name: string;
  priceCents: number;
  shortDescription: string;
  description: string;
  image: string;
};

export const products: Product[] = [
  {
    slug: 'beneficial-bacteria-boost',
    name: 'Beneficial Bacteria Boost',
    priceCents: 2499,
    shortDescription: 'Kickstart clarity and reduce sludge naturally.',
    description:
      'A high-quality beneficial bacteria blend to help break down organics, reduce sludge, and stabilize pond water. Great after cleanouts or filter changes.',
    image: '/images/PXL_20250628_171207914.jpg',
  },
  {
    slug: 'water-test-kit',
    name: 'Pond Water Test Kit',
    priceCents: 1999,
    shortDescription: 'Know what’s happening in your water in minutes.',
    description:
      'Test for key pond parameters so you can make confident adjustments. Ideal for koi ponds and water gardens.',
    image: '/images/0cc90ccee5b37dfa6aed153a01581727-enhance-4x.jpeg',
  },
  {
    slug: 'seasonal-maintenance-bundle',
    name: 'Seasonal Maintenance Bundle',
    priceCents: 7999,
    shortDescription: 'Spring + fall essentials in one bundle.',
    description:
      'A curated set of maintenance essentials designed for spring start-up and fall close-down. Great for DIY pond owners.',
    image: '/images/PXL_20250621_161924645.jpg',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}


