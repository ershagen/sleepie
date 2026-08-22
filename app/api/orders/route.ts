import { NextResponse } from "next/server";

/**
 * POST /api/orders
 * Tar emot order-intent från kassan.
 * Mollie + CJ fulfillment kopplas här när nycklar/vid finns.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body?.email || !Array.isArray(body?.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: "Ogiltig order" },
        { status: 400 }
      );
    }

    const orderId = `SLP-${Date.now().toString(36).toUpperCase()}`;

    // Logga för nu (Payload Orders / Mollie webhook senare)
    console.log("[Sleepie order]", orderId, {
      email: body.email,
      total: body.total,
      items: body.items.length,
      paymentMethod: body.paymentMethod,
    });

    return NextResponse.json({
      ok: true,
      orderId,
      message: "Order mottagen (test). Mollie aktiveras med API-nyckel.",
    });
  } catch {
    return NextResponse.json({ error: "Serverfel" }, { status: 500 });
  }
}
