"use client";

import type { Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={() => {
        addItem({
          id: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
        });
        openCart();
      }}
      className="flex-1 bg-sleepie-green text-white py-3.5 px-6 rounded-[5px] text-sm font-medium hover:bg-sleepie-green-dark transition"
    >
      Lägg i varukorg
    </button>
  );
}
