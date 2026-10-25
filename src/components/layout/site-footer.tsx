import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { ArrowUpIcon, EnvelopeIcon, FacebookIcon, GoogleIcon, MapPinIcon, PhoneIcon, StarIcon } from "@/components/icons";
import { googleReviews } from "@/config/reviews";
import { siteConfig } from "@/config/site";

// Evaluated when the page is built, so the footer stays fully static.
const YEAR = new Date().getFullYear();

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-heading text-[17px] leading-6 font-semibold text-white">
      {children}
      <span aria-hidden="true" className="mt-3 block h-[3px] w-10 bg-brand" />
    </h2>
  );
}

function FooterLinks({ links }: { links: readonly { label: string; href: string }[] }) {
  return (
    <ul className="mt-5 space-y-2.5 text-[14px] leading-6 md:mt-6 md:space-y-3 md:text-[15px]">
      {links.map((link) => (
        <li key={link.label}>
          <Link href={link.href} className="group inline-flex items-center gap-2 transition-colors hover:text-white">
            <span aria-hidden="true" className="h-px w-3 shrink-0 bg-brand transition-all group-hover:w-5" />
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SiteFooter() {
  const { logo, contact, social, nav, services, legalName, credits } = siteConfig;
  const creditLinks = [
    { label: "LinkedIn", href: credits.linkedin },
    { label: "GitHub", href: credits.github },
  ].filter((link) => link.href);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`;

  return (
    <footer className="bg-[#1c1c1c] px-[30px] text-[#aaaaaa] lg:px-0">
      <div className="mx-auto grid max-w-[1170px] grid-cols-2 gap-x-6 gap-y-9 py-12 md:gap-x-10 md:gap-y-10 md:py-14 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
        {/* Brand */}
        <div className="col-span-2 md:order-1 md:col-span-1 lg:order-none">
          <Link href="/" className="-ml-2 inline-block w-[120px]">
            <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} sizes="120px" className="h-auto w-full" />
          </Link>
          <p className="mt-4 max-w-[320px] text-[15px] leading-[26px]">
            From modern builds to renovations, we deliver quality workmanship with your budget and timeline as our top
            priorities — no project too big or too small.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Skyland Construction on Facebook"
              className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand"
            >
              <FacebookIcon className="h-4" />
            </a>
            <a
              href={googleReviews.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 items-center gap-2 rounded-full bg-white/10 pr-4 pl-1.5 text-[13px] text-white transition-colors hover:bg-white/15"
            >
              <span className="flex size-7 items-center justify-center rounded-full bg-white">
                <GoogleIcon className="size-4" />
              </span>
              <StarIcon className="h-3.5 text-[#fbbc04]" />
              <span>
                <strong className="font-bold">{googleReviews.rating.toFixed(1)}</strong> · {googleReviews.count} reviews
              </span>
            </a>
          </div>
        </div>

        <nav aria-label="Footer" className="md:order-3 lg:order-none">
          <FooterHeading>Quick Links</FooterHeading>
          <FooterLinks links={nav} />
        </nav>

        <div className="md:order-4 lg:order-none">
          <FooterHeading>Our Services</FooterHeading>
          <FooterLinks links={services} />
        </div>

        {/* Contact */}
        <div className="col-span-2 md:order-2 md:col-span-1 lg:order-none">
          <FooterHeading>Get in Touch</FooterHeading>
          <address className="mt-5 space-y-3.5 text-[15px] leading-6 not-italic md:mt-6 md:space-y-4">
            <a href={`tel:${contact.phone}`} className="group flex items-start gap-3 transition-colors hover:text-white">
              <PhoneIcon className="mt-1 size-4 shrink-0 text-brand" />
              <span>{contact.phoneDisplay}</span>
            </a>
            <a href={`mailto:${contact.email}`} className="group flex items-start gap-3 break-all transition-colors hover:text-white">
              <EnvelopeIcon className="mt-1 size-4 shrink-0 text-brand" />
              <span>{contact.email}</span>
            </a>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 transition-colors hover:text-white"
            >
              <MapPinIcon className="mt-1 h-4 w-3 shrink-0 text-brand" />
              <span>{contact.address}</span>
            </a>
          </address>
          <Link
            href="/contact-us"
            className="mt-7 inline-block border-2 border-brand bg-brand px-6 py-2.5 text-[13px] leading-[22px] font-bold text-white uppercase transition-colors hover:border-white hover:bg-transparent"
          >
            Get a Free Quote
          </Link>
        </div>
      </div>

      <div className="-mx-[30px] border-t border-white/[0.06] bg-[#111111] px-[30px] lg:mx-0">
        <div className="mx-auto flex max-w-[1170px] flex-col items-center justify-between gap-3 py-5 text-center text-[13px] text-[#888888] md:flex-row md:text-left">
          <p>
            © {YEAR} {legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1">
            <span>
              Designed &amp; Developed by <strong className="font-bold text-white/90">{credits.name}</strong>
            </span>
            {creditLinks.map((link) => (
              <span key={link.label} className="flex items-center gap-2.5">
                <span aria-hidden="true" className="text-white/25">
                  ·
                </span>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-brand"
                >
                  {link.label}
                </a>
              </span>
            ))}
            <a
              href="#top"
              aria-label="Back to top"
              className="ml-2 flex size-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand"
            >
              <ArrowUpIcon className="h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
