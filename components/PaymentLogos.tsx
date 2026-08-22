/** Official-style payment method marks (inline SVG, brand colors) */

export function SwishLogo({ className = "h-7" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Swish"
    >
      {/* Simplified Swish wordmark in brand pink/purple */}
      <text
        x="0"
        y="26"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="26"
        fill="#F3C4CE"
        letterSpacing="-0.5"
      >
        swish
      </text>
      <text
        x="0"
        y="26"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="26"
        fill="#FF4F7B"
        letterSpacing="-0.5"
        opacity="0.95"
      >
        swish
      </text>
    </svg>
  );
}

/** Swish mark — rounded pill with brand color */
export function SwishMark({ className = "h-8" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center px-3 rounded-full bg-[#FF4F7B] text-white font-bold tracking-tight ${className}`}
      style={{ fontSize: "0.85em", letterSpacing: "-0.02em" }}
      aria-label="Swish"
    >
      swish
    </span>
  );
}

export function VisaLogo({ className = "h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 16"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Visa"
    >
      <text
        x="0"
        y="13"
        fontFamily="system-ui, sans-serif"
        fontWeight="800"
        fontSize="14"
        fontStyle="italic"
        fill="#1A1F71"
        letterSpacing="1"
      >
        VISA
      </text>
    </svg>
  );
}

export function MastercardLogo({ className = "h-7" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 24"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Mastercard"
    >
      <circle cx="15" cy="12" r="9" fill="#EB001B" />
      <circle cx="25" cy="12" r="9" fill="#F79E1B" />
      <path
        d="M20 5.5c1.8 1.5 3 3.8 3 6.5s-1.2 5-3 6.5c-1.8-1.5-3-3.8-3-6.5s1.2-5 3-6.5z"
        fill="#FF5F00"
      />
    </svg>
  );
}

export function KlarnaLogo({ className = "h-6" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-[#FFB3C7] text-black font-bold ${className}`}
      style={{ fontSize: "0.8em", letterSpacing: "-0.03em" }}
      aria-label="Klarna"
    >
      Klarna.
    </span>
  );
}

export function CardLogosRow({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <VisaLogo className="h-4" />
      <MastercardLogo className="h-6" />
    </span>
  );
}
