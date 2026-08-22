import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt | Sleepie",
  description: "Hör av dig till Sleepie – vi hjälper dig gärna.",
};

export default function KontaktPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 md:py-24">
      <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-sleepie-gray-500 mb-4">
        Kontakt
      </p>
      <h1 className="font-serif text-3xl md:text-4xl text-sleepie-black">
        Hör av dig
      </h1>
      <p className="mt-4 text-sleepie-gray-600 leading-relaxed">
        Har du frågor om produkter, order eller något annat? Skicka ett mejl –
        vi återkommer så snart vi kan.
      </p>

      <div className="mt-12 space-y-8">
        <div>
          <h2 className="text-xs font-medium tracking-wider uppercase text-sleepie-gray-500 mb-2">
            E-post
          </h2>
          <a
            href="mailto:hej@sleepie.se"
            className="text-lg text-sleepie-black hover:underline underline-offset-2"
          >
            hej@sleepie.se
          </a>
        </div>

        <div>
          <h2 className="text-xs font-medium tracking-wider uppercase text-sleepie-gray-500 mb-2">
            Svarstid
          </h2>
          <p className="text-sm text-sleepie-gray-600">
            Vi strävar efter att svara inom 1–2 arbetsdagar.
          </p>
        </div>
      </div>

      <div className="mt-14 p-6 bg-sleepie-gray-50 rounded-2xl border border-sleepie-gray-100">
        <h2 className="font-medium mb-2">Innan du mejlar</h2>
        <p className="text-sm text-sleepie-gray-600 leading-relaxed">
          Titta gärna i vår{" "}
          <a href="/#faq" className="underline hover:text-sleepie-black">
            FAQ
          </a>{" "}
          och på sidan{" "}
          <a href="/frakt-returer" className="underline hover:text-sleepie-black">
            Frakt & returer
          </a>
          – där finns svar på de vanligaste frågorna om leverans och ångerrätt.
        </p>
      </div>
    </div>
  );
}
