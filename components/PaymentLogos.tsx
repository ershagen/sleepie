/**
 * Payment method marks for checkout.
 * Swish brand color: #1799E1 (official)
 * Visa / Mastercard / Klarna simplified brand marks
 */

/** Official-style Swish wordmark — blue, not pink */
export function SwishLogo({ className = "h-7" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 28"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Swish"
    >
      <text
        x="0"
        y="21"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontSize="22"
        fill="#1799E1"
        letterSpacing="-0.4"
      >
        Swish
      </text>
    </svg>
  );
}

/**
 * Swish mark used in payment rows.
 * Blue wordmark on transparent background (correct brand color).
 */
export function SwishMark({ className = "h-8" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center ${className}`}
      aria-label="Swish"
    >
      <svg
        height="100%"
        viewBox="0 0 100 28"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
      >
        <text
          x="0"
          y="21"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="700"
          fontSize="22"
          fill="#1799E1"
          letterSpacing="-0.4"
        >
          Swish
        </text>
      </svg>
    </span>
  );
}

export function VisaLogo({ className = "h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 60 20"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Visa"
    >
      <text
        x="1"
        y="15"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="800"
        fontSize="16"
        fontStyle="italic"
        fill="#1A1F71"
        letterSpacing="0.5"
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

/** Klarna pink badge — official-ish */
export function KlarnaLogo({ className = "h-6" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center px-2.5 py-1 rounded bg-[#FFB3C7] text-black font-bold ${className}`}
      style={{
        fontSize: "0.85em",
        letterSpacing: "-0.02em",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
      aria-label="Klarna"
    >
      Klarna.
    </span>
  );
}

export function CardLogosRow({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <VisaLogo className="h-4" />
      <MastercardLogo className="h-6" />
    </span>
  );
}
