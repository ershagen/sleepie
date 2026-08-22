import { NextResponse } from "next/server";
import { getAccessToken, searchProducts, getBalance } from "@/lib/cj";

/**
 * GET /api/cj/test — verifies CJ credentials (admin/dev only)
 * Protected by simple secret header in production.
 */
export async function GET(req: Request) {
  const auth = req.headers.get("x-sleepie-secret");
  const expected = process.env.PAYLOAD_SECRET;
  if (expected && auth !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const token = await getAccessToken();
    const balance = await getBalance().catch((e: Error) => ({
      error: e.message,
    }));
    const products = await searchProducts({
      productNameEn: "baby",
      page: 1,
      size: 5,
    }).catch((e: Error) => ({ error: e.message }));

    return NextResponse.json({
      ok: true,
      tokenPreview: token.slice(0, 24) + "…",
      balance,
      products,
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}
