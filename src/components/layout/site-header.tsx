import Image from "next/image";
import Link from "next/link";

import { SearchIcon } from "@/components/icons";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

import { MobileNav } from "./mobile-nav";
import { TopBar } from "./top-bar";

export function SiteHeader() {
  const { logo } = siteConfig;

  return (
    // Transparent so it can sit on top of a full-bleed hero; elsewhere the body background shows through.
    <header className="relative z-20 h-[172px] lg:h-[202px]">
      <TopBar />
      <Container className="relative flex items-center gap-4 pt-[17px] lg:grid lg:grid-cols-[130px_1fr_auto]">
        <Link href="/" className="-ml-3 block w-[100px] shrink-0 lg:w-[130px]">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            sizes="130px"
            loading="eager"
            className="h-auto w-full"
          />
        </Link>

        <nav aria-label="Main" className="hidden justify-center pl-[43px] lg:flex">
          <ul className="flex items-center gap-[41px] text-[17px] text-brand">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3 lg:mr-[5px]">
          <button
            type="button"
            aria-label="Search"
            className="flex size-[33px] items-center justify-center rounded-[3px] bg-brand text-white"
          >
            <SearchIcon className="size-[18px]" />
          </button>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
