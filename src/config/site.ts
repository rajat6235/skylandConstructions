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
  },
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
