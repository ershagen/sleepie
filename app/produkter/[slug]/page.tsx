import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getProductBySlug,
  getRelatedProducts,
  products,
} from "@/lib/products";
import { productJsonLd } from "@/lib/structured-data";
import { getReviewStats } from "@/lib/reviews";
import { Check, Truck, RotateCcw, Shield } from "lucide-react";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductImage } from "@/components/ProductImage";
import { ProductCard } from "@/components/ProductCard";
import { StarRating } from "@/components/StarRating";
import { ProductReviews } from "@/components/ProductReviews";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Produkt | Sleepie" };
  const stats = getReviewStats(slug);
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
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug);
  const stats = getReviewStats(slug);

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
        <div className="aspect-square bg-sleepie-gray-50 rounded-xl relative overflow-hidden border border-sleepie-gray-100">
          <ProductImage
            src={product.image}
            alt={product.name}
            badge={product.badge}
            category={product.category}
          />
        </div>

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
