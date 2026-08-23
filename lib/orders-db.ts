/**
 * Persist orders in Payload CMS (Postgres via Payload).
 * Best-effort: never block checkout if CMS is down.
 */
import { getPayload } from "payload";
import config from "@payload-config";

export type OrderItemInput = {
  productId?: string;
  slug?: string;
  name: string;
  price: number;
  quantity: number;
};

export type CreateOrderDoc = {
  orderNumber: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  zip?: string;
  city?: string;
  country?: string;
  subtotal?: number;
  shipping?: number;
  total: number;
  paymentMethod?: string;
  items: OrderItemInput[];
  molliePaymentId?: string;
  status?: "pending" | "paid" | "processing" | "shipped" | "delivered" | "cancelled";
};

async function payloadClient() {
  return getPayload({ config });
}

export async function createOrderDoc(data: CreateOrderDoc) {
  try {
    const payload = await payloadClient();
    const doc = await payload.create({
      collection: "orders",
      data: {
        orderNumber: data.orderNumber,
        status: data.status || "pending",
        email: data.email,
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        phone: data.phone || "",
        address: data.address || "",
        zip: data.zip || "",
        city: data.city || "",
        country: data.country || "SE",
        subtotal: data.subtotal ?? data.total,
        shipping: data.shipping ?? 0,
        total: data.total,
        paymentMethod: data.paymentMethod || "",
        molliePaymentId: data.molliePaymentId || "",
        items: data.items.map((i) => ({
          productId: i.productId || i.slug || "",
          slug: i.slug || "",
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
      },
      overrideAccess: true,
    });
    return { ok: true as const, id: doc.id };
  } catch (e) {
    console.error("[orders-db:create]", e);
    return {
      ok: false as const,
      error: e instanceof Error ? e.message : "create_failed",
    };
  }
}

export async function markOrderPaid(input: {
  orderNumber: string;
  molliePaymentId?: string;
  status?: "paid" | "processing";
  cjOrderId?: string | null;
  trackingNumber?: string | null;
}) {
  try {
    const payload = await payloadClient();
    const found = await payload.find({
      collection: "orders",
      where: { orderNumber: { equals: input.orderNumber } },
      limit: 1,
      overrideAccess: true,
    });
    const existing = found.docs[0];
    if (!existing) {
      return { ok: false as const, reason: "not_found" as const };
    }
    await payload.update({
      collection: "orders",
      id: existing.id,
      data: {
        status: input.status || "paid",
        ...(input.molliePaymentId
          ? { molliePaymentId: input.molliePaymentId }
          : {}),
        ...(input.cjOrderId ? { cjOrderId: input.cjOrderId } : {}),
        ...(input.trackingNumber
          ? { trackingNumber: input.trackingNumber }
          : {}),
      },
      overrideAccess: true,
    });
    return { ok: true as const, id: existing.id };
  } catch (e) {
    console.error("[orders-db:paid]", e);
    return {
      ok: false as const,
      error: e instanceof Error ? e.message : "update_failed",
    };
  }
}
