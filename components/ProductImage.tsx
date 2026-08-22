"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductImage({
  src,
  alt,
  badge,
  category,
}: {
  src: string;
  alt: string;
  badge?: string;
  category?: string;
}) {
  const [error, setError] = useState(false);
  const local =
    src.startsWith("/api/") ||
    src.startsWith("data:") ||
    src.includes("blob.vercel-storage.com");

  return (
    <>
      {!error ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          unoptimized={local}
          onError={() => setError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-sleepie-gray-300">
          <span className="text-4xl opacity-40 mb-2">☾</span>
          <span className="text-xs tracking-wide uppercase">{category || alt}</span>
        </div>
      )}
      {badge && (
        <span className="absolute top-4 left-4 bg-sleepie-black text-white text-xs px-2.5 py-1 rounded-full z-10">
          {badge}
        </span>
      )}
    </>
  );
}
