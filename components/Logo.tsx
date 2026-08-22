import Link from "next/link";

type LogoProps = {
  className?: string;
  href?: string | null;
  size?: "sm" | "md" | "lg";
  markOnly?: boolean;
};

const sizes = {
  sm: { mark: 28, text: "text-[1.05rem]", gap: "gap-2" },
  md: { mark: 34, text: "text-[1.35rem]", gap: "gap-2.5" },
  lg: { mark: 48, text: "text-[2rem]", gap: "gap-3" },
} as const;

/**
 * Unique Sleepie mark:
 * Circular seal + crescent moon that doubles as the curve of an "S"
 * + soft sleep-wave — recognisable even without the wordmark.
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
      {/* Outer ring */}
      <circle
        cx="24"
        cy="24"
        r="22"
        stroke="currentColor"
        strokeWidth="1.25"
        fill="none"
        opacity="0.9"
      />

      {/* Inner soft fill circle */}
      <circle cx="24" cy="24" r="18.5" fill="currentColor" opacity="0.06" />

      {/*
        Crescent + S hybrid:
        Primary crescent on the left, open to the right.
        A second thinner arc completes an abstract "S" flow.
      */}
      <path
        d="M28.5 11.5C20.8 12.6 15 19.2 15 27C15 33.2 18.8 38.6 24.2 41C18.2 39.4 13.5 33.6 13.5 26.5C13.5 17.8 20.2 10.8 28.5 9.5C28.5 10.2 28.5 10.8 28.5 11.5Z"
        fill="currentColor"
      />

      {/* Upper S-curve (completes the letter feel) */}
      <path
        d="M26 14.5C29.5 14.5 32.5 16.2 34 19"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />

      {/* Lower S-curve */}
      <path
        d="M22 33C25.2 36.2 29.5 37 33 35.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />

      {/* Sleep spark */}
      <circle cx="33.5" cy="22" r="1.6" fill="currentColor" />

      {/* Soft wave under — sleep motif */}
      <path
        d="M17 37.5C19.5 35.5 22 35.5 24.5 37.5C27 39.5 29.5 39.5 32 37.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
        opacity="0.35"
      />
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
        <span className="inline-flex flex-col items-start leading-none">
          <span
            className={`font-serif ${s.text} text-sleepie-black select-none`}
            style={{
              letterSpacing: "-0.04em",
              fontWeight: 400,
            }}
          >
            Sleepie
          </span>
          {size !== "sm" && (
            <span
              className="font-sans text-[0.55rem] uppercase text-sleepie-gray-400 mt-[0.35em]"
              style={{ letterSpacing: "0.28em", marginLeft: "0.05em" }}
            >
              sleep & calm
            </span>
          )}
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
