/**
 * Email via Resend — from mail.alectiv.com
 * ENV: RESEND_API_KEY, EMAIL_FROM=Sleepie <noreply@mail.alectiv.com>
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

const GREEN = "#6B8F71";
const GREEN_DARK = "#557a5c";
const BLACK = "#0a0a0a";
const MUTED = "#57534e";
const BORDER = "#e7e5e4";
const BG = "#f5f4f2";

function fromAddress() {
  return process.env.EMAIL_FROM || "Sleepie <noreply@mail.alectiv.com>";
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
    return { ok: false as const, reason: "send_failed" as const, detail: text };
  }

  const json = await res.json();
  return { ok: true as const, id: json.id as string };
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, """);
}

function formatKr(n: number) {
  return `${Math.round(n).toLocaleString("sv-SE")} kr`;
}

function itemsRows(items: MailOrderItem[]) {
  return items
    .map(
      (i) => `
      <tr>
        <td style="padding:14px 0;border-bottom:1px solid ${BORDER};vertical-align:top;">
          <p style="margin:0;font-size:15px;font-weight:600;color:${BLACK};">${escapeHtml(i.name)}</p>
          <p style="margin:4px 0 0;font-size:13px;color:${MUTED};">Antal ${i.quantity}</p>
        </td>
        <td style="padding:14px 0;border-bottom:1px solid ${BORDER};text-align:right;vertical-align:top;white-space:nowrap;font-size:15px;color:${BLACK};">
          ${formatKr(i.price * i.quantity)}
        </td>
      </tr>`
    )
    .join("");
}

function emailShell(opts: {
  preheader: string;
  title: string;
  bodyHtml: string;
}) {
  return `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${escapeHtml(opts.title)}</title>
  <!--[if mso]><style>table,td{font-family:Arial,sans-serif!important}</style><![endif]-->
</head>
<body style="margin:0;padding:0;background:${BG};-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(opts.preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;">
          <!-- Logo -->
          <tr>
            <td align="center" style="padding:0 0 24px;">
              <span style="font-family:Georgia,'Times New Roman',serif;font-size:28px;letter-spacing:-0.02em;color:${BLACK};">Sleep<span style="color:${GREEN};">ie</span></span>
            </td>
          </tr>
          <!-- Card -->
          <tr>
            <td style="background:#ffffff;border-radius:16px;border:1px solid ${BORDER};overflow:hidden;">
              <!-- Green top bar -->
              <div style="height:4px;background:${GREEN};line-height:4px;font-size:0;">&nbsp;</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:32px 28px 28px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                    <h1 style="margin:0 0 8px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:400;line-height:1.25;color:${BLACK};">
                      ${opts.title}
                    </h1>
                    ${opts.bodyHtml}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:28px 8px 8px;text-align:center;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
              <p style="margin:0 0 8px;font-size:13px;color:${MUTED};line-height:1.5;">
                Frågor? Svara på detta mejl eller skriv till
                <a href="mailto:hej@sleepie.se" style="color:${GREEN_DARK};text-decoration:none;">hej@sleepie.se</a>
              </p>
              <p style="margin:0 0 8px;font-size:12px;color:#a8a29e;">
                14 dagars öppet köp · Säker betalning via Mollie
              </p>
              <p style="margin:16px 0 0;font-size:11px;color:#a8a29e;line-height:1.5;">
                Sleepie · Org.nr 559283-6042<br/>
                <a href="https://sleepie-two.vercel.app/villkor" style="color:#a8a29e;">Köpvillkor</a>
                ·
                <a href="https://sleepie-two.vercel.app/integritet" style="color:#a8a29e;">Integritet</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function totalsBlock(order: OrderMailData) {
  const shipLabel =
    order.shipping === 0 ? "Fri frakt" : formatKr(order.shipping);
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px;">
    <tr>
      <td style="padding:6px 0;font-size:14px;color:${MUTED};">Delsumma</td>
      <td style="padding:6px 0;font-size:14px;color:${BLACK};text-align:right;">${formatKr(order.subtotal)}</td>
    </tr>
    <tr>
      <td style="padding:6px 0;font-size:14px;color:${MUTED};">Frakt</td>
      <td style="padding:6px 0;font-size:14px;color:${BLACK};text-align:right;">${shipLabel}</td>
    </tr>
    <tr>
      <td colspan="2" style="padding:12px 0 0;border-top:1px solid ${BORDER};"></td>
    </tr>
    <tr>
      <td style="padding:4px 0 0;font-size:16px;font-weight:600;color:${BLACK};">Totalt</td>
      <td style="padding:4px 0 0;font-size:16px;font-weight:600;color:${BLACK};text-align:right;">${formatKr(order.total)}</td>
    </tr>
    <tr>
      <td colspan="2" style="padding:4px 0 0;font-size:12px;color:#a8a29e;text-align:right;">Inkl. moms</td>
    </tr>
  </table>`;
}

function addressBlock(order: OrderMailData) {
  if (!order.address) return "";
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0 0;background:${BG};border-radius:12px;">
    <tr>
      <td style="padding:16px 18px;">
        <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:${GREEN_DARK};font-weight:600;">Leveransadress</p>
        <p style="margin:0;font-size:14px;line-height:1.55;color:${BLACK};">
          ${escapeHtml(order.firstName)}${order.lastName ? ` ${escapeHtml(order.lastName)}` : ""}<br/>
          ${escapeHtml(order.address)}<br/>
          ${escapeHtml(order.zip || "")} ${escapeHtml(order.city || "")}<br/>
          Sverige
        </p>
      </td>
    </tr>
  </table>`;
}

export async function sendOrderConfirmation(order: OrderMailData) {
  const bodyHtml = `
    <p style="margin:0 0 20px;font-size:15px;line-height:1.55;color:${MUTED};">
      Hej ${escapeHtml(order.firstName)}, tack för din beställning.
      Vi har mottagit din betalning och förbereder din order.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 8px;background:${BG};border-radius:12px;">
      <tr>
        <td style="padding:14px 18px;">
          <p style="margin:0;font-size:12px;color:${MUTED};">Ordernummer</p>
          <p style="margin:4px 0 0;font-size:16px;font-weight:600;color:${BLACK};letter-spacing:0.02em;">${escapeHtml(order.orderId)}</p>
        </td>
      </tr>
    </table>

    <p style="margin:24px 0 4px;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:${GREEN_DARK};font-weight:600;">Din order</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${itemsRows(order.items)}
    </table>

    ${totalsBlock(order)}
    ${addressBlock(order)}

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0 0;">
      <tr>
        <td style="padding:16px 18px;background:#f0f5f1;border-radius:12px;border:1px solid #d4e0d6;">
          <p style="margin:0 0 6px;font-size:14px;font-weight:600;color:${BLACK};">Vad händer nu?</p>
          <p style="margin:0;font-size:13px;line-height:1.55;color:${MUTED};">
            Leveranstid är vanligtvis <strong style="color:${BLACK};">5–12 arbetsdagar</strong>.
            Du får ett nytt mejl med spårningsnummer när paketet skickas.
          </p>
        </td>
      </tr>
    </table>
  `;

  const html = emailShell({
    preheader: `Order ${order.orderId} bekräftad · ${formatKr(order.total)}`,
    title: "Tack för din order",
    bodyHtml,
  });

  return sendResend({
    to: order.email,
    subject: `Orderbekräftelse ${order.orderId} · Sleepie`,
    html,
  });
}

export async function sendShippingNotification(data: ShippingMailData) {
  const trackInner = data.trackingUrl
    ? `<a href="${escapeHtml(data.trackingUrl)}" style="color:${GREEN_DARK};font-weight:600;text-decoration:none;">${escapeHtml(data.trackingNumber)}</a>`
    : `<span style="font-weight:600;color:${BLACK};">${escapeHtml(data.trackingNumber)}</span>`;

  const bodyHtml = `
    <p style="margin:0 0 20px;font-size:15px;line-height:1.55;color:${MUTED};">
      Hej ${escapeHtml(data.firstName)}, goda nyheter — din order
      <strong style="color:${BLACK};">${escapeHtml(data.orderId)}</strong> är på väg.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};border-radius:12px;">
      <tr>
        <td style="padding:18px;">
          <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:${GREEN_DARK};font-weight:600;">Spårning</p>
          <p style="margin:0;font-size:16px;">${trackInner}</p>
          ${
            data.logisticName
              ? `<p style="margin:8px 0 0;font-size:13px;color:${MUTED};">Transportör: ${escapeHtml(data.logisticName)}</p>`
              : ""
          }
          ${
            data.trackingStatus
              ? `<p style="margin:4px 0 0;font-size:13px;color:${MUTED};">Status: ${escapeHtml(data.trackingStatus)}</p>`
              : ""
          }
        </td>
      </tr>
    </table>

    <p style="margin:24px 0 0;font-size:13px;line-height:1.55;color:${MUTED};">
      Du kan följa paketet med spårningsnumret hos transportören.
    </p>
  `;

  const html = emailShell({
    preheader: `Din order ${data.orderId} har skickats`,
    title: "Din order är på väg",
    bodyHtml,
  });

  return sendResend({
    to: data.email,
    subject: `Skickat · ${data.orderId} · Sleepie`,
    html,
  });
}

export function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}
