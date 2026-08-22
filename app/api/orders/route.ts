import { NextRequest, NextResponse } from "next/server";
import { sendOrderConfirmation } from "@/lib/email";
import { fulfillOrderAtCj } from "@/lib/fulfillment";

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
 * Create order intent.
 * - Mollie: add payment + checkoutUrl when MOLLIE_API_KEY is set
 * - Email: sends confirmation if RESEND_API_KEY is set (otherwise logs)
 * - CJ: sandbox fulfill when CJ keys exist and products are mapped
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
      return NextResponse.json({ error: "Ogiltig order" }, { status: 400 });
    }

    const id = orderId();

    // --- Mollie (when key exists) ---
    // const payment = await createMolliePayment({ orderId: id, amount: body.total, ... })
    // return { orderId: id, checkoutUrl: payment.getCheckoutUrl() }

    const order = {
      id,
      createdAt: new Date().toISOString(),
      status: "pending_payment" as const,
      ...body,
    };

    console.log("[order]", JSON.stringify(order));

    // Confirmation email (no-op without RESEND_API_KEY)
    const emailResult = await sendOrderConfirmation({
      orderId: id,
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      items: body.items.map((i) => ({
        name: i.name,
        quantity: i.quantity,
        price: i.price,
      })),
      subtotal: body.subtotal,
      shipping: body.shipping,
      total: body.total,
      address: body.address,
      zip: body.zip,
      city: body.city,
    });

    // CJ fulfill in sandbox after "payment" (test flow).
    // When Mollie is live: only call this from payment webhook after paid.
    let cjResult: Awaited<ReturnType<typeof fulfillOrderAtCj>> | null = null;
    const autoCj = process.env.CJ_AUTO_FULFILL === "1";
    if (autoCj) {
      cjResult = await fulfillOrderAtCj({
        orderNumber: id,
        lines: body.items.map((i) => ({ slug: i.slug, quantity: i.quantity })),
        shipping: {
          zip: body.zip,
          city: body.city,
          address: body.address,
          phone: body.phone || "0700000000",
          customer: `${body.firstName} ${body.lastName}`,
          countryCode: body.country === "SE" ? "SE" : body.country || "SE",
          country: "Sweden",
        },
        isSandbox: 1,
      });
      console.log("[cj:fulfill]", cjResult);
    }

    return NextResponse.json({
      orderId: id,
      status: "pending_payment",
      email: {
        sent: emailResult.ok,
        configured: emailResult.ok || emailResult.reason !== "no_api_key",
        reason: "reason" in emailResult ? emailResult.reason : undefined,
      },
      cj: cjResult
        ? {
            ok: cjResult.ok,
            cjOrderId: "cjOrderId" in cjResult ? cjResult.cjOrderId : null,
            skipped: "skipped" in cjResult ? cjResult.skipped : [],
          }
        : { ok: false, deferred: true },
    });
  } catch (e) {
    console.error("[orders]", e);
    return NextResponse.json({ error: "Serverfel" }, { status: 500 });
  }
}
