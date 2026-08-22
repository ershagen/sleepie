import { MetadataRoute } from "next";
import { products, SITE_URL } from "@/lib/products";

const base = SITE_URL.replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: { path: string; priority: number; freq: MetadataRoute.Sitemap[0]["changeFrequency"] }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/produkter", priority: 0.95, freq: "daily" },
    { path: "/om-oss", priority: 0.6, freq: "monthly" },
    { path: "/kontakt", priority: 0.5, freq: "monthly" },
    { path: "/faq", priority: 0.7, freq: "monthly" },
    { path: "/guider", priority: 0.75, freq: "weekly" },
    { path: "/guider/babys-somn", priority: 0.7, freq: "monthly" },
    { path: "/sa-funkar-det", priority: 0.55, freq: "monthly" },
    { path: "/frakt-returer", priority: 0.5, freq: "monthly" },
    { path: "/villkor", priority: 0.3, freq: "yearly" },
    { path: "/integritet", priority: 0.3, freq: "yearly" },
    { path: "/cookies", priority: 0.2, freq: "yearly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((p) => ({
    url: `${base}${p.path === "/" ? "" : p.path}`,
    lastModified: now,
    changeFrequency: p.freq,
    priority: p.priority,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/produkter/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...staticEntries, ...productEntries];
}
