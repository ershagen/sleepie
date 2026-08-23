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
  sku: string;
  brand: string;
  condition: "new";
  availability: "in_stock";
  cjPid?: string | null;
  cjVid?: string | null;
  cjSku?: string | null;
  cjCostUsd?: number | null;
};

/** Product photos hosted on Vercel Blob */
const BLOB =
  "https://bmpvyjsgiskr7b9a.public.blob.vercel-storage.com/products";
const img = (name: string) => `${BLOB}/${name}.jpg`;

function withCj(
  base: Omit<
    Product,
    "cjPid" | "cjVid" | "cjSku" | "cjCostUsd" | "brand" | "condition" | "availability"
  >
): Product {
  const m = getCjMapping(base.slug);
  return {
    ...base,
    brand: "Sleepie",
    condition: "new",
    availability: "in_stock",
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
    name: "Sleepie Rocker",
    sku: "SLP-ROCK-001",
    price: 449,
    description:
      "Portabel USB-C rocker som klipsas på vagnen. Mjuk gungning med tyst motor, flera hastigheter och timer. För hemmet, caféet och resan – när armarna behöver vila.",
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
    image: img("rocker-stroller"),
    images: [img("rocker-stroller"), img("rocker-nursery")],
    badge: "Bästsäljare",
  }),
  withCj({
    id: "2",
    slug: "white-noise",
    name: "White Noise Maskin",
    sku: "SLP-NOIS-001",
    price: 299,
    description:
      "Kompakt portabel white noise-maskin med mjuk nattlampa och USB-C. Skapar en trygg ljudbubbla för djupare sömn – hemma eller på resan.",
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
    sku: "SLP-MUSL-001",
    price: 349,
    description:
      "3-pack mjuka muslin-swaddles i neutrala toner. Andningsbara, lätta och sköna mot känslig hud – swaddle, amning och solskydd i ett.",
    shortDescription: "3-pack mjuka swaddles i nordiska toner.",
    features: [
      "Mjuk gauze / muslin",
      "3-pack",
      "Neutrala färger",
      "Andningsbara & lätta",
      "Maskintvätt",
    ],
    category: "Textil",
    image: img("muslin"),
    images: [img("muslin")],
  }),
  withCj({
    id: "4",
    slug: "sleep-sack",
    name: "Sleep Sack",
    sku: "SLP-SACK-001",
    price: 399,
    description:
      "Säker sömnsäck utan lösa täcken. Håller bebisen lagom varm under natten – mjuk, andningsbar och enkel att ta på.",
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
    sku: "SLP-KIT-001",
    price: 999,
    description:
      "Allt i ett: Sleepie Rocker + White Noise + Muslin Set. Bästa starten för lugnare nätter – sparar jämfört med att köpa separat.",
    shortDescription: "Rocker + White Noise + Muslin. Sparar 98 kr.",
    features: [
      "Sleepie Rocker (449 kr)",
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
export const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "https://sleepie-alectiv.vercel.app";

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.slice(0, 4);
}

export function getRelatedProducts(slug: string, limit = 3): Product[] {
  return products.filter((p) => p.slug !== slug).slice(0, limit);
}
