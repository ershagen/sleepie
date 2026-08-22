"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  return (
    <div className="flex-1 flex flex-col sm:flex-row gap-2">
      <button
        type="button"
        onClick={handleClick}
        className="flex-1 bg-sleepie-black text-white py-3.5 px-6 rounded-full text-sm font-medium hover:bg-sleepie-gray-800 transition"
      >
        {added ? "Tillagd ✓" : "Lägg i varukorg"}
      </button>
      {added && (
        <Link
          href="/varukorg"
          className="flex-1 sm:flex-none text-center border border-sleepie-gray-300 py-3.5 px-5 rounded-full text-sm font-medium hover:border-sleepie-black transition"
        >
          Visa varukorg
        </Link>
      )}
    </div>
  );
}
