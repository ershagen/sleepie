import type { Metadata } from "next";
import { SITE_URL } from "./products";

export const SITE_NAME = "Sleepie";
export const DEFAULT_DESCRIPTION =
  "Smarta produkter som hjälper ditt barn sova – och dig andas ut. Sleepie Rocker, muslin, sömnsäck och mer. Fri frakt över 799 kr.";

export function absoluteUrl(path = "") {
  const base = SITE_URL.replace(/\/$/, "");
  if (!path) return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(opts.path);
  const image = opts.image || absoluteUrl("/og.png");

  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: SITE_NAME,
      locale: "sv_SE",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: opts.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [image],
    },
    robots: opts.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
