import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Vanliga frågor",
  description:
    "Svar om leverans, returer, betalning, produkter och säkerhet hos Sleepie.",
  path: "/faq",
});

const FAQ = [
  {
    q: "Hur lång är leveranstiden?",
    a: "De flesta ordrar skickas inom 1–3 arbetsdagar. Leverans till dig tar vanligtvis 5–12 arbetsdagar. Du får tracking via e-post när paketet är skickat.",
  },
  {
    q: "Vad kostar frakten?",
    a: "Frakt kostar 49 kr. Fri frakt gäller vid köp över 799 kr.",
  },
  {
    q: "Vilka betalningssätt finns?",
    a: "Swish, kort (Visa/Mastercard) och Klarna. Betalningen sker säkert via Mollie.",
  },
  {
    q: "Kan jag returnera?",
    a: "Ja. Du har 14 dagars ångerrätt enligt lag. Kontakta hej@sleepie.se så hjälper vi dig med retursedel och instruktioner.",
  },
  {
    q: "Passar Sleepie Rocker alla vagnar?",
    a: "Den är universell och passar de flesta standardvagnar. Kontrollera alltid att fästet sitter stabilt innan användning.",
  },
  {
    q: "Är produkterna säkra?",
    a: "Vi väljer produkter med fokus på säkerhet och kvalitet. Elektriska produkter är CE-märkta där det krävs. Följ alltid bruksanvisningen.",
  },
  {
    q: "Hur tvättar jag muslin och sömnsäck?",
    a: "Maskintvätt i 40°C rekommenderas. Undvik starkt blekmedel. Låt lufttorka för längre livslängd.",
  },
  {
    q: "Hur når jag er?",
    a: "Mejla hej@sleepie.se. Vi svarar normalt inom 1–2 arbetsdagar.",
  },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="font-serif text-3xl md:text-4xl text-sleepie-black">
        Vanliga frågor
      </h1>
      <p className="mt-4 text-sleepie-gray-600 leading-relaxed">
        Hittar du inte svar? Skriv till{" "}
        <a href="mailto:hej@sleepie.se" className="underline hover:text-sleepie-black">
          hej@sleepie.se
        </a>
        .
      </p>

      <div className="mt-10 space-y-2">
        {FAQ.map((item) => (
          <details
            key={item.q}
            className="group border border-sleepie-gray-100 rounded-xl overflow-hidden bg-white"
          >
            <summary className="flex items-center justify-between cursor-pointer px-5 py-4 text-sm font-medium list-none">
              {item.q}
              <span className="text-sleepie-gray-400 group-open:rotate-45 transition-transform text-lg ml-4">
                +
              </span>
            </summary>
            <div className="px-5 pb-4 text-sm text-sleepie-gray-600 leading-relaxed">
              {item.a}
            </div>
          </details>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          href="/produkter"
          className="inline-flex bg-sleepie-green text-white px-7 py-3.5 text-sm font-medium hover:bg-sleepie-green-dark transition rounded-[5px]"
        >
          Till produkterna
        </Link>
        <Link
          href="/kontakt"
          className="inline-flex border border-sleepie-gray-300 px-7 py-3.5 text-sm font-medium hover:border-sleepie-black transition rounded-[5px]"
        >
          Kontakta oss
        </Link>
      </div>
    </div>
  );
}
