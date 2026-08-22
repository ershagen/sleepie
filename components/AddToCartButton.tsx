"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";

export function AddToCartButton({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={
        className ||
        "flex-1 bg-sleepie-black text-white py-3.5 px-6 rounded-full text-sm font-medium hover:bg-sleepie-gray-800 transition"
      }
    >
      {added ? "Tillagd ✓" : "Lägg i varukorg"}
    </button>
  );
}
