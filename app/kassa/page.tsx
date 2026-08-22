"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart, isReady } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isReady) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center text-sm text-sleepie-gray-500">
        Laddar…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="font-serif text-3xl mb-4">Kassan</h1>
        <p className="text-sleepie-gray-600 mb-8">Varukorgen är tom.</p>
        <Link
          href="/produkter"
          className="inline-flex bg-sleepie-black text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-sleepie-gray-800 transition"
        >
          Till produkterna
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    // Placeholder: Mollie integration comes later
    // For now we simulate order success and clear cart
    await new Promise((r) => setTimeout(r, 800));

    clearCart();
    router.push("/order-bekraftelse");
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h1 className="font-serif text-3xl mb-10">Kassa</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-8">
          <section>
            <h2 className="text-sm font-medium tracking-wide uppercase text-sleepie-gray-500 mb-4">
              Kontakt
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm mb-1.5">
                  E-post
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full border border-sleepie-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sleepie-black transition"
                  placeholder="namn@exempel.se"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm mb-1.5">
                  Telefon
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="w-full border border-sleepie-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sleepie-black transition"
                  placeholder="07X XXX XX XX"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-sm font-medium tracking-wide uppercase text-sleepie-gray-500 mb-4">
              Leveransadress
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm mb-1.5">
                  Förnamn
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  required
                  className="w-full border border-sleepie-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sleepie-black transition"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm mb-1.5">
                  Efternamn
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  required
                  className="w-full border border-sleepie-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sleepie-black transition"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm mb-1.5">
                  Adress
                </label>
                <input
                  id="address"
                  name="address"
                  required
                  className="w-full border border-sleepie-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sleepie-black transition"
                />
              </div>
              <div>
                <label htmlFor="zip" className="block text-sm mb-1.5">
                  Postnummer
                </label>
                <input
                  id="zip"
                  name="zip"
                  required
                  className="w-full border border-sleepie-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sleepie-black transition"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm mb-1.5">
                  Ort
                </label>
                <input
                  id="city"
                  name="city"
                  required
                  className="w-full border border-sleepie-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sleepie-black transition"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-sm font-medium tracking-wide uppercase text-sleepie-gray-500 mb-4">
              Betalning
            </h2>
            <div className="border border-sleepie-gray-200 rounded-xl p-4 text-sm text-sleepie-gray-600">
              <p className="font-medium text-sleepie-black mb-1">
                Swish · Kort · Klarna
              </p>
              <p>
                Betalning via Mollie kopplas in nästa steg. Just nu kan du
                slutföra en testorder utan riktig betalning.
              </p>
            </div>
          </section>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-sleepie-black text-white py-4 rounded-full text-sm font-medium hover:bg-sleepie-gray-800 transition disabled:opacity-60"
          >
            {submitting ? "Bearbetar…" : `Slutför order · ${totalPrice} kr`}
          </button>

          <p className="text-xs text-sleepie-gray-500 text-center">
            Genom att beställa godkänner du våra{" "}
            <Link href="/villkor" className="underline">
              köpvillkor
            </Link>
            .
          </p>
        </form>

        <aside className="lg:col-span-2">
          <div className="bg-sleepie-gray-50 rounded-2xl border border-sleepie-gray-100 p-6 sticky top-24">
            <h2 className="font-medium mb-4">Ordersammanfattning</h2>
            <ul className="space-y-3 text-sm">
              {items.map((item) => (
                <li key={item.id} className="flex justify-between gap-4">
                  <span className="text-sleepie-gray-600">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="tabular-nums shrink-0">
                    {item.price * item.quantity} kr
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-sleepie-gray-200 flex justify-between font-medium">
              <span>Totalt</span>
              <span className="tabular-nums">{totalPrice} kr</span>
            </div>
            <p className="mt-2 text-xs text-sleepie-gray-500">Inkl. moms</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
