/**
 * Sleepie product → CJDropshipping mapping
 *
 * Orders use pid + vid from here when creating CJ orders after Mollie payment.
 */

export type CjMapping = {
  sleepieSlug: string;
  sleepieName: string;
  pid: string | null;
  vid: string | null;
  sku: string | null;
  costUsd: number | null;
  cjName: string | null;
  status: "mapped" | "sourcing" | "needs_import";
  /** CJ sourcing request id */
  sourcingId?: string | null;
  sourceNumber?: string | null;
  notes?: string;
};

export const cjMappings: CjMapping[] = [
  {
    sleepieSlug: "stroller-rocker",
    sleepieName: "Stroller Rocker",
    pid: "2605020619411608900",
    vid: "2605020619421600700",
    sku: "CJYD286652004DW",
    costUsd: 16.58,
    cjName: "Baby Stroller Shaker Portable Sleep Soother – SR10 Black Edition",
    status: "mapped",
    notes:
      "CJ catalog product. SR10 Black Edition. Variants: SR11/SR10/SR12/SR10 Black. Link: cjdropshipping.com/product/-p-2605020619411608900.html",
  },
  {
    sleepieSlug: "white-noise",
    sleepieName: "White Noise Maskin",
    pid: null,
    vid: null,
    sku: null,
    costUsd: null,
    cjName: null,
    status: "sourcing",
    sourcingId: "2608230849274507502",
    sourceNumber: "CJSPU958581854",
    notes:
      "Sourcing: Alibaba combo rocker+noise SR12 (CJSPU958581854). Older: CJSPU958572051. Prefer standalone portable noise if available.",
  },
  {
    sleepieSlug: "muslin-set",
    sleepieName: "Muslin Swaddle Set",
    pid: "2604280817391607600",
    vid: "2604280817391608200",
    sku: "CJYD2857925",
    costUsd: 3.34,
    cjName: "Baby Swaddle Blanket Newborn Bath Towel Gauze Wrap",
    status: "mapped",
    notes: "Gauze/muslin-liknande swaddle. För 3-pack: quantity=3 vid order.",
  },
  {
    sleepieSlug: "sleep-sack",
    sleepieName: "Sleep Sack",
    pid: "2608190939361623000",
    vid: "2608190939361624900",
    sku: "CJYE3075557",
    costUsd: 5.56,
    cjName: "Thickened Baby Swaddle For Fall And Winter",
    status: "mapped",
    notes: "Närmaste sovsäck/swaddle i CJ.",
  },
  {
    sleepieSlug: "komplett-sovrutin",
    sleepieName: "Komplett Sovrutin",
    pid: null,
    vid: null,
    sku: null,
    costUsd: null,
    cjName: null,
    status: "needs_import",
    notes:
      "Bundle = rocker (mapped) + noise (sourcing) + muslin (mapped). Order as separate line items when noise vid exists.",
  },
];

/** Active / recent sourcing requests */
export const extraSourcingIds = [
  {
    sourcingId: "2608230827094485902",
    sourceNumber: "CJSPU958581345",
    product: "stroller-rocker-alibaba-okt072",
  },
  {
    sourcingId: "2608230849274507502",
    sourceNumber: "CJSPU958581854",
    product: "rocker-noise-combo-sr12",
  },
];

export const cjAlternatives = [
  {
    pid: "2605020619411608900",
    vid: "2605020619411609400",
    sku: "CJYD286652001AZ",
    costUsd: 16.58,
    name: "Stroller Shaker SR11",
  },
  {
    pid: "2605020619411608900",
    vid: "2605020619411609900",
    sku: "CJYD286652002BY",
    costUsd: 16.58,
    name: "Stroller Shaker SR10",
  },
  {
    pid: "2605020619411608900",
    vid: "2605020619421600300",
    sku: "CJYD286652003CX",
    costUsd: 16.58,
    name: "Stroller Shaker SR12",
  },
  {
    pid: "2606300707011610000",
    vid: "2606300707011611100",
    sku: "CJYD2960910",
    costUsd: 4.28,
    name: "Printed Stroller Blanket Pure Cotton Bath Towel Swaddle",
  },
];

export function getCjMapping(slug: string): CjMapping | undefined {
  return cjMappings.find((m) => m.sleepieSlug === slug);
}
