import { getCjMapping } from "./cj-mapping";
import { getPayloadClient, payloadConfigured } from "./payload";

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
const img = (name: string) => `${BLOB}/${name}.jpg`;

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

/** Hardcoded catalog — used when Payload is empty or offline */
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
    image: img("rocker-stroller"),
    images: [img("rocker-stroller"), img("rocker-nursery")],
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

/** @deprecated Prefer getProducts() — kept for generateStaticParams fallback */
export const products = FALLBACK_PRODUCTS;

export const FREE_SHIPPING_THRESHOLD = 799;
export const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "https://sleepie-alectiv.vercel.app";

type MediaDoc = { url?: string | null } | string | null | undefined;

function mediaUrl(m: MediaDoc): string | null {
  if (!m) return null;
  if (typeof m === "string") return m;
  return m.url || null;
}

function mapDoc(doc: Record<string, unknown>): Product {
  const featuresRaw = (doc.features as Array<{ feature?: string }> | undefined) || [];
  const features = featuresRaw
    .map((f) => f.feature)
    .filter((x): x is string => Boolean(x));

  const gallery =
    ((doc.galleryUrls as Array<{ url?: string }> | undefined) || [])
      .map((g) => g.url)
      .filter((x): x is string => Boolean(x));

  const imagesFromMedia = (
    (doc.images as Array<{ image?: MediaDoc }> | undefined) || []
  )
    .map((i) => mediaUrl(i.image))
    .filter((x): x is string => Boolean(x));

  const mainImage =
    mediaUrl(doc.image as MediaDoc) ||
    (doc.imageUrl as string) ||
    gallery[0] ||
    imagesFromMedia[0] ||
    img("rocker-stroller");

  const images =
    gallery.length > 0
      ? gallery
      : imagesFromMedia.length > 0
        ? imagesFromMedia
        : [mainImage];

  const cj = (doc.cj as Record<string, unknown>) || {};
  const slug = String(doc.slug || "");
  const m = getCjMapping(slug);

  return {
    id: String(doc.id),
    slug,
    name: String(doc.name || ""),
    sku: String(doc.sku || m?.sku || ""),
    price: Number(doc.price) || 0,
    description: String(doc.description || ""),
    shortDescription: String(doc.shortDescription || ""),
    features,
    category: String(doc.category || ""),
    image: mainImage,
    images,
    badge: doc.badge ? String(doc.badge) : undefined,
    brand: "Sleepie",
    condition: "new",
    availability: "in_stock",
    cjPid: (cj.pid as string) || m?.pid || null,
    cjVid: (cj.vid as string) || m?.vid || null,
    cjSku: (cj.sku as string) || m?.sku || null,
    cjCostUsd:
      typeof cj.costUsd === "number" ? cj.costUsd : m?.costUsd ?? null,
  };
}

export async function getProducts(): Promise<Product[]> {
  if (!payloadConfigured()) return FALLBACK_PRODUCTS;
  try {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: "products",
      where: { active: { equals: true } },
      limit: 100,
      depth: 1,
      overrideAccess: true,
    });
    if (!res.docs.length) return FALLBACK_PRODUCTS;
    return res.docs.map((d) => mapDoc(d as unknown as Record<string, unknown>));
  } catch (e) {
    console.error("[catalog:products]", e);
    return FALLBACK_PRODUCTS;
  }
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await getProducts();
  return all.slice(0, 4);
}

export async function getRelatedProducts(
  slug: string,
  limit = 3
): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.slug !== slug).slice(0, limit);
}

/** Sync helpers for client components / static paths */
export function getProductBySlugSync(slug: string): Product | undefined {
  return FALLBACK_PRODUCTS.find((p) => p.slug === slug);
}
