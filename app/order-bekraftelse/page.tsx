import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tack för din order",
};

export default function OrderConfirmationPage() {
  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-20 md:py-28 text-center">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-sleepie-gray-50 border border-sleepie-gray-100 mb-6">
        <span className="text-2xl">☾</span>
      </div>
      <h1 className="font-serif text-3xl md:text-4xl mb-4">Tack för din order</h1>
      <p className="text-sleepie-gray-600 leading-relaxed mb-3">
        Vi har tagit emot din beställning. Du får en bekräftelse på e-post så
        fort betalningen är klar.
      </p>
      <p className="text-sm text-sleepie-gray-500 mb-10">
        Leveranstid: vanligtvis 5–12 arbetsdagar. Tracking skickas när paketet är
        på väg.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/produkter"
          className="inline-flex items-center justify-center bg-sleepie-black text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-sleepie-gray-800 transition"
        >
          Fortsätt handla
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center border border-sleepie-gray-300 px-7 py-3.5 rounded-full text-sm font-medium hover:border-sleepie-black transition"
        >
          Till startsidan
        </Link>
      </div>
    </div>
  );
}
