import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Page Not Found",
  // Overrides the site-wide "index, follow" so missing pages are never indexed.
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative isolate -mt-[172px] flex min-h-[80svh] items-center bg-ink px-[30px] pt-[172px] pb-20 text-white lg:-mt-[202px] lg:pt-[202px]">
        <div className="mx-auto max-w-[640px] text-center">
          <p className="font-heading text-[96px] leading-none font-semibold text-accent md:text-[140px]">404</p>
          <h1 className="mt-4 font-heading text-[30px] leading-[40px] font-semibold md:text-[38px]">This page can&apos;t be found</h1>
          <p className="mt-4 text-[16px] leading-[28px] text-white/75">
            The page may have moved when we rebuilt our website. Try one of these instead, or call us at{" "}
            <a href={`tel:${siteConfig.contact.phone}`} className="font-bold text-white underline">
              {siteConfig.contact.phoneDisplay}
            </a>
            .
          </p>
          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-block border-2 border-white/30 px-5 py-2.5 text-[14px] font-bold transition-colors hover:border-brand hover:bg-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
