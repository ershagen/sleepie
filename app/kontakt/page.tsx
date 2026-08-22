import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontakta Sleepie – vi hjälper dig gärna med frågor om produkter, order och leverans.",
};

export default function KontaktPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 md:py-24">
      <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-sleepie-gray-500 mb-4">
        Kontakt
      </p>
      <h1 className="font-serif text-3xl md:text-4xl text-sleepie-black leading-tight">
        Hör av dig
      </h1>
      <p className="mt-4 text-sleepie-gray-600 leading-relaxed">
        Har du frågor om produkter, din order eller något annat? Vi svarar
        vanligtvis inom 1–2 arbetsdagar.
      </p>

      <div className="mt-12 space-y-8">
        <div className="rounded-2xl border border-sleepie-gray-100 bg-white p-6 md:p-8">
          <h2 className="text-sm font-medium tracking-wide uppercase text-sleepie-gray-500 mb-3">
            E-post
          </h2>
          <a
            href="mailto:hej@sleepie.se"
            className="text-lg font-medium hover:underline"
          >
            hej@sleepie.se
          </a>
          <p className="mt-2 text-sm text-sleepie-gray-500">
            Orderfrågor, returer och produkthjälp
          </p>
        </div>

        <div className="rounded-2xl border border-sleepie-gray-100 bg-white p-6 md:p-8">
          <h2 className="text-sm font-medium tracking-wide uppercase text-sleepie-gray-500 mb-3">
            Snabb hjälp
          </h2>
          <ul className="space-y-2 text-sm text-sleepie-gray-600">
            <li>
              <Link href="/frakt-returer" className="hover:text-sleepie-black underline-offset-2 hover:underline">
                Frakt & returer
              </Link>
            </li>
            <li>
              <Link href="/#faq" className="hover:text-sleepie-black underline-offset-2 hover:underline">
                Vanliga frågor
              </Link>
            </li>
            <li>
              <Link href="/villkor" className="hover:text-sleepie-black underline-offset-2 hover:underline">
                Köpvillkor
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
