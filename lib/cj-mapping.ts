/**
 * Sleepie product → CJDropshipping mapping
 *
 * Sourcing requests posted 2026-08-22 via CJ API.
 * Check status: CJ dashboard → Service → Sourcing
 * When status = success, fill pid/vid below.
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
    pid: null,
    vid: null,
    sku: null,
    costUsd: null,
    cjName: null,
    status: "sourcing",
    sourcingId: "2608221632094505202",
    sourceNumber: "CJSPU958572050",
    notes:
      "Sourcing request sent 2026-08-22. Alibaba USB-C portable stroller rocker. Target ~$18. Check CJ → Service → Sourcing.",
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
    sourcingId: "2608221632114500502",
    sourceNumber: "CJSPU958572051",
    notes:
      "Sourcing request sent 2026-08-22. Portable baby white noise USB-C. Target ~$12. Check CJ → Service → Sourcing.",
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
    notes: "Bundle = rocker + noise + muslin när alla vid finns.",
  },
];

/** Extra sourcing request (duplicate rocker variant) */
export const extraSourcingIds = [
  {
    sourcingId: "2608221632074509602",
    sourceNumber: "CJSPU958572049",
    product: "stroller-rocker-alt",
  },
];

export const cjAlternatives = [
  {
    pid: "2606300707011610000",
    vid: "2606300707011611100",
    sku: "CJYD2960910",
    costUsd: 4.28,
    name: "Printed Stroller Blanket Pure Cotton Bath Towel Swaddle",
  },
  {
    pid: "2607040209401609600",
    vid: "2607040209411600300",
    sku: "CJYD2966931",
    costUsd: 2.9,
    name: "Newborn Swaddle Blanket And Knotted Baby Hat 2-Piece Set",
  },
  {
    pid: "2606290713401617800",
    vid: "2606290713411612500",
    sku: "CJYD2959648",
    costUsd: 4.13,
    name: "Newborn Swaddle Blanket Thin Spring/Summer",
  },
];

export function getCjMapping(slug: string): CjMapping | undefined {
  return cjMappings.find((m) => m.sleepieSlug === slug);
}
