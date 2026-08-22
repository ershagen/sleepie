import { NextRequest, NextResponse } from "next/server";
import { getPayment, isPaid } from "@/lib/mollie";
import { sendOrderConfirmation } from "@/lib/email";
import { fulfillOrderAtCj } from "@/lib/fulfillment";

/**
 * Mollie webhook — POST body: id=tr_xxx (application/x-www-form-urlencoded)
 * On paid: send Resend confirmation + optional CJ fulfill
 */
export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let paymentId = "";

    if (contentType.includes("application/json")) {
      const json = await req.json();
      paymentId = json.id || json.paymentId || "";
    } else {
      const form = await req.formData();
      paymentId = String(form.get("id") || "");
    }

    if (!paymentId) {
      return NextResponse.json({ error: "missing id" }, { status: 400 });
    }

    const payment = await getPayment(paymentId);
    const meta = payment.metadata || {};
    const orderId = meta.orderId || "unknown";

    console.log("[mollie:webhook]", paymentId, payment.status, orderId);

    if (!isPaid(payment.status)) {
      return NextResponse.json({ ok: true, status: payment.status });
    }

    // Parse items from metadata
    let items: Array<{ name: string; quantity: number; price: number; slug?: string }> =
      [];
    try {
      const raw = meta.itemsJson ? JSON.parse(meta.itemsJson) : [];
      items = (raw as Array<{ s?: string; n?: string; p?: number; q?: number }>).map(
        (i) => ({
          slug: i.s,
          name: i.n || i.s || "Produkt",
          price: Number(i.p) || 0,
          quantity: Number(i.q) || 1,
        })
      );
    } catch {
      items = [];
    }

    const email = meta.email;
    const firstName = meta.firstName || "Kund";

    if (email) {
      const mail = await sendOrderConfirmation({
        orderId,
        email,
        firstName,
        lastName: meta.lastName,
        items,
        subtotal: Number(meta.subtotal) || 0,
        shipping: Number(meta.shipping) || 0,
        total: Number(meta.total) || Number(payment.amount?.value) || 0,
        address: meta.address,
        zip: meta.zip,
        city: meta.city,
      });
      console.log("[mollie:email]", mail);
    }

    // Live CJ fulfill only when explicitly enabled
    const liveCj = process.env.CJ_AUTO_FULFILL === "1";
    if (liveCj && items.length > 0) {
      const cj = await fulfillOrderAtCj({
        orderNumber: orderId,
        lines: items
          .filter((i) => i.slug)
          .map((i) => ({ slug: i.slug!, quantity: i.quantity })),
        shipping: {
          zip: meta.zip || "",
          city: meta.city || "",
          address: meta.address || "",
          phone: meta.phone || "0700000000",
          customer: `${firstName} ${meta.lastName || ""}`.trim(),
          countryCode: meta.country || "SE",
          country: "Sweden",
        },
        isSandbox: process.env.CJ_LIVE_ORDERS === "1" ? 0 : 1,
      });
      console.log("[mollie:cj]", cj);
    }

    return NextResponse.json({ ok: true, status: payment.status, orderId });
  } catch (e) {
    console.error("[mollie:webhook:error]", e);
    // Still 200 so Mollie does not retry forever on our bugs for paid events we logged
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
