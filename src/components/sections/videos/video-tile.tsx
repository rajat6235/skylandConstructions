"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { PlayIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export type ClipInfo = { src: string; poster: string; title: string };

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

function canAutoplay() {
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  const slow = connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? "");
  return !slow && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function subscribeToMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

/** Resolves once the page has fully loaded and the browser is idle, so video never competes with page content. */
function afterPageLoad(callback: () => void) {
  let cancelled = false;
  let idleId: number | undefined;
  const run = () => {
    if (cancelled) return;
    if (typeof window.requestIdleCallback === "function") idleId = window.requestIdleCallback(callback, { timeout: 3000 });
    else idleId = window.setTimeout(callback, 300);
  };
  if (document.readyState === "complete") run();
  else window.addEventListener("load", run, { once: true });
  return () => {
    cancelled = true;
    window.removeEventListener("load", run);
    if (idleId === undefined) return;
    if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idleId);
    else window.clearTimeout(idleId);
  };
}

/**
 * Muted, looping clip that shows only its poster until the page has loaded and the tile is on screen.
 * The video file is never requested before then, and it pauses again when scrolled away.
 * Visitors with reduced motion or data saver on get a play button instead of autoplay.
 */
export function VideoTile({ clip }: { clip: ClipInfo }) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [pageReady, setPageReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [seen, setSeen] = useState(false);
  const [userStarted, setUserStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const autoplayAllowed = useSyncExternalStore(subscribeToMotion, canAutoplay, () => true);
  // The source is attached only after the page has loaded and the tile has been on screen (or on tap).
  const requested = userStarted || (autoplayAllowed && pageReady && seen);

  useEffect(() => afterPageLoad(() => setPageReady(true)), []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = Boolean(entry?.isIntersecting);
        setVisible(isVisible);
        if (isVisible) setSeen(true);
      },
      { rootMargin: "100px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !requested) return;
    if (visible) video.play().catch(() => setPlaying(false));
    else video.pause();
  }, [requested, visible]);

  return (
    <div ref={ref} className="group relative aspect-[9/16] overflow-hidden bg-ink">
      <Image
        src={clip.poster}
        alt=""
        fill
        sizes="(min-width: 1024px) 230px, (min-width: 640px) 33vw, 70vw"
        className="object-cover"
      />
      <video
        ref={videoRef}
        src={requested ? clip.src : undefined}
        muted
        loop
        playsInline
        preload="none"
        aria-label={clip.title}
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className={cn(
          "absolute inset-0 size-full object-cover transition-opacity duration-700",
          playing ? "opacity-100" : "opacity-0",
        )}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pt-14 pb-4">
        <p className="font-heading text-[15px] leading-5 font-semibold text-white">{clip.title}</p>
      </div>
      {!autoplayAllowed && !playing && (
        <button
          type="button"
          aria-label={`Play video: ${clip.title}`}
          onClick={() => setUserStarted(true)}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="flex size-14 items-center justify-center rounded-full bg-brand text-white shadow-lg transition-transform group-hover:scale-110">
            <PlayIcon className="ml-1 h-5" />
          </span>
        </button>
      )}
    </div>
  );
}
