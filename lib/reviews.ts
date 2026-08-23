export type Review = {
  id: string;
  productSlug: string;
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  date: string; // ISO date
  detail?: string; // e.g. "Mamma till Alma, 4 mån"
};

/** Social proof for PDPs – replace with real customer reviews as they come in */
export const reviews: Review[] = [
  // Stroller Rocker
  {
    id: "r1",
    productSlug: "stroller-rocker",
    name: "Emma",
    rating: 5,
    title: "Räddade våra cafébesök",
    body: "Äntligen kan jag dricka kaffet medan det är varmt. Bebisen somnar i vagnen på några minuter – tyst motor och enkel att fästa.",
    date: "2026-07-12",
    detail: "Mamma till Alma, 4 mån",
  },
  {
    id: "r2",
    productSlug: "stroller-rocker",
    name: "Johan",
    rating: 5,
    title: "Funkar på Twin-vagnen",
    body: "Var skeptisk men den sitter stadigt och gungar lagom mjukt. Batteriet räcker hela dagen ute. Rekommenderar starkt.",
    date: "2026-07-28",
    detail: "Pappa till Noel, 7 mån",
  },
  {
    id: "r3",
    productSlug: "stroller-rocker",
    name: "Sara",
    rating: 5,
    title: "Handfri vagg – äntligen",
    body: "Vi har testat flera prylar. Den här är diskret, snygg i svart och faktiskt effektiv. Köpt en till farmor också.",
    date: "2026-08-05",
    detail: "Mamma till tvillingar",
  },
  {
    id: "r4",
    productSlug: "stroller-rocker",
    name: "Lisa",
    rating: 4,
    title: "Bra kvalitet",
    body: "Gungar fint och är enkel att ladda. Hade velat ha lite längre timer men annars nöjd.",
    date: "2026-08-10",
    detail: "Mamma till Elias, 3 mån",
  },
  {
    id: "r5",
    productSlug: "stroller-rocker",
    name: "Marcus",
    rating: 5,
    title: "Bästa köpet i år",
    body: "Från gråt till sömn på under fem minuter i köpcentret. Värt varje krona när armarna är slut.",
    date: "2026-08-15",
    detail: "Pappa till Vera, 5 mån",
  },
  // White noise
  {
    id: "r6",
    productSlug: "white-noise",
    name: "Anna",
    rating: 5,
    title: "Sover hela natten",
    body: "Vi tar den överallt – resa, bil, sängen. Ljudet är mjukt utan att bli irriterande. Älskar den lilla lampan.",
    date: "2026-07-20",
    detail: "Mamma till Otto, 6 mån",
  },
  {
    id: "r7",
    productSlug: "white-noise",
    name: "David",
    rating: 5,
    title: "Diskret och effektiv",
    body: "Äntligen white noise som inte ser ut som en leksak. Kompakt, lång batteritid, enkel.",
    date: "2026-08-01",
    detail: "Pappa till Maya, 2 mån",
  },
  {
    id: "r8",
    productSlug: "white-noise",
    name: "Klara",
    rating: 4,
    title: "Bra på resan",
    body: "Räddade hotellet i somras. Lite mer volym hade suttit fint i bullriga miljöer, men i övrigt toppen.",
    date: "2026-08-08",
    detail: "Mamma till Liam, 9 mån",
  },
  // Muslin
  {
    id: "r9",
    productSlug: "muslin-set",
    name: "Sofia",
    rating: 5,
    title: "Så mjuka",
    body: "Använder dem varje dag – swaddle, amning, solskydd. Tvättas fint och behåller formen.",
    date: "2026-07-18",
    detail: "Mamma till Ella, 2 mån",
  },
  {
    id: "r10",
    productSlug: "muslin-set",
    name: "Petra",
    rating: 5,
    title: "Tre stycken – perfekt",
    body: "Alltid en ren i väskan. Neutrala färger som passar allt. Rekommenderas.",
    date: "2026-08-03",
    detail: "Mamma till Noah, 5 mån",
  },
  // Sleep sack
  {
    id: "r11",
    productSlug: "sleep-sack",
    name: "Malin",
    rating: 5,
    title: "Tryggare nätter",
    body: "Inga lösa täcken längre. Bebisen sover lugnare och jag sover bättre själv.",
    date: "2026-07-25",
    detail: "Mamma till Hugo, 4 mån",
  },
  {
    id: "r12",
    productSlug: "sleep-sack",
    name: "Erik",
    rating: 4,
    title: "Bra passform",
    body: "Mjuk och lagom varm. Byter storlek snart men den här har fungerat fint från start.",
    date: "2026-08-12",
    detail: "Pappa till Freja, 3 mån",
  },
  // Bundle
  {
    id: "r13",
    productSlug: "komplett-sovrutin",
    name: "Hanna",
    rating: 5,
    title: "Allt i ett – smart",
    body: "Köpte kitet istället för att nosa runt. Allt funkar ihop och vi sparade pengar. Nöjd.",
    date: "2026-08-09",
    detail: "Mamma till Isak, 1 mån",
  },
];

export function getReviewsForProduct(slug: string): Review[] {
  return reviews
    .filter((r) => r.productSlug === slug)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getReviewStats(slug: string): {
  count: number;
  average: number;
} {
  const list = getReviewsForProduct(slug);
  if (list.length === 0) return { count: 0, average: 0 };
  const sum = list.reduce((acc, r) => acc + r.rating, 0);
  return {
    count: list.length,
    average: Math.round((sum / list.length) * 10) / 10,
  };
}
