export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <span className="font-serif text-2xl tracking-tight text-sleepie-black leading-none">
        Sleep<span className="relative">i<span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[0.55em] leading-none">☾</span></span>e
      </span>
      <svg
        width="72"
        height="8"
        viewBox="0 0 72 8"
        fill="none"
        className="mt-0.5"
        aria-hidden="true"
      >
        <path
          d="M2 5 Q18 1 36 5 Q54 9 70 5"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="none"
          className="text-sleepie-gray-400"
        />
      </svg>
    </div>
  );
}