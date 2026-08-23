import Link from "next/link";
import { Logo } from "./Logo";
import { COMPANY } from "@/lib/company";

export function Footer() {
  return (
    <footer className="border-t border-sleepie-gray-200 bg-white mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          <div className="sm:col-span-2 md:col-span-1">
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
                  Sleepie Rocker
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
              <li>
                <Link href="/sa-funkar-det" className="hover:text-sleepie-black transition">
                  Så funkar det
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium tracking-wider uppercase text-sleepie-gray-500 mb-4">
              Hjälp & mer
            </h4>
            <ul className="space-y-2.5 text-sm text-sleepie-gray-600">
              <li>
                <Link href="/om-oss" className="hover:text-sleepie-black transition">
                  Om oss
                </Link>
              </li>
              <li>
                <Link href="/guider" className="hover:text-sleepie-black transition">
                  Guider
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-sleepie-black transition">
                  Vanliga frågor
                </Link>
              </li>
              <li>
                <Link href="/frakt-returer" className="hover:text-sleepie-black transition">
                  Frakt & returer
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="hover:text-sleepie-black transition">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium tracking-wider uppercase text-sleepie-gray-500 mb-4">
              Juridiskt
            </h4>
            <ul className="space-y-2.5 text-sm text-sleepie-gray-600">
              <li>
                <Link href="/villkor" className="hover:text-sleepie-black transition">
                  Köpvillkor
                </Link>
              </li>
              <li>
                <Link href="/integritet" className="hover:text-sleepie-black transition">
                  Integritet
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-sleepie-black transition">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-sleepie-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-sleepie-gray-500">
          <p>
            © {new Date().getFullYear()} {COMPANY.brand}. Alla rättigheter
            förbehållna.
          </p>
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
