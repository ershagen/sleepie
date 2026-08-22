import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Cookies",
  description: "Information om hur Sleepie använder cookies och liknande teknik.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 md:py-24">
      <h1 className="font-serif text-3xl md:text-4xl text-sleepie-black">
        Cookies
      </h1>
      <div className="mt-8 space-y-6 text-sm text-sleepie-gray-600 leading-relaxed">
        <p>
          Vi använder nödvändiga cookies för att webbplatsen ska fungera – till
          exempel för varukorg och säker betalning. Utan dessa kan du inte
          genomföra ett köp.
        </p>
        <p>
          Om vi lägger till analys- eller marknadsföringscookies informerar vi om
          det och ber om samtycke där det krävs enligt gällande lag.
        </p>
        <p>
          Du kan radera eller blockera cookies i din webbläsare. Observera att
          vissa funktioner då kan sluta fungera.
        </p>
        <p>
          Frågor? Kontakta{" "}
          <a href="mailto:hej@sleepie.se" className="underline hover:text-sleepie-black">
            hej@sleepie.se
          </a>
          . Se även vår{" "}
          <a href="/integritet" className="underline hover:text-sleepie-black">
            integritetspolicy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
