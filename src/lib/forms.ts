/** Validation shared by the forms (in the browser) and the API routes (on the server). */

export type FieldErrors<T extends string> = Partial<Record<T, string>>;

export const MESSAGE_MAX = 1000;
export const EXPERIENCE_MAX = 2000;
/** Résumés are emailed as attachments, so keep them small. */
export const RESUME_MAX_MB = 3;
export const RESUME_MAX_BYTES = RESUME_MAX_MB * 1024 * 1024;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_CHARS = /^[+()\-.\s\d]+$/;

const validPhone = (phone: string) => PHONE_CHARS.test(phone) && phone.replace(/\D/g, "").length >= 10;

function validateName(name: string) {
  if (!name) return "Please enter your name.";
  if (name.length < 2) return "Name looks too short.";
  if (name.length > 100) return "Name looks too long.";
}

function validateEmail(email: string) {
  if (!email) return "Please enter your email address.";
  if (!EMAIL.test(email) || email.length > 200) return "Please enter a valid email address.";
}

export type ContactValues = { name: string; email: string; phone: string; service: string; message: string };

export function validateContact(values: ContactValues): FieldErrors<keyof ContactValues> {
  const errors: FieldErrors<keyof ContactValues> = {};
  const phone = values.phone.trim();
  const message = values.message.trim();

  errors.name = validateName(values.name.trim());
  errors.email = validateEmail(values.email.trim());
  if (phone && !validPhone(phone)) errors.phone = "Please enter a valid phone number, or leave it blank.";
  if (values.service.length > 100) errors.service = "Please choose a service from the list.";
  if (!message) errors.message = "Please tell us a little about your project.";
  else if (message.length < 10) errors.message = "Please add a few more details (at least 10 characters).";
  else if (message.length > MESSAGE_MAX) errors.message = `Please keep your message under ${MESSAGE_MAX} characters.`;

  return stripEmpty(errors);
}

export type ApplicationValues = { name: string; email: string; phone: string; position: string; experience: string };
export type ResumeInfo = { name: string; size: number; type: string };

export function validateApplication(
  values: ApplicationValues,
  resume: ResumeInfo | null,
): FieldErrors<keyof ApplicationValues | "resume"> {
  const errors: FieldErrors<keyof ApplicationValues | "resume"> = {};
  const phone = values.phone.trim();

  errors.name = validateName(values.name.trim());
  errors.email = validateEmail(values.email.trim());
  if (!phone) errors.phone = "Please enter a phone number we can reach you on.";
  else if (!validPhone(phone)) errors.phone = "Please enter a valid phone number.";
  if (!values.position) errors.position = "Please choose a position.";
  else if (values.position.length > 150) errors.position = "Please choose a position from the list.";
  if (values.experience.length > EXPERIENCE_MAX) {
    errors.experience = `Please keep this under ${EXPERIENCE_MAX} characters.`;
  }
  if (resume) {
    const isPdf = resume.name.toLowerCase().endsWith(".pdf") && (!resume.type || resume.type === "application/pdf");
    if (!isPdf) errors.resume = "Please upload your résumé as a PDF.";
    else if (resume.size > RESUME_MAX_BYTES) errors.resume = `Please keep your résumé under ${RESUME_MAX_MB} MB.`;
    else if (resume.size === 0) errors.resume = "That file looks empty — please choose another.";
  }

  return stripEmpty(errors);
}

function stripEmpty<T extends Record<string, string | undefined>>(errors: T): T {
  return Object.fromEntries(Object.entries(errors).filter(([, value]) => value)) as T;
}
