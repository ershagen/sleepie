import Link from "next/link";

type LogoProps = {
  className?: string;
  href?: string | null;
  size?: "sm" | "md" | "lg";
  /** Show icon mark only (e.g. favicon-style) */
  markOnly?: boolean;
};

const sizes = {
  sm: { mark: 22, text: "text-lg", gap: "gap-2" },
  md: { mark: 28, text: "text-[1.35rem]", gap: "gap-2.5" },
  lg: { mark: 40, text: "text-3xl", gap: "gap-3" },
} as const;

/** Unique Sleepie mark: crescent moon cradling a soft sleep-wave */
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
      {/* Soft outer circle hint */}
      <circle
        cx="20"
        cy="20"
        r="18.5"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.12"
      />
      {/* Crescent moon */}
      <path
        d="M24.2 8.5C17.8 9.2 12.8 14.6 12.8 21.2C12.8 27.2 16.8 32.3 22.2 34.2C17.4 33.1 13.8 28.8 13.8 23.6C13.8 16.8 18.8 11.2 25.2 10.2C24.9 9.6 24.6 9 24.2 8.5Z"
        fill="currentColor"
      />
      {/* Small star / spark near crescent tip */}
      <circle cx="27.5" cy="11.5" r="1.15" fill="currentColor" opacity="0.9" />
      {/* Soft sleep-wave under moon */}
      <path
        d="M11 28.5C13.5 26.2 16.5 26.2 19 28.5C21.5 30.8 24.5 30.8 27 28.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
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
            className={`font-serif ${s.text} tracking-[-0.02em] text-sleepie-black select-none`}
            style={{
              fontFamily:
                "Georgia, 'Iowan Old Style', 'Palatino Linotype', Palatino, serif",
            }}
          >
            Sleep
            <span className="relative inline-block">
              <span className="opacity-0 w-[0.28em] inline-block">i</span>
              {/* Custom i: stem + moon-dot */}
              <span
                className="absolute inset-0 flex flex-col items-center justify-end"
                aria-hidden="true"
              >
                <svg
                  className="mb-[0.08em]"
                  width={size === "lg" ? 7 : size === "sm" ? 4.5 : 5.5}
                  height={size === "lg" ? 7 : size === "sm" ? 4.5 : 5.5}
                  viewBox="0 0 10 10"
                  fill="currentColor"
                >
                  <path d="M7.2 1.2C5.1 1.5 3.5 3.3 3.5 5.5C3.5 6.7 4.1 7.7 5 8.3C3.6 7.8 2.6 6.5 2.6 4.9C2.6 2.7 4.3 0.9 6.5 0.6C6.8 0.8 7 1 7.2 1.2Z" />
                </svg>
                <span
                  className="bg-current rounded-[1px]"
                  style={{
                    width: size === "lg" ? 2.5 : size === "sm" ? 1.5 : 2,
                    height: size === "lg" ? 11 : size === "sm" ? 7 : 9,
                  }}
                />
              </span>
            </span>
            e
          </span>
          <span
            className="text-[0.55em] tracking-[0.28em] uppercase text-sleepie-gray-400 font-sans mt-[0.35em] ml-[0.05em]"
            style={{ letterSpacing: "0.22em" }}
          >
            sleep & calm
          </span>
        </span>
      )}
    </span>
  );

  if (href === null) return content;
  return (
    <Link
      href={href}
      className="hover:opacity-80 transition inline-flex items-center"
    >
      {content}
    </Link>
  );
}
