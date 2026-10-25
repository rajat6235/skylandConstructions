"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";

import {
  BriefcaseIcon,
  CheckIcon,
  ChevronRightIcon,
  CloseIcon,
  MapPinIcon,
  PaperPlaneIcon,
  SearchIcon,
  UploadIcon,
} from "@/components/icons";
import { FieldShell, inputClass } from "@/components/ui/form-field";
import { Reveal } from "@/components/ui/reveal";
import type { Job } from "@/config/careers";
import { siteConfig } from "@/config/site";
import { RESUME_MAX_MB, validateApplication, type ApplicationValues, type FieldErrors } from "@/lib/forms";
import { cn } from "@/lib/utils";

const GENERAL = "General application";
type Values = ApplicationValues;
type Field = keyof Values | "resume";

type CareersBoardProps = {
  jobs: Job[];
  jobTypes: readonly string[];
  email: string;
};

export function CareersBoard({ jobs, jobTypes, email }: CareersBoardProps) {
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("");
  const [expanded, setExpanded] = useState<string | null>(jobs[0]?.slug ?? null);

  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState<Values>({ name: "", email: "", phone: "", position: "", experience: "" });
  const [resume, setResume] = useState<File | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [serverErrors, setServerErrors] = useState<FieldErrors<Field>>({});
  const [failure, setFailure] = useState<string | null>(null);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const query = keyword.trim().toLowerCase();
  const results = jobs.filter(
    (job) =>
      (!type || job.type === type) &&
      (!query || [job.title, job.summary, ...job.skills, ...job.details].join(" ").toLowerCase().includes(query)),
  );

  const errors = {
    ...serverErrors,
    ...validateApplication(values, resume && { name: resume.name, size: resume.size, type: resume.type }),
  };
  const showError = (field: Field) => (touched[field] || submitted ? errors[field] : undefined);
  const describedBy = (field: Field) => (showError(field) ? `apply-${field}-error` : undefined);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setServerErrors((current) => ({ ...current, [name]: undefined }));
  };
  const onBlur = (field: Field) => () => setTouched((current) => ({ ...current, [field]: true }));

  const applyFor = (position: string) => {
    setValues((current) => ({ ...current, position }));
    setStatus("idle");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("apply")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    window.setTimeout(() => formRef.current?.querySelector<HTMLElement>('[name="name"]')?.focus({ preventScroll: true }), 600);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    const order: Field[] = ["name", "email", "phone", "position", "resume"];
    const firstInvalid = order.find((field) => errors[field]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setStatus("submitting");
    setFailure(null);
    const body = new FormData();
    for (const [key, value] of Object.entries(values)) body.append(key, value);
    body.append("company", honeypot);
    if (resume) body.append("resume", resume);
    try {
      const response = await fetch("/api/apply", { method: "POST", body });
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

  const resetForm = () => {
    setValues({ name: "", email: "", phone: "", position: "", experience: "" });
    setResume(null);
    setServerErrors({});
    setFailure(null);
    setTouched({});
    setSubmitted(false);
    setStatus("idle");
  };

  return (
    <>
      {/* Open positions */}
      <section aria-labelledby="positions-heading" className="overflow-x-clip bg-[#f5f5f5] px-[30px] py-20 md:py-24 lg:px-0">
        <div className="mx-auto max-w-[1000px]">
          <Reveal animation="fade-in-up" className="text-center">
            <p className="text-[13px] leading-5 font-bold tracking-[0.3em] text-brand uppercase">Now hiring</p>
            <h2
              id="positions-heading"
              className="mt-2 font-heading text-[30px] leading-[40px] font-semibold text-black md:text-[40px] md:leading-[52px]"
            >
              Open Positions
            </h2>
            <span aria-hidden="true" className="mx-auto mt-5 block h-[3px] w-14 bg-accent" />
          </Reveal>

          <Reveal animation="fade-in-up" className="mt-10">
            <form
              role="search"
              onSubmit={(event) => event.preventDefault()}
              className="grid gap-3 bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.06)] sm:grid-cols-[1fr_200px] sm:p-5"
            >
              <label className="relative block">
                <span className="sr-only">Search jobs by keyword</span>
                <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[#999]" />
                <input
                  type="search"
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                  placeholder="Search by keyword, e.g. framing"
                  className="h-12 w-full border border-[#e2e2e2] bg-[#f7f7f7] pr-4 pl-11 text-[15px] text-ink outline-none transition-colors placeholder:text-[#999] focus:border-brand focus:bg-white"
                />
              </label>
              <label className="relative block">
                <span className="sr-only">Filter by job type</span>
                <select
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                  className={cn(
                    "h-12 w-full cursor-pointer appearance-none border border-[#e2e2e2] bg-[#f7f7f7] pr-10 pl-4 text-[15px] outline-none transition-colors focus:border-brand focus:bg-white",
                    type ? "text-ink" : "text-[#888]",
                  )}
                >
                  <option value="">All job types</option>
                  {jobTypes.map((jobType) => (
                    <option key={jobType} value={jobType}>
                      {jobType}
                    </option>
                  ))}
                </select>
                <ChevronRightIcon className="pointer-events-none absolute top-1/2 right-4 h-3 -translate-y-1/2 rotate-90 text-[#888]" />
              </label>
            </form>
          </Reveal>

          <p aria-live="polite" className="mt-6 text-[14px] text-[#777]">
            {results.length} open position{results.length === 1 ? "" : "s"}
          </p>

          <ul className="mt-3 space-y-5">
            {results.map((job) => {
              const isOpen = expanded === job.slug;
              return (
                <li key={job.slug}>
                  <article className="group overflow-hidden border border-[#e8e8e8] bg-white transition-shadow duration-300 hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)]">
                    <div className="relative flex flex-col gap-5 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
                      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-brand" />
                      <div>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1.5 bg-brand/10 px-2.5 py-1 text-[12px] font-bold text-brand">
                            <BriefcaseIcon className="size-3" />
                            {job.type}
                          </span>
                          <span className="inline-flex items-center gap-1.5 bg-[#f2f2f2] px-2.5 py-1 text-[12px] font-bold text-[#555]">
                            <MapPinIcon className="h-3 w-2.5" />
                            {job.location}
                          </span>
                        </div>
                        <h3 className="mt-3 font-heading text-[20px] leading-7 font-semibold text-ink sm:text-[24px] sm:leading-8">
                          {job.title}
                        </h3>
                        <p className="mt-1 text-[14px] text-[#777]">Skyland Enterprises</p>
                      </div>
                      <div className="flex shrink-0 gap-3 max-sm:[&>button]:flex-1">
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={`job-${job.slug}`}
                          onClick={() => setExpanded(isOpen ? null : job.slug)}
                          className="inline-flex items-center justify-center gap-2 border-2 border-[#ddd] px-4 py-2.5 text-[13px] font-bold whitespace-nowrap text-ink uppercase transition-colors hover:border-ink sm:px-5"
                        >
                          {isOpen ? "Hide details" : "View details"}
                          <ChevronRightIcon className={cn("h-2.5 transition-transform duration-300", isOpen ? "-rotate-90" : "rotate-90")} />
                        </button>
                        <button
                          type="button"
                          onClick={() => applyFor(job.title)}
                          className="border-2 border-brand bg-brand px-4 py-2.5 text-[13px] font-bold whitespace-nowrap text-white uppercase transition-colors hover:border-ink hover:bg-ink sm:px-6"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>

                    <div
                      id={`job-${job.slug}`}
                      className={cn("grid transition-[grid-template-rows] duration-500 ease-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
                    >
                      <div className="overflow-hidden" inert={!isOpen}>
                        <div className="border-t border-[#eee] px-6 py-7 sm:px-8">
                          <h4 className="text-[13px] font-bold tracking-[0.15em] text-ink uppercase">Job brief</h4>
                          <p className="mt-3 max-w-[720px] text-[15px] leading-[27px] text-[#555]">{job.summary}</p>
                          <div className="mt-6 grid gap-8 md:grid-cols-2">
                            <div>
                              <h4 className="text-[13px] font-bold tracking-[0.15em] text-ink uppercase">Knowledge required</h4>
                              <ul className="mt-3 flex flex-wrap gap-2">
                                {job.skills.map((skill) => (
                                  <li key={skill} className="border border-[#e5e5e5] px-3 py-1.5 text-[13px] font-bold text-[#444]">
                                    {skill}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-[13px] font-bold tracking-[0.15em] text-ink uppercase">Good to know</h4>
                              <ul className="mt-3 space-y-2">
                                {job.details.map((detail) => (
                                  <li key={detail} className="flex items-start gap-2.5 text-[15px] leading-6 text-[#555]">
                                    <CheckIcon className="mt-1.5 h-3 shrink-0 text-brand" />
                                    {detail}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>

          {results.length === 0 && (
            <div className="mt-3 border border-dashed border-[#ccc] bg-white px-6 py-12 text-center">
              <p className="font-heading text-[18px] font-semibold text-ink">No positions match your search.</p>
              <button
                type="button"
                onClick={() => {
                  setKeyword("");
                  setType("");
                }}
                className="mt-3 text-[14px] font-bold text-brand hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}

          <Reveal animation="fade-in-up" className="mt-8 flex flex-col items-center justify-between gap-4 bg-ink px-6 py-6 text-center text-white sm:flex-row sm:px-8 sm:text-left">
            <div>
              <p className="font-heading text-[18px] leading-7 font-semibold">Don&apos;t see the right role?</p>
              <p className="text-[14px] text-white/70">We&apos;re always happy to hear from skilled tradespeople.</p>
            </div>
            <button
              type="button"
              onClick={() => applyFor(GENERAL)}
              className="shrink-0 border-2 border-white px-6 py-2.5 text-[13px] font-bold uppercase transition-colors hover:bg-white hover:text-ink"
            >
              Send a General Application
            </button>
          </Reveal>
        </div>
      </section>

      {/* Application form */}
      <section id="apply" aria-labelledby="apply-heading" className="scroll-mt-4 overflow-x-clip bg-white px-[30px] py-20 md:py-24 lg:px-0">
        <div className="mx-auto max-w-[820px]">
          <Reveal animation="fade-in-up" className="text-center">
            <p className="text-[13px] leading-5 font-bold tracking-[0.3em] text-brand uppercase">Apply</p>
            <h2
              id="apply-heading"
              className="mt-2 font-heading text-[30px] leading-[40px] font-semibold text-black md:text-[40px] md:leading-[52px]"
            >
              Start Your Application
            </h2>
            <span aria-hidden="true" className="mx-auto mt-5 block h-[3px] w-14 bg-accent" />
            <p className="mt-5 text-[16px] leading-[28px] text-[#555]">
              Fill in your details below, or email your résumé to{" "}
              <a href={`mailto:${email}?subject=${encodeURIComponent("Job application")}`} className="font-bold text-brand hover:underline">
                {email}
              </a>
              .
            </p>
          </Reveal>

          <Reveal animation="fade-in-up" className="mt-10 border border-[#eee] bg-white p-6 shadow-[0_25px_60px_rgba(0,0,0,0.08)] sm:p-10">
            {status === "success" ? (
              <div role="status" className="flex flex-col items-center py-10 text-center motion-safe:animate-[rise_0.6s_ease-out]">
                <span className="flex size-20 items-center justify-center rounded-full bg-brand/10 motion-safe:animate-[pop_0.5s_ease-out_0.1s_both]">
                  <span className="flex size-14 items-center justify-center rounded-full bg-brand text-white">
                    <CheckIcon className="h-6" />
                  </span>
                </span>
                <h3 className="mt-6 font-heading text-[24px] leading-8 font-semibold text-ink">
                  Thanks for applying, {values.name.trim().split(" ")[0]}!
                </h3>
                <p className="mt-2 max-w-[380px] text-[15px] leading-[26px] text-[#555]">
                  We&apos;ve received your application for <strong>{values.position}</strong> and will be in touch.
                </p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-7 border-2 border-ink px-6 py-2.5 text-[13px] font-bold text-ink uppercase transition-colors hover:bg-ink hover:text-white"
                >
                  Submit another application
                </button>
              </div>
            ) : (
              <form ref={formRef} noValidate onSubmit={onSubmit} className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
                {/* Honeypot for bots; hidden from people and assistive tech. */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label htmlFor="apply-company">Company</label>
                  <input id="apply-company" name="company" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />
                </div>
                {failure && (
                  <div role="alert" className="border-l-4 border-[#d93025] bg-[#fdecea] px-4 py-3 text-[14px] leading-6 text-[#8a1c13] sm:col-span-2">
                    {failure} You can also email your résumé to{" "}
                    <a href={`mailto:${email}`} className="font-bold underline">
                      {email}
                    </a>{" "}
                    or call{" "}
                    <a href={`tel:${siteConfig.contact.phone}`} className="font-bold underline">
                      {siteConfig.contact.phoneDisplay}
                    </a>
                    .
                  </div>
                )}
                <FieldShell id="apply-name" label="Full name" error={showError("name")}>
                  <input id="apply-name" name="name" type="text" autoComplete="name" placeholder=" " value={values.name} onChange={onChange} onBlur={onBlur("name")} aria-invalid={Boolean(showError("name"))} aria-describedby={describedBy("name")} className={inputClass(Boolean(showError("name")))} />
                </FieldShell>
                <FieldShell id="apply-email" label="Email address" error={showError("email")}>
                  <input id="apply-email" name="email" type="email" autoComplete="email" placeholder=" " value={values.email} onChange={onChange} onBlur={onBlur("email")} aria-invalid={Boolean(showError("email"))} aria-describedby={describedBy("email")} className={inputClass(Boolean(showError("email")))} />
                </FieldShell>
                <FieldShell id="apply-phone" label="Phone" error={showError("phone")}>
                  <input id="apply-phone" name="phone" type="tel" autoComplete="tel" placeholder=" " value={values.phone} onChange={onChange} onBlur={onBlur("phone")} aria-invalid={Boolean(showError("phone"))} aria-describedby={describedBy("phone")} className={inputClass(Boolean(showError("phone")))} />
                </FieldShell>
                <div className="relative">
                  <label htmlFor="apply-position" className="sr-only">
                    Position
                  </label>
                  <select
                    id="apply-position"
                    name="position"
                    value={values.position}
                    onChange={onChange}
                    onBlur={onBlur("position")}
                    aria-invalid={Boolean(showError("position"))}
                    aria-describedby={describedBy("position")}
                    className={cn(
                      "block h-[54px] w-full cursor-pointer appearance-none border bg-[#f7f7f7] pr-10 pl-4 text-[15px] outline-none transition-colors focus:bg-white",
                      showError("position") ? "border-[#d93025]" : "border-[#e2e2e2] hover:border-[#c8c8c8] focus:border-brand",
                      values.position ? "text-ink" : "text-[#888]",
                    )}
                  >
                    <option value="">Position you&apos;re applying for</option>
                    {jobs.map((job) => (
                      <option key={job.slug} value={job.title}>
                        {job.title}
                      </option>
                    ))}
                    <option value={GENERAL}>{GENERAL}</option>
                  </select>
                  <ChevronRightIcon className="pointer-events-none absolute top-[21px] right-4 h-3 rotate-90 text-[#888]" />
                  <p id="apply-position-error" aria-live="polite" className={cn("overflow-hidden text-[13px] leading-5 text-[#d93025] transition-all duration-200", showError("position") ? "mt-1.5 max-h-10 opacity-100" : "max-h-0 opacity-0")}>
                    {showError("position")}
                  </p>
                </div>

                <FieldShell id="apply-experience" label="Tell us about your experience" optional className="sm:col-span-2">
                  <textarea id="apply-experience" name="experience" rows={4} placeholder=" " value={values.experience} onChange={onChange} className={cn(inputClass(false), "resize-y pt-[26px]")} />
                </FieldShell>

                <div className="sm:col-span-2">
                  <input
                    ref={fileRef}
                    id="apply-resume"
                    name="resume"
                    type="file"
                    accept="application/pdf,.pdf"
                    className="sr-only"
                    aria-describedby="apply-resume-help apply-resume-error"
                    onChange={(event) => {
                      setResume(event.target.files?.[0] ?? null);
                      setServerErrors((current) => ({ ...current, resume: undefined }));
                      setTouched((current) => ({ ...current, resume: true }));
                    }}
                  />
                  {resume ? (
                    <div className={cn("flex items-center justify-between gap-4 border bg-[#f7f7f7] px-4 py-3.5", showError("resume") ? "border-[#d93025]" : "border-brand")}>
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="flex size-9 shrink-0 items-center justify-center bg-brand text-[11px] font-bold text-white uppercase">
                          PDF
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-[14px] font-bold text-ink">{resume.name}</span>
                          <span className="block text-[12px] text-[#888]">{(resume.size / 1024 / 1024).toFixed(2)} MB</span>
                        </span>
                      </span>
                      <button
                        type="button"
                        aria-label="Remove résumé"
                        onClick={() => {
                          setResume(null);
                          if (fileRef.current) fileRef.current.value = "";
                        }}
                        className="flex size-8 shrink-0 items-center justify-center text-[#888] transition-colors hover:text-[#d93025]"
                      >
                        <CloseIcon className="h-4" />
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="apply-resume"
                      className="flex cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed border-[#d5d5d5] bg-[#fafafa] px-4 py-7 text-center transition-colors hover:border-brand hover:bg-brand/5 has-[:focus-visible]:border-brand"
                    >
                      <UploadIcon className="size-6 text-brand" />
                      <span className="text-[15px] font-bold text-ink">
                        Upload your résumé <span className="font-normal text-[#999]">(optional)</span>
                      </span>
                      <span id="apply-resume-help" className="text-[13px] text-[#888]">
                        PDF only, up to {RESUME_MAX_MB} MB
                      </span>
                    </label>
                  )}
                  <p id="apply-resume-error" aria-live="polite" className={cn("overflow-hidden text-[13px] leading-5 text-[#d93025] transition-all duration-200", showError("resume") ? "mt-1.5 max-h-10 opacity-100" : "max-h-0 opacity-0")}>
                    {showError("resume")}
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[13px] leading-5 text-[#888]">We&apos;ll only use your details to review your application.</p>
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
                        Submit Application
                        <PaperPlaneIcon className="h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
