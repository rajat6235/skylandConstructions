import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Lato, Poppins } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import { businessJsonLd, websiteJsonLd } from "@/lib/seo";

import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "construction",
  keywords: [
    "general contractor Saskatoon",
    "Saskatoon construction company",
    "drywall Saskatoon",
    "steel stud framing Saskatoon",
    "mud taping Saskatoon",
    "T-bar ceilings Saskatoon",
    "suspended ceilings Saskatoon",
    "basement development Saskatoon",
    "renovations Saskatoon",
    "commercial contractor Saskatchewan",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: siteConfig.name,
    url: "/",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: true, address: true, email: true },
  verification: {
    // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION to the code from Google Search Console's HTML-tag method.
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  other: {
    "geo.region": "CA-SK",
    "geo.placename": "Saskatoon",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#666666" },
    { media: "(prefers-color-scheme: dark)", color: "#666666" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-CA"
      className={`${lato.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <JsonLd data={[businessJsonLd(), websiteJsonLd()]} />
        <SiteHeader />
        {children}
        <SiteFooter />
        <SpeedInsights />
      </body>
    </html>
  );
}
