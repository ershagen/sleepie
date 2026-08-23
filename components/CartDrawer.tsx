"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { calcOrderTotal } from "@/lib/shipping";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/products";

export function CartDrawer() {
  const {
    items,
    totalItems,
    totalPrice,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    isReady,
  } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeCart();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  const { subtotal, shipping, total, freeShipping, remainingToFree } =
    calcOrderTotal(totalPrice);

  if (!isReady) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
        aria-hidden={!isOpen}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Varukorg"
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-sleepie-offwhite shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-sleepie-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" strokeWidth={1.75} />
            <h2 className="font-medium text-sm">
              Varukorg{totalItems > 0 ? ` (${totalItems})` : ""}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="p-2 -mr-2 rounded-[5px] hover:bg-sleepie-gray-100 transition"
            aria-label="Stäng"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {items.length > 0 && !freeShipping && remainingToFree > 0 && (
          <div className="px-5 py-3 border-b border-sleepie-gray-100 bg-white">
            <p className="text-xs text-sleepie-gray-600 mb-2">
              Handla för {remainingToFree} kr till för fri frakt
            </p>
            <div className="h-1.5 rounded-full bg-sleepie-gray-100 overflow-hidden">
              <div
                className="h-full bg-sleepie-green transition-all duration-500"
                style={{
                  width: `${Math.min(
                    100,
                    (subtotal / FREE_SHIPPING_THRESHOLD) * 100
                  )}%`,
                }}
              />
            </div>
          </div>
        )}
        {items.length > 0 && freeShipping && (
          <div className="px-5 py-3 border-b border-sleepie-gray-100 bg-white">
            <p className="text-xs text-sleepie-green-dark">Du har fri frakt</p>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <ShoppingBag
                className="w-10 h-10 text-sleepie-gray-300 mb-4"
                strokeWidth={1.25}
              />
              <p className="font-medium mb-1">Varukorgen är tom</p>
              <p className="text-sm text-sleepie-gray-500 mb-6">
                Lägg till något mjukt för lugnare nätter.
              </p>
              <Link
                href="/produkter"
                onClick={closeCart}
                className="inline-flex bg-sleepie-green text-white px-6 py-3 text-sm font-medium rounded-[5px] hover:bg-sleepie-green-dark transition"
              >
                Fortsätt handla
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-sleepie-gray-100">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3 p-5">
                  <Link
                    href={`/produkter/${item.slug}`}
                    onClick={closeCart}
                    className="relative w-20 h-20 rounded-lg overflow-hidden bg-sleepie-gray-50 shrink-0 border border-sleepie-gray-100"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                      unoptimized
                    />
                  </Link>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex justify-between gap-2">
                      <Link
                        href={`/produkter/${item.slug}`}
                        onClick={closeCart}
                        className="text-sm font-medium truncate hover:underline"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm tabular-nums shrink-0">
                        {item.price * item.quantity} kr
                      </p>
                    </div>
                    <p className="text-xs text-sleepie-gray-500 tabular-nums mt-0.5">
                      {item.price} kr / st
                    </p>
                    <div className="mt-auto pt-3 flex items-center justify-between">
                      <div className="inline-flex items-center border border-sleepie-gray-200 rounded-[5px]">
                        <button
                          type="button"
                          aria-label="Minska"
                          className="w-8 h-8 flex items-center justify-center hover:bg-sleepie-gray-50 rounded-l-[5px]"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className="w-3 h-3" strokeWidth={2} />
                        </button>
                        <span className="w-8 text-center text-sm tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Öka"
                          className="w-8 h-8 flex items-center justify-center hover:bg-sleepie-gray-50 rounded-r-[5px]"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="w-3 h-3" strokeWidth={2} />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-sleepie-gray-500 hover:text-sleepie-black transition"
                      >
                        Ta bort
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-sleepie-gray-100 bg-white p-5 space-y-4">
            <dl className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-sleepie-gray-600">Delsumma</dt>
                <dd className="tabular-nums">{subtotal} kr</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sleepie-gray-600">Frakt</dt>
                <dd className="tabular-nums">
                  {freeShipping ? "Fri" : `${shipping} kr`}
                </dd>
              </div>
              <div className="flex justify-between pt-2 border-t border-sleepie-gray-100 font-medium text-base">
                <dt>Totalt</dt>
                <dd className="tabular-nums">{total} kr</dd>
              </div>
            </dl>
            <p className="text-[11px] text-sleepie-gray-500">Inkl. moms</p>
            <Link
              href="/kassa"
              onClick={closeCart}
              className="flex items-center justify-center w-full bg-sleepie-green text-white py-3.5 text-sm font-medium rounded-[5px] hover:bg-sleepie-green-dark transition"
            >
              Gå till kassan
            </Link>
            <button
              type="button"
              onClick={closeCart}
              className="w-full text-center text-sm text-sleepie-gray-600 hover:text-sleepie-black transition"
            >
              Fortsätt handla
            </button>
          </div>
        )}
      </div>
    </>
  );
}
