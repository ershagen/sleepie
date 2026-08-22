import Link from "next/link";

type LogoProps = {
  className?: string;
  href?: string | null;
  size?: "sm" | "md" | "lg";
};

export function Logo({ className = "", href = "/", size = "md" }: LogoProps) {
  const textSize =
    size === "lg" ? "text-3xl" : size === "sm" ? "text-xl" : "text-2xl";
  const waveWidth = size === "lg" ? 88 : size === "sm" ? 56 : 72;

  const content = (
    <span className={`inline-flex flex-col items-start ${className}`}>
      <span
        className={`font-serif ${textSize} tracking-tight text-sleepie-black leading-none select-none`}
        style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}
      >
        Sleep
        <span className="relative inline-block">
          i
          {/* Crescent moon as the dot on i */}
          <svg
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              top: size === "lg" ? "-0.35em" : "-0.32em",
              width: size === "lg" ? 11 : size === "sm" ? 7 : 9,
              height: size === "lg" ? 11 : size === "sm" ? 7 : 9,
            }}
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M8.5 1.5C5.5 1.8 3.2 4.4 3.2 7.5C3.2 9.2 4 10.7 5.2 11.6C3.2 10.9 1.8 9 1.8 6.7C1.8 3.5 4.3 0.9 7.5 0.6C7.9 0.9 8.2 1.2 8.5 1.5Z"
              fill="currentColor"
            />
          </svg>
        </span>
        e
      </span>
      {/* Soft wave underline */}
      <svg
        width={waveWidth}
        height="10"
        viewBox={`0 0 ${waveWidth} 10`}
        fill="none"
        className="mt-0.5 text-sleepie-gray-400"
        aria-hidden="true"
      >
        <path
          d={`M2 6 Q${waveWidth * 0.25} 2 ${waveWidth * 0.5} 6 Q${waveWidth * 0.75} 10 ${waveWidth - 2} 6`}
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </span>
  );

  if (href === null) return content;
  return (
    <Link href={href} className="hover:opacity-80 transition inline-block">
      {content}
    </Link>
  );
}
