import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/produkter/${product.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-sleepie-gray-100 hover:border-sleepie-gray-200 hover:shadow-lg hover:shadow-sleepie-gray-100/80 transition-all duration-300"
    >
      <div className="aspect-square bg-sleepie-gray-50 relative overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-sleepie-black text-white text-[11px] tracking-wide px-2.5 py-1 rounded-full z-10">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-5">
        <p className="text-[11px] tracking-wider uppercase text-sleepie-gray-400 mb-1">
          {product.category}
        </p>
        <h3 className="font-medium text-sleepie-black group-hover:underline underline-offset-2 decoration-1">
          {product.name}
        </h3>
        <p className="mt-1.5 text-sm text-sleepie-gray-600 line-clamp-2 leading-relaxed">
          {product.shortDescription}
        </p>
        <p className="mt-3 font-medium tabular-nums text-sleepie-black">
          {product.price} kr
        </p>
      </div>
    </Link>
  );
}
