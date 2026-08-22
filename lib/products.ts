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
  /** CJ product id */
  cjPid?: string | null;
  /** CJ variant id for createOrder */
  cjVid?: string | null;
  cjSku?: string | null;
  cjCostUsd?: number | null;
};

const media = (filename: string) => `/api/media/file/${filename}`;

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
      "Den portabla stroller rockern som ger din bebis den mjuka gungande rörelsen den älskar – hemma, på caféet eller på resan. Uppladdningsbar USB-C, tyst motor och universell passform för de flesta vagnar. Fem hastigheter och timer så du kan fokusera på dig själv en stund.",
    shortDescription: "Mjuk gungning för lugnare stunder – hemma eller på språng.",
    features: [
      "Uppladdningsbar med USB-C",
      "5 justerbara hastigheter",
      "Timer 15 / 30 / 45 min",
      "Passar de flesta standardvagnar",
      "Tyst, diskret motor",
      "CE-märkt",
    ],
    category: "Rocker",
    image: media("21H4i.jpg"),
    images: [media("21H4i.jpg")],
    badge: "Bästsäljare",
  }),
  withCj({
    id: "2",
    slug: "white-noise",
    name: "White Noise Maskin",
    price: 299,
    description:
      "Portabel white noise-maskin med naturljud och mjuk nattlampa. Skapar en trygg ljudbubbla som hjälper både bebis och dig att somna snabbare – och sova längre.",
    shortDescription: "Lugnande ljud och mjukt ljus för bättre sömn.",
    features: [
      "White noise + naturljud",
      "Uppladdningsbar",
      "Inbyggd timer",
      "Mjuk nattlampa",
      "Kompakt nordisk design",
    ],
    category: "Ljud",
    image: media("noise.jpg"),
    images: [media("noise.jpg")],
  }),
  withCj({
    id: "3",
    slug: "muslin-set",
    name: "Muslin Swaddle Set",
    price: 349,
    description:
      "Mjukt 3-pack med ekologiska muslinfiltar i lugna, neutrala toner. Andningsbara, lätta och sköna mot känslig hud.",
    shortDescription: "Mjuka, andningsbara swaddles i nordiska toner.",
    features: [
      "Ekologisk bomull / bambu",
      "GOTS / OEKO-TEX",
      "3-pack",
      "Neutrala färger",
      "Andningsbara & lätta",
    ],
    category: "Textil",
    image: media("muslin.jpg"),
    images: [media("muslin.jpg")],
  }),
  withCj({
    id: "4",
    slug: "sleep-sack",
    name: "Sleep Sack",
    price: 399,
    description:
      "Säker och bekväm sömnsäck som håller bebisen lagom varm utan lösa täcken.",
    shortDescription: "Säker sömn utan lösa täcken.",
    features: [
      "Andningsbart material",
      "Säker design utan lösa delar",
      "Flera storlekar",
      "Mjuk mot huden",
      "Enkel på/av",
    ],
    category: "Textil",
    image: media("sack.jpg"),
    images: [media("sack.jpg")],
  }),
  withCj({
    id: "5",
    slug: "komplett-sovrutin",
    name: "Komplett Sovrutin",
    price: 999,
    description:
      "Allt du behöver för en lugnare start: Stroller Rocker, White Noise Maskin och Muslin Swaddle Set.",
    shortDescription: "Rocker + White Noise + Muslin. Bästa starten.",
    features: [
      "Stroller Rocker (449 kr)",
      "White Noise Maskin (299 kr)",
      "Muslin Swaddle Set (349 kr)",
      "Sparar 98 kr mot att köpa separat",
    ],
    category: "Bundle",
    image: media("bundle.jpg"),
    images: [media("bundle.jpg")],
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
