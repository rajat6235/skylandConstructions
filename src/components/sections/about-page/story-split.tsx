import Image from "next/image";
import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type StorySplitProps = {
  eyebrow: string;
  title: string;
  image: {
    src: string;
    alt: string;
    /** Frame shape; portrait photos read better in a squarer frame. */
    aspect?: "landscape" | "square";
    /** CSS object-position, to keep the subject in view when cropped. */
    position?: string;
  };
  /** Puts the image on the right on large screens. */
  reverse?: boolean;
  children: ReactNode;
};

/** Image beside text, each sliding in from its own side. */
export function StorySplit({ eyebrow, title, image, reverse = false, children }: StorySplitProps) {
  return (
    <div className="mx-auto grid max-w-[1170px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <Reveal
        animation={reverse ? "fade-in-right" : "fade-in-left"}
        className={cn("relative px-4 pt-4 pb-4 sm:px-6", reverse && "lg:order-2")}
      >
        <div
          aria-hidden="true"
          className={cn(
            "absolute top-0 h-2/3 w-2/3 border-2 border-dashed border-accent",
            reverse ? "right-0" : "left-0",
          )}
        />
        <div
          aria-hidden="true"
          className={cn(
            "absolute bottom-0 h-1/2 w-1/2 bg-[radial-gradient(#c9c9c9_1.5px,transparent_1.5px)] [background-size:12px_12px]",
            reverse ? "left-0" : "right-0",
          )}
        />
        <div
          className={cn(
            "group relative overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.18)]",
            image.aspect === "square" ? "aspect-square" : "aspect-[3/2]",
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 540px, 100vw"
            style={image.position ? { objectPosition: image.position } : undefined}
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          />
        </div>
      </Reveal>

      <Reveal animation={reverse ? "fade-in-left" : "fade-in-right"} duration="slow" className={cn(reverse && "lg:order-1")}>
        <p className="text-[13px] leading-5 font-bold tracking-[0.3em] text-brand uppercase">{eyebrow}</p>
        <h2 className="mt-2 font-heading text-[30px] leading-[40px] font-semibold text-black md:text-[40px] md:leading-[52px]">
          {title}
        </h2>
        <span aria-hidden="true" className="mt-5 block h-[3px] w-14 bg-accent" />
        <div className="mt-6 space-y-5 text-[16px] leading-[30px] text-[#555]">{children}</div>
      </Reveal>
    </div>
  );
}
