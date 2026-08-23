import { Star } from "lucide-react";

export function StarRating({
  rating,
  size = "md",
  showValue = false,
  count,
}: {
  rating: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  count?: number;
}) {
  const sizeClass =
    size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-5 h-5" : "w-4 h-4";
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.4 && rating - full < 1;

  return (
    <div className="inline-flex items-center gap-1.5">
      <div
        className="flex items-center gap-0.5"
        aria-label={`${rating} av 5 stjärnor`}
      >
        {[1, 2, 3, 4, 5].map((i) => {
          const filled = i <= full || (i === full + 1 && hasHalf);
          return (
            <Star
              key={i}
              className={`${sizeClass} ${
                filled
                  ? "fill-sleepie-green text-sleepie-green"
                  : "text-sleepie-gray-200"
              }`}
              strokeWidth={filled ? 0 : 1.5}
            />
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm text-sleepie-gray-600 tabular-nums">
          {rating.toFixed(1)}
          {typeof count === "number" && count > 0 && (
            <span className="text-sleepie-gray-400">
              {" "}
              ({count} {count === 1 ? "recension" : "recensioner"})
            </span>
          )}
        </span>
      )}
    </div>
  );
}
