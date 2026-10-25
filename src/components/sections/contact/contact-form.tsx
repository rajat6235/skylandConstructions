"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";

import { CheckIcon, ChevronRightIcon, PaperPlaneIcon } from "@/components/icons";
import { FieldShell, inputClass } from "@/components/ui/form-field";
import { siteConfig } from "@/config/site";
import { MESSAGE_MAX, validateContact, type ContactValues, type FieldErrors } from "@/lib/forms";
import { cn } from "@/lib/utils";

type Field = keyof ContactValues;

const EMPTY: ContactValues = { name: "", email: "", phone: "", service: "", message: "" };
const FIELD_ORDER: Field[] = ["name", "email", "phone", "service", "message"];
const PHONE_DISPLAY = siteConfig.contact.phoneDisplay;

type ContactFormProps = {
  services: readonly string[];
};

export function ContactForm({ services }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [honeypot, setHoneypot] = useState("");
  const [serverErrors, setServerErrors] = useState<FieldErrors<Field>>({});
  const [failure, setFailure] = useState<string | null>(null);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const errors = { ...serverErrors, ...validateContact(values) };
  const showError = (field: Field) => (touched[field] || submitted ? errors[field] : undefined);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setServerErrors((current) => ({ ...current, [name]: undefined }));
  };
  const onBlur = (field: Field) => () => setTouched((current) => ({ ...current, [field]: true }));

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    const firstInvalid = FIELD_ORDER.find((field) => errors[field]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    setFailure(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company: honeypot }),
      });
      const result = (await response.json().catch(() => ({}))) as { errors?: FieldErrors<Field>; error?: string };
      if (response.ok) {
        setStatus("success");
        return;
      }
      if (result.errors) setServerErrors(result.errors);
      setFailure(result.error ?? "Please check the highlighted fields and try again.");
    } catch {
      setFailure("We couldn't reach the server. Please check your connection and try again.");
    }
    setStatus("idle");
  };

  const reset = () => {
    setValues(EMPTY);
    setServerErrors({});
    setFailure(null);
    setTouched({});
    setSubmitted(false);
    setStatus("idle");
  };

  if (status === "success") {
    return (
      <div role="status" className="flex min-h-[420px] flex-col items-center justify-center text-center motion-safe:animate-[rise_0.6s_ease-out]">
        <span className="flex size-20 items-center justify-center rounded-full bg-brand/10 motion-safe:animate-[pop_0.5s_ease-out_0.1s_both]">
          <span className="flex size-14 items-center justify-center rounded-full bg-brand text-white">
            <CheckIcon className="h-6" />
          </span>
        </span>
        <h3 className="mt-6 font-heading text-[24px] leading-8 font-semibold text-ink">
          Thanks, {values.name.trim().split(" ")[0]}!
        </h3>
        <p className="mt-2 max-w-[360px] text-[15px] leading-[26px] text-[#555]">
          We&apos;ve received your message and will get back to you as soon as possible.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-7 border-2 border-ink px-6 py-2.5 text-[13px] leading-[22px] font-bold text-ink uppercase transition-colors hover:bg-ink hover:text-white"
        >
          Send another message
        </button>
      </div>
    );
  }

  const describedBy = (field: Field) => (showError(field) ? `contact-${field}-error` : undefined);

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
      {/* Honeypot for bots; hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />
      </div>
      {failure && (
        <div role="alert" className="border-l-4 border-[#d93025] bg-[#fdecea] px-4 py-3 text-[14px] leading-6 text-[#8a1c13] sm:col-span-2">
          {failure} You can also call us at{" "}
          <a href={`tel:${siteConfig.contact.phone}`} className="font-bold underline">
            {PHONE_DISPLAY}
          </a>
          .
        </div>
      )}
      <FieldShell id="contact-name" label="Full name" error={showError("name")}>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder=" "
          value={values.name}
          onChange={onChange}
          onBlur={onBlur("name")}
          aria-invalid={Boolean(showError("name"))}
          aria-describedby={describedBy("name")}
          className={inputClass(Boolean(showError("name")))}
        />
      </FieldShell>

      <FieldShell id="contact-email" label="Email address" error={showError("email")}>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder=" "
          value={values.email}
          onChange={onChange}
          onBlur={onBlur("email")}
          aria-invalid={Boolean(showError("email"))}
          aria-describedby={describedBy("email")}
          className={inputClass(Boolean(showError("email")))}
        />
      </FieldShell>

      <FieldShell id="contact-phone" label="Phone" optional error={showError("phone")}>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder=" "
          value={values.phone}
          onChange={onChange}
          onBlur={onBlur("phone")}
          aria-invalid={Boolean(showError("phone"))}
          aria-describedby={describedBy("phone")}
          className={inputClass(Boolean(showError("phone")))}
        />
      </FieldShell>

      <div className="relative">
        <label htmlFor="contact-service" className="sr-only">
          Service needed
        </label>
        <select
          id="contact-service"
          name="service"
          value={values.service}
          onChange={onChange}
          className={cn(
            "block h-[54px] w-full cursor-pointer appearance-none border border-[#e2e2e2] bg-[#f7f7f7] px-4 text-[15px] transition-[border-color,background-color,box-shadow] duration-200 outline-none hover:border-[#c8c8c8] focus:border-brand focus:bg-white focus:shadow-[0_0_0_3px_rgba(6,174,196,0.15)]",
            "pr-10",
            values.service ? "text-ink" : "text-[#888]",
          )}
        >
          <option value="">Service needed (optional)</option>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>
        <ChevronRightIcon
          aria-hidden="true"
          className="pointer-events-none absolute top-[21px] right-4 h-3 rotate-90 text-[#888]"
        />
      </div>

      <FieldShell id="contact-message" label="Tell us about your project" error={showError("message")} className="sm:col-span-2">
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder=" "
          maxLength={MESSAGE_MAX + 200}
          value={values.message}
          onChange={onChange}
          onBlur={onBlur("message")}
          aria-invalid={Boolean(showError("message"))}
          aria-describedby={describedBy("message")}
          className={cn(inputClass(Boolean(showError("message"))), "resize-y pt-[26px]")}
        />
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute right-3 bottom-2 text-[11px]",
            values.message.length > MESSAGE_MAX ? "text-[#d93025]" : "text-[#aaa]",
            showError("message") && "bottom-9",
          )}
        >
          {values.message.length}/{MESSAGE_MAX}
        </span>
      </FieldShell>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] leading-5 text-[#888]">We’ll only use your details to respond to your enquiry.</p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex items-center justify-center gap-3 border-2 border-brand bg-brand px-7 py-3 text-[14px] leading-[22px] font-bold text-white uppercase transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-ink hover:bg-ink disabled:pointer-events-none disabled:opacity-80"
        >
          {status === "submitting" ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Sending…
            </>
          ) : (
            <>
              Send Message
              <PaperPlaneIcon className="h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
