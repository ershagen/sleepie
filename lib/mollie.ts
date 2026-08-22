/**
 * Mollie Payments API (no SDK) — Swish, card, Klarna
 * https://docs.mollie.com/reference/create-payment
 */

const MOLLIE_API = "https://api.mollie.com/v2";

function apiKey() {
  const key = process.env.MOLLIE_API_KEY;
  if (!key) throw new Error("MOLLIE_API_KEY saknas");
  return key;
}

function siteUrl() {
  return (
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL &&
      `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` ||
    "https://sleepie-alectiv.vercel.app"
  );
}

export type MollieMethod = "swish" | "creditcard" | "klarna" | "ideal" | string;

export function mapPaymentMethod(
  ui: string
): MollieMethod | undefined {
  switch (ui) {
    case "swish":
      return "swish";
    case "card":
    case "creditcard":
      return "creditcard";
    case "klarna":
      return "klarna";
    default:
      return undefined; // let Mollie show all enabled methods
  }
}

export type CreatePaymentInput = {
  orderId: string;
  amountSek: number;
  description: string;
  method?: string;
  customerEmail?: string;
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
  return sek.toFixed(2);
}

export async function createPayment(
  input: CreatePaymentInput
): Promise<MolliePayment> {
  const method = input.method ? mapPaymentMethod(input.method) : undefined;
  const redirectUrl = `${siteUrl()}/order-bekraftelse?order=${encodeURIComponent(input.orderId)}`;
  const webhookUrl = `${siteUrl()}/api/webhooks/mollie`;

  const body: Record<string, unknown> = {
    amount: {
      currency: "SEK",
      value: formatAmount(input.amountSek),
    },
    description: input.description.slice(0, 255),
    redirectUrl,
    webhookUrl,
    metadata: {
      orderId: input.orderId,
      ...(input.metadata || {}),
    },
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
    console.error("[mollie:create]", data);
    throw new Error(
      data?.detail || data?.title || `Mollie error ${res.status}`
    );
  }
  return data as MolliePayment;
}

export async function getPayment(paymentId: string): Promise<MolliePayment> {
  const res = await fetch(`${MOLLIE_API}/payments/${encodeURIComponent(paymentId)}`, {
    headers: { Authorization: `Bearer ${apiKey()}` },
    cache: "no-store",
  });
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
