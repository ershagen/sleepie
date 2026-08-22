import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = pageMetadata({
  title: "Guider om babysömn",
  description:
    "Praktiska guider om sömnrutiner, white noise, swaddle och mer – för lugnare nätter.",
  path: "/guider",
});

const GUIDES = [
  {
    href: "/guider/babys-somn",
    title: "Bättre babysömn: en enkel startguide",
    excerpt:
      "Rutiner, miljö och små vanor som ofta gör störst skillnad de första månaderna.",
  },
];

export default function GuiderIndexPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-24">
      <h1 className="font-serif text-3xl md:text-4xl text-sleepie-black">
        Guider
      </h1>
      <p className="mt-4 text-sleepie-gray-600 leading-relaxed max-w-xl">
        Korta, jordnära texter om sömn och lugn – utan brus. Vi skriver det vi
        själva hade velat läsa som trötta föräldrar.
      </p>

      <ul className="mt-12 space-y-4">
        {GUIDES.map((g) => (
          <li key={g.href}>
            <Link
              href={g.href}
              className="block rounded-2xl border border-sleepie-gray-100 bg-white p-6 hover:border-sleepie-gray-300 transition group"
            >
              <h2 className="font-medium text-lg group-hover:text-sleepie-green-dark transition">
                {g.title}
              </h2>
              <p className="mt-2 text-sm text-sleepie-gray-600 leading-relaxed">
                {g.excerpt}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sleepie-green-dark">
                Läs guiden <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
