import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Så funkar det",
  description:
    "Hur det går till när du handlar hos Sleepie – från beställning till leverans och support.",
  path: "/sa-funkar-det",
});

const STEPS = [
  {
    n: "01",
    title: "Du väljer produkter",
    text: "Lägg det du behöver i varukorgen. Fri frakt över 799 kr.",
  },
  {
    n: "02",
    title: "Säker betalning",
    text: "Betala med Swish, kort eller Klarna. Du får orderbekräftelse på e-post.",
  },
  {
    n: "03",
    title: "Vi förbereder och skickar",
    text: "Ordern plockas och skickas. Du får spårningsnummer när paketet är på väg.",
  },
  {
    n: "04",
    title: "Leverans till dörren",
    text: "Vanligtvis 5–12 arbetsdagar. Frågor? Mejla hej@sleepie.se.",
  },
];

export default function SaFunkarDetPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 md:py-24">
      <h1 className="font-serif text-3xl md:text-4xl text-sleepie-black">
        Så funkar det
      </h1>
      <p className="mt-4 text-sleepie-gray-600 leading-relaxed">
        Enkel process från klick till leverans – utan krångel.
      </p>

      <ol className="mt-12 space-y-8">
        {STEPS.map((s) => (
          <li key={s.n} className="flex gap-4">
            <span className="text-sm font-medium text-sleepie-green-dark tabular-nums">
              {s.n}
            </span>
            <div>
              <h2 className="font-medium text-sleepie-black">{s.title}</h2>
              <p className="mt-1 text-sm text-sleepie-gray-600 leading-relaxed">
                {s.text}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-14 grid gap-4 sm:grid-cols-2">
        <Link
          href="/frakt-returer"
          className="rounded-xl border border-sleepie-gray-100 bg-white p-5 text-sm hover:border-sleepie-gray-300 transition"
        >
          <span className="font-medium text-sleepie-black">Frakt & returer</span>
          <p className="mt-1 text-sleepie-gray-600">Tider, kostnader och ångerrätt</p>
        </Link>
        <Link
          href="/faq"
          className="rounded-xl border border-sleepie-gray-100 bg-white p-5 text-sm hover:border-sleepie-gray-300 transition"
        >
          <span className="font-medium text-sleepie-black">Vanliga frågor</span>
          <p className="mt-1 text-sleepie-gray-600">Svar på det mesta</p>
        </Link>
      </div>

      <div className="mt-10">
        <Link
          href="/produkter"
          className="inline-flex bg-sleepie-green text-white px-7 py-3.5 text-sm font-medium hover:bg-sleepie-green-dark transition"
        >
          Börja handla
        </Link>
      </div>
    </div>
  );
}
