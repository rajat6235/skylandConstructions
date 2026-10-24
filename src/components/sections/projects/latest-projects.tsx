import Link from "next/link";

import { Reveal } from "@/components/ui/reveal";
import { projectCategories, projectImages } from "@/config/projects";

import { ProjectGallery } from "./project-gallery";

export function LatestProjects() {
  return (
    <section
      id="projects"
      className="overflow-x-clip bg-ink px-[30px] pt-20 pb-20 text-white md:pt-0 lg:pb-[100px] lg:px-0"
    >
      <div className="mx-auto max-w-[1170px]">
        <div className="pb-[30px] md:pt-[100px] md:pb-10 lg:flex lg:items-center lg:pb-5">
          <Reveal animation="fade-in" duration="slow" className="lg:w-1/2">
            <h2 className="font-heading text-[30px] leading-[55px] font-semibold md:text-[40px]">Latest Projects</h2>
            <Reveal animation="fade-in-up">
              <div className="mt-5 py-0.5">
                <div className="h-[3px] w-[10%] bg-accent" />
              </div>
            </Reveal>
          </Reveal>
          <Reveal animation="fade-in-up" duration="slow" className="pt-5 lg:w-1/2 lg:pt-0 lg:text-right">
            <Link
              href="/projects"
              className="inline-block border-2 border-white bg-brand px-[30px] py-[15px] text-[14px] leading-[24px] font-bold uppercase transition-[transform,background-color,border-color] duration-300 hover:translate-y-2 hover:border-accent hover:bg-accent"
            >
              View All Projects
            </Link>
          </Reveal>
        </div>

        <Reveal animation="fade-in" duration="slow">
          <ProjectGallery categories={projectCategories} images={projectImages} />
        </Reveal>
      </div>
    </section>
  );
}
