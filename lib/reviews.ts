import "server-only";
import { getPayloadClient, payloadConfigured } from "./payload";
import {
  FALLBACK_REVIEWS,
  getReviewsForProduct,
  getReviewStats,
  type Review,
} from "./reviews-data";

export type { Review } from "./reviews-data";
export {
  FALLBACK_REVIEWS,
  reviews,
  getReviewsForProduct,
  getReviewStats,
} from "./reviews-data";

export async function getReviewsForProductAsync(
  slug: string
): Promise<Review[]> {
  if (!payloadConfigured()) return getReviewsForProduct(slug);
  try {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: "reviews",
      where: {
        and: [
          { productSlug: { equals: slug } },
          { approved: { equals: true } },
        ],
      },
      limit: 50,
      sort: "-reviewDate",
      overrideAccess: true,
    });
    if (!res.docs.length) return getReviewsForProduct(slug);
    return res.docs.map((d) => {
      const doc = d as unknown as Record<string, unknown>;
      const rating = Math.min(5, Math.max(1, Number(doc.rating) || 5)) as
        | 1
        | 2
        | 3
        | 4
        | 5;
      return {
        id: String(doc.id),
        productSlug: String(doc.productSlug || slug),
        name: String(doc.author || ""),
        rating,
        title: String(doc.title || ""),
        body: String(doc.content || ""),
        date: doc.reviewDate
          ? String(doc.reviewDate).slice(0, 10)
          : new Date().toISOString().slice(0, 10),
        detail: doc.detail ? String(doc.detail) : undefined,
      };
    });
  } catch (e) {
    console.error("[catalog:reviews]", e);
    return getReviewsForProduct(slug);
  }
}

export async function getReviewStatsAsync(slug: string) {
  const list = await getReviewsForProductAsync(slug);
  if (list.length === 0) return { count: 0, average: 0 };
  const sum = list.reduce((acc, r) => acc + r.rating, 0);
  return {
    count: list.length,
    average: Math.round((sum / list.length) * 10) / 10,
  };
}
