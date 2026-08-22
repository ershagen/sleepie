import Link from "next/link";

type LogoProps = {
  className?: string;
  href?: string | null;
  size?: "sm" | "md" | "lg";
  markOnly?: boolean;
};

const sizes = {
  sm: { mark: 22, text: "text-lg", gap: "gap-2" },
  md: { mark: 26, text: "text-xl", gap: "gap-2.5" },
  lg: { mark: 36, text: "text-3xl", gap: "gap-3" },
} as const;

function LogoMark({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0 text-sleepie-black"
    >
      <path
        d="M22.5 6.5C15.8 7.4 10.5 13.2 10.5 20.2C10.5 25.8 14.2 30.6 19.5 32C14.2 30.8 10 25.6 10 19.5C10 12.2 15.5 6.2 22.5 5.2C22.5 5.6 22.5 6.1 22.5 6.5Z"
        fill="currentColor"
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
          className={`font-serif ${s.text} tracking-tight text-sleepie-black leading-none select-none`}
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
      className="hover:opacity-75 transition-opacity inline-flex items-center"
    >
      {content}
    </Link>
  );
}
