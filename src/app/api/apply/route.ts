import { EmailConfigError, headerSafe, renderEmail, renderText, sendEmail } from "@/lib/email";
import { RESUME_MAX_BYTES, validateApplication, type ApplicationValues } from "@/lib/forms";
import { clientIp, isRateLimited } from "@/lib/rate-limit";

const str = (value: FormDataEntryValue | null) => (typeof value === "string" ? value.trim() : "");

export async function POST(request: Request) {
  if (isRateLimited(`apply:${clientIp(request)}`)) {
    return Response.json({ error: "Too many applications — please try again later." }, { status: 429 });
  }

  // Reject oversized uploads before reading the body.
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > RESUME_MAX_BYTES + 100_000) {
    return Response.json({ errors: { resume: "Your résumé is too large." } }, { status: 413 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (str(form.get("company"))) return Response.json({ ok: true });

  const values: ApplicationValues = {
    name: str(form.get("name")),
    email: str(form.get("email")),
    phone: str(form.get("phone")),
    position: str(form.get("position")),
    experience: str(form.get("experience")),
  };
  const file = form.get("resume");
  const resume = file instanceof File && file.size > 0 ? file : null;

  const errors = validateApplication(values, resume && { name: resume.name, size: resume.size, type: resume.type });
  let content: Buffer | null = null;
  if (resume && !errors.resume) {
    content = Buffer.from(await resume.arrayBuffer());
    // Check the file really is a PDF, not just named like one.
    if (content.subarray(0, 5).toString("latin1") !== "%PDF-") errors.resume = "Please upload a valid PDF file.";
  }
  if (Object.keys(errors).length > 0) return Response.json({ errors }, { status: 422 });

  const rows: [string, string][] = [
    ["Position", values.position],
    ["Name", values.name],
    ["Email", values.email],
    ["Phone", values.phone],
    ["Résumé", resume ? "Attached (PDF)" : "Not provided"],
  ];
  const body = values.experience ? { label: "Experience", text: values.experience } : undefined;
  const heading = `Job application: ${values.position}`;
  const safeName = values.name.replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "") || "applicant";

  try {
    await sendEmail({
      subject: headerSafe(`${heading} — ${values.name}`),
      html: renderEmail({ heading, rows, body }),
      text: renderText(heading, rows, body),
      replyTo: values.email,
      attachments: content ? [{ filename: `Resume-${safeName}.pdf`, content }] : undefined,
    });
  } catch (error) {
    console.error("[apply] email failed:", error instanceof EmailConfigError ? error.message : error);
    return Response.json({ error: "We couldn't send your application right now." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
