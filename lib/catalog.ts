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
  averageRating?: number;
  reviewCount?: number;
};

const BLOB =
  "https://bmpvyjsgiskr7b9a.public.blob.vercel-storage.com/products";
export const img = (name: string) => `${BLOB}/${name}.jpg`;

export const CJ_ROCKER = {
  black:
    "https://cf.cjdropshipping.com/quick/product/daad17b5-b85e-4aac-bbb6-390c401a7f9c.jpg",
  angle:
    "https://cf.cjdropshipping.com/quick/product/5bb6416e-a279-4b68-9416-118a819c76e3.jpg",
  pack:
    "https://oss-cf.cjdropshipping.com/product/2026/05/02/06/e7e3e898-36b6-47a2-bf7e-ef369c2ab4fb_water_trans.jpeg",
};

export const ROCKER_GALLERY = [
  img("rocker-stroller-v2"),
  img("rocker-nursery-v2"),
  img("rocker-studio-v2"),
  CJ_ROCKER.black,
  CJ_ROCKER.angle,
  CJ_ROCKER.pack,
];

function withCj(
  base: Omit<
    Product,
    | "cjPid"
    | "cjVid"
    | "cjSku"
    | "cjCostUsd"
    | "brand"
    | "condition"
    | "availability"
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

export const FALLBACK_PRODUCTS: Product[] = [
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
    image: img("rocker-stroller-v2"),
    images: ROCKER_GALLERY,
    badge: "Bästsäljare",
  }),
  withCj({
    id: "2",
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
    id: "3",
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
    id: "4",
    slug: "komplett-sovrutin",
    name: "Komplett Sovrutin",
    sku: "SLP-KIT-001",
    price: 999,
    description:
      "Allt i ett: Sleepie Rocker + Muslin Swaddle Set + Sleep Sack. Bästa starten för lugnare nätter – sparar jämfört med att köpa separat.",
    shortDescription: "Rocker + Muslin + Sleep Sack. Sparar 198 kr.",
    features: [
      "Sleepie Rocker (449 kr)",
      "Muslin Swaddle Set (349 kr)",
      "Sleep Sack (399 kr)",
      "Sparar 198 kr mot separat",
    ],
    category: "Bundle",
    image: img("bundle"),
    images: [img("bundle")],
    badge: "Kit",
  }),
];

export const products = FALLBACK_PRODUCTS;
export const FREE_SHIPPING_THRESHOLD = 799;
export const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "https://sleepie-two.vercel.app";

export function getProductBySlugSync(slug: string): Product | undefined {
  return FALLBACK_PRODUCTS.find((p) => p.slug === slug);
}
