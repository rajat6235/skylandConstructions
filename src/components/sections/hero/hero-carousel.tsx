"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from "@/components/icons";
import { Container } from "@/components/ui/container";
import type { HeroSlide } from "@/config/hero-slides";
import { cn } from "@/lib/utils";

export type CarouselSlide = HeroSlide & { src: string | null };

type HeroCarouselProps = {
  slides: CarouselSlide[];
  /** Time each slide stays on screen, in milliseconds. */
  interval?: number;
};

const SWIPE_THRESHOLD = 50;

function whenIdle(callback: () => void) {
  // Safari has no requestIdleCallback.
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(callback, { timeout: 2000 });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(callback, 200);
  return () => window.clearTimeout(id);
}

export function HeroCarousel({ slides, interval = 6000 }: HeroCarouselProps) {
  const count = slides.length;
  const [{ active, previous }, setPosition] = useState({ active: 0, previous: -1 });
  // Slides whose <Image> is in the DOM. Only the first renders on the server;
  // the rest are added one at a time so they never compete with the initial load.
  const [mounted, setMounted] = useState(() => slides.map((_, i) => i === 0));
  // A slide without an image counts as loaded.
  const [loaded, setLoaded] = useState(() => slides.map((slide, i) => i === 0 || !slide.src));
  const [userPaused, setUserPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const loadedRef = useRef(loaded);
  const activeRef = useRef(active);
  const waitingForRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const autoplay = count > 1 && !userPaused && !hoverPaused && !hidden && !reducedMotion;

  const mount = useCallback((...indexes: number[]) => {
    setMounted((current) =>
      indexes.every((i) => current[i]) ? current : current.map((value, i) => value || indexes.includes(i)),
    );
  }, []);

  const show = useCallback(
    (index: number) => {
      const target = (index + count) % count;
      if (target === activeRef.current) return;
      waitingForRef.current = null;
      activeRef.current = target;
      setPosition((current) => ({ active: target, previous: current.active }));
      // Start fetching the slide after this one while the current one is on screen.
      mount(target, (target + 1) % count);
    },
    [count, mount],
  );

  const handleLoad = useCallback(
    (index: number) => {
      loadedRef.current = loadedRef.current.map((value, i) => value || i === index);
      setLoaded(loadedRef.current);
      if (waitingForRef.current === index) show(index);
    },
    [show],
  );

  // Preload the second slide once the page has fully loaded and the browser is idle.
  useEffect(() => {
    if (count < 2) return;
    let cancelIdle: (() => void) | undefined;
    const start = () => {
      cancelIdle = whenIdle(() => mount(1));
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      cancelIdle?.();
    };
  }, [count, mount]);

  // Advance after `interval`, but only once the next image is ready.
  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setTimeout(() => {
      const next = (active + 1) % count;
      if (loadedRef.current[next]) show(next);
      else {
        waitingForRef.current = next;
        mount(next);
      }
    }, interval);
    return () => {
      window.clearTimeout(timer);
      waitingForRef.current = null;
    };
  }, [active, autoplay, count, interval, mount, show]);

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => setReducedMotion(motion.matches);
    onVisibility();
    onMotion();
    document.addEventListener("visibilitychange", onVisibility);
    motion.addEventListener("change", onMotion);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", onMotion);
    };
  }, []);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Highlights"
      // Pulled up under the transparent site header (172px mobile, 202px desktop).
      className="relative isolate -mt-[172px] flex min-h-[max(692px,100svh)] overflow-hidden bg-surface pt-[172px] text-white lg:-mt-[202px] lg:min-h-[max(822px,100svh)] lg:pt-[202px]"
      onPointerEnter={(event) => event.pointerType === "mouse" && setHoverPaused(true)}
      onPointerLeave={(event) => event.pointerType === "mouse" && setHoverPaused(false)}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const start = touchStartX.current;
        const end = event.changedTouches[0]?.clientX;
        touchStartX.current = null;
        if (start == null || end == null || Math.abs(end - start) < SWIPE_THRESHOLD) return;
        show(end < start ? active + 1 : active - 1);
      }}
    >
      {/* Background images */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {slides.map((slide, i) =>
          slide.src && mounted[i] ? (
            <div
              key={slide.src}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                i === active && loaded[i] ? "opacity-100" : "opacity-0",
              )}
            >
              <Image
                src={slide.src}
                alt=""
                fill
                sizes="100vw"
                preload={i === 0}
                loading={i === 0 ? undefined : "eager"}
                fetchPriority={i === 0 ? undefined : "low"}
                onLoad={() => handleLoad(i)}
                className={cn(
                  "object-cover",
                  (i === active || i === previous) && "motion-safe:animate-ken-burns",
                )}
                style={{ "--ken-burns-duration": `${interval + 1500}ms` } as CSSProperties}
              />
            </div>
          ) : null,
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
      </div>

      {/* Slide content: every slide occupies the same grid cell so the height never jumps. */}
      <Container className="grid content-start pt-3 pb-28 text-center sm:pb-32">
        {slides.map((slide, i) => {
          const isActive = i === active;
          const Heading = i === 0 ? "h1" : "h2";
          return (
            <div
              key={slide.title}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={!isActive}
              inert={!isActive}
              className={cn(
                "col-start-1 row-start-1 transition-[opacity,transform,visibility] duration-700 ease-out",
                isActive
                  ? "visible translate-y-0 opacity-100 delay-300"
                  : "invisible translate-y-4 opacity-0",
              )}
            >
              {slide.src && <span className="sr-only">{slide.alt}</span>}
              <p className="text-[12px] leading-[1.8] font-light tracking-[0.6em] uppercase sm:text-[18px] sm:leading-[45px]">
                {slide.eyebrow}
              </p>
              <Heading className="mx-auto mt-5 max-w-[1100px] font-heading text-[35px] leading-[45px] font-semibold text-balance drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] sm:text-[56px] sm:leading-[70px] lg:text-[74px] lg:leading-[100px] lg:text-wrap">
                {slide.title}
              </Heading>
              <p className="mx-auto mt-5 max-w-[640px] text-[15px] leading-[1.6] text-white/90">
                {slide.description}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-5">
                <Link
                  href={slide.primaryCta.href}
                  className="border-2 border-white px-5 py-[11px] text-[12px] leading-5 font-bold uppercase transition-colors hover:bg-white/20 sm:px-[30px] sm:py-[15px] sm:text-[14px] sm:leading-[26px]"
                >
                  {slide.primaryCta.label}
                </Link>
                <Link
                  href={slide.secondaryCta.href}
                  className="border-2 border-brand bg-brand px-5 py-[11px] text-[12px] leading-5 font-bold uppercase transition-colors hover:border-white hover:bg-white/20 sm:px-[30px] sm:py-[15px] sm:text-[14px] sm:leading-[26px]"
                >
                  {slide.secondaryCta.label}
                </Link>
              </div>
            </div>
          );
        })}
      </Container>

      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => show(active - 1)}
            className="absolute top-1/2 left-4 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:border-brand hover:bg-brand md:flex xl:left-8"
          >
            <ChevronLeftIcon className="h-4" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => show(active + 1)}
            className="absolute top-1/2 right-4 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:border-brand hover:bg-brand md:flex xl:right-8"
          >
            <ChevronRightIcon className="h-4" />
          </button>

          <div className="absolute inset-x-0 bottom-8 flex items-center justify-center gap-3 sm:bottom-10">
            {slides.map((slide, i) => (
              <button
                key={slide.title}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === active}
                onClick={() => show(i)}
                className="group py-3"
              >
                <span
                  className={cn(
                    "block h-[3px] w-10 overflow-hidden rounded-full transition-colors group-hover:bg-white/70 sm:w-14",
                    i === active ? "bg-white/70" : "bg-white/35",
                  )}
                >
                  {i === active && (
                    <span
                      key={active}
                      className={cn(
                        "block h-full origin-left bg-brand",
                        reducedMotion || count < 2 ? "" : "animate-progress",
                      )}
                      style={
                        {
                          "--progress-duration": `${interval}ms`,
                          animationPlayState: autoplay ? "running" : "paused",
                        } as CSSProperties
                      }
                    />
                  )}
                </span>
              </button>
            ))}
            <button
              type="button"
              aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
              onClick={() => setUserPaused((value) => !value)}
              className="ml-1 flex size-8 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white"
            >
              {userPaused ? <PlayIcon className="h-3" /> : <PauseIcon className="h-3" />}
            </button>
          </div>

          <p className="sr-only" aria-live={autoplay ? "off" : "polite"} aria-atomic="true">
            Slide {active + 1} of {count}: {slides[active]?.title}
          </p>
        </>
      )}
    </section>
  );
}
