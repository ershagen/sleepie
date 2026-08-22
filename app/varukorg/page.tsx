"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";

/** Full page fallback – primarily opens the cart drawer */
export default function CartPage() {
  const { openCart, isReady, totalItems } = useCart();

  useEffect(() => {
    if (isReady) openCart();
  }, [isReady, openCart]);

  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <h1 className="font-serif text-3xl mb-3">Varukorg</h1>
      <p className="text-sleepie-gray-600 mb-8">
        {totalItems > 0
          ? "Din varukorg öppnas till höger."
          : "Varukorgen är tom."}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          type="button"
          onClick={openCart}
          className="inline-flex justify-center bg-sleepie-black text-white px-7 py-3.5 text-sm font-medium hover:bg-sleepie-gray-800 transition"
        >
          Öppna varukorg
        </button>
        <Link
          href="/produkter"
          className="inline-flex justify-center border border-sleepie-gray-300 px-7 py-3.5 text-sm font-medium hover:border-sleepie-black transition"
        >
          Fortsätt handla
        </Link>
      </div>
    </div>
  );
}
