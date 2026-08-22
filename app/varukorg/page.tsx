"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/products";
import { calcOrderTotal } from "@/lib/shipping";
import { Minus, Plus, Trash2, Shield, Truck, RotateCcw } from "lucide-react";

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
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-20 md:py-28 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-sleepie-gray-50 border border-sleepie-gray-100 mb-6">
          <span className="text-2xl opacity-40">☾</span>
        </div>
        <h1 className="font-serif text-3xl mb-3">Din varukorg är tom</h1>
        <p className="text-sleepie-gray-600 mb-8 leading-relaxed">
          Upptäck produkter som hjälper både dig och din bebis att sova bättre.
        </p>
        <Link
          href="/produkter"
          className="inline-flex items-center justify-center bg-sleepie-black text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-sleepie-gray-800 transition"
        >
          Upptäck kollektionen
        </Link>
      </div>
    );
  }

  const { shipping, total, freeShipping, remainingToFree } =
    calcOrderTotal(totalPrice);
  const progress = Math.min(
    100,
    Math.round((totalPrice / FREE_SHIPPING_THRESHOLD) * 100)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h1 className="font-serif text-3xl md:text-4xl mb-2">Din varukorg</h1>
      <p className="text-sm text-sleepie-gray-500 mb-10">
        {totalItems} {totalItems === 1 ? "produkt" : "produkter"}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Items */}
        <div className="lg:col-span-7">
          {/* Free shipping progress */}
          <div className="mb-8 rounded-2xl border border-sleepie-gray-100 bg-white p-4 sm:p-5">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-sleepie-gray-600">
                {freeShipping
                  ? "Fri frakt på den här ordern"
                  : `${remainingToFree} kr kvar till fri frakt`}
              </span>
              <span className="tabular-nums text-sleepie-gray-500">
                {Math.min(totalPrice, FREE_SHIPPING_THRESHOLD)} /{" "}
                {FREE_SHIPPING_THRESHOLD} kr
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-sleepie-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-sleepie-black transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <ul className="space-y-0 divide-y divide-sleepie-gray-100 border-y border-sleepie-gray-100">
            {items.map((item) => {
              const local =
                item.image.startsWith("/api/") ||
                item.image.startsWith("data:");
              return (
                <li key={item.id} className="flex gap-4 sm:gap-5 py-6">
                  <Link
                    href={`/produkter/${item.slug}`}
                    className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-sleepie-gray-50 shrink-0 border border-sleepie-gray-100"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="112px"
                      unoptimized={local}
                    />
                  </Link>

                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex justify-between gap-3">
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

                    <div className="mt-auto pt-4 flex items-center gap-3">
                      <div className="inline-flex items-center border border-sleepie-gray-200 rounded-full">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-2.5 hover:bg-sleepie-gray-50 rounded-l-full transition"
                          aria-label="Minska"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-9 text-center text-sm tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-2.5 hover:bg-sleepie-gray-50 rounded-r-full transition"
                          aria-label="Öka"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-sleepie-gray-400 hover:text-sleepie-black transition text-sm flex items-center gap-1.5"
                        aria-label="Ta bort"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Ta bort</span>
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <Link
            href="/produkter"
            className="inline-block mt-6 text-sm text-sleepie-gray-600 hover:text-sleepie-black transition"
          >
            ← Fortsätt handla
          </Link>
        </div>

        {/* Summary */}
        <aside className="lg:col-span-5">
          <div className="rounded-2xl border border-sleepie-gray-100 bg-white p-6 sm:p-7 sticky top-24">
            <h2 className="font-medium mb-5">Sammanfattning</h2>

            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-sleepie-gray-600">Delsumma</dt>
                <dd className="tabular-nums">{totalPrice} kr</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sleepie-gray-600">Frakt</dt>
                <dd className="tabular-nums">
                  {freeShipping ? (
                    <span className="text-sleepie-gray-700">Fri</span>
                  ) : (
                    `${shipping} kr`
                  )}
                </dd>
              </div>
              <div className="flex justify-between pt-3 border-t border-sleepie-gray-100 text-base font-medium">
                <dt>Totalt</dt>
                <dd className="tabular-nums">{total} kr</dd>
              </div>
            </dl>
            <p className="mt-2 text-xs text-sleepie-gray-500">Inkl. moms</p>

            <Link
              href="/kassa"
              className="mt-6 flex w-full items-center justify-center bg-sleepie-black text-white py-3.5 rounded-full text-sm font-medium hover:bg-sleepie-gray-800 transition"
            >
              Gå till kassan
            </Link>

            <ul className="mt-6 space-y-3 pt-5 border-t border-sleepie-gray-100">
              {[
                { icon: Truck, text: "Leverans 5–12 arbetsdagar" },
                { icon: RotateCcw, text: "14 dagars ångerrätt" },
                { icon: Shield, text: "Säker betalning · Swish, kort, Klarna" },
              ].map((row) => (
                <li
                  key={row.text}
                  className="flex items-center gap-2.5 text-xs text-sleepie-gray-500"
                >
                  <row.icon className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
                  {row.text}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
