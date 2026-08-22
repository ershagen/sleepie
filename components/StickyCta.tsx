"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

/** Mobile sticky shop CTA – appears after scroll */
export function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`sticky-cta md:hidden transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium truncate">Redo för lugnare nätter?</p>
          <p className="text-[11px] text-sleepie-gray-500">Fri frakt över 799 kr</p>
        </div>
        <Link
          href="/produkter"
          className="shrink-0 inline-flex items-center gap-1.5 bg-sleepie-black text-white text-sm font-medium px-5 py-2.5 rounded-full"
        >
          Shoppa
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
