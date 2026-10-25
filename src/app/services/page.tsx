import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CheckIcon, ChevronRightIcon } from "@/components/icons";
import { CtaBand } from "@/components/sections/about-page/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceDetail } from "@/components/sections/services/service-detail";
import { Testimonials } from "@/components/sections/testimonials/testimonials";
import { Reveal } from "@/components/ui/reveal";
import { services } from "@/config/services";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl, businessRef, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Drywall, Framing & Ceiling Services | Skyland Saskatoon",
  description:
    "Drywall, steel stud framing, mud taping, T-bar ceilings, basement development, renovation and demolition for homes and businesses in Saskatoon, SK.",
  path: "/services",
  absoluteTitle: true,
});

const process = [
  { title: "Consultation & Quote", text: "We listen to what you need, review the space and give you a clear quote." },
  { title: "Planning & Scheduling", text: "We plan the work, schedule the crews and keep your budget and timeline front and centre." },
  { title: "Quality Build", text: "Our crews do the work to a high standard, inspecting as we go and fixing any issues." },
  { title: "Final Walkthrough", text: "We walk the finished job with you to make sure everything is done right." },
];

const audiences = [
  {
    title: "Commercial",
    text: "Fit-outs and interiors for businesses across Saskatoon.",
    items: ["Retail", "Medical & dental practices", "Food services", "Corporate offices", "Warehouses"],
    image: { src: "/images/about-gallery/06-warehouse-interior-build-out.jpg", alt: "Crew working on a warehouse interior build-out" },
  },
  {
    title: "Residential",
    text: "Quality work for homeowners, from single rooms to whole suites.",
    items: ["Kitchen renovations", "Basement development", "Suite renovations", "Flooring & finishing"],
    image: { src: "/images/about-gallery/08-kitchen-renovation.jpg", alt: "Renovated kitchen with wood cabinets" },
  },
];

export default function ServicesPage() {
  const { contact } = siteConfig;
  const featured = services.filter((service) => service.photos?.length);
  const more = services.filter((service) => !service.photos?.length);

  const faqs = [
    {
      q: "Do you work on both commercial and residential projects?",
      a: "Yes. We're a general contractor for both commercial and residential clients — from office and retail fit-outs to kitchen renovations and basement development.",
    },
    {
      q: "Where are you located?",
      a: `Our office is at ${contact.address}, and we work on projects across Saskatoon.`,
    },
    {
      q: "How do I get a quote?",
      a: `Send us a message through our contact form or call us at ${contact.phoneDisplay}. Tell us about your project and we'll get back to you.`,
    },
    {
      q: "Can you handle a project from start to finish?",
      a: "Yes. We can plan, coordinate and carry out the full scope — framing, drywall, taping, ceilings and finishing — so you have one team to deal with.",
    },
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "OfferCatalog",
      name: "Construction services in Saskatoon",
      url: absoluteUrl("/services"),
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.summary,
          url: absoluteUrl(`/services#${service.slug}`),
          serviceType: service.title,
          provider: businessRef,
          areaServed: { "@type": "City", name: "Saskatoon" },
          ...(service.photos?.[0] ? { image: absoluteUrl(service.photos[0].src) } : {}),
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ];

  return (
    <main className="flex flex-1 flex-col">
      <JsonLd data={structuredData} />
      <PageHero title="Our Services" path="/services" image="/images/about-gallery/11-commercial-warehouse-fit-out.jpg" />

      {/* Overview */}
      <section className="overflow-x-clip bg-white px-[30px] pt-20 pb-20 md:pt-24 lg:px-0">
        <div className="mx-auto max-w-[1170px]">
          <Reveal animation="fade-in-up" className="mx-auto max-w-[720px] text-center">
            <p className="text-[13px] leading-5 font-bold tracking-[0.3em] text-brand uppercase">What we do</p>
            <h2 className="mt-2 font-heading text-[30px] leading-[40px] font-semibold text-black md:text-[40px] md:leading-[52px]">
              Commercial &amp; Residential Construction Services
            </h2>
            <span aria-hidden="true" className="mx-auto mt-5 block h-[3px] w-14 bg-accent" />
            <p className="mt-5 text-[16px] leading-[28px] text-[#555]">
              As a general contractor in Saskatoon, we bring framing, drywall, finishing and ceiling work together under
              one team — so your project runs smoothly from the first stud to the final coat.
            </p>
          </Reveal>

          <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {services.map((service, i) => {
              const photo = service.photos?.[0];
              return (
                <li key={service.slug}>
                  <Reveal animation="fade-in-up" delay={(i % 4) * 100} className="h-full">
                    <a
                      href={`#${service.slug}`}
                      className="group relative flex aspect-[4/5] h-full flex-col justify-end overflow-hidden bg-ink p-4 text-white sm:p-6"
                    >
                      {photo ? (
                        <Image
                          src={photo.src}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 280px, 50vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="absolute -top-4 -right-2 font-heading text-[120px] leading-none font-semibold text-white/[0.06]"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      )}
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/5 transition-colors duration-500 group-hover:from-brand/95 group-hover:via-brand/40"
                      />
                      <span className="relative text-[11px] font-bold tracking-[0.2em] text-accent uppercase transition-colors group-hover:text-white">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="relative mt-1 font-heading text-[16px] leading-6 font-semibold sm:text-[20px] sm:leading-7">
                        {service.title}
                      </span>
                      <span className="relative mt-1 hidden text-[13px] leading-5 text-white/75 sm:block">{service.summary}</span>
                      <span className="relative mt-3 flex items-center gap-1.5 text-[12px] font-bold tracking-wider uppercase">
                        Learn more
                        <ChevronRightIcon className="h-2.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </a>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Service details */}
      <section className="overflow-x-clip bg-[#f7f7f7] px-[30px] py-20 md:py-28 lg:px-0">
        <div className="space-y-24 md:space-y-32">
          {featured.map((service, i) => (
            <ServiceDetail key={service.slug} service={service} index={services.indexOf(service)} reverse={i % 2 === 1} />
          ))}
        </div>
      </section>

      {/* More services */}
      <section aria-labelledby="more-services" className="overflow-x-clip bg-ink px-[30px] py-20 text-white md:py-24 lg:px-0">
        <div className="mx-auto max-w-[1170px]">
          <Reveal animation="fade-in-up" className="text-center">
            <p className="text-[13px] leading-5 font-bold tracking-[0.3em] text-brand uppercase">Also available</p>
            <h2 id="more-services" className="mt-2 font-heading text-[30px] leading-[40px] font-semibold md:text-[38px] md:leading-[50px]">
              More Ways We Can Help
            </h2>
            <span aria-hidden="true" className="mx-auto mt-5 block h-[3px] w-14 bg-accent" />
          </Reveal>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {more.map((service, i) => (
              <li key={service.slug} id={service.slug} className="scroll-mt-8">
                <Reveal animation="fade-in-up" delay={i * 150} className="h-full">
                  <article className="group relative flex h-full flex-col overflow-hidden border border-white/10 bg-white/[0.03] p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand hover:bg-white/[0.06]">
                    <span className="font-heading text-[44px] leading-none font-semibold text-accent/40 transition-colors group-hover:text-accent">
                      {String(services.indexOf(service) + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-5 font-heading text-[22px] leading-8 font-semibold">{service.title}</h3>
                    <p className="mt-3 text-[15px] leading-[26px] text-white/70">{service.description}</p>
                    {service.includes.length > 0 && (
                      <ul className="mt-5 space-y-2">
                        {service.includes.map((item) => (
                          <li key={item} className="flex items-center gap-2.5 text-[14px] text-white/85">
                            <CheckIcon className="h-3 text-brand" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    <Link
                      href="/contact-us"
                      className="mt-auto inline-flex items-center gap-2 pt-7 text-[13px] font-bold tracking-wider text-brand uppercase transition-colors hover:text-white"
                    >
                      Ask about {service.title.toLowerCase()}
                      <ChevronRightIcon className="h-2.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="process-heading" className="overflow-x-clip bg-white px-[30px] py-20 md:py-28 lg:px-0">
        <div className="mx-auto max-w-[1170px]">
          <Reveal animation="fade-in-up" className="mx-auto max-w-[620px] text-center">
            <p className="text-[13px] leading-5 font-bold tracking-[0.3em] text-brand uppercase">How we work</p>
            <h2 id="process-heading" className="mt-2 font-heading text-[30px] leading-[40px] font-semibold text-black md:text-[40px] md:leading-[52px]">
              A Simple, Reliable Process
            </h2>
            <span aria-hidden="true" className="mx-auto mt-5 block h-[3px] w-14 bg-accent" />
          </Reveal>
          <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <span aria-hidden="true" className="absolute top-7 right-[12%] left-[12%] hidden h-0.5 bg-[repeating-linear-gradient(90deg,#f7c51e_0_10px,transparent_10px_18px)] lg:block" />
            {process.map((step, i) => (
              <li key={step.title} className="relative text-center">
                <Reveal animation="fade-in-up" delay={i * 150}>
                  <span className="relative mx-auto flex size-14 items-center justify-center rounded-full bg-brand font-heading text-[20px] font-semibold text-white ring-8 ring-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-6 font-heading text-[19px] leading-7 font-semibold text-ink">{step.title}</h3>
                  <p className="mx-auto mt-2 max-w-[260px] text-[15px] leading-[26px] text-[#666]">{step.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Who we work with */}
      <section className="overflow-x-clip bg-[#f7f7f7] px-[30px] py-20 md:py-24 lg:px-0">
        <div className="mx-auto grid max-w-[1170px] gap-6 md:grid-cols-2 lg:gap-8">
          {audiences.map((audience, i) => (
            <Reveal key={audience.title} animation={i === 0 ? "fade-in-left" : "fade-in-right"} className="h-full">
              <article className="group relative isolate flex h-full min-h-[380px] flex-col justify-end overflow-hidden p-8 text-white md:p-10">
                <Image
                  src={audience.image.src}
                  alt={audience.image.alt}
                  fill
                  sizes="(min-width: 768px) 570px, 100vw"
                  className="-z-20 object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                />
                <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/60 to-black/20" />
                <p className="text-[13px] font-bold tracking-[0.3em] text-accent uppercase">We work with</p>
                <h2 className="mt-1 font-heading text-[30px] leading-[40px] font-semibold">{audience.title}</h2>
                <p className="mt-2 text-[15px] leading-[26px] text-white/80">{audience.text}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {audience.items.map((item) => (
                    <li key={item} className="bg-white/15 px-3 py-1.5 text-[13px] font-bold backdrop-blur-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="overflow-x-clip bg-white px-[30px] py-20 md:py-24 lg:px-0">
        <div className="mx-auto max-w-[820px]">
          <Reveal animation="fade-in-up" className="text-center">
            <p className="text-[13px] leading-5 font-bold tracking-[0.3em] text-brand uppercase">Good to know</p>
            <h2 id="faq-heading" className="mt-2 font-heading text-[30px] leading-[40px] font-semibold text-black md:text-[38px] md:leading-[50px]">
              Frequently Asked Questions
            </h2>
            <span aria-hidden="true" className="mx-auto mt-5 block h-[3px] w-14 bg-accent" />
          </Reveal>
          <Reveal animation="fade-in-up" className="mt-10 divide-y divide-[#e8e8e8] border-y border-[#e8e8e8]">
            {faqs.map((faq, i) => (
              <details key={faq.q} open={i === 0} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-heading text-[17px] leading-7 font-semibold text-ink transition-colors hover:text-brand [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f2f2f2] text-ink transition-all duration-300 group-open:rotate-90 group-open:bg-brand group-open:text-white">
                    <ChevronRightIcon className="h-3" />
                  </span>
                </summary>
                <p className="pr-14 pb-6 text-[15px] leading-[27px] text-[#555]">{faq.a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      <Testimonials />
      <CtaBand />
    </main>
  );
}
