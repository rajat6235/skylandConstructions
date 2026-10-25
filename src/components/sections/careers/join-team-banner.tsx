import Image from "next/image";
import Link from "next/link";

import { BriefcaseIcon, ChevronRightIcon } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { jobs } from "@/config/careers";

/** "Join our team" call-to-action used on the homepage and About page. */
export function JoinTeamBanner() {
  const openings = jobs.length;

  return (
    <section aria-labelledby="join-heading" className="relative isolate overflow-hidden bg-ink px-[30px] py-20 text-white md:py-24 lg:px-0">
      <Image
        src="/images/about-gallery/20-crew-framing-door-opening.jpeg"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[50%_40%]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/90 to-ink/40" />
      <div aria-hidden="true" className="absolute top-0 left-0 -z-10 h-full w-2 bg-accent" />

      <Reveal animation="fade-in-up" className="mx-auto max-w-[1170px]">
        <div className="max-w-[620px]">
          {openings > 0 && (
            <p className="inline-flex items-center gap-2.5 bg-accent px-3 py-1.5 text-[12px] font-bold tracking-[0.15em] text-ink uppercase">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full rounded-full bg-ink/60 motion-safe:animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-ink" />
              </span>
              Now hiring · {openings} open position{openings === 1 ? "" : "s"}
            </p>
          )}
          <h2 id="join-heading" className="mt-5 font-heading text-[32px] leading-[42px] font-semibold md:text-[46px] md:leading-[58px]">
            Build Your Career With Skyland
          </h2>
          <p className="mt-4 text-[16px] leading-[28px] text-white/80">
            We&apos;re looking for skilled steel framers, drywall installers and helpers to join our crews on commercial
            and residential projects across Saskatoon.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/careers"
              className="group inline-flex items-center gap-3 border-2 border-accent bg-accent px-7 py-3.5 text-[14px] leading-[22px] font-bold text-ink uppercase transition-[background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:bg-transparent hover:text-white"
            >
              <BriefcaseIcon className="size-4" />
              Join Our Team
              <ChevronRightIcon className="h-3 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/careers#apply" className="text-[14px] font-bold text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline">
              Send a general application
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
