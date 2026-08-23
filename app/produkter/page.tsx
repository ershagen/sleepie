import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export const metadata = {
  title: "Produkter",
  description:
    "Alla produkter från Sleepie – stroller rocker, white noise, muslin och mer. Lugnare nätter börjar här.",
};

export default function ProductsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-20">
      <div className="mb-12 max-w-lg">
        <h1 className="font-serif text-3xl md:text-4xl text-sleepie-black">
          Alla produkter
        </h1>
        <p className="mt-3 text-sleepie-gray-600 text-sm leading-relaxed">
          Utvalda produkter för lugnare nätter. Minimalistisk design, fokus på
          kvalitet och säkerhet. Allt du behöver – inget du inte behöver.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-16 rounded-2xl bg-white border border-sleepie-gray-100 p-8 md:p-10 text-center max-w-2xl mx-auto">
        <h2 className="font-serif text-xl md:text-2xl mb-3">
          Osäker på vad ni behöver?
        </h2>
        <p className="text-sm text-sleepie-gray-600 leading-relaxed mb-6">
          Börja med vårt kit "Komplett Sovrutin" – rocker, white noise och
          muslin i ett paket. Det enklaste sättet att komma igång.
        </p>
        <a
          href="/produkter/komplett-sovrutin"
          className="inline-flex items-center justify-center bg-sleepie-black text-white px-7 py-3.5 rounded-[5px] text-sm font-medium hover:bg-sleepie-gray-800 transition"
        >
          Se komplett kit
        </a>
      </div>
    </div>
  );
}
