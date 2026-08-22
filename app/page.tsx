import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import {
  getFeaturedProducts,
  getProductBySlug,
  products,
} from "@/lib/products";
import { organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";
import {
  Truck,
  CreditCard,
  RotateCcw,
  Star,
  Quote,
  Check,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  const featured = getFeaturedProducts();
  const heroProduct = getProductBySlug("stroller-rocker");
  const kit = getProductBySlug("komplett-sovrutin");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationJsonLd(), websiteJsonLd()]),
        }}
      />

      <div className="bg-sleepie-black text-white text-center text-[11px] sm:text-xs py-2.5 px-4">
        Fri frakt över 799 kr · Swish, kort & Klarna · 14 dagars ångerrätt
      </div>

      <section className="relative bg-sleepie-offwhite overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh] lg:min-h-[78vh]">
          <div className="relative order-2 lg:order-1 bg-sleepie-gray-100 min-h-[50vh] lg:min-h-0">
            {heroProduct && (
              <Link href={`/produkter/${heroProduct.slug}`} className="block absolute inset-0 group">
                <Image
                  src={heroProduct.image}
                  alt={heroProduct.name}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  unoptimized
                />
              </Link>
            )}
          </div>
          <div className="order-1 lg:order-2 flex items-center justify-center px-6 py-16 md:py-24">
            <div className="max-w-md text-center lg:text-left">
              <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.25rem] leading-[1.08] text-sleepie-black text-balance">
                Lugnare nätter.
                <br />
                Mer sömn.
              </h1>
              <p className="mt-5 text-base text-sleepie-gray-600 leading-relaxed">
                Produkter som hjälper din bebis somna – så du kan andas ut.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
                <Link
                  href="/produkter"
                  className="inline-flex items-center justify-center bg-sleepie-green text-white px-8 py-3.5 text-sm font-medium hover:bg-sleepie-green-dark transition"
                >
                  Handla idag
                </Link>
                <Link
                  href="/produkter/stroller-rocker"
                  className="inline-flex items-center justify-center border border-sleepie-gray-300 px-8 py-3.5 text-sm font-medium text-sleepie-gray-700 hover:border-sleepie-black transition"
                >
                  Se bästsäljaren
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-2 justify-center lg:justify-start text-sm text-sleepie-gray-500">
                <div className="flex text-sleepie-black">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" strokeWidth={0} />
                  ))}
                </div>
                <span>Älskad av trötta föräldrar</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-sleepie-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-10 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              icon: Truck,
              title: "Fri frakt över 799 kr",
              text: "Spårbar leverans till dörren",
            },
            {
              icon: CreditCard,
              title: "Köp nu, betala senare",
              text: "Swish, kort eller Klarna",
            },
            {
              icon: RotateCcw,
              title: "14 dagars ångerrätt",
              text: "100 % nöjd – eller pengarna tillbaka",
            },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3 sm:justify-center sm:text-center sm:flex-col sm:items-center">
              <item.icon className="w-5 h-5 text-sleepie-green shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-sleepie-gray-500 mt-0.5">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Reveal as="section" className="max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-20">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-serif text-2xl md:text-3xl">Utvalda produkter</h2>
          <Link
            href="/produkter"
            className="text-sm font-medium text-sleepie-gray-600 hover:text-sleepie-black transition inline-flex items-center gap-1"
          >
            Visa alla <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="bg-white border-y border-sleepie-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14 md:py-16 text-center">
          <p className="font-serif text-xl md:text-2xl text-sleepie-black leading-snug text-balance">
            Vi fokuserar på det som faktiskt hjälper – mjuk gungning, lugnande ljud och textilier som känns trygga.
          </p>
          <p className="mt-4 text-sm text-sleepie-gray-500">
            Enklare. Lugnare. Mer sömn.
          </p>
        </div>
      </Reveal>

      <Reveal as="section" className="max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-20">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-serif text-2xl md:text-3xl">Alla produkter</h2>
          <Link
            href="/produkter"
            className="text-sm font-medium text-sleepie-gray-600 hover:text-sleepie-black transition inline-flex items-center gap-1"
          >
            Visa alla <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/produkter/${p.slug}`}
              className="group block"
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-sleepie-gray-50 border border-sleepie-gray-100">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 20vw"
                  unoptimized
                />
              </div>
              <div className="mt-3 px-0.5">
                <p className="text-sm font-medium truncate">{p.name}</p>
                <p className="text-sm text-sleepie-gray-600 tabular-nums mt-0.5">
                  {p.price} kr
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Reveal>

      {kit && (
        <Reveal as="section" className="bg-sleepie-black text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="relative aspect-square max-w-md mx-auto lg:mx-0 w-full rounded-xl overflow-hidden bg-sleepie-gray-800">
                <Image
                  src={kit.image}
                  alt={kit.name}
                  fill
                  className="object-cover opacity-90"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  unoptimized
                />
              </div>
              <div>
                <p className="text-sm text-white/55 mb-2">Sparar 98 kr</p>
                <h2 className="font-serif text-3xl md:text-4xl leading-tight">
                  {kit.name}
                </h2>
                <p className="mt-4 text-white/70 leading-relaxed max-w-md">
                  Rocker, white noise och muslin i ett paket. Allt du behöver för
                  en lugnare start.
                </p>
                <ul className="mt-6 space-y-2.5">
                  {kit.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-white/80">
                      <Check className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={1.75} />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <p className="text-2xl font-medium tabular-nums">{kit.price} kr</p>
                  <Link
                    href={`/produkter/${kit.slug}`}
                    className="inline-flex items-center justify-center gap-2 bg-sleepie-green text-white px-7 py-3 text-sm font-medium hover:bg-sleepie-green-dark transition"
                  >
                    Köp kitet
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      )}

      <Reveal as="section" className="max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-20">
        <h2 className="font-serif text-2xl md:text-3xl text-center mb-10">
          Vad föräldrar säger
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              quote:
                "Rockern räddade våra kvällar. Bebisen somnar i vagnen på några minuter.",
              name: "Emma",
              detail: "Mamma till Alma, 4 mån",
            },
            {
              quote:
                "Äntligen white noise som inte ser ut som en leksak. Diskret och effektiv.",
              name: "Johan",
              detail: "Pappa till Noel, 7 mån",
            },
            {
              quote:
                "Muslinfiltarna är så mjuka. Vi använder dem varje dag.",
              name: "Sara",
              detail: "Mamma till tvillingar",
            },
          ].map((r) => (
            <blockquote
              key={r.name}
              className="bg-white border border-sleepie-gray-100 rounded-xl p-6 flex flex-col"
            >
              <Quote className="w-5 h-5 text-sleepie-gray-300 mb-3" strokeWidth={1.5} />
              <p className="text-sm text-sleepie-gray-700 leading-relaxed flex-1">
                “{r.quote}”
              </p>
              <footer className="mt-5 pt-4 border-t border-sleepie-gray-50">
                <p className="text-sm font-medium">{r.name}</p>
                <p className="text-xs text-sleepie-gray-500">{r.detail}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="bg-white border-y border-sleepie-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14 md:py-16">
          <h2 className="font-serif text-2xl md:text-3xl text-center mb-8">
            Vanliga frågor
          </h2>
          <div className="space-y-2">
            {[
              {
                q: "Hur lång leveranstid är det?",
                a: "Vanligtvis 5–12 arbetsdagar. Du får tracking så fort ordern skickas.",
              },
              {
                q: "Kan jag returnera?",
                a: "Ja, 14 dagars ångerrätt. Kontakta hej@sleepie.se så hjälper vi dig.",
              },
              {
                q: "Vilka betalningssätt finns?",
                a: "Swish, kort och Klarna.",
              },
              {
                q: "Passar rockern alla vagnar?",
                a: "Den är universell och passar de flesta standardvagnar.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group border border-sleepie-gray-100 rounded-lg overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer px-5 py-3.5 text-sm font-medium list-none">
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
        </div>
      </Reveal>

      <section className="bg-sleepie-offwhite">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20 text-center">
          <h2 className="font-serif text-2xl md:text-3xl mb-3">
            Redo för lugnare nätter?
          </h2>
          <p className="text-sleepie-gray-600 mb-8 text-sm">
            Handla idag – fri frakt över 799 kr.
          </p>
          <Link
            href="/produkter"
            className="inline-flex items-center justify-center bg-sleepie-green text-white px-8 py-3.5 text-sm font-medium hover:bg-sleepie-green-dark transition"
          >
            Handla idag
          </Link>
        </div>
      </section>
    </>
  );
}
