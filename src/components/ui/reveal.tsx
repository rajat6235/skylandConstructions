"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  animation: "fade-in" | "fade-in-up" | "fade-in-left" | "fade-in-right";
  /** Delay in milliseconds once the element scrolls into view. */
  delay?: number;
  duration?: "normal" | "slow";
  className?: string;
};

/**
 * Plays an entrance animation the first time the element scrolls into view,
 * mirroring the Elementor entrance animations on the original site.
 *
 * Content is visible by default: it is only hidden (`data-reveal="pending"`) once
 * JavaScript has confirmed it starts below the fold, so a script or CSS failure
 * never leaves it invisible.
 */
export function Reveal({ children, animation, delay = 0, duration = "normal", className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || element.getBoundingClientRect().top < window.innerHeight) return;

    element.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          element.dataset.reveal = "shown";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      delete element.dataset.reveal;
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={
        {
          "--reveal-name": animation,
          "--reveal-duration": duration === "slow" ? "2s" : "1.25s",
          "--reveal-delay": `${delay}ms`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
