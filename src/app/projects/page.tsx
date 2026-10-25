import type { Metadata } from "next";

import { CtaBand } from "@/components/sections/about-page/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { ProjectGallery } from "@/components/sections/projects/project-gallery";
import { Testimonials } from "@/components/sections/testimonials/testimonials";
import { VideoReel } from "@/components/sections/videos/video-reel";
import { Reveal } from "@/components/ui/reveal";
import { projectCategories, projectImages, type ProjectCategory } from "@/config/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse Skyland Construction's recent work in Saskatoon — suspended ceilings, drywall, steel stud framing and renovations for commercial and residential clients.",
};

const categoryDescriptions: Record<ProjectCategory, string> = {
  "Suspended Ceiling": "T-bar and suspended ceiling systems, bulkheads and feature ceilings.",
  Renovations: "Kitchens, suites and complete interior renovations.",
  Drywall: "Boarding, taping and finishing — including curved walls and vaulted ceilings.",
  "Steel Frame": "Interior and exterior steel stud framing for commercial builds.",
};

export default function ProjectsPage() {
  const counts = projectCategories.map((category) => ({
    category,
    count: projectImages.filter((image) => image.category === category).length,
  }));

  return (
    <main className="flex flex-1 flex-col">
      <PageHero title="Our Projects" image="/images/about-gallery/06-warehouse-interior-build-out.jpg" />

      {/* Intro + categories */}
      <section className="overflow-x-clip bg-white px-[30px] pt-20 pb-16 md:pt-24 lg:px-0">
        <div className="mx-auto max-w-[1170px]">
          <Reveal animation="fade-in-up" className="mx-auto max-w-[720px] text-center">
            <p className="text-[13px] leading-5 font-bold tracking-[0.3em] text-brand uppercase">Our portfolio</p>
            <h2 className="mt-2 font-heading text-[30px] leading-[40px] font-semibold text-black md:text-[40px] md:leading-[52px]">
              Quality Work Across Saskatoon
            </h2>
            <span aria-hidden="true" className="mx-auto mt-5 block h-[3px] w-14 bg-accent" />
            <p className="mt-5 text-[16px] leading-[28px] text-[#555]">
              From commercial fit-outs for retail, medical, food service and corporate clients to home renovations,
              every project here was completed by our own crews. Browse by service or open any photo for a closer
              look.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {counts.map(({ category, count }, i) => (
              <li key={category}>
                <Reveal animation="fade-in-up" delay={i * 120} className="h-full">
                  <div className="group relative h-full overflow-hidden border border-[#eee] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_20px_45px_rgba(0,0,0,0.1)]">
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100"
                    />
                    <p className="font-heading text-[40px] leading-none font-semibold text-accent">
                      {String(count).padStart(2, "0")}
                    </p>
                    <h3 className="mt-4 font-heading text-[18px] leading-6 font-semibold text-ink">{category}</h3>
                    <p className="mt-2 text-[14px] leading-6 text-[#666]">{categoryDescriptions[category]}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Full gallery */}
      <section
        aria-labelledby="gallery-heading"
        className="overflow-x-clip bg-[#f5f5f5] px-[30px] py-20 md:py-24 lg:px-0"
      >
        <div className="mx-auto max-w-[1170px]">
          <Reveal animation="fade-in-up" className="mb-10 text-center">
            <h2
              id="gallery-heading"
              className="font-heading text-[28px] leading-[38px] font-semibold text-black md:text-[34px] md:leading-[46px]"
            >
              Project Gallery
            </h2>
            <p className="mt-2 text-[15px] text-[#666]">
              {projectImages.length} photos from our job sites — tap any photo to enlarge.
            </p>
          </Reveal>
          <ProjectGallery categories={projectCategories} images={projectImages} variant="full" />
        </div>
      </section>

      <VideoReel tone="dark" />
      <Testimonials />
      <CtaBand />
    </main>
  );
}
