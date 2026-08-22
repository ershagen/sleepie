import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export const metadata = {
  title: "Produkter | Sleepie",
  description: "Alla produkter från Sleepie – stroller rocker, white noise, muslin och mer.",
};

export default function ProductsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div className="mb-10">
        <h1 className="font-serif text-3xl md:text-4xl">Alla produkter</h1>
        <p className="mt-3 text-sleepie-gray-600 max-w-xl">
          Utvalda produkter för lugnare nätter. Minimalistisk design, fokus på kvalitet och säkerhet.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}