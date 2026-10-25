import Image from "next/image";
import Link from "next/link";

import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { breadcrumbJsonLd } from "@/lib/seo";

type PageHeroProps = {
  title: string;
  /** URL path of the page, for breadcrumb structured data. */
  path: string;
  /** Background image path under `public/`. */
  image: string;
};

/** Banner for inner pages; extends up under the transparent site header like the homepage hero. */
export function PageHero({ title, path, image }: PageHeroProps) {
  return (
    <section className="relative isolate -mt-[172px] overflow-hidden bg-surface pt-[172px] text-white lg:-mt-[202px] lg:pt-[202px]">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: title, path },
        ])}
      />
      <Image src={image} alt="" fill preload sizes="100vw" className="-z-20 object-cover motion-safe:animate-ken-burns" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/55 to-black/70" />
      <Container className="pt-8 pb-16 text-center md:pt-12 md:pb-24 motion-safe:animate-[rise_0.8s_ease-out_both]">
        <h1 className="font-heading text-[38px] leading-[48px] font-semibold md:text-[56px] md:leading-[66px]">{title}</h1>
        <span aria-hidden="true" className="mx-auto mt-4 block h-[3px] w-14 bg-accent" />
        <nav aria-label="Breadcrumb" className="mt-5 text-[14px]">
          <ol className="flex items-center justify-center gap-2 text-white/70">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-white">
              {title}
            </li>
          </ol>
        </nav>
      </Container>
    </section>
  );
}
