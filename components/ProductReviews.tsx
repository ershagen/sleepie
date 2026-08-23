import { getReviewsForProduct, getReviewStats } from "@/lib/reviews";
import { StarRating } from "./StarRating";

export function ProductReviews({ slug }: { slug: string }) {
  const list = getReviewsForProduct(slug);
  const stats = getReviewStats(slug);

  if (list.length === 0) return null;

  return (
    <section className="mt-16 md:mt-20 pt-12 border-t border-sleepie-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="font-serif text-2xl md:text-3xl">Recensioner</h2>
          <div className="mt-3 flex items-center gap-3">
            <StarRating rating={stats.average} size="lg" />
            <p className="text-sm text-sleepie-gray-600">
              <span className="font-medium text-sleepie-black tabular-nums">
                {stats.average.toFixed(1)}
              </span>
              {" "}
              av 5 · {stats.count} recensioner
            </p>
          </div>
        </div>
      </div>

      <ul className="space-y-5">
        {list.map((r) => (
          <li
            key={r.id}
            className="bg-white border border-sleepie-gray-100 rounded-xl p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <StarRating rating={r.rating} size="sm" />
              <span className="text-sm font-medium">{r.name}</span>
              {r.detail && (
                <span className="text-xs text-sleepie-gray-400">· {r.detail}</span>
              )}
            </div>
            <p className="text-sm font-medium text-sleepie-black">{r.title}</p>
            <p className="mt-1.5 text-sm text-sleepie-gray-600 leading-relaxed">
              {r.body}
            </p>
            <p className="mt-3 text-[11px] text-sleepie-gray-400 tabular-nums">
              {new Date(r.date).toLocaleDateString("sv-SE", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
