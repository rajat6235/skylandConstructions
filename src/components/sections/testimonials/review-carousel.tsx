"use client";

import { useEffect, useRef, useState } from "react";

import { ChevronLeftIcon, ChevronRightIcon, GoogleIcon, QuoteIcon } from "@/components/icons";
import type { Review } from "@/config/reviews";

import { Stars } from "./stars";

type ReviewCarouselProps = {
  reviews: Review[];
  reviewsUrl: string;
};

/** Horizontally scrolling review cards using native scroll snapping (swipe, trackpad and keyboard friendly). */
export function ReviewCarousel({ reviews, reviewsUrl }: ReviewCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      setAtStart(track.scrollLeft <= 4);
      setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4);
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: direction * track.clientWidth, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <div className="mt-7 md:mt-8">
      <ul
        ref={trackRef}
        tabIndex={0}
        aria-label="Google reviews"
        className="-mx-[30px] flex snap-x snap-mandatory scroll-px-[30px] gap-5 overflow-x-auto px-[30px] pt-1 pb-5 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink md:-mx-5 md:scroll-px-5 md:px-5 lg:mx-0 lg:scroll-px-0 lg:gap-[30px] lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((review) => (
          <li
            key={review.name}
            className="flex w-[85%] shrink-0 snap-start sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-60px)/3)]"
          >
            <article className="relative flex w-full flex-col bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
              <QuoteIcon className="absolute top-5 right-5 h-6 text-accent/30" />
              <Stars rating={review.rating} className="h-[15px]" />
              <p className="mt-3 flex-1 text-[15px] leading-[25px] text-[#333]">
                “{review.text}
                {review.truncated ? "…" : ""}”
                {review.truncated && (
                  <>
                    {" "}
                    <a
                      href={reviewsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold whitespace-nowrap text-brand hover:underline"
                    >
                      Read on Google
                    </a>
                  </>
                )}
              </p>
              {review.highlights && (
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Highlights">
                  {review.highlights.slice(0, 3).map((highlight) => (
                    <li
                      key={highlight}
                      className="bg-[#f5f5f5] px-2 py-1 text-[11px] leading-4 font-bold text-[#555]"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}
              <footer className="mt-4 flex items-center gap-3 border-t border-[#eee] pt-4">
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full text-[16px] font-bold text-white"
                  style={{ backgroundColor: review.color }}
                >
                  {review.name.charAt(0)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] leading-5 font-bold text-ink">{review.name}</span>
                  <span className="block text-[13px] leading-5 text-[#777]">Google review</span>
                </span>
                <GoogleIcon className="size-5 shrink-0" />
              </footer>
            </article>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
        <a
          href={reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border-2 border-ink px-6 py-2.5 text-[13px] leading-[22px] font-bold text-ink uppercase transition-colors hover:bg-ink hover:text-white"
        >
          See all reviews on Google
        </a>
        <div className="flex gap-3">
          <button
            type="button"
            aria-label="Previous reviews"
            disabled={atStart}
            onClick={() => scroll(-1)}
            className="flex size-11 items-center justify-center border-2 border-ink text-ink transition-colors hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeftIcon className="h-4" />
          </button>
          <button
            type="button"
            aria-label="Next reviews"
            disabled={atEnd}
            onClick={() => scroll(1)}
            className="flex size-11 items-center justify-center border-2 border-ink text-ink transition-colors hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRightIcon className="h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
