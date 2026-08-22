import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProductBySlug, products } from "@/lib/products";
import { Check } from "lucide-react";

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
  return {
    title: `${product.name} | Sleepie`,
    description: product.shortDescription,
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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="aspect-square bg-sleepie-gray-50 rounded-2xl relative overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          {product.badge && (
            <span className="absolute top-4 left-4 bg-sleepie-black text-white text-xs px-2.5 py-1 rounded-full z-10">
              {product.badge}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <p className="text-sm text-sleepie-gray-500 mb-2">{product.category}</p>
          <h1 className="font-serif text-3xl md:text-4xl">{product.name}</h1>
          <p className="mt-4 text-2xl font-medium tabular-nums">{product.price} kr</p>

          <p className="mt-6 text-sleepie-gray-600 leading-relaxed">
            {product.description}
          </p>

          <ul className="mt-8 space-y-3">
            {product.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm">
                <Check className="w-4 h-4 mt-0.5 text-sleepie-black shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <button className="flex-1 bg-sleepie-black text-white py-3.5 px-6 rounded-full text-sm font-medium hover:bg-sleepie-gray-800 transition">
              Lägg i varukorg
            </button>
            <Link
              href="/produkter"
              className="flex-1 text-center border border-sleepie-gray-300 py-3.5 px-6 rounded-full text-sm font-medium hover:border-sleepie-black transition"
            >
              Tillbaka till shop
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-sleepie-gray-100 text-xs text-sleepie-gray-500 space-y-1">
            <p>✓ CE-märkt</p>
            <p>✓ 14 dagars ångerrätt</p>
            <p>✓ Säkra betalningar via Mollie (Swish, kort, Klarna)</p>
          </div>
        </div>
      </div>
    </div>
  );
}