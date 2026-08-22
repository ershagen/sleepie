/**
 * Sleepie product → CJDropshipping mapping
 *
 * Found via CJ API search (Aug 2026).
 * Rocker & White Noise: not found in public CJ catalog via API —
 * import from AliExpress in CJ dashboard, then fill vid below.
 *
 * Costs are approx. USD from CJ (ex. shipping).
 */

export type CjMapping = {
  sleepieSlug: string;
  sleepieName: string;
  /** CJ product id */
  pid: string | null;
  /** CJ variant id — required for createOrder */
  vid: string | null;
  sku: string | null;
  /** Approx supplier cost USD */
  costUsd: number | null;
  cjName: string | null;
  status: "mapped" | "needs_import";
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
    status: "needs_import",
    notes:
      "Ingen bra match i CJ public catalog. Importera från AliExpress i CJ (sök: portable stroller rocker USB vibration).",
  },
  {
    sleepieSlug: "white-noise",
    sleepieName: "White Noise Maskin",
    pid: null,
    vid: null,
    sku: null,
    costUsd: null,
    cjName: null,
    status: "needs_import",
    notes:
      "Ingen bra match i CJ public catalog. Importera från AliExpress (sök: portable baby white noise machine USB-C).",
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
    notes: "Gauze/muslin-liknande swaddle. För 3-pack: quantity=3 vid order, eller köp 3 varianter.",
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
    notes: "Närmaste sovsäck/swaddle i CJ. Flera färgvarianter finns (vid …4900–…)",
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
      "Bundle = 3 separata CJ-rader (rocker + noise + muslin) när alla vid finns.",
  },
];

/** Extra CJ products you can sell later */
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
