import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Om oss | Sleepie",
  description:
    "Sleepie – lugnare nätter för bebis och förälder. Vi tror på enkelhet, trygghet och produkter som faktiskt gör skillnad.",
};

export default function OmOssPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 md:py-24">
      <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-sleepie-gray-500 mb-4">
        Om Sleepie
      </p>
      <h1 className="font-serif text-3xl md:text-4xl text-sleepie-black leading-tight">
        Lugnare nätter börjar här
      </h1>

      <div className="mt-10 space-y-6 text-sleepie-gray-600 leading-relaxed">
        <p>
          Sleepie föddes ur en enkel idé: att hjälpa föräldrar få mer sömn – utan
          krångel, utan brus, utan onödiga prylar.
        </p>
        <p>
          Vi är själva föräldrar. Vi vet hur det känns när nätterna blir långa och
          energin tar slut. Därför har vi samlat produkter som faktiskt gör
          skillnad: mjuka gungningar, lugnande ljud och textilier som känns trygga
          mot huden.
        </p>
        <p>
          Allt vi säljer är utvalt med fokus på säkerhet, kvalitet och nordisk
          enkelhet. CE-märkt där det krävs. Designat för att passa in i ett modernt
          hem – inte skrika efter uppmärksamhet.
        </p>
        <p>
          Sleepie är inte ytterligare en barnprylbutik. Det är en lugn plats för dig
          som vill ge ditt barn (och dig själv) bättre nätter.
        </p>
      </div>

      <div className="mt-12 pt-10 border-t border-sleepie-gray-100">
        <h2 className="font-serif text-xl mb-4">Våra principer</h2>
        <ul className="space-y-4 text-sm text-sleepie-gray-600">
          <li className="flex gap-3">
            <span className="text-sleepie-black font-medium">01</span>
            <span>
              <strong className="text-sleepie-black">Enkelhet.</strong> Färre
              produkter, mer genomtänkta val.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-sleepie-black font-medium">02</span>
            <span>
              <strong className="text-sleepie-black">Trygghet.</strong> Säkerhet och
              kvalitet går före det mesta.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-sleepie-black font-medium">03</span>
            <span>
              <strong className="text-sleepie-black">Lugn.</strong> Design och copy
              som andas – inte skriker.
            </span>
          </li>
        </ul>
      </div>

      <div className="mt-12">
        <Link
          href="/produkter"
          className="inline-flex items-center justify-center bg-sleepie-black text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-sleepie-gray-800 transition"
        >
          Upptäck kollektionen
        </Link>
      </div>
    </div>
  );
}
