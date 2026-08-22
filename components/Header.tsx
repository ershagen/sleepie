"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { CartBadge } from "./CartBadge";

const links = [
  { href: "/produkter", label: "Produkter" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/#faq", label: "FAQ" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-sleepie-offwhite/90 backdrop-blur-md border-b border-sleepie-gray-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[4.25rem] flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium tracking-wide text-sleepie-gray-600">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover:text-sleepie-black transition"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <CartBadge />
          <button
            type="button"
            className="md:hidden p-2 -mr-2 text-sleepie-gray-700"
            aria-label={open ? "Stäng meny" : "Öppna meny"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-sleepie-gray-100 bg-sleepie-offwhite">
          <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-sleepie-gray-700 hover:text-sleepie-black"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
