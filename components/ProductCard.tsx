"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/catalog";
import { getReviewStats } from "@/lib/reviews-data";
import { StarRating } from "./StarRating";

export function ProductCard({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);
  const remote =
    product.image.startsWith("/api/") ||
    product.image.startsWith("data:") ||
    product.image.includes("blob.vercel-storage.com") ||
    product.image.includes("cjdropshipping.com");
  const stats = getReviewStats(product.slug);

  return (
    <Link
      href={`/produkter/${product.slug}`}
      className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-sleepie-gray-100 hover:border-sleepie-gray-200 hover:shadow-lg hover:shadow-sleepie-gray-100/80 transition-all duration-300"
    >
      <div className="aspect-square bg-sleepie-gray-50 relative overflow-hidden shrink-0">
        {!imgError ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
            unoptimized={remote}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-sleepie-gray-300">
            <span className="text-3xl opacity-40">☾</span>
          </div>
        )}
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 bg-sleepie-black text-white text-[10px] sm:text-[11px] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full z-10">
            {product.badge}
          </span>
        )}
      </div>

      <div className="p-3 sm:p-5 flex flex-col flex-1 min-w-0">
        <h3 className="font-medium text-sm sm:text-base text-sleepie-black leading-snug line-clamp-2 group-hover:underline underline-offset-2 decoration-1">
          {product.name}
        </h3>

        {stats.count > 0 && (
          <div className="mt-1.5 min-w-0">
            <StarRating
              rating={stats.average}
              size="sm"
              count={stats.count}
              showValue
              compact
            />
          </div>
        )}

        <p className="mt-1.5 text-xs sm:text-sm text-sleepie-gray-600 line-clamp-2 leading-relaxed hidden sm:block">
          {product.shortDescription}
        </p>

        <p className="mt-auto pt-2.5 sm:pt-3 font-medium text-sm sm:text-base tabular-nums text-sleepie-black">
          {product.price} kr
        </p>
      </div>
    </Link>
  );
}
