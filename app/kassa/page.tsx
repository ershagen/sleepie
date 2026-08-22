"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { calcOrderTotal } from "@/lib/shipping";
import { Shield, Lock } from "lucide-react";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart, isReady } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"swish" | "card" | "klarna">(
    "swish"
  );

  if (!isReady) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center text-sm text-sleepie-gray-500">
        Laddar…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-3xl mb-3">Kassan</h1>
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

  const { subtotal, shipping, total, freeShipping } = calcOrderTotal(totalPrice);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      // Spara order-intent lokalt / redo för Mollie
      const payload = {
        email: data.get("email"),
        phone: data.get("phone"),
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        address: data.get("address"),
        zip: data.get("zip"),
        city: data.get("city"),
        country: "SE",
        paymentMethod,
        items: items.map((i) => ({
          id: i.id,
          slug: i.slug,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
        subtotal,
        shipping,
        total,
      };

      // Försök spara via API (fallback om endpoint saknas)
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => null);

      // Mollie kommer här – just nu testorder
      await new Promise((r) => setTimeout(r, 700));

      clearCart();
      router.push("/order-bekraftelse");
    } catch {
      setError("Något gick fel. Försök igen.");
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full border border-sleepie-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sleepie-black transition bg-white";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div className="mb-8">
        <Link
          href="/varukorg"
          className="text-sm text-sleepie-gray-500 hover:text-sleepie-black transition"
        >
          ← Tillbaka till varukorgen
        </Link>
        <h1 className="font-serif text-3xl md:text-4xl mt-3">Kassa</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8">
          {/* Kontakt */}
          <section className="rounded-2xl border border-sleepie-gray-100 bg-white p-6 sm:p-7">
            <h2 className="text-sm font-medium tracking-wide uppercase text-sleepie-gray-500 mb-5">
              Kontakt
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm mb-1.5">
                  E-post *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={inputClass}
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
                  autoComplete="tel"
                  className={inputClass}
                  placeholder="07X XXX XX XX"
                />
                <p className="mt-1.5 text-xs text-sleepie-gray-500">
                  För leveransavisering och Swish
                </p>
              </div>
            </div>
          </section>

          {/* Leverans */}
          <section className="rounded-2xl border border-sleepie-gray-100 bg-white p-6 sm:p-7">
            <h2 className="text-sm font-medium tracking-wide uppercase text-sleepie-gray-500 mb-5">
              Leveransadress
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm mb-1.5">
                  Förnamn *
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  required
                  autoComplete="given-name"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm mb-1.5">
                  Efternamn *
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  required
                  autoComplete="family-name"
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm mb-1.5">
                  Adress *
                </label>
                <input
                  id="address"
                  name="address"
                  required
                  autoComplete="street-address"
                  className={inputClass}
                  placeholder="Gata och nummer"
                />
              </div>
              <div>
                <label htmlFor="zip" className="block text-sm mb-1.5">
                  Postnummer *
                </label>
                <input
                  id="zip"
                  name="zip"
                  required
                  autoComplete="postal-code"
                  className={inputClass}
                  placeholder="123 45"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm mb-1.5">
                  Ort *
                </label>
                <input
                  id="city"
                  name="city"
                  required
                  autoComplete="address-level2"
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm mb-1.5">Land</label>
                <div className="w-full border border-sleepie-gray-200 rounded-xl px-4 py-3 text-sm bg-sleepie-gray-50 text-sleepie-gray-600">
                  Sverige
                </div>
              </div>
            </div>
          </section>

          {/* Betalning */}
          <section className="rounded-2xl border border-sleepie-gray-100 bg-white p-6 sm:p-7">
            <h2 className="text-sm font-medium tracking-wide uppercase text-sleepie-gray-500 mb-5">
              Betalning
            </h2>
            <div className="space-y-3">
              {(
                [
                  {
                    id: "swish" as const,
                    title: "Swish",
                    desc: "Betala direkt med Swish",
                  },
                  {
                    id: "card" as const,
                    title: "Kort",
                    desc: "Visa, Mastercard",
                  },
                  {
                    id: "klarna" as const,
                    title: "Klarna",
                    desc: "Faktura eller delbetalning",
                  },
                ] as const
              ).map((m) => (
                <label
                  key={m.id}
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition ${
                    paymentMethod === m.id
                      ? "border-sleepie-black bg-sleepie-gray-50"
                      : "border-sleepie-gray-200 hover:border-sleepie-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={m.id}
                    checked={paymentMethod === m.id}
                    onChange={() => setPaymentMethod(m.id)}
                    className="mt-1"
                  />
                  <span>
                    <span className="block text-sm font-medium">{m.title}</span>
                    <span className="block text-xs text-sleepie-gray-500 mt-0.5">
                      {m.desc}
                    </span>
                  </span>
                </label>
              ))}
            </div>
            <p className="mt-4 text-xs text-sleepie-gray-500 flex items-start gap-2">
              <Lock className="w-3.5 h-3.5 mt-0.5 shrink-0" strokeWidth={1.5} />
              Riktig betalning via Mollie kopplas in med API-nyckel. Just nu
              skapas en testorder utan dragning.
            </p>
          </section>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-sleepie-black text-white py-4 rounded-full text-sm font-medium hover:bg-sleepie-gray-800 transition disabled:opacity-60"
          >
            {submitting ? "Bearbetar…" : `Slutför order · ${total} kr`}
          </button>

          <p className="text-xs text-sleepie-gray-500 text-center">
            Genom att beställa godkänner du våra{" "}
            <Link href="/villkor" className="underline hover:text-sleepie-black">
              köpvillkor
            </Link>{" "}
            och{" "}
            <Link
              href="/integritet"
              className="underline hover:text-sleepie-black"
            >
              integritetspolicy
            </Link>
            .
          </p>
        </form>

        {/* Order summary */}
        <aside className="lg:col-span-5">
          <div className="rounded-2xl border border-sleepie-gray-100 bg-white p-6 sm:p-7 sticky top-24">
            <h2 className="font-medium mb-5">Din order</h2>

            <ul className="space-y-4">
              {items.map((item) => {
                const local =
                  item.image.startsWith("/api/") ||
                  item.image.startsWith("data:");
                return (
                  <li key={item.id} className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-sleepie-gray-50 shrink-0 border border-sleepie-gray-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                        unoptimized={local}
                      />
                      <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 flex items-center justify-center rounded-full bg-sleepie-black text-white text-[10px] font-medium">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-sleepie-gray-500 tabular-nums mt-0.5">
                        {item.price} kr
                      </p>
                    </div>
                    <p className="text-sm tabular-nums shrink-0">
                      {item.price * item.quantity} kr
                    </p>
                  </li>
                );
              })}
            </ul>

            <dl className="mt-6 space-y-2.5 text-sm border-t border-sleepie-gray-100 pt-5">
              <div className="flex justify-between">
                <dt className="text-sleepie-gray-600">Delsumma</dt>
                <dd className="tabular-nums">{subtotal} kr</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sleepie-gray-600">Frakt</dt>
                <dd className="tabular-nums">
                  {freeShipping ? "Fri" : `${shipping} kr`}
                </dd>
              </div>
              <div className="flex justify-between pt-3 border-t border-sleepie-gray-100 text-base font-medium">
                <dt>Att betala</dt>
                <dd className="tabular-nums">{total} kr</dd>
              </div>
            </dl>
            <p className="mt-2 text-xs text-sleepie-gray-500">Inkl. moms</p>

            <div className="mt-5 flex items-center gap-2 text-xs text-sleepie-gray-500">
              <Shield className="w-3.5 h-3.5" strokeWidth={1.5} />
              SSL-krypterat · 14 dagars ångerrätt
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
