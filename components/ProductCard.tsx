import Link from "next/link";
import { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/produkter/${product.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-sleepie-gray-100 hover:border-sleepie-gray-200 hover:shadow-md transition-all duration-300"
    >
      <div className="aspect-square bg-gradient-to-b from-sleepie-gray-50 to-sleepie-gray-100 relative overflow-hidden flex items-center justify-center">
        {/* Placeholder until real product images are uploaded */}
        <div className="text-center px-4">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/80 flex items-center justify-center shadow-sm">
            <span className="text-2xl opacity-40">☾</span>
          </div>
          <span className="text-xs text-sleepie-gray-400 font-medium tracking-wide uppercase">
            {product.category}
          </span>
        </div>
        {product.badge && (
          <span className="absolute top-3 left-3 bg-sleepie-black text-white text-xs px-2.5 py-1 rounded-full">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-medium text-sleepie-black group-hover:underline underline-offset-2 decoration-1">
          {product.name}
        </h3>
        <p className="mt-1.5 text-sm text-sleepie-gray-600 line-clamp-2 leading-relaxed">
          {product.shortDescription}
        </p>
        <p className="mt-3 font-medium tabular-nums">{product.price} kr</p>
      </div>
    </Link>
  );
}