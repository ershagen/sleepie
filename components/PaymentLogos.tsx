/**
 * Payment logos
 * Swish: official logotype from https://www.swish.nu
 * Visa / Mastercard: brand marks
 */

/** Official Swish logotype (hosted on swish.nu) */
const SWISH_LOGO_SRC =
  "https://www.swish.nu/assets/swish-logotype-C2_aqj3N.svg";

export function SwishMark({ className = "h-8" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center ${className}`} aria-label="Swish">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={SWISH_LOGO_SRC}
        alt="Swish"
        className="h-full w-auto max-w-[140px] object-contain object-left"
        loading="eager"
      />
    </span>
  );
}

export function SwishLogo({ className = "h-7" }: { className?: string }) {
  return <SwishMark className={className} />;
}

/** Official-style Visa wordmark path */
export function VisaLogo({ className = "h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Visa"
    >
      <path
        fill="#1A1F71"
        d="M9.112 8.262L5.97 15.758H3.92L2.374 9.775c-.094-.368-.175-.503-.461-.658C1.447 8.864.677 8.627 0 8.479l.046-.217h3.3a.904.904 0 01.894.764l.817 4.338 2.018-5.102zm8.033 5.049c.008-1.979-2.736-2.088-2.717-2.972.006-.269.262-.555.822-.628a3.66 3.66 0 011.913.336l.34-1.59a5.207 5.207 0 00-1.814-.333c-1.917 0-3.266 1.02-3.278 2.479-.012 1.079.963 1.68 1.698 2.04.756.367 1.01.603 1.006.931-.005.504-.602.725-1.16.734-.975.015-1.54-.263-1.992-.473l-.351 1.642c.453.208 1.289.39 2.156.398 2.037 0 3.37-1.006 3.377-2.564m5.061 2.447H24l-1.565-7.496h-1.656a.883.883 0 00-.826.55l-2.909 6.946h2.036l.405-1.12h2.488zm-2.163-2.656l1.02-2.815.588 2.815zm-8.16-4.84l-1.603 7.496H8.34l1.605-7.496z"
      />
    </svg>
  );
}

/** Mastercard interlocking circles */
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
      <VisaLogo className="h-5 w-auto" />
      <MastercardLogo className="h-7 w-auto" />
    </span>
  );
}
