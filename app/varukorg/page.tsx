"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    totalPrice,
    totalItems,
    isReady,
  } = useCart();

  if (!isReady) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center text-sm text-sleepie-gray-500">
        Laddar varukorg…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center">
        <h1 className="font-serif text-3xl mb-4">Din varukorg</h1>
        <p className="text-sleepie-gray-600 mb-8">
          Varukorgen är tom just nu. Upptäck våra produkter och lägg till det som
          passar er familj.
        </p>
        <Link
          href="/produkter"
          className="inline-flex items-center justify-center bg-sleepie-black text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-sleepie-gray-800 transition"
        >
          Upptäck kollektionen
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h1 className="font-serif text-3xl mb-2">Din varukorg</h1>
      <p className="text-sm text-sleepie-gray-500 mb-10">
        {totalItems} {totalItems === 1 ? "produkt" : "produkter"}
      </p>

      <ul className="space-y-6 border-t border-sleepie-gray-100 pt-6">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex gap-4 sm:gap-6 pb-6 border-b border-sleepie-gray-100"
          >
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-sleepie-gray-50 shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="112px"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between gap-4">
                <div>
                  <Link
                    href={`/produkter/${item.slug}`}
                    className="font-medium text-sleepie-black hover:underline"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-sleepie-gray-500 mt-0.5 tabular-nums">
                    {item.price} kr
                  </p>
                </div>
                <p className="font-medium tabular-nums shrink-0">
                  {item.price * item.quantity} kr
                </p>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className="inline-flex items-center border border-sleepie-gray-200 rounded-full">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-sleepie-gray-50 rounded-l-full transition"
                    aria-label="Minska"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm tabular-nums">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-sleepie-gray-50 rounded-r-full transition"
                    aria-label="Öka"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-sleepie-gray-400 hover:text-sleepie-black transition"
                  aria-label="Ta bort"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <p className="text-sm text-sleepie-gray-500">Totalt inkl. moms</p>
          <p className="text-2xl font-medium tabular-nums">{totalPrice} kr</p>
        </div>
        <Link
          href="/kassa"
          className="inline-flex items-center justify-center bg-sleepie-black text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-sleepie-gray-800 transition"
        >
          Gå till kassan
        </Link>
      </div>
    </div>
  );
}
