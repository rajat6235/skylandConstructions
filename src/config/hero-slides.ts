export type HeroSlide = {
  /** File name inside `public/images/hero/`. */
  image: string;
  /** Describes the photo for screen readers. */
  alt: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

/**
 * Hero carousel slides, shown in this order.
 *
 * To add or change a slide, drop the image into `public/images/hero/`
 * (landscape, at least 1920px wide) and reference its file name here.
 */
export const heroSlides: HeroSlide[] = [
  {
    image: "architectural-house-exterior.jpg",
    alt: "Modern two-storey house exterior at dusk",
    eyebrow: "Superior Quality",
    title: "Bring Your Vision to Life with Sky Land Enterprises.",
    description: "Our team collaborates with you to understand your vision for the project.",
    primaryCta: { label: "View Projects", href: "/projects" },
    secondaryCta: { label: "Hire Us Now", href: "/contact-us" },
  },
  {
    image: "construction-carpenter-worker.jpg",
    alt: "Carpenter working on a timber frame",
    eyebrow: "General Contracting",
    title: "Built Right, From Foundation to Finish.",
    description: "Skilled crews and trusted trades delivering quality workmanship on every job site.",
    primaryCta: { label: "Our Services", href: "/services" },
    secondaryCta: { label: "Get a Quote", href: "/contact-us" },
  },
  {
    image: "professional-engineer-looking-at-building-under-construction.jpg",
    alt: "Engineer reviewing a building under construction",
    eyebrow: "Project Management",
    title: "Careful Planning. Clear Communication.",
    description: "We keep you informed at every stage, from the first estimate to the final walkthrough.",
    primaryCta: { label: "About Us", href: "/about-us" },
    secondaryCta: { label: "Contact Us", href: "/contact-us" },
  },
  {
    image: "tbar.jpeg",
    alt: "Installers fitting an exposed T-bar ceiling grid in an open office floor",
    eyebrow: "Exposed T-Bar Ceilings",
    title: "Precise Ceiling Grids, Installed Level and Square.",
    description: "Commercial T-bar systems laid out cleanly and built to last.",
    primaryCta: { label: "Our Services", href: "/services" },
    secondaryCta: { label: "Get a Quote", href: "/contact-us" },
  },
  {
    image: "ceiling.jpeg",
    alt: "Installer placing an acoustic tile into a suspended ceiling",
    eyebrow: "Suspended Ceilings",
    title: "Clean Finishes Above, Comfortable Spaces Below.",
    description: "Acoustic tile and suspended ceiling installs for offices and commercial interiors.",
    primaryCta: { label: "Our Services", href: "/services" },
    secondaryCta: { label: "Get a Quote", href: "/contact-us" },
  },
  {
    image: "drywall.jpeg",
    alt: "Crew taping and finishing drywall in a commercial interior",
    eyebrow: "Drywall & Framing",
    title: "Smooth Walls, Straight Lines, Expert Finishing.",
    description: "Steel stud framing, board hanging, taping and finishing — done right the first time.",
    primaryCta: { label: "View Projects", href: "/projects" },
    secondaryCta: { label: "Hire Us Now", href: "/contact-us" },
  },
];
