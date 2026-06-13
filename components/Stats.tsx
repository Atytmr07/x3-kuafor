"use client";

import { useCountUp } from "@/hooks/useCountUp";

interface Stat {
  end: number;
  decimals?: number;
  suffix?: string;
  label: string;
}

const STATS: Stat[] = [
  { end: 124, suffix: "+", label: "Mutlu Müşteri" },
  { end: 4.8, decimals: 1, label: "Google Puanı" },
  { end: 10, suffix: "+", label: "Yıl Deneyim" },
];

function StatItem({ stat }: { stat: Stat }) {
  const { count, ref } = useCountUp({
    end: stat.end,
    decimals: stat.decimals ?? 0,
    duration: 1800,
  });

  return (
    <div className="flex flex-col items-center text-center">
      <span
        ref={ref as React.RefObject<HTMLSpanElement>}
        className="font-heading text-6xl italic text-ink md:text-7xl"
      >
        {count}
        {stat.suffix ?? ""}
      </span>
      <span className="mt-3 font-body text-xs font-medium uppercase tracking-[0.2em] text-taupe">
        {stat.label}
      </span>
    </div>
  );
}

export default function Stats() {
  return (
    <section
      aria-label="Rakamlarla X3 Kuaför"
      className="relative overflow-hidden bg-putty px-6 py-20 md:px-10 md:py-24"
    >
      {/* Grain overlay for tactile depth on the darkest ivory surface */}
      <span className="grain-layer" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-12 md:flex-row md:justify-between md:gap-0">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="flex flex-1 items-center justify-center"
          >
            <StatItem stat={stat} />
            {/* Vertical divider between stats (desktop only) */}
            {i < STATS.length - 1 && (
              <span
                aria-hidden="true"
                className="ml-12 hidden h-16 w-[1px] bg-black/[0.10] md:block"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
