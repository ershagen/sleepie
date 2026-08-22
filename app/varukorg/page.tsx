import Link from "next/link";

export const metadata = {
  title: "Varukorg | Sleepie",
};

export default function CartPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center">
      <h1 className="font-serif text-3xl mb-4">Din varukorg</h1>
      <p className="text-sleepie-gray-600 mb-8">
        Varukorgen är tom just nu. Upptäck våra produkter och lägg till det som passar er familj.
      </p>
      <Link
        href="/produkter"
        className="inline-flex items-center justify-center bg-sleepie-black text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-sleepie-gray-800 transition"
      >
        Upptäck kollektionen
      </Link>
    </div>
  );
}