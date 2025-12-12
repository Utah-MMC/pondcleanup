'use client';

import { useState } from 'react';
import { useCart } from '@/components/cart/CartProvider';

type ProductForCart = {
  slug: string;
  name: string;
  priceCents: number;
  shortDescription: string;
  description: string;
  image: string;
};

export default function AddToCartButton({ product }: { product: ProductForCart }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      className="btn btn-primary btn-full"
      onClick={() => {
        add(product, 1);
        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
      }}
    >
      {added ? 'Added!' : 'Add to Cart'}
    </button>
  );
}


