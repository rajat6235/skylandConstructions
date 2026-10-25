export const siteConfig = {
  name: "Skyland Construction",
  /** Other names the business is known by; used in structured data. */
  alternateNames: ["Sky Land Enterprises", "Skyland Enterprises", "SkyLand Construction"],
  tagline: "General Contractor in Saskatoon, SK",
  description:
    "Saskatoon general contractor for commercial and residential projects: drywall, steel stud framing, mud taping, T-bar ceilings, basements and renovations.",
  /** Production URL. Override with NEXT_PUBLIC_SITE_URL (e.g. http://localhost:3000 in development). */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://skylandyxe.com").replace(/\/$/, ""),
  logo: {
    src: "/wp-content/uploads/2023/08/122.png",
    alt: "Sky Land Enterprises — General Contractor",
    width: 1080,
    height: 1080,
  },
  contact: {
    email: "info@skylandyxe.com",
    phone: "+13067155448",
    phoneDisplay: "+1 (306) 715-5448",
    address: "2002 Quebec Ave #100, Saskatoon, SK S7K 1W4",
    building: "Rockport Officeplex",
    /** Structured address, used for local SEO markup. Keep in sync with `address`. */
    postal: {
      streetAddress: "2002 Quebec Ave #100",
      addressLocality: "Saskatoon",
      addressRegion: "SK",
      postalCode: "S7K 1W4",
      addressCountry: "CA",
    },
    areaServed: ["Saskatoon", "Saskatchewan"],
  },
  /** Legal name shown in the copyright line. */
  legalName: "Sky Land Enterprises",
  /** Developer credit in the footer's bottom bar. Links with an empty URL are hidden. */
  credits: {
    name: "Rajat",
    linkedin: "https://www.linkedin.com/in/rajat6235",
    github: "https://github.com/rajat6235",
  },
  /** Footer and contact-form service list; details live in `config/services.ts`. */
  services: [
    { label: "Drywall", href: "/services#drywall" },
    { label: "Steel Framing", href: "/services#steel-framing" },
    { label: "Mud Taping", href: "/services#mud-taping" },
    { label: "T-Bar Ceilings", href: "/services#t-bar" },
    { label: "Regdex Framing", href: "/services#regdex-framing" },
    { label: "Basement Development", href: "/services#basement-development" },
    { label: "Renovation", href: "/services#renovation" },
    { label: "Demolition", href: "/services#demolition" },
  ],
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61550277327228",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "Projects", href: "/projects" },
    { label: "Services", href: "/services" },
    { label: "Contact Us", href: "/contact-us" },
    { label: "Careers", href: "/careers" },
  ],
} as const;
