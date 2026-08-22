import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-sleepie-offwhite/90 backdrop-blur-md border-b border-sleepie-gray-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[4.25rem] flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-9 text-[13px] font-medium tracking-wide text-sleepie-gray-600">
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
          className="relative p-2.5 hover:bg-sleepie-gray-100 rounded-full transition"
          aria-label="Varukorg"
        >
          <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.75} />
        </Link>
      </div>
    </header>
  );
}
