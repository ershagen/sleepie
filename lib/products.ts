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

export const products: Product[] = [
  {
    id: "1",
    slug: "stroller-rocker",
    name: "Stroller Rocker",
    price: 449,
    description:
      "Den portabla stroller rockern som ger din bebis den mjuka gungande rörelsen den älskar – var som helst. Uppladdningsbar, tyst och universell för de flesta vagnar.",
    shortDescription: "Mjuk gungning för lugnare stunder – hemma eller på språng.",
    features: [
      "Uppladdningsbar med USB-C",
      "5 justerbara hastigheter",
      "Timer 15/30/45 min",
      "Passar de flesta vagnar",
      "Tyst motor",
      "CE-märkt",
    ],
    category: "Rocker",
    image: "/products/rocker-1.jpg",
    images: ["/products/rocker-1.jpg"],
    badge: "Bästsäljare",
  },
  {
    id: "2",
    slug: "white-noise",
    name: "White Noise Maskin",
    price: 299,
    description:
      "Portabel white noise-maskin med naturljud och mjuk nattlampa. Hjälper både bebis och dig att sova bättre.",
    shortDescription: "Lugnande ljud och mjukt ljus för bättre sömn.",
    features: [
      "Flera naturljud + white noise",
      "Uppladdningsbar",
      "Timer",
      "Mjuk nattlampa",
      "Kompakt design",
    ],
    category: "Ljud",
    image: "/products/noise-1.jpg",
    images: ["/products/noise-1.jpg"],
  },
  {
    id: "3",
    slug: "muslin-set",
    name: "Muslin Swaddle Set",
    price: 349,
    description:
      "Mjukt set med ekologiska muslinfiltar i neutrala toner. Andningsbara och sköna mot huden.",
    shortDescription: "Mjuka, andningsbara swaddles i nordiska toner.",
    features: [
      "Ekologisk bambu/bomull",
      "GOTS / OEKO-TEX",
      "3-pack",
      "Neutrala färger",
      "Andningsbara",
    ],
    category: "Textil",
    image: "/products/muslin-1.jpg",
    images: ["/products/muslin-1.jpg"],
  },
  {
    id: "4",
    slug: "sleep-sack",
    name: "Sleep Sack",
    price: 399,
    description:
      "Säker och bekväm sömnsäck som håller bebisen lagom varm utan lösa täcken.",
    shortDescription: "Säker sömn utan lösa täcken.",
    features: [
      "Andningsbar",
      "Säker design",
      "Olika storlekar",
      "Mjukt material",
    ],
    category: "Textil",
    image: "/products/sack-1.jpg",
    images: ["/products/sack-1.jpg"],
  },
  {
    id: "5",
    slug: "komplett-sovrutin",
    name: "Komplett Sovrutin",
    price: 899,
    description:
      "Allt du behöver för lugnare nätter: Stroller Rocker + White Noise + Muslin Set. Det perfekta startkitet.",
    shortDescription: "Rocker + White Noise + Muslin – allt i ett.",
    features: [
      "Stroller Rocker",
      "White Noise Maskin",
      "Muslin Swaddle Set",
      "Sparar 198 kr",
    ],
    category: "Bundle",
    image: "/products/rocker-1.jpg",
    images: ["/products/rocker-1.jpg"],
    badge: "Sparar 198 kr",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts() {
  return products.slice(0, 4);
}