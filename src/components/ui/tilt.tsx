"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type TiltProps = {
  children: ReactNode;
  /** Maximum rotation in degrees when the pointer is at the edge of the section. */
  maxDegrees?: number;
  className?: string;
};

/**
 * 3D tilt that follows the mouse across the closest parent <section>,
 * like Elementor's "3D Tilt" mouse effect. Disabled for touch and reduced motion.
 */
export function Tilt({ children, maxDegrees = 10, className }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const area = element?.closest("section");
    if (!element || !area) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) {
      return;
    }

    let frame = 0;
    const set = (x: number, y: number) => {
      element.style.setProperty("--tilt-x", `${(-y * 2 * maxDegrees).toFixed(2)}deg`);
      element.style.setProperty("--tilt-y", `${(x * 2 * maxDegrees).toFixed(2)}deg`);
    };
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = area.getBoundingClientRect();
        set((event.clientX - rect.left) / rect.width - 0.5, (event.clientY - rect.top) / rect.height - 0.5);
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      set(0, 0);
    };

    area.addEventListener("pointermove", onMove);
    area.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      area.removeEventListener("pointermove", onMove);
      area.removeEventListener("pointerleave", onLeave);
    };
  }, [maxDegrees]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-transform duration-300 ease-out [transform:perspective(1200px)_rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))]",
        className,
      )}
    >
      {children}
    </div>
  );
}
