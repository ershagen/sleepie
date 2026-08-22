# Sleepie

Premium baby sleep & calming e-commerce.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- Payload CMS 3 + Supabase (PostgreSQL)
- Mollie (kommer)
- CJDropshipping (kommer)

## Lokalt

```bash
npm install
cp .env.example .env.local
# Fyll i DATABASE_URI och PAYLOAD_SECRET
npm run dev
```

Admin: http://localhost:3000/admin  
Shop: http://localhost:3000

## Environment variables (Vercel)

| Variabel | Beskrivning |
|----------|-------------|
| `DATABASE_URI` | Supabase Postgres connection string |
| `PAYLOAD_SECRET` | Random secret (openssl rand -base64 32) |
| `NEXT_PUBLIC_SERVER_URL` | https://sleepie-alectiv.vercel.app |

## Fallback

Om databasen inte är tillgänglig används mock-data i `lib/products.ts` så att butiken alltid syns.
