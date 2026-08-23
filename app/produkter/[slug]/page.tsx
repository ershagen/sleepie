import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getProductBySlug,
  getRelatedProducts,
  FALLBACK_PRODUCTS,
} from "@/lib/products";
import { productJsonLd } from "@/lib/structured-data";
import { getReviewStatsAsync } from "@/lib/reviews";
import { Check, Truck, RotateCcw, Shield } from "lucide-react";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductCard } from "@/components/ProductCard";
import { StarRating } from "@/components/StarRating";
import { ProductReviews } from "@/components/ProductReviews";

export function generateStaticParams() {
  return FALLBACK_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Produkt | Sleepie" };
  const stats = await getReviewStatsAsync(slug);
  const desc =
    stats.count > 0
      ? `${product.shortDescription} Betyg ${stats.average}/5 från ${stats.count} recensioner.`
      : product.shortDescription;
  return {
    title: `${product.name} | Sleepie`,
    description: desc,
    openGraph: {
      title: product.name,
      description: desc,
      images: [{ url: product.image }],
      type: "website",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(slug);
  const stats = await getReviewStatsAsync(slug);
  const gallery =
    product.images?.length > 0 ? product.images : [product.image];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd(product)),
        }}
      />

      <nav className="text-xs text-sleepie-gray-500 mb-8 flex gap-2">
        <Link href="/" className="hover:text-sleepie-black transition">
          Hem
        </Link>
        <span>/</span>
        <Link href="/produkter" className="hover:text-sleepie-black transition">
          Produkter
        </Link>
        <span>/</span>
        <span className="text-sleepie-black">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <ProductGallery
          images={gallery}
          alt={product.name}
          badge={product.badge}
        />

        <div className="flex flex-col">
          <h1 className="font-serif text-3xl md:text-4xl leading-tight">
            {product.name}
          </h1>

          {stats.count > 0 && (
            <div className="mt-3">
              <StarRating
                rating={stats.average}
                size="md"
                showValue
                count={stats.count}
              />
            </div>
          )}

          <p className="mt-4 text-2xl font-medium tabular-nums">
            {product.price} kr
          </p>
          <p className="text-xs text-sleepie-gray-500 mt-1">Inkl. moms</p>

          {/* Color: black only */}
          {product.variantsNote && (
            <div className="mt-6">
              <p className="text-xs font-medium text-sleepie-gray-500 mb-2">
                Färg
              </p>
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full border-2 border-sleepie-black ring-2 ring-offset-2 ring-sleepie-black/20"
                  title="Svart"
                  aria-label="Svart – vald"
                >
                  <span className="w-6 h-6 rounded-full bg-sleepie-black" />
                </span>
                <span className="text-sm text-sleepie-black">Svart</span>
              </div>
              <p className="mt-2 text-xs text-sleepie-gray-500">
                Endast svart finish – den stilrena versionen.
              </p>
            </div>
          )}

          <p className="mt-6 text-sleepie-gray-600 leading-relaxed">
            {product.description}
          </p>

          <ul className="mt-8 space-y-3">
            {product.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm">
                <Check
                  className="w-4 h-4 mt-0.5 text-sleepie-black shrink-0"
                  strokeWidth={1.75}
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <AddToCartButton product={product} />
            <Link
              href="/produkter"
              className="flex-1 text-center border border-sleepie-gray-300 py-3.5 px-6 rounded-[5px] text-sm font-medium hover:border-sleepie-black transition"
            >
              Fortsätt handla
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-sleepie-gray-100">
            {[
              { icon: Truck, title: "Leverans", text: "5–12 arbetsdagar" },
              { icon: RotateCcw, title: "Ångerrätt", text: "14 dagar" },
              { icon: Shield, title: "Säkert", text: "CE-märkt" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <item.icon
                  className="w-4 h-4 mt-0.5 text-sleepie-gray-500 shrink-0"
                  strokeWidth={1.5}
                />
                <div>
                  <p className="text-xs font-medium">{item.title}</p>
                  <p className="text-xs text-sleepie-gray-500">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ProductReviews slug={slug} />

      {related.length > 0 && (
        <section className="mt-20 md:mt-28">
          <h2 className="font-serif text-2xl mb-8">Du kanske också gillar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
