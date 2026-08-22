import Link from "next/link";

type LogoProps = {
  className?: string;
  href?: string | null;
  size?: "sm" | "md" | "lg";
  /** ignored — kept for API compatibility */
  markOnly?: boolean;
};

const sizes = {
  sm: { text: "text-xl", moon: 7 },
  md: { text: "text-2xl", moon: 9 },
  lg: { text: "text-4xl", moon: 12 },
} as const;

/**
 * Sleepie wordmark — black, crescent moon on the i
 * Brand green is reserved for CTAs / accents, not the logo
 */
export function Logo({
  className = "",
  href = "/",
  size = "md",
}: LogoProps) {
  const s = sizes[size];

  const content = (
    <span
      className={`inline-flex items-baseline font-serif ${s.text} text-sleepie-black leading-none select-none ${className}`}
      style={{ letterSpacing: "-0.03em" }}
      aria-label="Sleepie"
    >
      Sleep
      <span className="relative inline-block">
        <span className="opacity-0">i</span>
        <span
          className="absolute left-1/2 -translate-x-1/2 bottom-0 flex flex-col items-center"
          aria-hidden="true"
        >
          <svg
            width={s.moon}
            height={s.moon}
            viewBox="0 0 12 12"
            fill="currentColor"
            className="mb-[0.08em]"
          >
            <path d="M9.2 1.4C6.2 1.8 4 4.4 4 7.4C4 9 4.8 10.4 6 11.2C3.8 10.4 2.2 8.4 2.2 6C2.2 2.8 4.8 0.4 8 0.2C8.4 0.6 8.8 1 9.2 1.4Z" />
          </svg>
          <span
            className="block bg-current rounded-[0.5px]"
            style={{
              width: size === "lg" ? 2.5 : size === "sm" ? 1.5 : 2,
              height: size === "lg" ? 14 : size === "sm" ? 8 : 11,
            }}
          />
        </span>
      </span>
      e
    </span>
  );

  if (href === null) return content;

  return (
    <Link
      href={href}
      className="hover:opacity-75 transition-opacity inline-block"
    >
      {content}
    </Link>
  );
}
