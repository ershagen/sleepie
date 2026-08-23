import { NextRequest, NextResponse } from "next/server";
import { refundOrderByNumber } from "@/lib/refund";

/**
 * POST /api/admin/refund
 * Header: Authorization: Bearer <PAYLOAD_SECRET or SEED_SECRET>
 * Body: { orderNumber: "SLP-...", amountSek?: number, reason?: string }
 */
export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization") || "";
  const token = auth.replace(/^Bearer\s+/i, "").trim();
  const expected =
    process.env.SEED_SECRET || process.env.PAYLOAD_SECRET || "";

  if (!expected || token !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as {
      orderNumber?: string;
      amountSek?: number;
      reason?: string;
    };

    if (!body.orderNumber) {
      return NextResponse.json(
        { error: "orderNumber required" },
        { status: 400 }
      );
    }

    const result = await refundOrderByNumber(body.orderNumber, {
      amountSek: body.amountSek,
      reason: body.reason,
    });

    return NextResponse.json(result, { status: result.ok ? 200 : 422 });
  } catch (e) {
    console.error("[admin:refund]", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "refund_failed" },
      { status: 500 }
    );
  }
}
