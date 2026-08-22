import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-sleepie-gray-200 bg-white mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Logo href={null} size="sm" />
            <p className="text-sm text-sleepie-gray-600 leading-relaxed mt-4 max-w-xs">
              Lugnare nätter börjar här. Smarta produkter som hjälper ditt barn
              sova – och dig andas ut.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-medium tracking-wider uppercase text-sleepie-gray-500 mb-4">
              Shoppa
            </h4>
            <ul className="space-y-2.5 text-sm text-sleepie-gray-600">
              <li>
                <Link href="/produkter" className="hover:text-sleepie-black transition">
                  Alla produkter
                </Link>
              </li>
              <li>
                <Link
                  href="/produkter/stroller-rocker"
                  className="hover:text-sleepie-black transition"
                >
                  Stroller Rocker
                </Link>
              </li>
              <li>
                <Link
                  href="/produkter/komplett-sovrutin"
                  className="hover:text-sleepie-black transition"
                >
                  Komplett Sovrutin
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium tracking-wider uppercase text-sleepie-gray-500 mb-4">
              Kundservice
            </h4>
            <ul className="space-y-2.5 text-sm text-sleepie-gray-600">
              <li>
                <Link href="/#faq" className="hover:text-sleepie-black transition">
                  FAQ
                </Link>
              </li>
              <li>
                <a
                  href="mailto:hej@sleepie.se"
                  className="hover:text-sleepie-black transition"
                >
                  hej@sleepie.se
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-sleepie-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-sleepie-gray-500">
          <p>© {new Date().getFullYear()} Sleepie. Alla rättigheter förbehållna.</p>
          <div className="flex gap-5">
            <span>Swish</span>
            <span>Klarna</span>
            <span>Kort</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
