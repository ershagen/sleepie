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
        "flex-1 bg-sleepie-green text-white py-3.5 px-6 rounded-[5px] text-sm font-medium hover:bg-sleepie-green-dark transition"
      }
    >
      {added ? "Tillagd ✓" : "Lägg i varukorg"}
    </button>
  );
}
