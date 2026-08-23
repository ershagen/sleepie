"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({
  images,
  alt,
  badge,
}: {
  images: string[];
  alt: string;
  badge?: string;
}) {
  const list = images.length > 0 ? images : [];
  const [active, setActive] = useState(0);
  const [error, setError] = useState<Record<number, boolean>>({});

  const src = list[active] || list[0];
  const isRemote =
    !!src &&
    (src.startsWith("http") ||
      src.startsWith("/api/") ||
      src.includes("blob.vercel-storage.com") ||
      src.includes("cjdropshipping.com"));

  return (
    <div className="space-y-3">
      <div className="aspect-square bg-sleepie-gray-50 rounded-xl relative overflow-hidden border border-sleepie-gray-100">
        {src && !error[active] ? (
          <Image
            src={src}
            alt={`${alt} – bild ${active + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            unoptimized={isRemote}
            onError={() => setError((e) => ({ ...e, [active]: true }))}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-sleepie-gray-300">
            <span className="text-4xl opacity-40 mb-2">☾</span>
            <span className="text-xs tracking-wide uppercase">{alt}</span>
          </div>
        )}
        {badge && (
          <span className="absolute top-4 left-4 bg-sleepie-black text-white text-xs px-2.5 py-1 rounded-full z-10">
            {badge}
          </span>
        )}
      </div>

      {list.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {list.map((url, i) => (
            <button
              key={`${url}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={`relative aspect-square rounded-[5px] overflow-hidden border transition ${
                active === i
                  ? "border-sleepie-black ring-1 ring-sleepie-black"
                  : "border-sleepie-gray-100 hover:border-sleepie-gray-300"
              }`}
              aria-label={`Visa bild ${i + 1}`}
            >
              {!error[i] ? (
                <Image
                  src={url}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="80px"
                  unoptimized
                  onError={() => setError((e) => ({ ...e, [i]: true }))}
                />
              ) : (
                <span className="absolute inset-0 bg-sleepie-gray-50" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
