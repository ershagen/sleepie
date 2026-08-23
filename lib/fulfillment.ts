import { getCjMapping } from "./cj-mapping";
import {
  createOrder,
  freightCalculate,
  normalizeFreightOptions,
  payBalance,
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
      let qty = line.quantity;
      if (line.slug === "muslin-set") qty = line.quantity * 3;
      products.push({ vid: m.vid, quantity: qty, slug: line.slug });
    } else if (line.slug === "komplett-sovrutin") {
      for (const part of ["stroller-rocker", "muslin-set", "sleep-sack"]) {
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

/** Create CJ order after payment. Live by default; set CJ_SANDBOX=1 for test. */
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
    email?: string;
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

  const sandbox =
    input.isSandbox ?? (process.env.CJ_SANDBOX === "1" ? 1 : 0);

  try {
    const created = await createOrder({
      orderNumber: input.orderNumber,
      shippingZip: input.shipping.zip,
      shippingCountryCode: input.shipping.countryCode || "SE",
      shippingCountry: input.shipping.country || "Sweden",
      shippingCity: input.shipping.city,
      shippingPhone: input.shipping.phone || "0700000000",
      shippingCustomer: input.shipping.customer,
      shippingAddress: input.shipping.address,
      email: input.shipping.email,
      products: products.map((p) => ({ vid: p.vid, quantity: p.quantity })),
      isSandbox: sandbox as 0 | 1,
      logisticName: input.logisticName,
    });

    const cjOrderId =
      created.cjOrderId || created.orderId || created.orderNum || null;

    // Live orders: attempt balance payment so CJ processes shipment
    let paid: unknown = null;
    if (!sandbox && cjOrderId) {
      try {
        paid = await payBalance(created.orderId || cjOrderId);
      } catch (e) {
        console.error("[cj:payBalance]", e);
        paid = {
          error: e instanceof Error ? e.message : "pay_failed",
        };
      }
    }

    return {
      ok: true as const,
      cjOrderId,
      orderId: created.orderId,
      orderNum: created.orderNum,
      raw: created.raw,
      paid,
      skipped,
      sandbox: Boolean(sandbox),
      endpoint: created.endpoint,
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
