/**
 * Mollie Payments API (no SDK) — Swish, card, Klarna
 * https://docs.mollie.com/reference/create-payment
 */

const MOLLIE_API = "https://api.mollie.com/v2";

/** Swedish standard VAT for goods */
const VAT_RATE = 25;

function apiKey() {
  const key = process.env.MOLLIE_API_KEY;
  if (!key) throw new Error("MOLLIE_API_KEY saknas");
  return key;
}

function siteUrl() {
  return (
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL &&
      `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
    "https://sleepie-two.vercel.app"
  );
}

export type MollieMethod = "swish" | "creditcard" | "klarna" | "ideal" | string;

export function mapPaymentMethod(ui: string): MollieMethod | undefined {
  switch (ui) {
    case "swish":
      return "swish";
    case "card":
    case "creditcard":
      return "creditcard";
    case "klarna":
      return "klarna";
    default:
      return undefined;
  }
}

export type MollieAddress = {
  givenName: string;
  familyName: string;
  email: string;
  streetAndNumber: string;
  postalCode: string;
  city: string;
  country: string;
  phone?: string;
};

export type MollieMoney = { currency: "SEK"; value: string };

export type MollieLine = {
  type: "physical" | "digital" | "shipping_fee" | "discount" | "store_credit" | "gift_card" | "surcharge";
  description: string;
  quantity: number;
  unitPrice: MollieMoney;
  totalAmount: MollieMoney;
  vatRate: string;
  vatAmount: MollieMoney;
  sku?: string;
};

export type CreatePaymentInput = {
  orderId: string;
  amountSek: number;
  description: string;
  method?: string;
  customerEmail?: string;
  billingAddress: MollieAddress;
  shippingAddress?: MollieAddress;
  lines: MollieLine[];
  metadata?: Record<string, string>;
};

export type MolliePayment = {
  id: string;
  status: string;
  amount?: { value: string; currency: string };
  description?: string;
  metadata?: Record<string, string>;
  method?: string;
  _links?: {
    checkout?: { href: string };
    self?: { href: string };
  };
};

function formatAmount(sek: number) {
  return (Math.round(sek * 100) / 100).toFixed(2);
}

/** Price is VAT-inclusive; extract VAT portion */
function vatFromInclusive(totalIncl: number, rate = VAT_RATE) {
  const vat = totalIncl - totalIncl / (1 + rate / 100);
  return Math.round(vat * 100) / 100;
}

export function buildOrderLines(input: {
  items: Array<{ name: string; price: number; quantity: number; sku?: string }>;
  shippingSek: number;
}): MollieLine[] {
  const lines: MollieLine[] = input.items.map((item) => {
    const total = item.price * item.quantity;
    const vat = vatFromInclusive(total);
    return {
      type: "physical" as const,
      description: item.name.slice(0, 100),
      quantity: item.quantity,
      unitPrice: { currency: "SEK" as const, value: formatAmount(item.price) },
      totalAmount: { currency: "SEK" as const, value: formatAmount(total) },
      vatRate: formatAmount(VAT_RATE),
      vatAmount: { currency: "SEK" as const, value: formatAmount(vat) },
      sku: item.sku,
    };
  });

  if (input.shippingSek > 0) {
    const vat = vatFromInclusive(input.shippingSek);
    lines.push({
      type: "shipping_fee",
      description: "Frakt",
      quantity: 1,
      unitPrice: {
        currency: "SEK",
        value: formatAmount(input.shippingSek),
      },
      totalAmount: {
        currency: "SEK",
        value: formatAmount(input.shippingSek),
      },
      vatRate: formatAmount(VAT_RATE),
      vatAmount: { currency: "SEK", value: formatAmount(vat) },
    });
  } else {
    // Free shipping still needs a zero line for some Klarna flows — skip zero
  }

  return lines;
}

function normalizePhone(phone?: string) {
  if (!phone) return undefined;
  const digits = phone.replace(/\s+/g, "");
  if (digits.startsWith("+")) return digits;
  if (digits.startsWith("00")) return `+${digits.slice(2)}`;
  if (digits.startsWith("0")) return `+46${digits.slice(1)}`;
  return digits;
}

export async function createPayment(
  input: CreatePaymentInput
): Promise<MolliePayment> {
  const method = input.method ? mapPaymentMethod(input.method) : undefined;
  const redirectUrl = `${siteUrl()}/order-bekraftelse?order=${encodeURIComponent(input.orderId)}`;
  const webhookUrl = `${siteUrl()}/api/webhooks/mollie`;

  const billing: MollieAddress = {
    ...input.billingAddress,
    country: (input.billingAddress.country || "SE").toUpperCase(),
    phone: normalizePhone(input.billingAddress.phone),
  };

  const shipping: MollieAddress = input.shippingAddress
    ? {
        ...input.shippingAddress,
        country: (input.shippingAddress.country || "SE").toUpperCase(),
        phone: normalizePhone(input.shippingAddress.phone),
      }
    : billing;

  const body: Record<string, unknown> = {
    amount: {
      currency: "SEK",
      value: formatAmount(input.amountSek),
    },
    description: input.description.slice(0, 255),
    redirectUrl,
    webhookUrl,
    locale: "sv_SE",
    metadata: {
      orderId: input.orderId,
      ...(input.metadata || {}),
    },
    billingAddress: billing,
    shippingAddress: shipping,
    // Required for Klarna / klarna methods
    lines: input.lines,
  };

  if (method) body.method = method;

  const res = await fetch(`${MOLLIE_API}/payments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) {
    console.error("[mollie:create]", JSON.stringify(data));
    const detail = String(data?.detail || data?.title || "");
    if (/billing address/i.test(detail)) {
      throw new Error(
        "Fyll i hela adressen (namn, gata, postnummer och ort) för att betala."
      );
    }
    if (/lines are required/i.test(detail)) {
      throw new Error(
        "Orderdetaljer saknas för Klarna. Prova igen eller välj Swish/kort."
      );
    }
    if (/not enabled/i.test(detail) || /not available/i.test(detail)) {
      throw new Error(
        "Den betalmetoden är inte aktiverad ännu. Prova Swish eller kort."
      );
    }
    throw new Error(detail || `Betalningsfel (${res.status})`);
  }
  return data as MolliePayment;
}

export async function getPayment(paymentId: string): Promise<MolliePayment> {
  const res = await fetch(
    `${MOLLIE_API}/payments/${encodeURIComponent(paymentId)}`,
    {
      headers: { Authorization: `Bearer ${apiKey()}` },
      cache: "no-store",
    }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.detail || `Mollie get ${res.status}`);
  }
  return data as MolliePayment;
}

export function checkoutUrl(payment: MolliePayment): string | null {
  return payment._links?.checkout?.href || null;
}

export function isPaid(status: string) {
  return status === "paid" || status === "authorized";
}
