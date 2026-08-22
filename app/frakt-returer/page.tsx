import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Frakt & returer | Sleepie",
  description: "Information om leverans, fraktkostnad och ångerrätt hos Sleepie.",
};

export default function FraktReturerPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 md:py-24">
      <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-sleepie-gray-500 mb-4">
        Kundservice
      </p>
      <h1 className="font-serif text-3xl md:text-4xl text-sleepie-black">
        Frakt & returer
      </h1>

      <div className="mt-12 space-y-12">
        <section>
          <h2 className="font-medium text-lg mb-3">Leveranstid</h2>
          <p className="text-sm text-sleepie-gray-600 leading-relaxed">
            De flesta ordrar skickas inom 1–3 arbetsdagar. Leveranstiden till dig
            är vanligtvis <strong className="text-sleepie-black">5–12 arbetsdagar</strong> beroende
            på produkt och lagerstatus. Du får ett trackingnummer via e-post så
            fort paketet är på väg.
          </p>
        </section>

        <section>
          <h2 className="font-medium text-lg mb-3">Fraktkostnad</h2>
          <p className="text-sm text-sleepie-gray-600 leading-relaxed">
            Standardfrakt inom Sverige. Fri frakt kan gälla vid köp över en viss
            summa – se kassan för aktuellt erbjudande. Fraktpriset visas alltid
            innan du slutför köpet.
          </p>
        </section>

        <section>
          <h2 className="font-medium text-lg mb-3">Ångerrätt</h2>
          <p className="text-sm text-sleepie-gray-600 leading-relaxed">
            Du har <strong className="text-sleepie-black">14 dagars ångerrätt</strong> enligt
            distansavtalslagen. Produkten ska returneras i väsentligen oförändrat
            skick. Kontakta oss på{" "}
            <a href="mailto:hej@sleepie.se" className="underline hover:text-sleepie-black">
              hej@sleepie.se
            </a>{" "}
            så hjälper vi dig med returen.
          </p>
        </section>

        <section>
          <h2 className="font-medium text-lg mb-3">Reklamation</h2>
          <p className="text-sm text-sleepie-gray-600 leading-relaxed">
            Om något är fel på produkten gäller reklamationsrätt enligt lag.
            Hör av dig till oss med ordernummer och en kort beskrivning – vi
            löser det snabbt och smidigt.
          </p>
        </section>
      </div>

      <div className="mt-14 pt-8 border-t border-sleepie-gray-100">
        <p className="text-sm text-sleepie-gray-600 mb-4">
          Frågor? Vi svarar gärna.
        </p>
        <Link
          href="/kontakt"
          className="text-sm font-medium text-sleepie-black underline underline-offset-2 hover:no-underline"
        >
          Kontakta oss →
        </Link>
      </div>
    </div>
  );
}
