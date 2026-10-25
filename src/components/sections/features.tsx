import Image from "next/image";
import Link from "next/link";

import { ChevronRightIcon } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";

const features = [
  {
    title: "Sustainable System",
    text: "Well-planned builds that make smart use of time and materials, so your project runs efficiently from day one.",
    icon: { src: "/images/home/feature-excavator.png", width: 173, height: 150 },
    link: { label: "How we work", href: "/services" },
  },
  {
    title: "Honest Service",
    text: "Clear quotes, straight answers and regular updates — your budget and timeline stay top priorities throughout.",
    icon: { src: "/images/home/feature-hard-hat.png", width: 178, height: 150 },
    link: { label: "About us", href: "/about-us" },
  },
  {
    title: "Remodeling Experts",
    text: "From kitchens and basement suites to full commercial fit-outs, we transform spaces of every size.",
    icon: { src: "/images/home/feature-crane.png", width: 150, height: 150 },
    link: { label: "See our projects", href: "/projects" },
  },
];

export function Features() {
  return (
    <section aria-labelledby="features-heading" className="relative isolate overflow-hidden bg-ink px-5 py-12 text-white sm:px-[30px] md:py-16 lg:px-0">
      {/* Subtle blueprint-style dot grid and a soft brand glow. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />
      <div aria-hidden="true" className="absolute -top-40 left-1/2 -z-10 size-[520px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />

      <div className="mx-auto max-w-[1170px]">
        <Reveal animation="fade-in-up" className="mx-auto max-w-[620px] text-center">
          <p className="text-[13px] leading-5 font-bold tracking-[0.3em] text-accent uppercase">Why choose Skyland</p>
          <h2 id="features-heading" className="mt-1.5 font-heading text-[26px] leading-[34px] font-semibold md:text-[32px] md:leading-[42px]">
            Built on Quality, Delivered with Care
          </h2>
        </Reveal>

        <ul className="mt-7 grid gap-3 sm:gap-4 md:mt-10 md:grid-cols-3 md:gap-5 lg:gap-6">
          {features.map((feature, i) => (
            <li key={feature.title}>
              <Reveal animation="fade-in-up" delay={150 * (i + 1)} className="h-full">
                <article className="group relative grid h-full grid-cols-[52px_1fr] gap-x-4 overflow-hidden border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm sm:grid-cols-[60px_1fr] sm:gap-x-5 sm:p-6 lg:p-7 transition-all duration-500 hover:-translate-y-2 hover:border-accent/60 hover:bg-white/[0.06] hover:shadow-[0_30px_60px_rgba(0,0,0,0.35)] lg:p-9">
                  <span
                    aria-hidden="true"
                    className="absolute top-4 right-5 hidden font-heading text-[44px] md:block leading-none font-semibold text-white/[0.05] transition-colors duration-500 group-hover:text-accent/15"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="relative row-span-3 flex size-[52px] items-center justify-center sm:size-[60px] border border-accent/30 bg-accent/10 transition-colors duration-500 group-hover:border-accent group-hover:bg-accent">
                    <span aria-hidden="true" className="absolute -top-px -left-px size-3 border-t-2 border-l-2 border-accent" />
                    <span aria-hidden="true" className="absolute -right-px -bottom-px size-3 border-r-2 border-b-2 border-accent" />
                    <Image
                      src={feature.icon.src}
                      alt=""
                      width={feature.icon.width}
                      height={feature.icon.height}
                      className="h-auto w-8 transition sm:w-9-[filter,transform] duration-500 group-hover:scale-110 group-hover:brightness-0"
                    />
                  </span>

                  <h3 className="font-heading text-[18px] leading-6 font-semibold md:pr-10 md:text-[19px] md:leading-7">{feature.title}</h3>
                  <p className="mt-1.5 flex-1 text-[14px] leading-6 text-white/65">{feature.text}</p>

                  <Link
                    href={feature.link.href}
                    className="mt-3 inline-flex items-center gap-2 self-start text-[13px] font-bold tracking-wider text-accent uppercase transition-colors after:absolute after:inset-0 hover:text-white"
                  >
                    {feature.link.label}
                    <ChevronRightIcon className="h-2.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
