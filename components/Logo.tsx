import Link from "next/link";

type LogoProps = {
  className?: string;
  href?: string | null;
  size?: "sm" | "md" | "lg";
  /** Icon mark only */
  markOnly?: boolean;
};

const sizes = {
  sm: { mark: 24, text: "text-lg", gap: "gap-2" },
  md: { mark: 30, text: "text-[1.4rem]", gap: "gap-2.5" },
  lg: { mark: 44, text: "text-3xl", gap: "gap-3" },
} as const;

/** Sleepie mark — crescent + spark + soft sleep-wave */
function LogoMark({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0 text-sleepie-black"
    >
      <circle
        cx="20"
        cy="20"
        r="18.5"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.1"
      />
      {/* Crescent */}
      <path
        d="M24.4 8.2C17.6 9 12.4 14.6 12.4 21.4C12.4 27.6 16.6 32.9 22.4 34.6C17.4 33.4 13.6 28.9 13.6 23.5C13.6 16.5 18.8 10.7 25.4 9.6C25.1 9.1 24.8 8.6 24.4 8.2Z"
        fill="currentColor"
      />
      {/* Spark */}
      <path
        d="M28.2 10.2L28.55 11.35L29.7 11.7L28.55 12.05L28.2 13.2L27.85 12.05L26.7 11.7L27.85 11.35L28.2 10.2Z"
        fill="currentColor"
      />
      {/* Sleep wave */}
      <path
        d="M10.5 29C13.2 26.5 16.5 26.5 19.2 29C21.9 31.5 25.2 31.5 27.9 29"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
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
        <span
          className={`font-serif ${s.text} tracking-[-0.03em] text-sleepie-black leading-none select-none`}
          style={{
            fontFamily:
              "Georgia, 'Iowan Old Style', 'Palatino Linotype', Palatino, serif",
          }}
        >
          Sleep
          <span className="relative inline-block align-baseline">
            {/* Invisible i for spacing */}
            <span className="opacity-0">i</span>
            {/* Custom moon-dot i */}
            <span
              className="absolute left-1/2 -translate-x-1/2 bottom-0 flex flex-col items-center"
              aria-hidden="true"
            >
              <svg
                className="mb-[0.12em]"
                width={size === "lg" ? 8 : size === "sm" ? 5 : 6}
                height={size === "lg" ? 8 : size === "sm" ? 5 : 6}
                viewBox="0 0 10 10"
                fill="currentColor"
              >
                <path d="M7.4 1C5.1 1.35 3.4 3.3 3.4 5.6C3.4 6.9 4 8 5 8.7C3.5 8.15 2.4 6.7 2.4 5C2.4 2.6 4.2 0.7 6.6 0.35C6.9 0.55 7.15 0.75 7.4 1Z" />
              </svg>
              <span
                className="block bg-current rounded-[0.5px]"
                style={{
                  width: size === "lg" ? 2.25 : size === "sm" ? 1.4 : 1.75,
                  height: size === "lg" ? 12 : size === "sm" ? 7.5 : 9.5,
                }}
              />
            </span>
          </span>
          e
        </span>
      )}
    </span>
  );

  if (href === null) return content;
  return (
    <Link
      href={href}
      className="hover:opacity-75 transition-opacity inline-flex items-center"
    >
      {content}
    </Link>
  );
}
