import Image from "next/image";

import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { SocialLinks } from "@/components/ui/social-links";
import { siteConfig } from "@/config/site";

import { ContactForm } from "./contact-form";

type ContactSectionProps = {
  /** Heading level for the section title; use "h1" when the section is the page's main content. */
  headingLevel?: "h1" | "h2";
};

export function ContactSection({ headingLevel = "h2" }: ContactSectionProps) {
  const { contact, services, name } = siteConfig;
  const mapQuery = encodeURIComponent(`${name}, ${contact.address}`);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  const Heading = headingLevel;

  const items = [
    { icon: PhoneIcon, label: "Call us", value: contact.phoneDisplay, href: `tel:${contact.phone}` },
    { icon: EnvelopeIcon, label: "Email us", value: contact.email, href: `mailto:${contact.email}` },
    { icon: MapPinIcon, label: "Visit us", value: contact.address, href: mapsUrl, external: true },
  ];

  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-[#f4f4f4]">
      <div className="relative h-[260px] md:h-[340px]">
        <iframe
          title={`Map showing ${name} at ${contact.address}`}
          src={`https://maps.google.com/maps?q=${mapQuery}&z=15&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="size-full border-0"
        />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-brand" />
      </div>

      <div className="relative z-10 -mt-14 px-4 pb-12 sm:px-[30px] md:-mt-24 md:pb-16 lg:px-0">
        <Reveal
          animation="fade-in-up"
          className="mx-auto grid max-w-[1170px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.18)] lg:grid-cols-[5fr_7fr]"
        >
          {/* Contact details */}
          <div className="group/panel relative isolate overflow-hidden bg-ink px-7 py-9 text-[#bbbbbb] md:px-11 md:py-11">
            {/* Office photo behind a dark overlay keeps the text readable while showing where we are. */}
            <Image
              src="/images/about/skyland-office-2002-quebec-ave.jpeg"
              alt=""
              fill
              sizes="(min-width: 1024px) 490px, 100vw"
              className="-z-20 object-cover object-[50%_60%] transition-transform duration-[2s] ease-out group-hover/panel:scale-105"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/90 via-ink/80 to-ink/[0.62]"
            />
            <div
              aria-hidden="true"
              className="absolute -top-24 -right-24 size-64 rounded-full border-[40px] border-brand/10"
            />
            <p className="relative text-[13px] leading-5 font-bold tracking-[0.3em] text-brand uppercase">Get in touch</p>
            <Heading
              id="contact-heading"
              className="relative mt-2 font-heading text-[30px] leading-[40px] font-semibold text-white md:text-[36px] md:leading-[46px]"
            >
              Let&apos;s Build Something Great Together
            </Heading>
            <span aria-hidden="true" className="mt-5 block h-[3px] w-12 bg-accent" />
            <p className="mt-5 text-[15px] leading-[26px]">
              Have a project in mind? Tell us about it and our team will work with you to understand your vision.
            </p>

            <ul className="mt-6 space-y-4">
              {items.map(({ icon: Icon, label, value, href, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-start gap-4"
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/5 text-brand ring-1 ring-white/10 transition-all duration-300 group-hover:scale-105 group-hover:bg-brand group-hover:text-white">
                      <Icon className="h-[18px]" />
                    </span>
                    <span className="min-w-0 pt-0.5">
                      <span className="block text-[12px] leading-5 font-bold tracking-wider text-white/50 uppercase">
                        {label}
                      </span>
                      <span className="block text-[15px] leading-6 break-words text-white transition-colors group-hover:text-brand">
                        {value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex items-center gap-4 border-t border-white/10 pt-6">
              <span className="text-[13px] font-bold tracking-wider text-white/50 uppercase">Follow us</span>
              <SocialLinks itemClassName="size-10 rounded-full" />
            </div>
          </div>

          {/* Form */}
          <div className="bg-white px-7 py-9 md:px-11 md:py-11">
            <h3 className="font-heading text-[24px] leading-8 font-semibold text-ink">Request a Free Quote</h3>
            <p className="mt-2 mb-6 text-[15px] leading-[26px] text-[#666]">
              Fill in the form and we&apos;ll get back to you as soon as possible.
            </p>
            <ContactForm services={services.map((service) => service.label)} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
