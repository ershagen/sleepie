export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  shortDescription: string;
  features: string[];
  category: string;
  image: string;
  images: string[];
  badge?: string;
};

/**
 * Fallback product catalog (used when Payload/CMS is offline).
 * Images: curated lifestyle photos — swap for AI / Payload Media later.
 */
export const products: Product[] = [
  {
    id: "1",
    slug: "stroller-rocker",
    name: "Stroller Rocker",
    price: 449,
    description:
      "Den portabla stroller rockern som ger din bebis den mjuka gungande rörelsen den älskar – hemma, på caféet eller på resan. Uppladdningsbar USB-C, tyst motor och universell passform för de flesta vagnar. Fem hastigheter och timer så du kan fokusera på dig själv en stund.",
    shortDescription:
      "Mjuk gungning för lugnare stunder – hemma eller på språng.",
    features: [
      "Uppladdningsbar med USB-C",
      "5 justerbara hastigheter",
      "Timer 15 / 30 / 45 min",
      "Passar de flesta standardvagnar",
      "Tyst, diskret motor",
      "CE-märkt",
    ],
    category: "Rocker",
    image:
      "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=900&q=85",
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=900&q=85",
    ],
    badge: "Bästsäljare",
  },
  {
    id: "2",
    slug: "white-noise",
    name: "White Noise Maskin",
    price: 299,
    description:
      "Portabel white noise-maskin med naturljud och mjuk nattlampa. Skapar en trygg ljudbubbla som hjälper både bebis och dig att somna snabbare – och sova längre. Kompakt nog för nattduksbordet och resan.",
    shortDescription: "Lugnande ljud och mjukt ljus för bättre sömn.",
    features: [
      "White noise + naturljud",
      "Uppladdningsbar",
      "Inbyggd timer",
      "Mjuk nattlampa",
      "Kompakt nordisk design",
    ],
    category: "Ljud",
    image:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=900&q=85",
    ],
  },
  {
    id: "3",
    slug: "muslin-set",
    name: "Muslin Swaddle Set",
    price: 349,
    description:
      "Mjukt 3-pack med ekologiska muslinfiltar i lugna, neutrala toner. Andningsbara, lätta och sköna mot känslig hud – perfekta för swaddle, amning eller som lätt täcke i vagnen.",
    shortDescription: "Mjuka, andningsbara swaddles i nordiska toner.",
    features: [
      "Ekologisk bomull / bambu",
      "GOTS / OEKO-TEX",
      "3-pack",
      "Neutrala färger",
      "Andningsbara & lätta",
    ],
    category: "Textil",
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=900&q=85",
    ],
  },
  {
    id: "4",
    slug: "sleep-sack",
    name: "Sleep Sack",
    price: 399,
    description:
      "Säker och bekväm sömnsäck som håller bebisen lagom varm utan lösa täcken. Andningsbart material, mjuk passform och enkel att ta på – en tryggare natt för er båda.",
    shortDescription: "Säker sömn utan lösa täcken.",
    features: [
      "Andningsbart material",
      "Säker design utan lösa delar",
      "Flera storlekar",
      "Mjuk mot huden",
      "Enkel på/av",
    ],
    category: "Textil",
    image:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=900&q=85",
    ],
  },
  {
    id: "5",
    slug: "komplett-sovrutin",
    name: "Komplett Sovrutin",
    price: 999,
    description:
      "Allt du behöver för en lugnare start: Stroller Rocker, White Noise Maskin och Muslin Swaddle Set. Ett genomtänkt kit för dig som vill ha helheten – till ett bättre pris.",
    shortDescription: "Rocker + White Noise + Muslin. Bästa starten.",
    features: [
      "Stroller Rocker (449 kr)",
      "White Noise Maskin (299 kr)",
      "Muslin Swaddle Set (349 kr)",
      "Sparar 98 kr mot att köpa separat",
    ],
    category: "Bundle",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=900&q=85",
    ],
    badge: "Kit",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.slice(0, 4);
}

export function getRelatedProducts(slug: string, limit = 3): Product[] {
  return products.filter((p) => p.slug !== slug).slice(0, limit);
}
