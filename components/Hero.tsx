"use client";

import { Fragment, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import Logo from "./Logo";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { IMAGES, SITE } from "@/lib/site";

// Headline built as styled lines; every word animates in individually.
// A small roman opener gives way to a large italic statement — editorial
// hierarchy rather than one flat string. "atölyesi" (atelier) is the niche,
// Parisian-leaning word and gets the rose-gold accent.
const LINES: { cls: string; words: string[] }[] = [
  { cls: "text-[0.34em] not-italic font-medium uppercase tracking-[0.06em]", words: ["Antalya'nın"] },
  { cls: "italic", words: ["en", "seçkin"] },
  { cls: "italic", words: ["saç", "atölyesi."] },
];

const ACCENT_WORD = "atölyesi.";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  // Subtle parallax: framed portrait and ghost monogram drift on scroll.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -56]);
  const monoY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.07, delayChildren: 0.15 },
    },
  };
  const word = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 64 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
    },
  };
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: "easeOut" as const },
  });

  return (
    <header
      ref={heroRef}
      className="relative w-full overflow-hidden bg-canvas"
    >
      {/* feTurbulence grain overlay — full-bleed, ultra-low opacity */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03]"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="hero-noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves={3}
              stitchTiles="stitch"
            />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#hero-noise)" />
      </svg>

      {/* Giant ghost monogram — brand watermark, drifts with scroll */}
      <motion.div
        aria-hidden="true"
        style={{ y: reduceMotion ? 0 : monoY }}
        className="pointer-events-none absolute -left-10 top-[14%] -z-0 opacity-[0.05] md:left-[36%] md:top-[8%]"
      >
        <Logo size={260} className="text-rosegold md:hidden" />
        <Logo size={520} className="hidden text-rosegold md:block" />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-start px-6 pb-16 pt-24 md:justify-center md:px-10 md:pb-20 md:pt-28">
        <div className="flex flex-col gap-7 md:grid md:grid-cols-12 md:items-center md:gap-x-12 md:gap-y-6">
          {/* ── Masthead meta bar ── */}
          <motion.div
            {...fadeUp(0)}
            className="order-1 flex items-center gap-4 md:col-span-7 md:col-start-1"
          >
            <span className="font-body text-[0.65rem] font-medium uppercase tracking-[0.3em] text-rosegold">
              Est. 2014
            </span>
            <span className="h-[1px] w-10 bg-ink/20" />
            <span className="font-body text-[0.65rem] font-medium uppercase tracking-[0.3em] text-taupe">
              Muratpaşa · Antalya
            </span>
          </motion.div>

          {/* ── Kinetic headline ── */}
          <motion.h1
            variants={container}
            initial="hidden"
            animate="visible"
            className="order-2 flex flex-wrap items-baseline font-heading font-light leading-[0.92] tracking-[-0.02em] text-ink md:col-span-7 md:col-start-1 text-[clamp(2.9rem,8.5vw,6.6rem)]"
          >
            {LINES.map((line, li) => (
              <Fragment key={li}>
                {line.words.map((w, wi) => (
                  <motion.span
                    key={`${li}-${wi}`}
                    variants={word}
                    className={`mr-[0.2em] inline-block ${line.cls} ${
                      w === ACCENT_WORD ? "text-rosegold" : ""
                    }`}
                  >
                    {w}
                  </motion.span>
                ))}
                {li < LINES.length - 1 && (
                  <span aria-hidden className="basis-full" />
                )}
              </Fragment>
            ))}
          </motion.h1>

          {/* ── Framed matted portrait ── */}
          <motion.div
            style={{ y: reduceMotion ? 0 : imageY }}
            className="order-3 md:col-start-8 md:col-span-5 md:row-start-1 md:row-span-5 md:self-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Offset rose-gold frame — the "matted print" look */}
              <span
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 h-full w-full border border-rosegold/45 md:-bottom-4 md:-right-4"
              />
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-ink/80 md:aspect-[3/4]">
                <Image
                  src={IMAGES.hero}
                  alt="X3 Kuaför atölyesinde şekillendirilmiş zarif, ışıltılı saç"
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 40vw"
                  className="object-cover object-top"
                />
                {/* Editorial caption chip */}
                <figcaption className="absolute bottom-0 left-0 flex items-center gap-2 bg-canvas px-4 py-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-rosegold" />
                  <span className="font-body text-[0.6rem] font-medium uppercase tracking-[0.22em] text-ink">
                    Balayage · Çağlayan
                  </span>
                </figcaption>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Subline ── */}
          <motion.p
            {...fadeUp(0.95)}
            className="order-4 max-w-md font-body text-base font-light leading-relaxed text-taupe md:col-span-6 md:col-start-1 md:text-lg"
          >
            {SITE.taglineTr} Kesim, renk ve stil; tek bir imzada buluşuyor.
          </motion.p>

          {/* ── CTA row ── */}
          <motion.div
            {...fadeUp(1.1)}
            className="order-5 flex flex-col gap-4 sm:flex-row sm:items-center md:col-span-7 md:col-start-1"
          >
            <motion.a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="group inline-flex items-center justify-center gap-2 border border-rosegold px-8 py-4 font-body text-xs font-medium uppercase tracking-[0.18em] text-rosegold transition-colors duration-[250ms] ease-out hover:bg-rosegold hover:text-canvas"
            >
              WhatsApp&apos;tan Randevu Al
              <ArrowUpRight
                size={16}
                strokeWidth={1.75}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.a>

            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center font-body text-sm font-light tracking-wide text-ink underline-offset-4 transition-colors hover:text-rosegold hover:underline"
            >
              {SITE.instagramHandle}
            </a>
          </motion.div>

          {/* ── Rating ── */}
          <motion.div
            {...fadeUp(1.25)}
            className="order-6 flex items-center gap-3 md:col-span-7 md:col-start-1"
          >
            <div className="flex gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className="fill-rosegold text-rosegold" />
              ))}
            </div>
            <span className="font-body text-xs font-light text-taupe">
              <span className="font-medium text-ink">{SITE.rating}</span> /5 ·{" "}
              {SITE.reviewCount} Google yorumu
            </span>
          </motion.div>
        </div>

        {/* Scroll cue — vertical line + label */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        >
          <span className="font-body text-[0.6rem] font-medium uppercase tracking-[0.25em] text-taupe">
            Keşfet
          </span>
          <motion.span
            animate={reduceMotion ? undefined : { scaleY: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ originY: 0 }}
            className="h-10 w-[1px] bg-gradient-to-b from-rosegold to-transparent"
          />
        </motion.div>
      </div>
    </header>
  );
}
