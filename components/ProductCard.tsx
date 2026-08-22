import Link from "next/link";
import { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/produkter/${product.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-sleepie-gray-100 hover:border-sleepie-gray-200 hover:shadow-sm transition-all duration-300"
    >
      <div className="aspect-square bg-sleepie-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-sleepie-gray-300 text-sm">
          {product.name}
        </div>
        {product.badge && (
          <span className="absolute top-3 left-3 bg-sleepie-black text-white text-xs px-2.5 py-1 rounded-full">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-medium text-sleepie-black group-hover:underline underline-offset-2">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-sleepie-gray-600 line-clamp-2">
          {product.shortDescription}
        </p>
        <p className="mt-3 font-medium">{product.price} kr</p>
      </div>
    </Link>
  );
}