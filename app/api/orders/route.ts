import { NextRequest, NextResponse } from "next/server";
import { createPayment, checkoutUrl, buildOrderLines } from "@/lib/mollie";
import { createOrderDoc } from "@/lib/orders-db";

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
 * Create order in Payload + Mollie payment.
 * Confirmation email + CJ fulfill run from Mollie webhook after paid.
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as OrderPayload;

    if (
      !body?.email ||
      !body?.firstName ||
      !body?.lastName ||
      !body?.address ||
      !body?.zip ||
      !body?.city ||
      !Array.isArray(body.items) ||
      body.items.length === 0 ||
      !body.total ||
      body.total <= 0
    ) {
      return NextResponse.json(
        { error: "Fyll i alla obligatoriska fält" },
        { status: 400 }
      );
    }

    const id = orderId();

    const itemsMeta = body.items
      .map((i) => `${i.slug}x${i.quantity}`)
      .join(",")
      .slice(0, 180);

    const metadata: Record<string, string> = {
      orderId: id,
      email: body.email.slice(0, 100),
      firstName: body.firstName.slice(0, 40),
      lastName: body.lastName.slice(0, 40),
      phone: (body.phone || "").slice(0, 30),
      address: body.address.slice(0, 80),
      zip: body.zip.slice(0, 12),
      city: body.city.slice(0, 40),
      country: body.country || "SE",
      items: itemsMeta,
      itemsJson: JSON.stringify(
        body.items.map((i) => ({
          s: i.slug,
          n: i.name.slice(0, 40),
          p: i.price,
          q: i.quantity,
        }))
      ).slice(0, 900),
      subtotal: String(body.subtotal),
      shipping: String(body.shipping),
      total: String(body.total),
      paymentMethod: body.paymentMethod || "swish",
    };

    console.log(
      "[order:create]",
      id,
      body.email,
      body.total,
      body.paymentMethod
    );

    if (!process.env.MOLLIE_API_KEY) {
      console.error("[order] MOLLIE_API_KEY missing");
      return NextResponse.json(
        { error: "Betalning är inte konfigurerad" },
        { status: 503 }
      );
    }

    await createOrderDoc({
      orderNumber: id,
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      address: body.address,
      zip: body.zip,
      city: body.city,
      country: body.country || "SE",
      subtotal: body.subtotal,
      shipping: body.shipping,
      total: body.total,
      paymentMethod: body.paymentMethod,
      items: body.items.map((i) => ({
        productId: i.id,
        slug: i.slug,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
      status: "pending",
    });

    const address = {
      givenName: body.firstName.trim(),
      familyName: body.lastName.trim(),
      email: body.email.trim(),
      streetAndNumber: body.address.trim(),
      postalCode: body.zip.replace(/\s+/g, "").trim(),
      city: body.city.trim(),
      country: (body.country || "SE").toUpperCase(),
      phone: body.phone?.trim(),
    };

    const lines = buildOrderLines({
      items: body.items.map((i) => ({
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        sku: i.slug,
      })),
      shippingSek: body.shipping || 0,
    });

    const payment = await createPayment({
      orderId: id,
      amountSek: body.total,
      description: `Sleepie ${id}`,
      method: body.paymentMethod,
      customerEmail: body.email,
      billingAddress: address,
      shippingAddress: address,
      lines,
      metadata,
    });

    const url = checkoutUrl(payment);
    if (!url) {
      console.error("[order] no checkout url", payment.id, payment.status);
      return NextResponse.json(
        { error: "Kunde inte starta betalning" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      orderId: id,
      paymentId: payment.id,
      status: payment.status,
      checkoutUrl: url,
    });
  } catch (e) {
    console.error("[orders]", e);
    return NextResponse.json(
      {
        error:
          e instanceof Error ? e.message : "Serverfel vid betalning",
      },
      { status: 500 }
    );
  }
}
