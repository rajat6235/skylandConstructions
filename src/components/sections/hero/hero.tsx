import { existsSync } from "node:fs";
import path from "node:path";

import { heroSlides } from "@/config/hero-slides";

import { HeroCarousel, type CarouselSlide } from "./hero-carousel";

const HERO_IMAGE_DIR = "/images/hero";

export function Hero() {
  const slides: CarouselSlide[] = heroSlides.map((slide) => {
    const src = `${HERO_IMAGE_DIR}/${slide.image}`;
    const exists = existsSync(path.join(process.cwd(), "public", src));

    if (!exists && process.env.NODE_ENV !== "production") {
      console.warn(`[hero] Missing image public${src}; showing the slide without it.`);
    }

    return { ...slide, src: exists ? src : null };
  });

  return <HeroCarousel slides={slides} />;
}
