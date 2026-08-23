"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { calcOrderTotal } from "@/lib/shipping";
import { Shield, Lock } from "lucide-react";
import {
  SwishMark,
  CardLogosRow,
  KlarnaLogo,
} from "@/components/PaymentLogos";

const LAST_ORDER_KEY = "sleepie-last-order";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart, isReady } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<
    "swish" | "card" | "klarna"
  >("swish");

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
        <h1 className="font-serif text-3xl mb-3">Kassa</h1>
        <p className="text-sleepie-gray-600 mb-8">Varukorgen är tom.</p>
        <Link
          href="/produkter"
          className="inline-flex bg-sleepie-green text-white px-7 py-3.5 text-sm font-medium rounded-[5px] hover:bg-sleepie-green-dark transition"
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

    const payload = {
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      firstName: String(data.get("firstName") || ""),
      lastName: String(data.get("lastName") || ""),
      address: String(data.get("address") || ""),
      zip: String(data.get("zip") || ""),
      city: String(data.get("city") || ""),
      country: "SE",
      paymentMethod,
      items: items.map((i) => ({
        id: i.id,
        slug: i.slug,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        image: i.image,
      })),
      subtotal,
      shipping,
      total,
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(
          (errBody as { error?: string }).error || "order_failed"
        );
      }

      const json = (await res.json()) as {
        orderId: string;
        checkoutUrl?: string;
      };

      try {
        sessionStorage.setItem(
          LAST_ORDER_KEY,
          JSON.stringify({
            orderId: json.orderId,
            ...payload,
            createdAt: new Date().toISOString(),
          })
        );
      } catch {
        // ignore
      }

      if (json.checkoutUrl) {
        clearCart();
        window.location.href = json.checkoutUrl;
        return;
      }

      clearCart();
      router.push(
        `/order-bekraftelse?order=${encodeURIComponent(json.orderId)}`
      );
    } catch (err) {
      setError(
        err instanceof Error && err.message !== "order_failed"
          ? err.message
          : "Något gick fel. Försök igen."
      );
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full border border-sleepie-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sleepie-black transition bg-white";

  const methods = [
    {
      id: "swish" as const,
      desc: "Betala direkt i din bankapp",
      logo: <SwishMark className="h-8 min-w-[4.5rem]" />,
    },
    {
      id: "card" as const,
      desc: "Visa & Mastercard",
      logo: <CardLogosRow />,
    },
    {
      id: "klarna" as const,
      desc: "Faktura eller delbetalning",
      logo: <KlarnaLogo className="h-8" />,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl">Kassa</h1>
        <p className="mt-2 text-sm text-sleepie-gray-500">
          Steg 2 av 2 · Betalning & leverans
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
          <section className="rounded-2xl border border-sleepie-gray-100 bg-white p-6 sm:p-7">
            <h2 className="font-medium mb-5">Kontakt</h2>
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
                  placeholder="namn@mail.se"
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
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-sleepie-gray-100 bg-white p-6 sm:p-7">
            <h2 className="font-medium mb-5">Leveransadress</h2>
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

          <section className="rounded-2xl border border-sleepie-gray-100 bg-white p-6 sm:p-7">
            <h2 className="font-medium mb-5">Betalning</h2>
            <div className="space-y-3">
              {methods.map((m) => (
                <label
                  key={m.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition ${
                    paymentMethod === m.id
                      ? "border-sleepie-black bg-sleepie-gray-50 ring-1 ring-sleepie-black"
                      : "border-sleepie-gray-200 hover:border-sleepie-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={m.id}
                    checked={paymentMethod === m.id}
                    onChange={() => setPaymentMethod(m.id)}
                    className="sr-only"
                  />
                  <span
                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      paymentMethod === m.id
                        ? "border-sleepie-black"
                        : "border-sleepie-gray-300"
                    }`}
                    aria-hidden
                  >
                    {paymentMethod === m.id && (
                      <span className="w-2 h-2 rounded-full bg-sleepie-black" />
                    )}
                  </span>
                  <span className="flex-1 flex items-center justify-between gap-3 min-w-0">
                    <span className="flex items-center min-h-[2rem]">{m.logo}</span>
                    <span className="text-xs text-sleepie-gray-500 text-right hidden sm:block">
                      {m.desc}
                    </span>
                  </span>
                </label>
              ))}
            </div>
            <p className="mt-4 text-xs text-sleepie-gray-500 flex items-start gap-2">
              <Lock className="w-3.5 h-3.5 mt-0.5 shrink-0" strokeWidth={1.5} />
              Säker betalning via Mollie. Du slutför i Swish, bank-ID eller
              kortformulär.
            </p>
          </section>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-sleepie-green text-white py-4 text-sm font-medium rounded-[5px] hover:bg-sleepie-green-dark transition disabled:opacity-60"
          >
            {submitting ? "Omdirigerar till betalning…" : `Betala · ${total} kr`}
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

        <aside className="lg:col-span-5">
          <div className="lg:sticky lg:top-24 rounded-2xl border border-sleepie-gray-100 bg-white p-6 sm:p-7">
            <h2 className="font-medium mb-5">Din order</h2>
            <ul className="space-y-4 mb-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-sleepie-gray-50 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-sleepie-gray-500">
                      Antal {item.quantity}
                    </p>
                    <p className="text-sm tabular-nums mt-0.5">
                      {item.price * item.quantity} kr
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <dl className="space-y-2 text-sm border-t border-sleepie-gray-100 pt-4">
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
              <div className="flex justify-between font-medium text-base pt-2 border-t border-sleepie-gray-50">
                <dt>Totalt</dt>
                <dd className="tabular-nums">{total} kr</dd>
              </div>
            </dl>
            <div className="mt-5 flex items-center gap-2 text-xs text-sleepie-gray-500">
              <Shield className="w-3.5 h-3.5" strokeWidth={1.5} />
              14 dagars öppet köp · Säker checkout
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3 opacity-90">
              <SwishMark className="h-6 min-w-[3.5rem] text-[0.7rem]" />
              <CardLogosRow />
              <KlarnaLogo className="h-6 text-[0.65rem]" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
