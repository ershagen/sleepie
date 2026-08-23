import { Truck, ShieldCheck, CreditCard, Moon } from "lucide-react";

const items = [
  {
    icon: Truck,
    label: "Fri frakt över 799 kr",
  },
  {
    icon: CreditCard,
    label: "Swish, kort & Klarna",
  },
  {
    icon: ShieldCheck,
    label: "14 dagars öppet köp",
  },
  {
    icon: Moon,
    label: "För lugnare nätter",
  },
];

export function AnnouncementBar() {
  return (
    <div className="bg-sleepie-black text-white">
      {/* Mobile: single rotating-feel line */}
      <div className="sm:hidden text-center text-[11px] tracking-wide py-2.5 px-4">
        Fri frakt över 799 kr · Swish · 14 dagars öppet köp
      </div>

      {/* Desktop: USP grid with icons */}
      <div className="hidden sm:block border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ul className="grid grid-cols-4 divide-x divide-white/10">
            {items.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center justify-center gap-2 py-2.5 px-3 text-[11px] md:text-xs tracking-wide text-white/90"
              >
                <Icon
                  className="w-3.5 h-3.5 shrink-0 text-sleepie-green"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
