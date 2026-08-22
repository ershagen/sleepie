import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Bättre babysömn – startguide",
  description:
    "En enkel guide till sömnrutiner, trygg miljö, white noise och swaddle för lugnare nätter.",
  path: "/guider/babys-somn",
});

export default function BabysSomnGuidePage() {
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Bättre babysömn: en enkel startguide",
    description:
      "Rutiner, miljö och små vanor som ofta gör störst skillnad de första månaderna.",
    author: { "@type": "Organization", name: "Sleepie" },
    publisher: { "@type": "Organization", name: "Sleepie" },
    inLanguage: "sv-SE",
  };

  return (
    <article className="max-w-2xl mx-auto px-4 sm:px-6 py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <p className="text-sm text-sleepie-gray-500 mb-3">
        <Link href="/guider" className="hover:text-sleepie-black">
          Guider
        </Link>{" "}
        / Babysömn
      </p>
      <h1 className="font-serif text-3xl md:text-4xl text-sleepie-black leading-tight">
        Bättre babysömn: en enkel startguide
      </h1>
      <p className="mt-4 text-sleepie-gray-600 leading-relaxed">
        Det finns ingen universell lösning – men några mönster återkommer hos
        många familjer. Här är det vi själva återkommer till.
      </p>

      <div className="mt-10 space-y-10 text-sleepie-gray-700 leading-relaxed text-[15px]">
        <section>
          <h2 className="font-serif text-xl text-sleepie-black mb-3">
            1. Samma signaler varje kväll
          </h2>
          <p>
            En kort, upprepbar rutin – bad, amning/flaska, dimmat ljus, samma
            ljud – hjälper kroppen att förstå att det är natt. Det behöver inte ta
            länge. Det viktiga är igenkänning.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-sleepie-black mb-3">
            2. Lugn miljö
          </h2>
          <p>
            Svalt, mörkt och så tyst som det går – eller med jämnt bakgrundsljud.
            Många föräldrar upplever att white noise dämpar plötsliga ljud från
            hemmet och gör det lättare att somna om.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-sleepie-black mb-3">
            3. Trygg inpackning
          </h2>
          <p>
            Swaddle eller sömnsäck kan minska startle-reflexen. Välj andningsbara
            material och följ alltid ålders- och säkerhetsråd. När bebisen börjar
            vända sig är det dags att byta metod.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-sleepie-black mb-3">
            4. Rörelse när det behövs
          </h2>
          <p>
            Vissa bebisar somnar lättare i rörelse – vagn, bärsele eller en mjuk
            gungning. En portabel rocker kan avlasta armarna när du behöver en
            paus, hemma eller på språng.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-sleepie-black mb-3">
            5. Realistiska förväntningar
          </h2>
          <p>
            Nyfödda vaknar ofta. Målet är sällan ”perfekta nätter” från dag ett –
            utan fler stunder av återhämtning för er båda. Små förbättringar räknas.
          </p>
        </section>
      </div>

      <div className="mt-14 p-6 rounded-2xl bg-sleepie-green-muted border border-sleepie-gray-100">
        <p className="font-medium text-sleepie-black">Redo att testa i praktiken?</p>
        <p className="mt-2 text-sm text-sleepie-gray-600">
          Se våra utvalda produkter för gungning, ljud och textil.
        </p>
        <Link
          href="/produkter"
          className="mt-4 inline-flex bg-sleepie-green text-white px-6 py-3 text-sm font-medium hover:bg-sleepie-green-dark transition"
        >
          Utforska produkterna
        </Link>
      </div>

      <p className="mt-8 text-xs text-sleepie-gray-500">
        Innehållet är allmän information och ersätter inte råd från BVC eller
        vårdpersonal.
      </p>
    </article>
  );
}
