import Image from "next/image";
import Link from "next/link";

import { CheckIcon } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import type { Service } from "@/config/services";
import { cn } from "@/lib/utils";

type ServiceDetailProps = {
  service: Service;
  index: number;
  reverse?: boolean;
};

/** One service with its job-site photos, description and scope. */
export function ServiceDetail({ service, index, reverse = false }: ServiceDetailProps) {
  const [main, inset] = service.photos ?? [];
  if (!main) return null;

  return (
    <article
      id={service.slug}
      className="mx-auto grid max-w-[1170px] scroll-mt-8 items-center gap-12 lg:grid-cols-2 lg:gap-20"
    >
      <Reveal
        animation={reverse ? "fade-in-right" : "fade-in-left"}
        className={cn("relative pb-12 sm:pb-16", reverse ? "lg:order-2 lg:pl-10" : "lg:pr-10")}
      >
        <div className="group relative aspect-[4/3] overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.15)]">
          <Image
            src={main.src}
            alt={main.alt}
            fill
            sizes="(min-width: 1024px) 500px, 100vw"
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          />
        </div>
        {inset && (
          <div
            className={cn(
              "absolute bottom-0 aspect-square w-[42%] overflow-hidden border-[6px] border-white shadow-[0_20px_40px_rgba(0,0,0,0.2)]",
              reverse ? "left-0" : "right-0",
            )}
          >
            <Image src={inset.src} alt={inset.alt} fill sizes="(min-width: 1024px) 220px, 40vw" className="object-cover" />
          </div>
        )}
        <span
          aria-hidden="true"
          className={cn(
            "absolute -top-6 font-heading text-[80px] leading-none font-semibold text-accent/25 md:text-[110px]",
            reverse ? "right-0" : "left-0 lg:-left-6",
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </Reveal>

      <Reveal animation={reverse ? "fade-in-left" : "fade-in-right"} duration="slow" className={cn(reverse && "lg:order-1")}>
        <p className="text-[13px] leading-5 font-bold tracking-[0.3em] text-brand uppercase">Service {String(index + 1).padStart(2, "0")}</p>
        <h2 className="mt-2 font-heading text-[30px] leading-[40px] font-semibold text-black md:text-[38px] md:leading-[50px]">
          {service.title}
        </h2>
        <span aria-hidden="true" className="mt-5 block h-[3px] w-14 bg-accent" />
        <p className="mt-6 text-[16px] leading-[30px] text-[#555]">{service.description}</p>

        <h3 className="mt-8 text-[13px] font-bold tracking-[0.15em] text-ink uppercase">What&apos;s included</h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {service.includes.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[15px] leading-6 text-[#444]">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                <CheckIcon className="h-2.5" />
              </span>
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-9 flex flex-wrap gap-4">
          <Link
            href="/contact-us"
            className="inline-block border-2 border-brand bg-brand px-7 py-3 text-[14px] leading-[22px] font-bold text-white uppercase transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-ink hover:bg-ink"
          >
            Get a Quote
          </Link>
          <Link
            href="/projects"
            className="inline-block border-2 border-ink px-7 py-3 text-[14px] leading-[22px] font-bold text-ink uppercase transition-colors hover:bg-ink hover:text-white"
          >
            See Our Projects
          </Link>
        </div>
      </Reveal>
    </article>
  );
}
