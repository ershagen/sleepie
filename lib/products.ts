import { getCjMapping } from "./cj-mapping";

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  shortDescription: string;
  features: string[];
  category: string;
  image: string;
  images: string[];
  badge?: string;
  cjPid?: string | null;
  cjVid?: string | null;
  cjSku?: string | null;
  cjCostUsd?: number | null;
};

/** AI product photos via /api/product-image */
const img = (name: string) => `/api/product-image/${name}`;

function withCj(
  base: Omit<Product, "cjPid" | "cjVid" | "cjSku" | "cjCostUsd">
): Product {
  const m = getCjMapping(base.slug);
  return {
    ...base,
    cjPid: m?.pid ?? null,
    cjVid: m?.vid ?? null,
    cjSku: m?.sku ?? null,
    cjCostUsd: m?.costUsd ?? null,
  };
}

export const products: Product[] = [
  withCj({
    id: "1",
    slug: "stroller-rocker",
    name: "Stroller Rocker",
    price: 449,
    description:
      "Portabel USB-C stroller rocker – samma typ som du hittar hos leverantörer på Alibaba/CJ. Klipsas på vagnen, ger mjuk gungning med tyst motor, flera hastigheter och timer. För hemmet, caféet och resan.",
    shortDescription: "USB-C clip-on rocker – mjuk gungning på språng.",
    features: [
      "Uppladdningsbar USB-C",
      "5 justerbara hastigheter",
      "Timer 15 / 30 / 45 min",
      "Universell passform för de flesta vagnar",
      "Tyst, diskret motor",
      "CE-märkt",
    ],
    category: "Rocker",
    image: img("rocker"),
    images: [img("rocker")],
    badge: "Bästsäljare",
  }),
  withCj({
    id: "2",
    slug: "white-noise",
    name: "White Noise Maskin",
    price: 299,
    description:
      "Kompakt portabel white noise-maskin med mjuk nattlampa och USB-C – inspirerad av de mest efterfrågade soothers på Alibaba. Skapar en trygg ljudbubbla för bättre sömn.",
    shortDescription: "Lugnande ljud + mjukt ljus, USB-C.",
    features: [
      "White noise + naturljud",
      "Uppladdningsbar USB-C",
      "Inbyggd timer",
      "Mjuk nattlampa",
      "Kompakt nordisk design",
    ],
    category: "Ljud",
    image: img("noise"),
    images: [img("noise")],
  }),
  withCj({
    id: "3",
    slug: "muslin-set",
    name: "Muslin Swaddle Set",
    price: 349,
    description:
      "3-pack mjuka muslin/gauze-swaddles i neutrala toner – samma kategori som CJ-mappade swaddles. Andningsbara, lätta och sköna mot känslig hud.",
    shortDescription: "3-pack mjuka swaddles i nordiska toner.",
    features: [
      "Mjuk gauze / muslin",
      "3-pack",
      "Neutrala färger",
      "Andningsbara & lätta",
      "CJ-kopplad dropshipping",
    ],
    category: "Textil",
    image: img("muslin"),
    images: [img("muslin")],
  }),
  withCj({
    id: "4",
    slug: "sleep-sack",
    name: "Sleep Sack",
    price: 399,
    description:
      "Säker sömnsäck utan lösa täcken – håller bebisen lagom varm. Matchar CJ sleep/swaddle-sortimentet för trygg dropshipping.",
    shortDescription: "Säker sömn utan lösa täcken.",
    features: [
      "Andningsbart material",
      "Säker design",
      "Flera storlekar",
      "Mjuk mot huden",
      "Enkel på/av",
    ],
    category: "Textil",
    image: img("sack"),
    images: [img("sack")],
  }),
  withCj({
    id: "5",
    slug: "komplett-sovrutin",
    name: "Komplett Sovrutin",
    price: 999,
    description:
      "Allt i ett: Stroller Rocker + White Noise + Muslin Set. Bästa starten för lugnare nätter – sparar jämfört med att köpa separat.",
    shortDescription: "Rocker + White Noise + Muslin. Sparar 98 kr.",
    features: [
      "Stroller Rocker (449 kr)",
      "White Noise Maskin (299 kr)",
      "Muslin Swaddle Set (349 kr)",
      "Sparar 98 kr mot separat",
    ],
    category: "Bundle",
    image: img("bundle"),
    images: [img("bundle")],
    badge: "Kit",
  }),
];

export const FREE_SHIPPING_THRESHOLD = 799;

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.slice(0, 4);
}

export function getRelatedProducts(slug: string, limit = 3): Product[] {
  return products.filter((p) => p.slug !== slug).slice(0, limit);
}
