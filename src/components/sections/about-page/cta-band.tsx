import Link from "next/link";

import { Reveal } from "@/components/ui/reveal";

export function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden bg-[#555555] px-[30px] py-14 text-white md:py-16 lg:px-0">
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 -z-10 w-1/2 origin-top-right -skew-x-12 bg-gradient-to-l from-brand/25 to-transparent"
      />
      <Reveal
        animation="fade-in-up"
        className="mx-auto flex max-w-[1170px] flex-col items-start gap-7 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h2 className="font-heading text-[26px] leading-[36px] font-semibold md:text-[34px] md:leading-[46px]">
            Looking for a reliable construction partner?
          </h2>
          <p className="mt-2 text-[16px] leading-[26px] text-white/75">
            Tell us about your project — we&apos;d love to help you bring it to life.
          </p>
        </div>
        <Link
          href="/contact-us"
          className="shrink-0 border-2 border-white px-8 py-3.5 text-[14px] leading-[22px] font-bold uppercase transition-[background-color,color,transform] duration-300 hover:-translate-y-1 hover:bg-white hover:text-ink"
        >
          Contact Us
        </Link>
      </Reveal>
    </section>
  );
}
