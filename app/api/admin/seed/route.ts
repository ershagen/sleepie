import { NextRequest, NextResponse } from "next/server";
import { getPayloadClient, payloadConfigured } from "@/lib/payload";
import { FALLBACK_PRODUCTS } from "@/lib/catalog";
import { FALLBACK_REVIEWS } from "@/lib/reviews-data";
import { getCjMapping } from "@/lib/cj-mapping";

/**
 * POST /api/admin/seed
 * Header: Authorization: Bearer <PAYLOAD_SECRET or SEED_SECRET>
 */
export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization") || "";
  const token = auth.replace(/^Bearer\s+/i, "").trim();
  const expected =
    process.env.SEED_SECRET || process.env.PAYLOAD_SECRET || "";

  if (!expected || token !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!payloadConfigured()) {
    return NextResponse.json(
      { error: "DATABASE_URI / PAYLOAD_SECRET missing" },
      { status: 503 }
    );
  }

  const payload = await getPayloadClient();
  const productResults: Array<{ slug: string; action: string }> = [];
  const reviewResults: Array<{ id: string; action: string }> = [];

  for (const p of FALLBACK_PRODUCTS) {
    const m = getCjMapping(p.slug);
    const existing = await payload.find({
      collection: "products",
      where: { slug: { equals: p.slug } },
      limit: 1,
      overrideAccess: true,
    });

    const data = {
      name: p.name,
      slug: p.slug,
      sku: p.sku,
      price: p.price,
      shortDescription: p.shortDescription,
      description: p.description,
      features: p.features.map((feature) => ({ feature })),
      category: p.category as "Rocker" | "Ljud" | "Textil" | "Bundle",
      badge: p.badge || undefined,
      imageUrl: p.image,
      galleryUrls: p.images.map((url) => ({ url })),
      cj: {
        pid: m?.pid || p.cjPid || undefined,
        vid: m?.vid || p.cjVid || undefined,
        sku: m?.sku || p.cjSku || undefined,
        costUsd: m?.costUsd ?? p.cjCostUsd ?? undefined,
      },
      active: true,
    };

    if (existing.docs[0]) {
      await payload.update({
        collection: "products",
        id: existing.docs[0].id,
        data,
        overrideAccess: true,
      });
      productResults.push({ slug: p.slug, action: "updated" });
    } else {
      await payload.create({
        collection: "products",
        data,
        overrideAccess: true,
      });
      productResults.push({ slug: p.slug, action: "created" });
    }
  }

  for (const r of FALLBACK_REVIEWS) {
    const existing = await payload.find({
      collection: "reviews",
      where: {
        and: [
          { productSlug: { equals: r.productSlug } },
          { author: { equals: r.name } },
          { title: { equals: r.title } },
        ],
      },
      limit: 1,
      overrideAccess: true,
    });

    const data = {
      author: r.name,
      title: r.title,
      rating: r.rating,
      content: r.body,
      productSlug: r.productSlug,
      detail: r.detail || undefined,
      reviewDate: r.date,
      approved: true,
    };

    if (existing.docs[0]) {
      await payload.update({
        collection: "reviews",
        id: existing.docs[0].id,
        data,
        overrideAccess: true,
      });
      reviewResults.push({ id: r.id, action: "updated" });
    } else {
      await payload.create({
        collection: "reviews",
        data,
        overrideAccess: true,
      });
      reviewResults.push({ id: r.id, action: "created" });
    }
  }

  return NextResponse.json({
    ok: true,
    products: productResults,
    reviews: reviewResults,
  });
}
