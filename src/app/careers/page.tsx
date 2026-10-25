import type { Metadata } from "next";

import { CheckIcon } from "@/components/icons";
import { StorySplit } from "@/components/sections/about-page/story-split";
import { CareersBoard } from "@/components/sections/careers/careers-board";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { jobTypes, jobs } from "@/config/careers";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Construction Jobs in Saskatoon | Skyland Careers",
  description:
    "Join Skyland Construction in Saskatoon. We're hiring drywall installers, steel framers and drywall helpers for commercial and residential projects.",
  path: "/careers",
  absoluteTitle: true,
});

const reasons = [
  { title: "Varied, Steady Work", text: "Commercial and residential projects across Saskatoon — no two jobs the same." },
  { title: "Pay That Reflects Your Skill", text: "Wages are based on your experience and qualifications." },
  { title: "Grow Your Trade", text: "Work across steel framing, drywall, taping and acoustic ceilings." },
  { title: "A Family-Owned Team", text: "Join a close-knit, family-owned company that values good work." },
];

export default function CareersPage() {
  const { contact } = siteConfig;
  const jobPostings = jobs.map((job) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title.replace(/ · /g, " / "),
    description: `<p>${job.summary}</p><ul>${[...job.skills.map((skill) => `Knowledge of ${skill.toLowerCase()}`), ...job.details].map((item) => `<li>${item}</li>`).join("")}</ul>`,
    datePosted: job.datePosted,
    validThrough: `${job.validThrough}T23:59:59-06:00`,
    employmentType: job.type === "Full Time" ? "FULL_TIME" : job.type === "Part Time" ? "PART_TIME" : "CONTRACTOR",
    directApply: true,
    url: absoluteUrl("/careers"),
    hiringOrganization: { "@type": "Organization", name: siteConfig.name, sameAs: siteConfig.url, logo: absoluteUrl(siteConfig.logo.src) },
    jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", ...contact.postal } },
    skills: job.skills.join(", "),
  }));

  return (
    <main className="flex flex-1 flex-col">
      <JsonLd data={jobPostings} />
      <PageHero title="Careers" path="/careers" image="/images/about-gallery/15-commercial-corridor-framing.jpeg" />

      <section className="overflow-x-clip bg-white px-[30px] py-20 md:py-24 lg:px-0">
        <div className="mx-auto max-w-[1170px]">
          <StorySplit
            eyebrow="Work with us"
            title="Join The Team"
            image={{
              src: "/images/about/skyland-branded-hard-hat.jpeg",
              alt: "Skyland Construction branded hard hat",
              aspect: "square",
              position: "50% 60%",
            }}
          >
            <p>Skilled hands build great spaces. If you take pride in quality work, we&apos;d love to hear from you.</p>
            <p>
              Our crews handle steel framing, drywall, taping and acoustic ceilings on commercial and residential projects
              across Saskatoon — and we&apos;re growing.
            </p>
          </StorySplit>
          <ul className="mt-16 grid gap-5 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
            {reasons.map((reason, i) => (
              <li key={reason.title}>
                <Reveal animation="fade-in-up" delay={i * 120} className="h-full">
                  <div className="group h-full border border-[#eee] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_20px_45px_rgba(0,0,0,0.1)]">
                    <span className="flex size-12 items-center justify-center rounded-full bg-brand/10 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                      <CheckIcon className="h-4" />
                    </span>
                    <h3 className="mt-5 font-heading text-[18px] leading-6 font-semibold text-ink">{reason.title}</h3>
                    <p className="mt-2 text-[14px] leading-6 text-[#666]">{reason.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CareersBoard jobs={jobs} jobTypes={jobTypes} email={siteConfig.contact.email} />
    </main>
  );
}
