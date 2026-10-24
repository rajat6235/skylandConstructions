"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  animation: "fade-in-up" | "fade-in-left" | "fade-in-right";
  /** Delay in milliseconds once the element scrolls into view. */
  delay?: number;
  duration?: "normal" | "slow";
  className?: string;
};

/**
 * Plays an entrance animation the first time the element scrolls into view,
 * mirroring the Elementor entrance animations on the original site.
 */
export function Reveal({ children, animation, delay = 0, duration = "normal", className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal=""
      data-revealed={revealed ? "" : undefined}
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
