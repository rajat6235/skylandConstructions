/** Server-only helpers for sending email through Resend's REST API. Never import this from a client component. */

type Attachment = { filename: string; content: Buffer };

type SendEmailOptions = {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: Attachment[];
};

export class EmailConfigError extends Error {}

export async function sendEmail({ subject, html, text, replyTo, attachments }: SendEmailOptions) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    throw new EmailConfigError("RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL must be set.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
      text,
      reply_to: replyTo,
      attachments: attachments?.map((file) => ({ filename: file.filename, content: file.content.toString("base64") })),
    }),
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Resend responded ${response.status}: ${detail.slice(0, 300)}`);
  }
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Removes characters that could break an email header (e.g. a subject line). */
export const headerSafe = (value: string) => value.replace(/[\r\n]+/g, " ").trim().slice(0, 120);

/** Simple branded HTML email: a heading, label/value rows and an optional long-text block. */
export function renderEmail({
  heading,
  rows,
  body,
}: {
  heading: string;
  rows: [label: string, value: string][];
  body?: { label: string; text: string };
}) {
  const rowHtml = rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:10px 14px;background:#f6f6f6;font-weight:bold;width:140px;vertical-align:top;border-bottom:1px solid #eee">${escapeHtml(label)}</td><td style="padding:10px 14px;border-bottom:1px solid #eee">${escapeHtml(value)}</td></tr>`,
    )
    .join("");
  const bodyHtml = body
    ? `<h3 style="margin:24px 0 8px;font-size:15px;color:#262626">${escapeHtml(body.label)}</h3><div style="white-space:pre-wrap;padding:14px;background:#f6f6f6;border-left:3px solid #06aec4;line-height:1.6">${escapeHtml(body.text)}</div>`
    : "";

  return `<div style="font-family:Arial,Helvetica,sans-serif;color:#333;max-width:620px;margin:0 auto">
<div style="background:#262626;color:#fff;padding:18px 22px;border-bottom:4px solid #06aec4"><strong style="font-size:18px">${escapeHtml(heading)}</strong><div style="font-size:12px;color:#aaa;margin-top:4px">Sent from the Skyland Construction website</div></div>
<div style="padding:22px"><table style="border-collapse:collapse;width:100%;font-size:14px">${rowHtml}</table>${bodyHtml}
<p style="margin-top:24px;font-size:12px;color:#888">Reply to this email to respond directly to the sender.</p></div></div>`;
}

export function renderText(heading: string, rows: [string, string][], body?: { label: string; text: string }) {
  return [heading, "", ...rows.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`), ...(body ? ["", `${body.label}:`, body.text] : [])].join("\n");
}
