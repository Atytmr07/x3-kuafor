"use client";

import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  /** Final value to count up to. */
  end: number;
  /** Duration of the animation in milliseconds. */
  duration?: number;
  /** Number of decimal places to render. */
  decimals?: number;
}

interface UseCountUpReturn {
  /** Formatted current value, ready to render. */
  count: string;
  /** Attach to the element that should trigger the count on view. */
  ref: React.RefObject<HTMLElement>;
}

/**
 * Scratch-built count-up hook — no external dependency.
 *
 * Drives a number from 0 → `end` using requestAnimationFrame with an
 * easeOut cubic curve, and fires exactly once when the bound element
 * scrolls into view (via IntersectionObserver). Honours
 * prefers-reduced-motion by snapping straight to the final value.
 */
export function useCountUp({
  end,
  duration = 1800,
  decimals = 0,
}: UseCountUpOptions): UseCountUpReturn {
  const ref = useRef<HTMLElement>(null);
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const run = () => {
      if (hasRun.current) return;
      hasRun.current = true;

      if (reduceMotion) {
        setValue(end);
        return;
      }

      let startTime: number | null = null;
      const tick = (now: number) => {
        if (startTime === null) startTime = now;
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setValue(end * easeOutCubic(progress));
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          setValue(end);
        }
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration]);

  const count = value.toLocaleString("tr-TR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return { count, ref };
}
