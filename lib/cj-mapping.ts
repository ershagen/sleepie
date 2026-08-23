/**
 * Sleepie product → CJDropshipping mapping
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
  sourcingId?: string | null;
  sourceNumber?: string | null;
  notes?: string;
};

export const cjMappings: CjMapping[] = [
  {
    sleepieSlug: "stroller-rocker",
    sleepieName: "Sleepie Rocker",
    pid: "2605020619411608900",
    vid: "2605020619421600700",
    sku: "CJYD286652004DW",
    costUsd: 16.58,
    cjName: "Baby Stroller Shaker Portable Sleep Soother – SR10 Black Edition",
    status: "mapped",
    notes: "SR10 Black Edition",
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
    notes: "3-pack: quantity=3 on order",
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
  },
  {
    sleepieSlug: "komplett-sovrutin",
    sleepieName: "Komplett Sovrutin",
    pid: null,
    vid: null,
    sku: null,
    costUsd: null,
    cjName: null,
    status: "mapped",
    notes: "Bundle expands to rocker + muslin + sleep-sack",
  },
];

export function getCjMapping(slug: string): CjMapping | undefined {
  return cjMappings.find((m) => m.sleepieSlug === slug);
}
