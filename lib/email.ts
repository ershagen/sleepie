/**
 * Email layer — Resend when RESEND_API_KEY is set, otherwise logs only.
 * Set RESEND_API_KEY + EMAIL_FROM (e.g. Sleepie <hej@sleepie.se>) in Vercel.
 */

export type MailOrderItem = {
  name: string;
  quantity: number;
  price: number;
};

export type OrderMailData = {
  orderId: string;
  email: string;
  firstName: string;
  lastName?: string;
  items: MailOrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  address?: string;
  zip?: string;
  city?: string;
};

export type ShippingMailData = OrderMailData & {
  trackingNumber: string;
  trackingStatus?: string;
  logisticName?: string;
  trackingUrl?: string;
};

function fromAddress() {
  return process.env.EMAIL_FROM || "Sleepie <onboarding@resend.dev>";
}

function hasResend() {
  return Boolean(process.env.RESEND_API_KEY);
}

async function sendResend(payload: {
  to: string;
  subject: string;
  html: string;
}) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log("[email:skipped — no RESEND_API_KEY]", payload.subject, payload.to);
    return { ok: false as const, reason: "no_api_key" as const };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromAddress(),
      to: [payload.to],
      subject: payload.subject,
      html: payload.html,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[email:error]", res.status, text);
    return { ok: false as const, reason: "send_failed" as const };
  }

  const json = await res.json();
  return { ok: true as const, id: json.id as string };
}

function itemsHtml(items: MailOrderItem[]) {
  return items
    .map(
      (i) =>
        `<tr>
          <td style="padding:8px 0;border-bottom:1px solid #eee;">${escapeHtml(i.name)} × ${i.quantity}</td>
          <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right;">${i.price * i.quantity} kr</td>
        </tr>`
    )
    .join("");
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function layout(title: string, body: string) {
  return `<!DOCTYPE html>
<html><body style="font-family:system-ui,sans-serif;background:#fafaf9;color:#0a0a0a;margin:0;padding:24px;">
  <div style="max-width:520px;margin:0 auto;background:#fff;border:1px solid #e7e5e4;border-radius:12px;padding:28px;">
    <p style="font-size:13px;letter-spacing:0.04em;color:#78716c;margin:0 0 16px;">Sleepie</p>
    <h1 style="font-size:22px;font-weight:600;margin:0 0 12px;">${title}</h1>
    ${body}
    <p style="font-size:12px;color:#a8a29e;margin-top:28px;">Frågor? hej@sleepie.se</p>
  </div>
</body></html>`;
}

export async function sendOrderConfirmation(order: OrderMailData) {
  const html = layout(
    "Tack för din order",
    `
    <p style="color:#57534e;line-height:1.5;">Hej ${escapeHtml(order.firstName)}, vi har tagit emot din beställning.</p>
    <p style="font-size:14px;"><strong>Ordernummer:</strong> ${escapeHtml(order.orderId)}</p>
    <table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:14px;">
      ${itemsHtml(order.items)}
    </table>
    <p style="font-size:14px;margin:4px 0;">Delsumma: ${order.subtotal} kr</p>
    <p style="font-size:14px;margin:4px 0;">Frakt: ${order.shipping === 0 ? "Fri" : `${order.shipping} kr`}</p>
    <p style="font-size:16px;font-weight:600;margin:12px 0;">Totalt: ${order.total} kr</p>
    ${
      order.address
        ? `<p style="font-size:13px;color:#57534e;">Leverans: ${escapeHtml(order.address)}, ${escapeHtml(order.zip || "")} ${escapeHtml(order.city || "")}</p>`
        : ""
    }
    <p style="font-size:13px;color:#57534e;margin-top:16px;">Leveranstid: vanligtvis 5–12 arbetsdagar. Du får ett nytt mejl när paketet skickas.</p>
  `
  );

  return sendResend({
    to: order.email,
    subject: `Orderbekräftelse ${order.orderId} · Sleepie`,
    html,
  });
}

export async function sendShippingNotification(data: ShippingMailData) {
  const trackLine = data.trackingUrl
    ? `<a href="${escapeHtml(data.trackingUrl)}">${escapeHtml(data.trackingNumber)}</a>`
    : escapeHtml(data.trackingNumber);

  const html = layout(
    "Din order är på väg",
    `
    <p style="color:#57534e;line-height:1.5;">Hej ${escapeHtml(data.firstName)}, din order ${escapeHtml(data.orderId)} har skickats.</p>
    <p style="font-size:14px;"><strong>Spårningsnummer:</strong> ${trackLine}</p>
    ${
      data.logisticName
        ? `<p style="font-size:13px;color:#57534e;">Transportör: ${escapeHtml(data.logisticName)}</p>`
        : ""
    }
    ${
      data.trackingStatus
        ? `<p style="font-size:13px;color:#57534e;">Status: ${escapeHtml(data.trackingStatus)}</p>`
        : ""
    }
    <p style="font-size:13px;color:#57534e;margin-top:16px;">Du kan följa paketet med spårningsnumret hos transportören.</p>
  `
  );

  return sendResend({
    to: data.email,
    subject: `Skickat · ${data.orderId} · Sleepie`,
    html,
  });
}

export function emailConfigured() {
  return hasResend();
}
