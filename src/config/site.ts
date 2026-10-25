export const siteConfig = {
  name: "Skyland Construction",
  description: "Skyland Construction — quality building and construction services.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
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
  },
  /** Legal name shown in the copyright line. */
  legalName: "Sky Land Enterprises",
  /** Developer credit in the footer's bottom bar. Links with an empty URL are hidden. */
  credits: {
    name: "Rajat",
    linkedin: "https://www.linkedin.com/in/rajat6235",
    github: "https://github.com/rajat6235",
  },
  services: [
    { label: "Suspended Ceilings", href: "/services" },
    { label: "Drywall & Taping", href: "/services" },
    { label: "Steel Stud Framing", href: "/services" },
    { label: "Exposed T-Bar Ceilings", href: "/services" },
    { label: "Renovations", href: "/services" },
  ],
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61550277327228",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "Projects", href: "/projects" },
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact Us", href: "/contact-us" },
    { label: "Careers", href: "/careers" },
  ],
} as const;
