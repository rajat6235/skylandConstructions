"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

export type GalleryPhoto = { src: string; alt: string };

type PhotoCarouselProps = {
  photos: GalleryPhoto[];
  /** Autoplay delay in milliseconds. */
  interval?: number;
};

/** Scroll-snap photo carousel that advances one photo at a time and loops. */
export function PhotoCarousel({ photos, interval = 4000 }: PhotoCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [paused, setPaused] = useState(false);

  const step = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const width = card.offsetWidth + gap;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    const atStart = track.scrollLeft <= 4;
    const smooth = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    if (direction === 1 && atEnd) track.scrollTo({ left: 0, behavior: smooth });
    else if (direction === -1 && atStart) track.scrollTo({ left: track.scrollWidth, behavior: smooth });
    else track.scrollBy({ left: direction * width, behavior: smooth });
  }, []);

  useEffect(() => {
    if (paused || photos.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) step(1);
    }, interval);
    return () => window.clearInterval(timer);
  }, [interval, paused, photos.length, step]);

  return (
    <div
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <ul
        ref={trackRef}
        tabIndex={0}
        aria-label="Photos of our work"
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand md:gap-6 [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((photo) => (
          <li key={photo.src} className="w-[82%] shrink-0 snap-start sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)]">
            <figure className="group relative aspect-[4/3] overflow-hidden bg-ink">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 374px, (min-width: 640px) 50vw, 82vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/80 to-transparent px-5 pt-10 pb-4 text-[14px] font-bold text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {photo.alt}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {photos.length > 1 && (
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => step(-1)}
            className="flex size-12 items-center justify-center border-2 border-white/30 text-white transition-colors hover:border-brand hover:bg-brand"
          >
            <ChevronLeftIcon className="h-4" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => step(1)}
            className="flex size-12 items-center justify-center border-2 border-white/30 text-white transition-colors hover:border-brand hover:bg-brand"
          >
            <ChevronRightIcon className="h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
