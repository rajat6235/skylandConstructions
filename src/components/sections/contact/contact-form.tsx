"use client";

import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";

import { CheckIcon, ChevronRightIcon, PaperPlaneIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type Values = { name: string; email: string; phone: string; service: string; message: string };
type Field = keyof Values;
type Errors = Partial<Record<Field, string>>;

const EMPTY: Values = { name: "", email: "", phone: "", service: "", message: "" };
const MESSAGE_MAX = 1000;
const FIELD_ORDER: Field[] = ["name", "email", "phone", "service", "message"];

function validate(values: Values): Errors {
  const errors: Errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();
  const message = values.message.trim();

  if (!name) errors.name = "Please enter your name.";
  else if (name.length < 2) errors.name = "Name looks too short.";

  if (!email) errors.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = "Please enter a valid email address.";

  if (phone && (!/^[+()\-.\s\d]+$/.test(phone) || phone.replace(/\D/g, "").length < 10)) {
    errors.phone = "Please enter a valid phone number, or leave it blank.";
  }

  if (!message) errors.message = "Please tell us a little about your project.";
  else if (message.length < 10) errors.message = "Please add a few more details (at least 10 characters).";
  else if (message.length > MESSAGE_MAX) errors.message = `Please keep your message under ${MESSAGE_MAX} characters.`;

  return errors;
}

type FieldShellProps = {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
  className?: string;
};

/** Wraps an input whose label floats up when the field is focused or filled. */
function FieldShell({ id, label, error, optional, children, className }: FieldShellProps) {
  return (
    <div className={cn("relative", className)}>
      {children}
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-[9px] left-4 origin-left text-[15px] text-[#888] transition-all duration-200 peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:font-bold peer-focus:tracking-wide peer-focus:text-brand peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:tracking-wide"
      >
        {label}
        {optional && <span className="font-normal text-[#aaa]"> (optional)</span>}
      </label>
      <p
        id={`${id}-error`}
        aria-live="polite"
        className={cn(
          "overflow-hidden text-[13px] leading-5 text-[#d93025] transition-all duration-200",
          error ? "mt-1.5 max-h-10 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        {error}
      </p>
    </div>
  );
}

const inputClass = (invalid: boolean) =>
  cn(
    "peer block w-full border bg-[#f7f7f7] px-4 pt-[22px] pb-2 text-[15px] text-ink transition-[border-color,background-color,box-shadow] duration-200 outline-none placeholder:text-transparent focus:bg-white focus:shadow-[0_0_0_3px_rgba(6,174,196,0.15)]",
    invalid ? "border-[#d93025] focus:border-[#d93025]" : "border-[#e2e2e2] hover:border-[#c8c8c8] focus:border-brand",
  );

type ContactFormProps = {
  services: readonly string[];
};

export function ContactForm({ services }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const errors = validate(values);
  const showError = (field: Field) => (touched[field] || submitted ? errors[field] : undefined);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
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
    // TODO: send `values` to the backend (API route, email service or CRM) once it's set up.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("success");
  };

  const reset = () => {
    setValues(EMPTY);
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
