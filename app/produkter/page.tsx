import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export const metadata = {
  title: "Produkter | Sleepie",
  description:
    "Alla produkter från Sleepie – stroller rocker, white noise, muslin och mer. Lugnare nätter börjar här.",
};

export default function ProductsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-20">
      <div className="mb-12 max-w-lg">
        <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-sleepie-gray-500 mb-3">
          Kollektion
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-sleepie-black">
          Alla produkter
        </h1>
        <p className="mt-3 text-sleepie-gray-600 text-sm leading-relaxed">
          Utvalda produkter för lugnare nätter. Minimalistisk design, fokus på
          kvalitet och säkerhet.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
