import Link from "next/link";

type LogoProps = {
  className?: string;
  href?: string | null;
  size?: "sm" | "md" | "lg";
  markOnly?: boolean;
};

const sizes = {
  sm: { mark: 28, text: "text-[1.1rem]", gap: "gap-2" },
  md: { mark: 34, text: "text-[1.4rem]", gap: "gap-2.5" },
  lg: { mark: 52, text: "text-[2.1rem]", gap: "gap-3.5" },
} as const;

/**
 * Unique Sleepie monogram:
 * Circular seal · crescent moon · abstract S-curves · sleep spark
 * Readable as both moon and "S" — works as favicon/app icon alone.
 */
function LogoMark({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0 text-sleepie-black"
    >
      <circle
        cx="24"
        cy="24"
        r="22"
        stroke="currentColor"
        strokeWidth="1.35"
        fill="none"
      />
      <circle cx="24" cy="24" r="18.5" fill="currentColor" opacity="0.05" />

      {/* Crescent (left weight of the S) */}
      <path
        d="M29 11C20.8 12.2 14.5 19.2 14.5 27.5C14.5 34 18.5 39.5 24.5 41.5C18 40 13 33.8 13 26.8C13 17.5 20.2 10.2 29 9C29 9.7 29 10.3 29 11Z"
        fill="currentColor"
      />

      {/* Upper S arc */}
      <path
        d="M26.5 14C30.5 14 33.8 16 35.5 19.2"
        stroke="currentColor"
        strokeWidth="2.35"
        strokeLinecap="round"
        fill="none"
      />

      {/* Lower S arc */}
      <path
        d="M21.5 33.5C25 37 30 37.8 34 35.8"
        stroke="currentColor"
        strokeWidth="2.35"
        strokeLinecap="round"
        fill="none"
      />

      {/* Spark */}
      <circle cx="34" cy="22.5" r="1.75" fill="currentColor" />
    </svg>
  );
}

export function Logo({
  className = "",
  href = "/",
  size = "md",
  markOnly = false,
}: LogoProps) {
  const s = sizes[size];

  const content = (
    <span
      className={`inline-flex items-center ${s.gap} ${className}`}
      aria-label="Sleepie"
    >
      <LogoMark size={s.mark} />
      {!markOnly && (
        <span
          className={`font-serif ${s.text} text-sleepie-black leading-none select-none`}
          style={{ letterSpacing: "-0.045em" }}
        >
          Sleepie
        </span>
      )}
    </span>
  );

  if (href === null) return content;

  return (
    <Link
      href={href}
      className="hover:opacity-80 transition-opacity inline-flex items-center"
    >
      {content}
    </Link>
  );
}
