import Image from "next/image";

import { MapPinIcon, PhoneIcon } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";

export function OfficeVisit() {
  const { contact, name } = siteConfig;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${name}, ${contact.address}`)}`;

  return (
    <section aria-labelledby="office-heading" className="overflow-x-clip bg-white px-[30px] py-20 md:py-24 lg:px-0">
      <div className="mx-auto grid max-w-[1170px] items-center gap-12 md:grid-cols-[5fr_7fr] lg:gap-20">
        <Reveal animation="fade-in-left" className="relative mx-auto w-full max-w-[420px] md:max-w-none">
          <div aria-hidden="true" className="absolute -top-4 -left-4 h-2/3 w-2/3 border-2 border-dashed border-accent" />
          <div className="group relative aspect-[4/5] overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.18)]">
            <Image
              src="/images/about/skyland-office-2002-quebec-ave.jpeg"
              alt={`${name} office building at ${contact.address}`}
              fill
              sizes="(min-width: 768px) 460px, 90vw"
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
            />
            <span className="absolute bottom-0 left-0 bg-brand px-4 py-2 text-[13px] font-bold tracking-wider text-white uppercase">
              {contact.building}
            </span>
          </div>
        </Reveal>

        <Reveal animation="fade-in-right" duration="slow">
          <p className="text-[13px] leading-5 font-bold tracking-[0.3em] text-brand uppercase">Our office</p>
          <h2
            id="office-heading"
            className="mt-2 font-heading text-[30px] leading-[40px] font-semibold text-black md:text-[40px] md:leading-[52px]"
          >
            Visit Us in Saskatoon
          </h2>
          <span aria-hidden="true" className="mt-5 block h-[3px] w-14 bg-accent" />
          <p className="mt-6 text-[16px] leading-[30px] text-[#555]">
            Prefer to talk in person? Drop by our office in the {contact.building} to discuss your project with our team.
          </p>

          <dl className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="flex gap-4">
              <MapPinIcon className="mt-1 h-5 w-4 shrink-0 text-brand" />
              <div>
                <dt className="text-[12px] font-bold tracking-wider text-[#999] uppercase">Address</dt>
                <dd className="mt-1 text-[15px] leading-6 text-ink">
                  {contact.building}
                  <br />
                  {contact.address}
                </dd>
              </div>
            </div>
            <div className="flex gap-4">
              <PhoneIcon className="mt-1 size-4 shrink-0 text-brand" />
              <div>
                <dt className="text-[12px] font-bold tracking-wider text-[#999] uppercase">Phone</dt>
                <dd className="mt-1 text-[15px] leading-6 text-ink">
                  <a href={`tel:${contact.phone}`} className="transition-colors hover:text-brand">
                    {contact.phoneDisplay}
                  </a>
                </dd>
              </div>
            </div>
          </dl>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-brand bg-brand px-7 py-3 text-[14px] leading-[22px] font-bold text-white uppercase transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-ink hover:bg-ink"
            >
              <MapPinIcon className="h-4 w-3" />
              Get Directions
            </a>
            <a
              href={`tel:${contact.phone}`}
              className="inline-flex items-center gap-2 border-2 border-ink px-7 py-3 text-[14px] leading-[22px] font-bold text-ink uppercase transition-colors hover:bg-ink hover:text-white"
            >
              <PhoneIcon className="size-3.5" />
              Call Us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
