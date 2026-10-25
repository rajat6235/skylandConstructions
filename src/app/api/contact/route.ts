import { EmailConfigError, headerSafe, renderEmail, renderText, sendEmail } from "@/lib/email";
import { validateContact, type ContactValues } from "@/lib/forms";
import { clientIp, isRateLimited } from "@/lib/rate-limit";

const str = (value: unknown) => (typeof value === "string" ? value.trim() : "");

export async function POST(request: Request) {
  if (isRateLimited(`contact:${clientIp(request)}`)) {
    return Response.json({ error: "Too many messages — please try again later or give us a call." }, { status: 429 });
  }

  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field, so pretend success for bots.
  if (str(data.company)) return Response.json({ ok: true });

  const values: ContactValues = {
    name: str(data.name),
    email: str(data.email),
    phone: str(data.phone),
    service: str(data.service),
    message: str(data.message),
  };
  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) return Response.json({ errors }, { status: 422 });

  const rows: [string, string][] = [
    ["Name", values.name],
    ["Email", values.email],
    ["Phone", values.phone],
    ["Service", values.service],
  ];
  const body = { label: "Message", text: values.message };
  const heading = values.service ? `New quote request: ${values.service}` : "New message from the website";

  try {
    await sendEmail({
      subject: headerSafe(`${heading} — ${values.name}`),
      html: renderEmail({ heading, rows, body }),
      text: renderText(heading, rows, body),
      replyTo: values.email,
    });
  } catch (error) {
    console.error("[contact] email failed:", error instanceof EmailConfigError ? error.message : error);
    return Response.json({ error: "We couldn't send your message right now." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
