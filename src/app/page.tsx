import { About } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact/contact-section";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero/hero";
import { LatestProjects } from "@/components/sections/projects/latest-projects";
import { Testimonials } from "@/components/sections/testimonials/testimonials";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Features />
      <About />
      <LatestProjects />
      <Testimonials />
      <ContactSection />
    </main>
  );
}
