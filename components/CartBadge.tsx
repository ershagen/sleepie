"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

export function CartBadge() {
  const { totalItems, isReady } = useCart();

  return (
    <Link
      href="/varukorg"
      className="relative p-2.5 hover:bg-sleepie-gray-100 rounded-full transition"
      aria-label="Varukorg"
    >
      <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.75} />
      {isReady && totalItems > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-sleepie-black text-white text-[10px] font-medium">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </Link>
  );
}
