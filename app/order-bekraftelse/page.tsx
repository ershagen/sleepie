"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Check } from "lucide-react";

const LAST_ORDER_KEY = "sleepie-last-order";

type LastOrder = {
  orderId: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  zip: string;
  city: string;
  paymentMethod: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }>;
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: string;
};

function ConfirmationContent() {
  const search = useSearchParams();
  const [order, setOrder] = useState<LastOrder | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(LAST_ORDER_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as LastOrder;
      const q = search.get("order");
      if (!q || q === parsed.orderId) setOrder(parsed);
    } catch {
      // ignore
    }
  }, [search]);

  const orderId = order?.orderId || search.get("order") || null;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 md:py-24">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-sleepie-black text-white mb-6">
          <Check className="w-6 h-6" strokeWidth={2} />
        </div>
        <h1 className="font-serif text-3xl md:text-4xl mb-3">
          Tack för din order
        </h1>
        <p className="text-sleepie-gray-600 leading-relaxed">
          Vi har tagit emot din beställning
          {order?.email ? (
            <>
              {" "}
              och skickar bekräftelse till{" "}
              <span className="text-sleepie-black">{order.email}</span>
            </>
          ) : (
            "."
          )}
        </p>
        {orderId && (
          <p className="mt-4 text-sm text-sleepie-gray-500">
            Ordernummer:{" "}
            <span className="font-medium text-sleepie-black tabular-nums">
              {orderId}
            </span>
          </p>
        )}
      </div>

      {order && (
        <div className="rounded-2xl border border-sleepie-gray-100 bg-white overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-sleepie-gray-100">
            <h2 className="font-medium text-sm">Ordersammanfattning</h2>
          </div>
          <ul className="divide-y divide-sleepie-gray-50">
            {order.items.map((item) => (
              <li key={item.id} className="flex gap-3 px-6 py-4">
                {item.image && (
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-sleepie-gray-50 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                      unoptimized
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-sleepie-gray-500">
                    {item.quantity} × {item.price} kr
                  </p>
                </div>
                <p className="text-sm tabular-nums shrink-0">
                  {item.price * item.quantity} kr
                </p>
              </li>
            ))}
          </ul>
          <dl className="px-6 py-4 border-t border-sleepie-gray-100 space-y-1.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-sleepie-gray-600">Delsumma</dt>
              <dd className="tabular-nums">{order.subtotal} kr</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sleepie-gray-600">Frakt</dt>
              <dd className="tabular-nums">
                {order.shipping === 0 ? "Fri" : `${order.shipping} kr`}
              </dd>
            </div>
            <div className="flex justify-between font-medium pt-2 border-t border-sleepie-gray-50">
              <dt>Totalt</dt>
              <dd className="tabular-nums">{order.total} kr</dd>
            </div>
          </dl>
          <div className="px-6 py-4 bg-sleepie-gray-50 text-sm text-sleepie-gray-600 space-y-1">
            <p>
              Leverans till {order.firstName} {order.lastName}, {order.address},{" "}
              {order.zip} {order.city}
            </p>
            <p className="capitalize">Betalning: {order.paymentMethod}</p>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-sleepie-gray-100 bg-white p-6 mb-10 text-sm text-sleepie-gray-600 space-y-2">
        <p className="font-medium text-sleepie-black">Vad händer nu?</p>
        <ol className="list-decimal list-inside space-y-1.5">
          <li>Du får orderbekräftelse på e-post</li>
          <li>Vi förbereder och skickar din order</li>
          <li>Tracking skickas när paketet är på väg (5–12 arbetsdagar)</li>
        </ol>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/produkter"
          className="inline-flex items-center justify-center bg-sleepie-black text-white px-7 py-3.5 text-sm font-medium rounded-[5px] hover:bg-sleepie-gray-800 transition"
        >
          Fortsätt handla
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center border border-sleepie-gray-300 px-7 py-3.5 text-sm font-medium rounded-[5px] hover:border-sleepie-black transition"
        >
          Till startsidan
        </Link>
      </div>

      <p className="mt-10 text-center text-xs text-sleepie-gray-500">
        Frågor? Skriv till{" "}
        <a href="mailto:hej@sleepie.se" className="underline">
          hej@sleepie.se
        </a>
      </p>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-lg mx-auto px-4 py-24 text-center text-sm text-sleepie-gray-500">
          Laddar…
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
