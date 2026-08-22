# Sleepie

Premium baby sleep & calming e-commerce store.

**Lugnare nätter börjar här.**

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- Mollie (Swish + kort + Klarna) – kommer
- CJDropshipping API – kommer
- Payload CMS + Supabase – kommer

## Kom igång

```bash
npm install
npm run dev
```

Öppna [http://localhost:3000](http://localhost:3000).

## Struktur

- `app/` – sidor (startsida, produkter, varukorg)
- `components/` – Header, Footer, ProductCard
- `lib/products.ts` – mock-produkter (fallback tills databas är inkopplad)

## Design

Minimalistisk nordisk stil:
- Svart `#0A0A0A`
- Off-white `#FAFAF9`
- Elegant serif för rubriker
- Mycket white space

## Nästa steg

1. Generera proffsiga produktbilder
2. Koppla Payload CMS + Supabase
3. Mollie-betalningar (Swish)
4. CJDropshipping-orderflöde
5. Settings-sida för API-nycklar
