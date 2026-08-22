import { NextRequest, NextResponse } from "next/server";

export type OrderPayload = {
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  address: string;
  zip: string;
  city: string;
  country: string;
  paymentMethod: string;
  items: Array<{
    id: string;
    slug: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  subtotal: number;
  shipping: number;
  total: number;
};

function orderId() {
  const d = new Date();
  const y = d.getFullYear().toString().slice(-2);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const r = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SLP-${y}${m}${day}-${r}`;
}

/**
 * Creates an order intent.
 * When Mollie is connected: create payment here and return checkoutUrl.
 * For now: returns orderId so the confirmation page can show real data.
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as OrderPayload;

    if (
      !body?.email ||
      !body?.firstName ||
      !body?.lastName ||
      !body?.address ||
      !Array.isArray(body.items) ||
      body.items.length === 0
    ) {
      return NextResponse.json(
        { error: "Ogiltig order" },
        { status: 400 }
      );
    }

    const id = orderId();

    // TODO Mollie:
    // const payment = await mollie.payments.create({ ... })
    // return { orderId: id, checkoutUrl: payment.getCheckoutUrl() }

    // TODO CJ Dropshipping order create with mapped vids

    const order = {
      id,
      createdAt: new Date().toISOString(),
      status: "pending_payment" as const,
      ...body,
    };

    // In production: persist to Payload/Supabase
    console.log("[order]", JSON.stringify(order));

    return NextResponse.json({
      orderId: id,
      status: "pending_payment",
      // checkoutUrl: null until Mollie is wired
    });
  } catch {
    return NextResponse.json({ error: "Serverfel" }, { status: 500 });
  }
}
