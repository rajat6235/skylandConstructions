"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";

import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

import type { GalleryPhoto } from "./photo-carousel";

type PhotoViewerProps = {
  photos: GalleryPhoto[];
  /** Autoplay delay in milliseconds. */
  interval?: number;
};

const MAIN_SIZES = "(min-width: 1170px) 1170px, 100vw";
const SWIPE_THRESHOLD = 50;

/** Large photo viewer with a scrollable thumbnail strip, for bigger galleries. */
export function PhotoViewer({ photos, interval = 5000 }: PhotoViewerProps) {
  const count = photos.length;
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const stripRef = useRef<HTMLUListElement>(null);
  const touchStartX = useRef<number | null>(null);

  const go = (index: number) => setActive((index + count) % count);
  const playing = !hovered && !userPaused && !reducedMotion && count > 1;
  const photo = photos[active];
  const next = photos[(active + 1) % count];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (!document.hidden) setActive((index) => (index + 1) % count);
    }, interval);
    return () => window.clearTimeout(timer);
  }, [active, count, interval, playing]);

  // Keep the active thumbnail centred in the strip without scrolling the page.
  useEffect(() => {
    const strip = stripRef.current;
    const thumb = strip?.children[active] as HTMLElement | undefined;
    if (!strip || !thumb) return;
    strip.scrollTo({
      left: thumb.offsetLeft - (strip.clientWidth - thumb.offsetWidth) / 2,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, [active, reducedMotion]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") go(active - 1);
    if (event.key === "ArrowRight") go(active + 1);
  };

  if (!photo) return null;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Photos of our work"
      onKeyDown={onKeyDown}
      onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={(event) => event.pointerType === "mouse" && setHovered(false)}
    >
      <div
        className="relative aspect-[4/5] overflow-hidden bg-black sm:aspect-[16/10]"
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          const start = touchStartX.current;
          const end = event.changedTouches[0]?.clientX;
          touchStartX.current = null;
          if (start == null || end == null || Math.abs(end - start) < SWIPE_THRESHOLD) return;
          go(end < start ? active + 1 : active - 1);
        }}
      >
        {/* Blurred copy fills the frame behind portrait photos; same URL as the main image, so it's cached. */}
        <Image
          key={`bg-${photo.src}`}
          src={photo.src}
          alt=""
          aria-hidden="true"
          fill
          sizes={MAIN_SIZES}
          className="scale-110 object-cover opacity-50 blur-2xl"
        />
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={MAIN_SIZES}
          className="object-contain motion-safe:animate-[fade-in_0.6s_ease-out]"
        />
        {/* Warm the cache for the next photo. */}
        {next && next.src !== photo.src && (
          <Image src={next.src} alt="" aria-hidden="true" fill sizes={MAIN_SIZES} fetchPriority="low" className="invisible" />
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-5 pt-16 pb-5 sm:px-8 sm:pb-7">
          <p aria-live={playing ? "off" : "polite"} className="font-heading text-[18px] leading-7 font-semibold text-white sm:text-[22px]">
            {photo.alt}
          </p>
        </div>

        <span className="absolute top-4 right-4 bg-black/55 px-3 py-1 text-[13px] font-bold tracking-wider text-white tabular-nums backdrop-blur-sm">
          {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>

        {[
          { label: "Previous photo", delta: -1, icon: ChevronLeftIcon, side: "left-3 sm:left-5" },
          { label: "Next photo", delta: 1, icon: ChevronRightIcon, side: "right-3 sm:right-5" },
        ].map(({ label, delta, icon: Icon, side }) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            onClick={() => go(active + delta)}
            className={cn(
              "absolute top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-brand sm:size-12",
              side,
            )}
          >
            <Icon className="h-4" />
          </button>
        ))}

        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-white/15">
          <span
            key={`${active}-${playing}`}
            className={cn("block h-full origin-left bg-brand", playing ? "animate-progress" : "scale-x-0")}
            style={{ "--progress-duration": `${interval}ms` } as CSSProperties}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
          onClick={() => setUserPaused((value) => !value)}
          className="flex size-11 shrink-0 items-center justify-center border-2 border-white/20 text-white transition-colors hover:border-brand hover:bg-brand"
        >
          {userPaused ? <PlayIcon className="h-3.5" /> : <PauseIcon className="h-3.5" />}
        </button>
        <ul
          ref={stripRef}
          aria-label="Choose a photo"
          className="flex min-w-0 flex-1 gap-2.5 overflow-x-auto scroll-smooth py-1 [scrollbar-width:none] sm:gap-3 [&::-webkit-scrollbar]:hidden"
        >
          {photos.map((item, i) => (
            <li key={item.src} className="shrink-0">
              <button
                type="button"
                aria-label={`Show photo ${i + 1}: ${item.alt}`}
                aria-current={i === active}
                onClick={() => go(i)}
                className={cn(
                  "relative block aspect-[4/3] w-[84px] overflow-hidden outline-offset-2 transition-all duration-300 sm:w-[112px]",
                  i === active ? "opacity-100 ring-2 ring-brand ring-offset-2 ring-offset-ink" : "opacity-45 hover:opacity-90",
                )}
              >
                <Image src={item.src} alt="" fill sizes="112px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
