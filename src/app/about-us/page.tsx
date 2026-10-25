import type { Metadata } from "next";

import { CheckIcon, StarIcon } from "@/components/icons";
import { CtaBand } from "@/components/sections/about-page/cta-band";
import { PhotoGallery } from "@/components/sections/about-page/photo-gallery";
import { StorySplit } from "@/components/sections/about-page/story-split";
import { PageHero } from "@/components/sections/page-hero";
import { JoinTeamBanner } from "@/components/sections/careers/join-team-banner";
import { Testimonials } from "@/components/sections/testimonials/testimonials";
import { VideoReel } from "@/components/sections/videos/video-reel";
import { Reveal } from "@/components/ui/reveal";
import { googleReviews } from "@/config/reviews";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Sky Land Enterprises is a family-owned commercial and residential construction company in Saskatoon, delivering quality work across retail, medical, food service and corporate projects.",
};

const stats = [
  { value: googleReviews.rating.toFixed(1), label: "Google rating", star: true },
  { value: String(googleReviews.count), label: "Five-star reviews" },
  { value: "Family", label: "Owned & operated" },
  { value: "Saskatoon", label: "Locally based" },
];

const responsibilities = [
  {
    title: "Planning & Coordination",
    text: "We plan, coordinate and execute every stage of your construction project from start to finish.",
  },
  {
    title: "Scheduling & Budgeting",
    text: "Your budget and timeline are top priorities at every stage — we manage both carefully.",
  },
  {
    title: "Resource Allocation",
    text: "The right crews, trades and materials, in the right place at the right time.",
  },
  {
    title: "Quality Control",
    text: "We maintain high standards throughout, inspecting work and addressing any issues or deficiencies.",
  },
];

const industries = ["Retail", "Medical & Dental", "Food Services", "Corporate Offices", "Residential"];

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHero title="About Us" image="/images/hero/architectural-house-exterior.jpg" />

      {/* Who we are */}
      <section className="overflow-x-clip bg-white px-[30px] py-20 md:py-28 lg:px-0">
        <StorySplit
          eyebrow="Who we are"
          title="Sky Land Enterprises"
          image={{
            src: "/images/about/skyland-office-2002-quebec-ave.jpeg",
            alt: "Skyland Construction office at 2002 Quebec Ave, Saskatoon",
            aspect: "square",
            position: "50% 55%",
          }}
        >
          <p>
            Sky Land Enterprises is responsible for planning, coordinating, and executing construction projects. This
            includes managing various aspects such as scheduling, budgeting, and resource allocation.
          </p>
          <p>
            We maintain high-quality construction standards throughout every project, including inspecting work and
            addressing any issues or deficiencies.
          </p>
        </StorySplit>
      </section>

      {/* Stats */}
      <section aria-label="At a glance" className="bg-accent px-[30px] py-10 lg:px-0">
        <ul className="mx-auto grid max-w-[1170px] grid-cols-2 gap-y-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <li key={stat.label} className="border-ink/15 text-center text-ink md:border-l md:first:border-l-0">
              <Reveal animation="fade-in-up" delay={i * 120}>
                <p className="flex items-center justify-center gap-2 font-heading text-[30px] leading-10 font-semibold md:text-[36px]">
                  {stat.value}
                  {stat.star && <StarIcon className="h-6 text-ink" />}
                </p>
                <p className="mt-1 text-[13px] font-bold tracking-[0.15em] uppercase">{stat.label}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* History */}
      <section className="overflow-x-clip bg-[#f7f7f7] px-[30px] py-20 md:py-28 lg:px-0">
        <StorySplit
          eyebrow="Our story"
          title="Our History"
          reverse
          image={{
            src: "/images/about/skyland-branded-hard-hat.jpeg",
            alt: "Skyland Construction branded hard hat on a job site",
            aspect: "square",
            position: "50% 60%",
          }}
        >
          <p>
            Sky Land Enterprises is a family-owned commercial and residential construction business. We have grown into
            one of the oldest and most trusted construction companies in Saskatoon.
          </p>
          <p>
            The numerous projects we&apos;ve completed across various industries such as retail, medical and dental
            practice, food services, corporate businesses, and more are a testament to our commitment to quality,
            excellence, and innovation.
          </p>
        </StorySplit>
      </section>

      {/* What we take care of */}
      <section aria-labelledby="services-heading" className="overflow-x-clip bg-white px-[30px] py-20 md:py-28 lg:px-0">
        <div className="mx-auto max-w-[1170px]">
          <Reveal animation="fade-in-up" className="mx-auto max-w-[640px] text-center">
            <p className="text-[13px] leading-5 font-bold tracking-[0.3em] text-brand uppercase">What we do</p>
            <h2 id="services-heading" className="mt-2 font-heading text-[30px] leading-[40px] font-semibold text-black md:text-[40px] md:leading-[52px]">
              We Take Care of Everything
            </h2>
            <span aria-hidden="true" className="mx-auto mt-5 block h-[3px] w-14 bg-accent" />
            <p className="mt-5 text-[16px] leading-[28px] text-[#555]">
              From the first plan to the final inspection, one team manages your project so you don&apos;t have to.
            </p>
          </Reveal>

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {responsibilities.map((item, i) => (
              <li key={item.title}>
                <Reveal animation="fade-in-up" delay={i * 150} className="h-full">
                  <article className="group relative h-full overflow-hidden border border-[#eee] bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:border-transparent hover:shadow-[0_25px_50px_rgba(0,0,0,0.12)]">
                    <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
                    <span className="font-heading text-[44px] leading-none font-semibold text-accent/40 transition-colors duration-500 group-hover:text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-5 font-heading text-[19px] leading-7 font-semibold text-ink">{item.title}</h3>
                    <p className="mt-3 text-[15px] leading-[26px] text-[#666]">{item.text}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal animation="fade-in-up" className="mt-16 flex flex-col items-center gap-5 text-center">
            <h3 className="font-heading text-[20px] leading-7 font-semibold text-ink">Industries We Serve</h3>
            <ul className="flex flex-wrap justify-center gap-3">
              {industries.map((industry) => (
                <li
                  key={industry}
                  className="flex items-center gap-2 border border-[#e5e5e5] bg-[#fafafa] px-5 py-2.5 text-[15px] font-bold text-ink transition-colors hover:border-brand hover:bg-brand hover:text-white"
                >
                  <CheckIcon className="h-3 text-brand transition-colors [li:hover>&]:text-white" />
                  {industry}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <PhotoGallery />
      <VideoReel />
      <Testimonials />
      <JoinTeamBanner />
      <CtaBand />
    </main>
  );
}
