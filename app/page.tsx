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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="max-w-2xl">
            <p className="text-sm font-medium tracking-wide text-sleepie-gray-500 mb-4">
              BABY SLEEP & CALMING
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.1] text-sleepie-black text-balance">
              Lugnare nätter börjar här
            </h1>
            <p className="mt-6 text-lg text-sleepie-gray-600 leading-relaxed max-w-lg">
              Smarta produkter som hjälper ditt barn sova – och dig andas ut.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/produkter"
                className="inline-flex items-center justify-center bg-sleepie-black text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-sleepie-gray-800 transition"
              >
                Upptäck kollektionen
              </Link>
              <Link
                href="/#varfor"
                className="inline-flex items-center justify-center border border-sleepie-gray-300 px-7 py-3.5 rounded-full text-sm font-medium hover:border-sleepie-black transition"
              >
                Varför Sleepie
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Sleepie */}
      <section id="varfor" className="bg-white border-y border-sleepie-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <h2 className="font-serif text-2xl md:text-3xl text-center mb-12">
            Varför Sleepie?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Moon,
                title: "Lugnare nätter",
                text: "Produkter designade för att hjälpa både bebis och förälder sova bättre.",
              },
              {
                icon: Shield,
                title: "Säkert & testat",
                text: "CE-märkta produkter med fokus på säkerhet och kvalitet.",
              },
              {
                icon: Truck,
                title: "Snabb leverans",
                text: "Vi skickar direkt så du får dina produkter snabbt hem.",
              },
              {
                icon: Heart,
                title: "Nordisk enkelhet",
                text: "Minimalistisk design som passar in i ett modernt hem.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sleepie-gray-50 mb-4">
                  <item.icon className="w-5 h-5 text-sleepie-black" />
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

      {/* Featured products */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-serif text-2xl md:text-3xl">Utvalda produkter</h2>
          <Link
            href="/produkter"
            className="text-sm font-medium text-sleepie-gray-600 hover:text-sleepie-black transition hidden sm:block"
          >
            Se alla →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
      <section className="bg-sleepie-gray-50 border-y border-sleepie-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <h2 className="font-serif text-2xl md:text-3xl text-center mb-12">
            Så fungerar det
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Välj produkter",
                text: "Hitta det som passar er familj bäst – rocker, white noise eller ett komplett kit.",
              },
              {
                step: "02",
                title: "Betala tryggt",
                text: "Swish, kort eller Klarna. Säkert och enkelt.",
              },
              {
                step: "03",
                title: "Få hemleverans",
                text: "Vi skickar direkt. Du får tracking så du kan följa paketet.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-sm font-medium text-sleepie-gray-400 mb-2">
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
      <section id="faq" className="max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <h2 className="font-serif text-2xl md:text-3xl text-center mb-10">
          Vanliga frågor
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "Hur lång leveranstid är det?",
              a: "Vanligtvis 5–12 arbetsdagar beroende på produkt och lagerstatus. Du får tracking så fort ordern skickas.",
            },
            {
              q: "Är produkterna säkra?",
              a: "Ja. Alla produkter är CE-märkta och utvalda med fokus på säkerhet och kvalitet för bebisar.",
            },
            {
              q: "Kan jag returnera?",
              a: "Ja, du har 14 dagars ångerrätt enligt lag. Kontakta oss så hjälper vi dig.",
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
              <summary className="flex items-center justify-between cursor-pointer px-5 py-4 font-medium list-none">
                {item.q}
                <span className="text-sleepie-gray-400 group-open:rotate-45 transition text-xl leading-none">
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20 text-center">
          <h2 className="font-serif text-2xl md:text-3xl mb-4">
            Redo för lugnare nätter?
          </h2>
          <p className="text-sleepie-gray-300 mb-8 max-w-md mx-auto">
            Upptäck produkterna som hjälper både dig och din bebis att sova bättre.
          </p>
          <Link
            href="/produkter"
            className="inline-flex items-center justify-center bg-white text-sleepie-black px-7 py-3.5 rounded-full text-sm font-medium hover:bg-sleepie-gray-100 transition"
          >
            Upptäck kollektionen
          </Link>
        </div>
      </section>
    </>
  );
}