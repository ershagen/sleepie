import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Integritetspolicy | Sleepie",
  description: "Hur Sleepie hanterar dina personuppgifter.",
};

export default function IntegritetPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 md:py-24">
      <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-sleepie-gray-500 mb-4">
        Juridiskt
      </p>
      <h1 className="font-serif text-3xl md:text-4xl text-sleepie-black">
        Integritetspolicy
      </h1>

      <div className="mt-10 space-y-8 text-sm text-sleepie-gray-600 leading-relaxed">
        <p>
          Sleepie värnar om din integritet. Här beskriver vi hur vi samlar in,
          använder och skyddar personuppgifter i enlighet med GDPR.
        </p>

        <section>
          <h2 className="font-medium text-sleepie-black mb-2">
            Vilka uppgifter samlar vi in?
          </h2>
          <p>
            När du handlar hos oss kan vi behandla namn, e-postadress,
            leveransadress, telefonnummer och betalningsuppgifter (hanteras av
            betalningsleverantör). Vid kontakt sparar vi den information du skickar
            till oss.
          </p>
        </section>

        <section>
          <h2 className="font-medium text-sleepie-black mb-2">
            Varför behandlar vi uppgifterna?
          </h2>
          <p>
            För att fullgöra köpeavtalet, leverera din order, hantera support och
            uppfylla lagkrav (t.ex. bokföring). Med ditt samtycke kan vi även
            skicka relevant information om produkter och erbjudanden.
          </p>
        </section>

        <section>
          <h2 className="font-medium text-sleepie-black mb-2">Lagring</h2>
          <p>
            Vi sparar uppgifter så länge det behövs för syftet eller enligt lag.
            Orderhistorik sparas normalt enligt bokföringsregler.
          </p>
        </section>

        <section>
          <h2 className="font-medium text-sleepie-black mb-2">Dina rättigheter</h2>
          <p>
            Du har rätt att begära tillgång, rättelse, radering och
            begränsning av behandling, samt att invända mot viss behandling. Kontakta
            hej@sleepie.se. Du kan också lämna klagomål till Integritetsskyddsmyndigheten
            (IMY).
          </p>
        </section>

        <section>
          <h2 className="font-medium text-sleepie-black mb-2">Cookies</h2>
          <p>
            Vi kan använda nödvändiga cookies för att sajten ska fungera, samt
            analysverktyg för att förstå hur sajten används. Du kan styra cookies
            via din webbläsare.
          </p>
        </section>

        <section>
          <h2 className="font-medium text-sleepie-black mb-2">Kontakt</h2>
          <p>hej@sleepie.se</p>
        </section>
      </div>
    </div>
  );
}
