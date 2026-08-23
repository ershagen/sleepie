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

const BLACK = "#0a0a0a";
const MUTED = "#57534e";
const BORDER = "#e7e5e4";
const BG = "#f5f4f2";
const GREEN = "#6B8F71";
const GREEN_DARK = "#557a5c";

function siteUrl() {
  return (
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL &&
      `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
    "https://sleepie-two.vercel.app"
  );
}

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
    console.log(
      "[email:skipped — no RESEND_API_KEY]",
      payload.subject,
      payload.to
    );
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
  return String(s)
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, """);
}

function formatKr(n: number) {
  return `${Math.round(n).toLocaleString("sv-SE")} kr`;
}

/** Wordmark matching site Logo.tsx — crescent moon replaces the i */
function logoHtml() {
  const href = siteUrl();
  return `
  <a href="${href}" style="text-decoration:none;color:${BLACK};display:inline-block;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1;letter-spacing:-0.03em;color:${BLACK};vertical-align:baseline;">
          Sleep
        </td>
        <td style="padding:0 1px;vertical-align:baseline;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="center" style="line-height:0;font-size:0;padding-bottom:2px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 12 12" style="display:block;">
                  <path fill="${BLACK}" d="M9.2 1.4C6.2 1.8 4 4.4 4 7.4C4 9 4.8 10.4 6 11.2C3.8 10.4 2.2 8.4 2.2 6C2.2 2.8 4.8 0.4 8 0.2C8.4 0.6 8.8 1 9.2 1.4Z"/>
                </svg>
              </td>
            </tr>
            <tr>
              <td align="center" style="line-height:0;font-size:0;">
                <div style="width:2px;height:12px;background:${BLACK};border-radius:1px;margin:0 auto;"></div>
              </td>
            </tr>
          </table>
        </td>
        <td style="font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1;letter-spacing:-0.03em;color:${BLACK};vertical-align:baseline;">
          e
        </td>
      </tr>
    </table>
  </a>`;
}

function itemsRows(items: MailOrderItem[]) {
  if (!items.length) {
    return `
      <tr>
        <td style="padding:14px 0;font-size:14px;color:${MUTED};" colspan="2">
          Orderdetaljer skickas separat vid behov.
        </td>
      </tr>`;
  }
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
  const base = siteUrl();
  return `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>${escapeHtml(opts.title)}</title>
  <!--[if mso]>
  <style type="text/css">
    table, td { font-family: Arial, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background:${BG};-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">
    ${escapeHtml(opts.preheader)}
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BG};">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;margin:0 auto;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding:0 0 28px;">
              ${logoHtml()}
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#ffffff;border-radius:16px;border:1px solid ${BORDER};overflow:hidden;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="height:3px;background:${BLACK};font-size:0;line-height:0;">&nbsp;</td>
                </tr>
                <tr>
                  <td style="padding:36px 32px 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                    <h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:400;line-height:1.3;color:${BLACK};">
                      ${escapeHtml(opts.title)}
                    </h1>
                    ${opts.bodyHtml}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:32px 12px 8px;text-align:center;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
              <p style="margin:0 0 10px;font-size:13px;color:${MUTED};line-height:1.6;">
                Frågor? Svara på detta mejl eller skriv till<br/>
                <a href="mailto:hej@sleepie.se" style="color:${BLACK};text-decoration:underline;">hej@sleepie.se</a>
              </p>
              <p style="margin:0 0 6px;font-size:12px;color:#a8a29e;">
                14 dagars öppet köp · Säker betalning
              </p>
              <p style="margin:20px 0 0;font-size:11px;color:#a8a29e;line-height:1.6;">
                Sleepie · Org.nr 559283-6042<br/>
                <a href="${base}/villkor" style="color:#a8a29e;text-decoration:underline;">Köpvillkor</a>
                &nbsp;·&nbsp;
                <a href="${base}/integritet" style="color:#a8a29e;text-decoration:underline;">Integritet</a>
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
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:4px;">
    <tr>
      <td style="padding:8px 0;font-size:14px;color:${MUTED};">Delsumma</td>
      <td style="padding:8px 0;font-size:14px;color:${BLACK};text-align:right;">${formatKr(order.subtotal)}</td>
    </tr>
    <tr>
      <td style="padding:8px 0;font-size:14px;color:${MUTED};">Frakt</td>
      <td style="padding:8px 0;font-size:14px;color:${BLACK};text-align:right;">${shipLabel}</td>
    </tr>
    <tr>
      <td colspan="2" style="padding:12px 0 0;border-top:1px solid ${BORDER};font-size:0;line-height:0;">&nbsp;</td>
    </tr>
    <tr>
      <td style="padding:12px 0 0;font-size:17px;font-weight:600;color:${BLACK};">Totalt</td>
      <td style="padding:12px 0 0;font-size:17px;font-weight:600;color:${BLACK};text-align:right;">${formatKr(order.total)}</td>
    </tr>
    <tr>
      <td colspan="2" style="padding:4px 0 0;font-size:12px;color:#a8a29e;text-align:right;">Inkl. moms</td>
    </tr>
  </table>`;
}

function addressBlock(order: OrderMailData) {
  if (!order.address) return "";
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 0;background:${BG};border-radius:12px;">
    <tr>
      <td style="padding:18px 20px;">
        <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${MUTED};font-weight:600;">Leveransadress</p>
        <p style="margin:0;font-size:14px;line-height:1.6;color:${BLACK};">
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
    <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:${MUTED};">
      Hej ${escapeHtml(order.firstName)}, tack för din beställning.
      Vi har mottagit din betalning och förbereder din order.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 8px;background:${BG};border-radius:12px;">
      <tr>
        <td style="padding:16px 20px;">
          <p style="margin:0;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:${MUTED};font-weight:600;">Ordernummer</p>
          <p style="margin:6px 0 0;font-size:17px;font-weight:600;color:${BLACK};letter-spacing:0.02em;">${escapeHtml(order.orderId)}</p>
        </td>
      </tr>
    </table>

    <p style="margin:28px 0 6px;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${MUTED};font-weight:600;">Din order</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${itemsRows(order.items)}
    </table>

    ${totalsBlock(order)}
    ${addressBlock(order)}

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 0;">
      <tr>
        <td style="padding:18px 20px;background:#f7f7f6;border-radius:12px;border:1px solid ${BORDER};">
          <p style="margin:0 0 6px;font-size:14px;font-weight:600;color:${BLACK};">Vad händer nu?</p>
          <p style="margin:0;font-size:13px;line-height:1.6;color:${MUTED};">
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
    ? `<a href="${escapeHtml(data.trackingUrl)}" style="color:${BLACK};font-weight:600;text-decoration:underline;">${escapeHtml(data.trackingNumber)}</a>`
    : `<span style="font-weight:600;color:${BLACK};">${escapeHtml(data.trackingNumber)}</span>`;

  const bodyHtml = `
    <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:${MUTED};">
      Hej ${escapeHtml(data.firstName)}, goda nyheter — din order
      <strong style="color:${BLACK};">${escapeHtml(data.orderId)}</strong> är på väg.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BG};border-radius:12px;">
      <tr>
        <td style="padding:20px;">
          <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${MUTED};font-weight:600;">Spårning</p>
          <p style="margin:0;font-size:16px;">${trackInner}</p>
          ${
            data.logisticName
              ? `<p style="margin:10px 0 0;font-size:13px;color:${MUTED};">Transportör: ${escapeHtml(data.logisticName)}</p>`
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

    <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:${MUTED};">
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
