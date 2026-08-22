import Link from "next/link";
import { Logo } from "./Logo";
import { CartBadge } from "./CartBadge";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-sleepie-offwhite/90 backdrop-blur-md border-b border-sleepie-gray-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[4.25rem] flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium tracking-wide text-sleepie-gray-600">
          <Link href="/produkter" className="hover:text-sleepie-black transition">
            Produkter
          </Link>
          <Link href="/om-oss" className="hover:text-sleepie-black transition">
            Om oss
          </Link>
          <Link href="/#faq" className="hover:text-sleepie-black transition">
            FAQ
          </Link>
          <Link href="/kontakt" className="hover:text-sleepie-black transition">
            Kontakt
          </Link>
        </nav>

        <CartBadge />
      </div>
    </header>
  );
}
