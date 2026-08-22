import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { getFeaturedProducts, getProductBySlug, products } from "@/lib/products";
import {
  Moon,
  Shield,
  Truck,
  Heart,
  Star,
  Quote,
  Check,
  ArrowRight,
  RotateCcw,
  Package,
} from "lucide-react";

export default function HomePage() {
  const featured = getFeaturedProducts();
  const heroProduct = getProductBySlug("stroller-rocker");
  const kit = getProductBySlug("komplett-sovrutin");

  return (
    <>
      {/* Announcement */}
      <div className="bg-sleepie-black text-white text-center text-[11px] sm:text-xs py-2.5 px-4">
        Fri frakt över 799 kr · Swish, kort & Klarna · 14 dagars ångerrätt
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-sleepie-offwhite">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-16 md:pt-24 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 max-w-xl">
              <h1 className="animate-fade-in-up font-serif text-[2.7rem] sm:text-5xl md:text-[3.5rem] leading-[1.08] text-sleepie-black text-balance">
                Fler timmar sömn.
                <br />
                Färre oroliga nätter.
              </h1>
              <p className="animate-fade-in-up-delay-1 mt-6 text-base sm:text-lg text-sleepie-gray-600 leading-relaxed max-w-md">
                Produkter som hjälper din bebis somna – så du kan andas ut.
                Utvalt för trygghet. Designat för lugn. Inget onödigt brus.
              </p>
              <div className="animate-fade-in-up-delay-2 mt-8 flex flex-wrap gap-3">
                <Link
                  href="/produkter"
                  className="inline-flex items-center justify-center gap-2 bg-sleepie-black text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-sleepie-gray-800 transition shadow-sm"
                >
                  Shoppa nu
                  <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
                </Link>
                <Link
                  href="/produkter/stroller-rocker"
                  className="inline-flex items-center justify-center border border-sleepie-gray-300 px-8 py-3.5 rounded-full text-sm font-medium text-sleepie-gray-700 hover:border-sleepie-black hover:text-sleepie-black transition"
                >
                  Se bästsäljaren
                </Link>
              </div>
              <div className="animate-fade-in-up-delay-3 mt-9 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-sleepie-gray-500">
                <div className="flex text-sleepie-black">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-current"
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <span>Älskad av föräldrar som vill sova mer</span>
              </div>
            </div>

            <div className="lg:col-span-6 animate-fade-in-up-delay-1">
              <Link
                href="/produkter/stroller-rocker"
                className="group block relative aspect-[4/5] sm:aspect-square rounded-2xl overflow-hidden bg-sleepie-gray-100 border border-sleepie-gray-100 animate-float-soft"
              >
                {heroProduct && (
                  <Image
                    src={heroProduct.image}
                    alt={heroProduct.name}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    unoptimized
                  />
                )}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 bg-gradient-to-t from-black/55 via-black/20 to-transparent">
                  <p className="font-serif text-xl text-white">
                    {heroProduct?.name}
                  </p>
                  <p className="text-sm text-white/85 mt-0.5 tabular-nums">
                    från {heroProduct?.price} kr · Bästsäljare
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-sleepie-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs text-sleepie-gray-500">
          <span>CE-märkta produkter</span>
          <span className="hidden sm:inline text-sleepie-gray-300">·</span>
          <span>14 dagars ångerrätt</span>
          <span className="hidden sm:inline text-sleepie-gray-300">·</span>
          <span>Swish · Klarna · Kort</span>
          <span className="hidden sm:inline text-sleepie-gray-300">·</span>
          <span>Fri frakt över 799 kr</span>
        </div>
      </section>

      {/* Problem → solution */}
      <Reveal as="section" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div>
            <h2 className="font-serif text-2xl md:text-[2rem] leading-snug text-balance">
              När nätterna blir långa räcker det inte med &quot;det går över&quot;
            </h2>
          </div>
          <div className="text-sleepie-gray-600 leading-relaxed space-y-4 text-[15px]">
            <p>
              Vi är själva föräldrar. Vi vet hur det känns när bebisen inte
              somnar, när armarna är trötta och när morgonen kommer för tidigt.
            </p>
            <p>
              Sleepie samlar det som faktiskt hjälper: mjuk gungning, lugnande
              ljud och textilier som känns trygga. Färre prylar. Mer sömn.
            </p>
            <Link
              href="/om-oss"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-sleepie-black hover:opacity-70 transition pt-1"
            >
              Läs vår historia <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </Reveal>

      {/* Social proof numbers */}
      <Reveal as="section" className="bg-white border-y border-sleepie-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { n: "5–12", l: "arbetsdagars leverans" },
              { n: "14", l: "dagars ångerrätt" },
              { n: "799", l: "kr fri frakt" },
              { n: "3", l: "betalningssätt" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-serif text-3xl md:text-4xl tabular-nums">{s.n}</p>
                <p className="mt-1 text-xs text-sleepie-gray-500">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Featured products – higher up for selling */}
      <Reveal as="section" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl">Utvalda produkter</h2>
            <p className="mt-2 text-sm text-sleepie-gray-600 max-w-md">
              Allt du behöver för en lugnare sovrutin – från rocker till
              textilier.
            </p>
          </div>
          <Link
            href="/produkter"
            className="text-sm font-medium text-sleepie-gray-600 hover:text-sleepie-black transition hidden sm:inline-flex items-center gap-1"
          >
            Se alla <ArrowRight className="w-3.5 h-3.5" />
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
            className="inline-flex items-center gap-1.5 text-sm font-medium"
          >
            Se alla produkter <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </Reveal>

      {/* What you get – practical selling */}
      <Reveal as="section" className="bg-white border-y border-sleepie-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="max-w-2xl mb-12">
            <h2 className="font-serif text-2xl md:text-3xl">
              Tre saker som faktiskt gör skillnad
            </h2>
            <p className="mt-3 text-sleepie-gray-600 text-sm leading-relaxed">
              Vi har valt bort det mesta. Kvar är det som hjälper både bebis och
              dig att få fler sammanhängande timmar sömn.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal-stagger">
            {[
              {
                title: "Rocker",
                text: "Mjuk, tyst gungning på vagnen – hemma, på caféet eller på resan. USB-C, timer och universell passform.",
                href: "/produkter/stroller-rocker",
                cta: "Se rocker",
              },
              {
                title: "White noise",
                text: "En lugn ljudbubbla med naturljud och mjuk nattlampa. Kompakt, uppladdningsbar och enkel att ta med.",
                href: "/produkter/white-noise",
                cta: "Se white noise",
              },
              {
                title: "Textil",
                text: "Muslin och sleep sack i mjuka, neutrala toner. Andningsbara material som känns trygga mot huden.",
                href: "/produkter",
                cta: "Se textil",
              },
            ].map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="group rounded-2xl border border-sleepie-gray-100 bg-sleepie-offwhite p-7 hover:border-sleepie-gray-300 hover:shadow-md transition-all duration-300"
              >
                <h3 className="font-serif text-xl group-hover:underline underline-offset-4 decoration-1">
                  {cat.title}
                </h3>
                <p className="mt-3 text-sm text-sleepie-gray-600 leading-relaxed">
                  {cat.text}
                </p>
                <p className="mt-5 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {cat.cta} <ArrowRight className="w-3.5 h-3.5" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Why Sleepie */}
      <Reveal as="section" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="font-serif text-2xl md:text-3xl text-sleepie-black">
            Varför föräldrar väljer Sleepie
          </h2>
          <p className="mt-3 text-sleepie-gray-600 text-sm leading-relaxed">
            Lugn, enkelhet och produkter som faktiskt gör skillnad – för både
            bebis och förälder.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 reveal-stagger">
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
              title: "Spårbar leverans",
              text: "Vi skickar direkt. Du får tracking så fort ordern är på väg.",
            },
            {
              icon: Heart,
              title: "Nordisk enkelhet",
              text: "Minimalistisk design som passar in i ett modernt, lugnt hem.",
            },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white border border-sleepie-gray-100 mb-4">
                <item.icon
                  className="w-[18px] h-[18px] text-sleepie-black"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="font-medium text-sm mb-2">{item.title}</h3>
              <p className="text-sm text-sleepie-gray-600 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Bundle spotlight */}
      {kit && (
        <Reveal as="section" className="bg-sleepie-black text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="relative aspect-square max-w-md mx-auto lg:mx-0 w-full rounded-2xl overflow-hidden bg-sleepie-gray-800">
                <Image
                  src={kit.image}
                  alt={kit.name}
                  fill
                  className="object-cover opacity-90 hover:scale-[1.02] transition-transform duration-700"
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
                  en lugnare start – till ett bättre pris.
                </p>
                <ul className="mt-6 space-y-2.5">
                  {kit.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm text-white/80"
                    >
                      <Check
                        className="w-4 h-4 mt-0.5 shrink-0"
                        strokeWidth={1.75}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <p className="text-2xl font-medium tabular-nums">{kit.price} kr</p>
                  <Link
                    href={`/produkter/${kit.slug}`}
                    className="inline-flex items-center justify-center gap-2 bg-white text-sleepie-black px-7 py-3 rounded-full text-sm font-medium hover:bg-sleepie-gray-100 transition"
                  >
                    Köp kitet
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {/* Guarantee / calm shopping */}
      <Reveal as="section" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="rounded-2xl border border-sleepie-gray-100 bg-white p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 reveal-stagger">
            {[
              {
                icon: Package,
                title: "Spårbar frakt",
                text: "5–12 arbetsdagar. Du får tracking så fort paketet lämnar lagret.",
              },
              {
                icon: RotateCcw,
                title: "14 dagars ångerrätt",
                text: "Ångrar du dig? Kontakta oss så hjälper vi dig enkelt med retur.",
              },
              {
                icon: Shield,
                title: "Trygg betalning",
                text: "Swish, kort eller Klarna. Säker checkout utan krångel.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-sleepie-offwhite border border-sleepie-gray-100 flex items-center justify-center">
                  <item.icon
                    className="w-4 h-4 text-sleepie-black"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-1">{item.title}</h3>
                  <p className="text-sm text-sleepie-gray-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* How it works */}
      <Reveal as="section" className="bg-white border-y border-sleepie-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <h2 className="font-serif text-2xl md:text-3xl text-center mb-3">
            Tre steg till lugnare nätter
          </h2>
          <p className="text-center text-sm text-sleepie-gray-600 mb-14 max-w-md mx-auto">
            Från val till dörr – enkelt och tryggt.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto reveal-stagger">
            {[
              {
                step: "1",
                title: "Välj produkter",
                text: "Hitta det som passar er – rocker, white noise eller ett komplett kit.",
              },
              {
                step: "2",
                title: "Betala tryggt",
                text: "Swish, kort eller Klarna. Säkert och enkelt.",
              },
              {
                step: "3",
                title: "Få hemleverans",
                text: "Vi skickar direkt. Du får tracking så du kan följa paketet.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-sleepie-black text-white text-sm font-medium mb-4">
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
      </Reveal>

      {/* Reviews */}
      <Reveal as="section" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="font-serif text-2xl md:text-3xl">Vad föräldrar säger</h2>
          <p className="mt-3 text-sm text-sleepie-gray-600">
            Upplevelser från dig som sover – och dig som vill sova.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal-stagger">
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
                "Muslinfiltarna är så mjuka. Vi använder dem varje dag – swaddle och amning.",
              name: "Sara",
              detail: "Mamma till tvillingar",
            },
          ].map((r) => (
            <blockquote
              key={r.name}
              className="bg-white border border-sleepie-gray-100 rounded-2xl p-7 flex flex-col hover:shadow-sm transition-shadow duration-300"
            >
              <Quote
                className="w-5 h-5 text-sleepie-gray-300 mb-4"
                strokeWidth={1.5}
              />
              <p className="text-sm text-sleepie-gray-700 leading-relaxed flex-1">
                “{r.quote}”
              </p>
              <footer className="mt-6 pt-4 border-t border-sleepie-gray-50">
                <p className="text-sm font-medium">{r.name}</p>
                <p className="text-xs text-sleepie-gray-500">{r.detail}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </Reveal>

      {/* Full catalog teaser */}
      <Reveal as="section" className="bg-sleepie-offwhite border-y border-sleepie-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl">Hela kollektionen</h2>
              <p className="mt-2 text-sm text-sleepie-gray-600">
                {products.length} produkter – från enskilda favoriter till komplett kit.
              </p>
            </div>
            <Link
              href="/produkter"
              className="inline-flex items-center gap-1.5 text-sm font-medium hover:opacity-70 transition"
            >
              Gå till shoppen <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
            {products.map((p) => (
              <Link
                key={p.id}
                href={`/produkter/${p.slug}`}
                className="group rounded-xl overflow-hidden border border-sleepie-gray-100 bg-white"
              >
                <div className="relative aspect-square bg-sleepie-gray-50">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 20vw"
                    unoptimized
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium truncate">{p.name}</p>
                  <p className="text-xs text-sleepie-gray-500 tabular-nums mt-0.5">
                    {p.price} kr
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Reveal>

      {/* FAQ */}
      <Reveal as="section" className="bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 md:py-24">
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
                a: "Swish, kort och Klarna. Alla betalningar hanteras säkert.",
              },
              {
                q: "Passar rockern alla vagnar?",
                a: "Den är universell och passar de flesta standardvagnar. Kolla produktbeskrivningen för detaljer.",
              },
              {
                q: "Vad ingår i Komplett Sovrutin?",
                a: "Stroller Rocker, White Noise Maskin och Muslin Swaddle Set – till ett bättre paketpris.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group bg-sleepie-offwhite border border-sleepie-gray-100 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer px-5 py-4 text-sm font-medium list-none">
                  {item.q}
                  <span className="text-sleepie-gray-400 group-open:rotate-45 transition-transform duration-200 text-lg leading-none ml-4">
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

      {/* Final CTA */}
      <Reveal as="section" className="bg-sleepie-offwhite border-t border-sleepie-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-center">
          <h2 className="font-serif text-2xl md:text-4xl mb-4 text-balance">
            Redo för lugnare nätter?
          </h2>
          <p className="text-sleepie-gray-600 mb-9 max-w-md mx-auto text-sm leading-relaxed">
            Upptäck produkterna som hjälper både dig och din bebis att sova
            bättre – utan krångel.
          </p>
          <Link
            href="/produkter"
            className="inline-flex items-center justify-center gap-2 bg-sleepie-black text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-sleepie-gray-800 transition"
          >
            Upptäck kollektionen
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Reveal>
    </>
  );
}
