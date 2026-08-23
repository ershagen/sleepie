/**
 * Full refund flow:
 * 1) Mollie refund (customer money back)
 * 2) CJ deleteOrder (stop dropshipping if not shipped)
 * 3) Update Payload order
 */
import "server-only";
import { createRefund, getPayment } from "./mollie";
import { deleteOrder } from "./cj";
import { getPayloadClient, payloadConfigured } from "./payload";

export type RefundResult = {
  ok: boolean;
  orderNumber: string;
  mollieRefundId?: string | null;
  mollieError?: string | null;
  cjCancelled?: boolean;
  cjError?: string | null;
  amountSek?: number;
};

export async function refundOrderByNumber(
  orderNumber: string,
  opts?: { amountSek?: number; reason?: string }
): Promise<RefundResult> {
  if (!payloadConfigured()) {
    return { ok: false, orderNumber, mollieError: "Payload saknas" };
  }

  const payload = await getPayloadClient();
  const found = await payload.find({
    collection: "orders",
    where: { orderNumber: { equals: orderNumber } },
    limit: 1,
    overrideAccess: true,
  });
  const order = found.docs[0] as Record<string, unknown> | undefined;
  if (!order) {
    return { ok: false, orderNumber, mollieError: "Order hittades inte" };
  }

  if (order.status === "refunded" && order.mollieRefundId) {
    return {
      ok: true,
      orderNumber,
      mollieRefundId: String(order.mollieRefundId),
      cjCancelled: Boolean(order.cjCancelled),
      amountSek: Number(order.refundAmount) || Number(order.total),
    };
  }

  const paymentId = String(order.molliePaymentId || "");
  const total = Number(order.total) || 0;
  const amount = opts?.amountSek && opts.amountSek > 0 ? opts.amountSek : total;
  const reason = opts?.reason || "Återbetalning via admin";

  let mollieRefundId: string | null = null;
  let mollieError: string | null = null;

  if (paymentId) {
    try {
      // Prefer remaining amount if partial already done
      const payment = await getPayment(paymentId);
      const remaining = payment.amountRemaining
        ? Number(payment.amountRemaining.value)
        : amount;
      const refundAmount = Math.min(amount, remaining > 0 ? remaining : amount);
      if (refundAmount <= 0) {
        mollieError = "Inget belopp kvar att återbetala";
      } else {
        const refund = await createRefund({
          paymentId,
          amountSek: refundAmount,
          description: `${reason} · ${orderNumber}`,
        });
        mollieRefundId = refund.id;
      }
    } catch (e) {
      mollieError = e instanceof Error ? e.message : "Mollie refund failed";
      console.error("[refund:mollie]", e);
    }
  } else {
    mollieError = "Ingen molliePaymentId på ordern";
  }

  let cjCancelled = false;
  let cjError: string | null = null;
  const cjOrderId = String(order.cjOrderId || "");
  if (cjOrderId) {
    try {
      await deleteOrder(cjOrderId);
      cjCancelled = true;
    } catch (e) {
      cjError = e instanceof Error ? e.message : "CJ cancel failed";
      console.error("[refund:cj]", e);
      // If already shipped, CJ often rejects — note for admin
    }
  }

  const refundSucceeded = Boolean(mollieRefundId);
  await payload.update({
    collection: "orders",
    id: order.id as string | number,
    data: {
      status: refundSucceeded ? "refunded" : order.status,
      mollieRefundId: mollieRefundId || order.mollieRefundId || "",
      refundAmount: amount,
      refundReason: reason,
      cjCancelled,
      refundNote: [
        mollieError ? `Mollie: ${mollieError}` : null,
        cjError ? `CJ: ${cjError}` : null,
        cjCancelled ? "CJ-order avbruten" : null,
      ]
        .filter(Boolean)
        .join(" · "),
    },
    overrideAccess: true,
    context: { skipRefundHook: true },
  });

  return {
    ok: refundSucceeded,
    orderNumber,
    mollieRefundId,
    mollieError,
    cjCancelled,
    cjError,
    amountSek: amount,
  };
}
