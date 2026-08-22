import { NextRequest, NextResponse } from "next/server";
import { getTracking } from "@/lib/fulfillment";
import { sendShippingNotification } from "@/lib/email";

/**
 * Poll CJ tracking for orders that have trackingNumber but not yet emailed.
 * Secure with CRON_SECRET header: Authorization: Bearer <CRON_SECRET>
 *
 * Body (optional for manual test):
 * {
 *   orders: [{
 *     orderId, email, firstName, trackingNumber,
 *     items, subtotal, shipping, total, shippingEmailSent?
 *   }]
 * }
 *
 * Later: load open orders from Payload/Supabase instead of body.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization") || "";
  if (secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let orders: Array<{
    orderId: string;
    email: string;
    firstName: string;
    trackingNumber: string;
    items?: Array<{ name: string; quantity: number; price: number }>;
    subtotal?: number;
    shipping?: number;
    total?: number;
    shippingEmailSent?: boolean;
  }> = [];

  try {
    const body = await req.json().catch(() => ({}));
    if (Array.isArray(body?.orders)) orders = body.orders;
  } catch {
    // empty
  }

  if (orders.length === 0) {
    return NextResponse.json({
      ok: true,
      message:
        "Inga ordrar att synka. Skicka { orders: [...] } eller koppla databas.",
      processed: 0,
    });
  }

  const results = [];

  for (const order of orders) {
    if (!order.trackingNumber || order.shippingEmailSent) {
      results.push({ orderId: order.orderId, skipped: true });
      continue;
    }

    const track = await getTracking(order.trackingNumber);
    const status = track?.trackingStatus || "In transit";

    const mail = await sendShippingNotification({
      orderId: order.orderId,
      email: order.email,
      firstName: order.firstName,
      items: order.items || [],
      subtotal: order.subtotal || 0,
      shipping: order.shipping || 0,
      total: order.total || 0,
      trackingNumber: order.trackingNumber,
      trackingStatus: status,
      logisticName: track?.logisticName,
    });

    results.push({
      orderId: order.orderId,
      trackingStatus: status,
      emailSent: mail.ok,
      emailReason: "reason" in mail ? mail.reason : undefined,
    });
  }

  return NextResponse.json({ ok: true, processed: results.length, results });
}

export async function GET(req: NextRequest) {
  return POST(req);
}
