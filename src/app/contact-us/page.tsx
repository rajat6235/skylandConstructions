import type { Metadata } from "next";

import { ContactSection } from "@/components/sections/contact/contact-section";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Skyland Construction in Saskatoon for a free quote on drywall, suspended ceilings, steel framing and renovations.",
};

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHero title="Contact Us" image="/images/hero/construction-carpenter-worker.jpg" />
      <ContactSection />
    </main>
  );
}
