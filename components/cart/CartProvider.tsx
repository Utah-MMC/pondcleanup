'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Product } from '@/lib/products';

export type CartItem = {
  product: Product;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  add: (product: Product, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'pondcleanup_cart_v1';

function safeParse(json: string | null): CartItem[] {
  if (!json) return [];
  try {
    const v = JSON.parse(json) as unknown;
    if (!Array.isArray(v)) return [];
    return v
      .map((x) => x as Partial<CartItem>)
      .filter((x) => x && typeof x.qty === 'number' && x.product && typeof x.product.slug === 'string') as CartItem[];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(safeParse(localStorage.getItem(STORAGE_KEY)));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    return {
      items,
      add: (product, qty = 1) => {
        setItems((prev) => {
          const next = [...prev];
          const idx = next.findIndex((i) => i.product.slug === product.slug);
          if (idx >= 0) next[idx] = { product, qty: next[idx].qty + qty };
          else next.push({ product, qty });
          return next;
        });
      },
      remove: (slug) => setItems((prev) => prev.filter((i) => i.product.slug !== slug)),
      setQty: (slug, qty) =>
        setItems((prev) =>
          prev
            .map((i) => (i.product.slug === slug ? { ...i, qty } : i))
            .filter((i) => i.qty > 0),
        ),
      clear: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}


