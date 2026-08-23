import "server-only";
import { getCjMapping } from "./cj-mapping";
import { getPayloadClient, payloadConfigured } from "./payload";
import {
  FALLBACK_PRODUCTS,
  type Product,
  img,
} from "./catalog";

export type { Product } from "./catalog";
export {
  FALLBACK_PRODUCTS,
  products,
  FREE_SHIPPING_THRESHOLD,
  SITE_URL,
  ROCKER_GALLERY,
  CJ_ROCKER_BLACK,
  BUNDLE_IMAGE,
  getProductBySlugSync,
  img,
} from "./catalog";

/** @deprecated use CJ_ROCKER_BLACK */
export { CJ_ROCKER_BLACK as CJ_ROCKER } from "./catalog";

type MediaDoc = { url?: string | null } | string | null | undefined;

function mediaUrl(m: MediaDoc): string | null {
  if (!m) return null;
  if (typeof m === "string") return m;
  return m.url || null;
}

function enrichGallery(product: Product): Product {
  const fallback = FALLBACK_PRODUCTS.find((p) => p.slug === product.slug);
  if (!fallback || fallback.images.length <= 1) return product;

  if (product.slug === "stroller-rocker") {
    return {
      ...product,
      image: fallback.image,
      images: fallback.images,
    };
  }

  if (!product.images || product.images.length <= 1) {
    return {
      ...product,
      image: fallback.image,
      images: fallback.images,
    };
  }

  const seen = new Set(product.images);
  const merged = [...product.images];
  for (const url of fallback.images) {
    if (!seen.has(url)) {
      seen.add(url);
      merged.push(url);
    }
  }
  return { ...product, images: merged };
}

function mapDoc(doc: Record<string, unknown>): Product {
  const featuresRaw =
    (doc.features as Array<{ feature?: string }> | undefined) || [];
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
    img("rocker-stroller-v2");

  const images =
    gallery.length > 0
      ? gallery
      : imagesFromMedia.length > 0
        ? imagesFromMedia
        : [mainImage];

  const cj = (doc.cj as Record<string, unknown>) || {};
  const slug = String(doc.slug || "");
  const m = getCjMapping(slug);

  return enrichGallery({
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
  });
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
  const found = all.find((p) => p.slug === slug);
  if (found) return enrichGallery(found);
  return FALLBACK_PRODUCTS.find((p) => p.slug === slug);
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
