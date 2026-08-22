import { NextRequest, NextResponse } from "next/server";
import { quoteCjFreight } from "@/lib/fulfillment";
import { calcOrderTotal } from "@/lib/shipping";

/**
 * POST { lines: [{ slug, quantity }], countryCode?: "SE", subtotal?: number }
 * Returns store shipping (SEK) + optional CJ freight quote (USD).
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const lines = Array.isArray(body?.lines) ? body.lines : [];
    const countryCode = (body?.countryCode as string) || "SE";
    const subtotal = Number(body?.subtotal) || 0;

    const store = calcOrderTotal(subtotal);

    let cj: Awaited<ReturnType<typeof quoteCjFreight>> = null;
    if (lines.length > 0) {
      cj = await quoteCjFreight({ endCountryCode: countryCode, lines });
    }

    return NextResponse.json({
      store: {
        shippingSek: store.shipping,
        freeShipping: store.freeShipping,
        totalSek: store.total,
        remainingToFree: store.remainingToFree,
      },
      cj: cj
        ? {
            cheapestUsd: cj.cheapestUsd,
            options: cj.options.slice(0, 5).map((o) => ({
              name: o.logisticName || o.logisticsName || "Standard",
              priceUsd: Number(o.logisticPrice ?? o.postage ?? 0),
              aging: o.logisticAging || o.arrivalTime || null,
            })),
          }
        : null,
    });
  } catch (e) {
    console.error("[shipping/quote]", e);
    return NextResponse.json({ error: "Kunde inte hämta frakt" }, { status: 500 });
  }
}
