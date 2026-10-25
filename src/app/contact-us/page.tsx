import type { Metadata } from "next";

import { ContactSection } from "@/components/sections/contact/contact-section";
import { OfficeVisit } from "@/components/sections/contact/office-visit";
import { PageHero } from "@/components/sections/page-hero";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Skyland Construction | Free Quote Saskatoon",
  description:
    "Request a free construction quote in Saskatoon. Call +1 (306) 715-5448, email info@skylandyxe.com or visit our office at 2002 Quebec Ave #100, Saskatoon, SK.",
  path: "/contact-us",
  absoluteTitle: true,
});

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHero title="Contact Us" path="/contact-us" image="/images/hero/construction-carpenter-worker.jpg" />
      <ContactSection />
      <OfficeVisit />
    </main>
  );
}
