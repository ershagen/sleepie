import { getCjMapping } from "./cj-mapping";
import {
  createOrder,
  freightCalculate,
  normalizeFreightOptions,
  trackInfo,
  type FreightOption,
} from "./cj";

export type CartLine = {
  slug: string;
  quantity: number;
};

/** Build CJ line items from Sleepie cart (only mapped products with vid) */
export function cartToCjProducts(lines: CartLine[]) {
  const products: Array<{ vid: string; quantity: number; slug: string }> = [];
  const skipped: string[] = [];

  for (const line of lines) {
    const m = getCjMapping(line.slug);
    if (m?.vid && m.status === "mapped") {
      // Muslin set is sold as 3-pack in shop → order qty * 3 if needed
      let qty = line.quantity;
      if (line.slug === "muslin-set") qty = line.quantity * 3;
      products.push({ vid: m.vid, quantity: qty, slug: line.slug });
    } else if (line.slug === "komplett-sovrutin") {
      // Expand bundle when parts are mapped
      for (const part of ["stroller-rocker", "white-noise", "muslin-set"]) {
        const pm = getCjMapping(part);
        if (pm?.vid && pm.status === "mapped") {
          let qty = line.quantity;
          if (part === "muslin-set") qty = line.quantity * 3;
          products.push({ vid: pm.vid, quantity: qty, slug: part });
        } else {
          skipped.push(part);
        }
      }
    } else {
      skipped.push(line.slug);
    }
  }

  return { products, skipped };
}

/** Quote cheapest CJ freight to country (USD). Falls back to null on error. */
export async function quoteCjFreight(input: {
  endCountryCode: string;
  lines: CartLine[];
}): Promise<{ options: FreightOption[]; cheapestUsd: number | null } | null> {
  const { products } = cartToCjProducts(input.lines);
  if (products.length === 0) return null;

  try {
    const res = await freightCalculate({
      endCountryCode: input.endCountryCode,
      products: products.map((p) => ({ vid: p.vid, quantity: p.quantity })),
    });
    const options = normalizeFreightOptions(res?.data);
    const cheapest = options[0];
    const cheapestUsd = cheapest
      ? Number(cheapest.logisticPrice ?? cheapest.postage ?? NaN)
      : NaN;
    return {
      options,
      cheapestUsd: Number.isFinite(cheapestUsd) ? cheapestUsd : null,
    };
  } catch (e) {
    console.error("[cj:freight]", e);
    return null;
  }
}

/** Create CJ sandbox/live order after payment */
export async function fulfillOrderAtCj(input: {
  orderNumber: string;
  lines: CartLine[];
  shipping: {
    zip: string;
    city: string;
    address: string;
    phone: string;
    customer: string;
    countryCode?: string;
    country?: string;
  };
  isSandbox?: 0 | 1;
  logisticName?: string;
}) {
  const { products, skipped } = cartToCjProducts(input.lines);
  if (products.length === 0) {
    return {
      ok: false as const,
      reason: "no_mapped_products" as const,
      skipped,
    };
  }

  try {
    const res = await createOrder({
      orderNumber: input.orderNumber,
      shippingZip: input.shipping.zip,
      shippingCountryCode: input.shipping.countryCode || "SE",
      shippingCountry: input.shipping.country || "Sweden",
      shippingCity: input.shipping.city,
      shippingPhone: input.shipping.phone || "0700000000",
      shippingCustomer: input.shipping.customer,
      shippingAddress: input.shipping.address,
      products: products.map((p) => ({ vid: p.vid, quantity: p.quantity })),
      isSandbox: input.isSandbox ?? 1,
      logisticName: input.logisticName,
    });

    const data = (res as { data?: Record<string, unknown> })?.data || {};
    return {
      ok: true as const,
      cjOrderId:
        (data.orderId as string) ||
        (data.cjOrderId as string) ||
        (data.orderNum as string) ||
        null,
      raw: data,
      skipped,
    };
  } catch (e) {
    console.error("[cj:createOrder]", e);
    return {
      ok: false as const,
      reason: "cj_error" as const,
      error: e instanceof Error ? e.message : "unknown",
      skipped,
    };
  }
}

export async function getTracking(trackNumber: string) {
  try {
    const res = await trackInfo(trackNumber);
    const list = res?.data || [];
    return list[0] || null;
  } catch (e) {
    console.error("[cj:track]", e);
    return null;
  }
}
