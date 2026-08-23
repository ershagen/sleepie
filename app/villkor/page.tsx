import type { Metadata } from "next";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Köpvillkor | Sleepie",
  description: "Allmänna villkor för köp hos Sleepie.",
};

export default function VillkorPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 md:py-24">
      <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-sleepie-gray-500 mb-4">
        Juridiskt
      </p>
      <h1 className="font-serif text-3xl md:text-4xl text-sleepie-black">
        Köpvillkor
      </h1>

      <div className="mt-10 space-y-8 text-sm text-sleepie-gray-600 leading-relaxed">
        <section>
          <h2 className="font-medium text-sleepie-black mb-2">1. Säljare</h2>
          <p>
            Sleepie drivs av {COMPANY.legalName}, org.nr {COMPANY.orgNr},
            momsregistreringsnummer {COMPANY.vatNr}. Adress: {COMPANY.address},{" "}
            {COMPANY.zip} {COMPANY.city}, {COMPANY.country}. Kontakt:{" "}
            {COMPANY.email}.
          </p>
        </section>

        <section>
          <h2 className="font-medium text-sleepie-black mb-2">2. Avtal</h2>
          <p>
            När du lägger en order hos Sleepie ingår du ett köpeavtal med{" "}
            {COMPANY.legalName}. Orderbekräftelse skickas till den e-postadress du
            angett.
          </p>
        </section>

        <section>
          <h2 className="font-medium text-sleepie-black mb-2">3. Priser</h2>
          <p>
            Alla priser anges i svenska kronor (SEK) och inkluderar moms om inte
            annat anges. Vi förbehåller oss rätten att korrigera uppenbara
            prisfel.
          </p>
        </section>

        <section>
          <h2 className="font-medium text-sleepie-black mb-2">4. Betalning</h2>
          <p>
            Betalning sker via Mollie (Swish, kort, Klarna m.m.). Betalningen
            dras när ordern bekräftas.
          </p>
        </section>

        <section>
          <h2 className="font-medium text-sleepie-black mb-2">5. Leverans</h2>
          <p>
            Leveranstid anges som uppskattning. Eventuella förseningar meddelas
            så snart vi har information. Se även sidan Frakt & returer.
          </p>
        </section>

        <section>
          <h2 className="font-medium text-sleepie-black mb-2">6. Ångerrätt</h2>
          <p>
            Du har 14 dagars ångerrätt enligt distansavtalslagen. Kontakta{" "}
            {COMPANY.email} för att påbörja en retur.
          </p>
        </section>

        <section>
          <h2 className="font-medium text-sleepie-black mb-2">7. Reklamation</h2>
          <p>
            Vid fel på vara gäller reklamationsrätt enligt konsumentköplagen.
            Hör av dig till oss med ordernummer och beskrivning.
          </p>
        </section>

        <section>
          <h2 className="font-medium text-sleepie-black mb-2">8. Tvist</h2>
          <p>
            Tvist tolkas enligt svensk lag. Vid konsumenttvist kan du vända dig
            till Allmänna reklamationsnämnden (ARN) eller EU:s onlineplattform
            för tvistlösning.
          </p>
        </section>

        <section>
          <h2 className="font-medium text-sleepie-black mb-2">9. Kontakt</h2>
          <p>
            {COMPANY.legalName}
            <br />
            Org.nr {COMPANY.orgNr}
            <br />
            {COMPANY.address}, {COMPANY.zip} {COMPANY.city}
            <br />
            {COMPANY.email}
          </p>
        </section>
      </div>
    </div>
  );
}
