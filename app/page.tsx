import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/products";
import { Moon, Shield, Truck, Heart } from "lucide-react";

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="max-w-2xl">
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-sleepie-gray-500 mb-5">
              Baby sleep & calming
            </p>
            <h1 className="font-serif text-[2.75rem] sm:text-5xl md:text-[3.5rem] leading-[1.08] text-sleepie-black text-balance">
              Lugnare nätter börjar här
            </h1>
            <p className="mt-6 text-lg text-sleepie-gray-600 leading-relaxed max-w-md">
              Smarta produkter som hjälper ditt barn sova – och dig andas ut.
              Minimalistisk design. Fokus på trygghet.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/produkter"
                className="inline-flex items-center justify-center bg-sleepie-black text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-sleepie-gray-800 transition shadow-sm"
              >
                Upptäck kollektionen
              </Link>
              <Link
                href="/#varfor"
                className="inline-flex items-center justify-center border border-sleepie-gray-300 px-8 py-3.5 rounded-full text-sm font-medium text-sleepie-gray-700 hover:border-sleepie-black hover:text-sleepie-black transition"
              >
                Varför Sleepie
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-sleepie-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap justify-center gap-x-10 gap-y-2 text-xs text-sleepie-gray-500 tracking-wide">
          <span>CE-märkta produkter</span>
          <span className="hidden sm:inline text-sleepie-gray-300">·</span>
          <span>14 dagars ångerrätt</span>
          <span className="hidden sm:inline text-sleepie-gray-300">·</span>
          <span>Swish · Klarna · Kort</span>
          <span className="hidden sm:inline text-sleepie-gray-300">·</span>
          <span>Snabb leverans</span>
        </div>
      </section>

      {/* Why Sleepie */}
      <section id="varfor" className="bg-sleepie-offwhite">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-24">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="font-serif text-2xl md:text-3xl text-sleepie-black">
              Varför Sleepie?
            </h2>
            <p className="mt-3 text-sleepie-gray-600 text-sm leading-relaxed">
              Vi tror på lugn, enkelhet och produkter som faktiskt gör skillnad
              – för både bebis och förälder.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                icon: Moon,
                title: "Lugnare nätter",
                text: "Designade för att hjälpa både bebis och dig att sova bättre – utan krångel.",
              },
              {
                icon: Shield,
                title: "Säkert & testat",
                text: "CE-märkta produkter utvalda med fokus på säkerhet och kvalitet.",
              },
              {
                icon: Truck,
                title: "Snabb leverans",
                text: "Vi skickar direkt. Du får tracking så fort ordern är på väg.",
              },
              {
                icon: Heart,
                title: "Nordisk enkelhet",
                text: "Minimalistisk design som passar in i ett modernt, lugnt hem.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white border border-sleepie-gray-100 mb-4 shadow-sm">
                  <item.icon className="w-[18px] h-[18px] text-sleepie-black" strokeWidth={1.5} />
                </div>
                <h3 className="font-medium text-sm mb-2">{item.title}</h3>
                <p className="text-sm text-sleepie-gray-600 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl">Utvalda produkter</h2>
            <p className="mt-2 text-sm text-sleepie-gray-600">
              Allt du behöver för en lugnare sovrutin.
            </p>
          </div>
          <Link
            href="/produkter"
            className="text-sm font-medium text-sleepie-gray-600 hover:text-sleepie-black transition hidden sm:block"
          >
            Se alla →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/produkter"
            className="text-sm font-medium text-sleepie-gray-600 hover:text-sleepie-black transition"
          >
            Se alla produkter →
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-y border-sleepie-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-24">
          <h2 className="font-serif text-2xl md:text-3xl text-center mb-14">
            Så fungerar det
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Välj produkter",
                text: "Hitta det som passar er – rocker, white noise eller ett komplett kit.",
              },
              {
                step: "02",
                title: "Betala tryggt",
                text: "Swish, kort eller Klarna. Säkert och enkelt via Mollie.",
              },
              {
                step: "03",
                title: "Få hemleverans",
                text: "Vi skickar direkt. Du får tracking så du kan följa paketet.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-[11px] font-medium tracking-[0.15em] text-sleepie-gray-400 mb-3">
                  {item.step}
                </div>
                <h3 className="font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-sleepie-gray-600 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-2xl mx-auto px-4 sm:px-6 py-20 md:py-24">
        <h2 className="font-serif text-2xl md:text-3xl text-center mb-10">
          Vanliga frågor
        </h2>
        <div className="space-y-3">
          {[
            {
              q: "Hur lång leveranstid är det?",
              a: "Vanligtvis 5–12 arbetsdagar beroende på produkt. Du får tracking så fort ordern skickas.",
            },
            {
              q: "Är produkterna säkra?",
              a: "Ja. Alla produkter är CE-märkta och utvalda med fokus på säkerhet och kvalitet för bebisar.",
            },
            {
              q: "Kan jag returnera?",
              a: "Ja, du har 14 dagars ångerrätt enligt lag. Kontakta oss på hej@sleepie.se så hjälper vi dig.",
            },
            {
              q: "Vilka betalningssätt finns?",
              a: "Swish, kort och Klarna. Alla betalningar hanteras säkert via Mollie.",
            },
          ].map((item) => (
            <details
              key={item.q}
              className="group bg-white border border-sleepie-gray-100 rounded-xl overflow-hidden"
            >
              <summary className="flex items-center justify-between cursor-pointer px-5 py-4 text-sm font-medium list-none">
                {item.q}
                <span className="text-sleepie-gray-400 group-open:rotate-45 transition-transform text-lg leading-none ml-4">
                  +
                </span>
              </summary>
              <div className="px-5 pb-4 text-sm text-sleepie-gray-600 leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sleepie-black text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-24 text-center">
          <h2 className="font-serif text-2xl md:text-3xl mb-4">
            Redo för lugnare nätter?
          </h2>
          <p className="text-sleepie-gray-400 mb-9 max-w-md mx-auto text-sm leading-relaxed">
            Upptäck produkterna som hjälper både dig och din bebis att sova
            bättre.
          </p>
          <Link
            href="/produkter"
            className="inline-flex items-center justify-center bg-white text-sleepie-black px-8 py-3.5 rounded-full text-sm font-medium hover:bg-sleepie-gray-100 transition"
          >
            Upptäck kollektionen
          </Link>
        </div>
      </section>
    </>
  );
}
