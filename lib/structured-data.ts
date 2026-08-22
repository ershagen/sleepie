import { Product, SITE_URL } from "./products";

export function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.length ? product.images : [product.image],
    sku: product.sku,
    mpn: product.sku,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/produkter/${product.slug}`,
      priceCurrency: "SEK",
      price: product.price.toFixed(2),
      priceValidUntil: new Date(
        Date.now() + 1000 * 60 * 60 * 24 * 180
      )
        .toISOString()
        .slice(0, 10),
      availability:
        product.availability === "in_stock"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "Sleepie",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: product.price >= 799 ? "0" : "49",
          currency: "SEK",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "SE",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 2,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 5,
            maxValue: 12,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "SE",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 14,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/ReturnShippingFees",
      },
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sleepie",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "hej@sleepie.se",
      availableLanguage: ["Swedish"],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sleepie",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/produkter?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
