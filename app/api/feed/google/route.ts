import { products, SITE_URL } from "@/lib/catalog";

export async function GET() {
  const headers = [
    "id",
    "title",
    "description",
    "link",
    "image_link",
    "additional_image_link",
    "availability",
    "condition",
    "price",
    "brand",
    "mpn",
    "product_type",
    "google_product_category",
    "shipping",
  ];

  const rows = products.map((p) => {
    const extra = p.images.slice(1).join(",");
    return [
      p.sku,
      escape(p.name),
      escape(p.description),
      `${SITE_URL}/produkter/${p.slug}`,
      p.image,
      extra,
      p.availability === "in_stock" ? "in_stock" : "out_of_stock",
      p.condition,
      `${p.price.toFixed(2)} SEK`,
      p.brand,
      p.sku,
      escape(`Baby > Sleep > ${p.category}`),
      "1239",
      "SE::Standard:0 SEK",
    ].join("\t");
  });

  const body = [headers.join("\t"), ...rows].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/tab-separated-values; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

function escape(s: string) {
  return s.replace(/[\t\n\r]/g, " ").trim();
}
