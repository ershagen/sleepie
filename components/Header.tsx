import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-sleepie-offwhite/95 backdrop-blur border-b border-sleepie-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="hover:opacity-80 transition">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-sleepie-gray-700">
          <Link href="/produkter" className="hover:text-sleepie-black transition">
            Produkter
          </Link>
          <Link href="/#varfor" className="hover:text-sleepie-black transition">
            Varför Sleepie
          </Link>
          <Link href="/#faq" className="hover:text-sleepie-black transition">
            FAQ
          </Link>
        </nav>

        <Link
          href="/varukorg"
          className="relative p-2 hover:bg-sleepie-gray-100 rounded-full transition"
          aria-label="Varukorg"
        >
          <ShoppingBag className="w-5 h-5" />
        </Link>
      </div>
    </header>
  );
}