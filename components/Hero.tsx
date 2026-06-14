"use client";

import { Fragment, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Phone, Star } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { IMAGES, SITE } from "@/lib/site";

// Mixed roman + italic kinetic headline; "atölyesi" gets the rose-gold accent.
const LINES: { cls: string; words: string[] }[] = [
  { cls: "text-[0.3em] not-italic font-medium uppercase tracking-[0.14em] text-taupe", words: ["Antalya'nın"] },
  { cls: "italic", words: ["en", "seçkin"] },
  { cls: "italic", words: ["saç", "atölyesi."] },
];
const ACCENT_WORD = "atölyesi.";

const MARQUEE = [
  "Balayage",
  "Ombré",
  "Saç Kesimi",
  "Keratin Bakım",
  "Fön & Şekillendirme",
  "Gelin Saçı",
  "Saç Boyama",
  "Makyaj",
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const detailY = useTransform(scrollYProgress, [0, 1], [0, 36]);

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
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-canvas"
    >
      {/* feTurbulence grain overlay */}
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

      {/* ───── Main hero content ───── */}
      <div className="relative z-10 flex flex-1 flex-col justify-start pt-24 md:justify-center md:pt-28">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="flex flex-col gap-8 md:grid md:grid-cols-12 md:items-center md:gap-x-12 md:gap-y-5">
            {/* Masthead meta bar */}
            <motion.div
              {...fadeUp(0)}
              className="order-1 flex items-center gap-4 md:col-span-6 md:col-start-1"
            >
              <span className="font-body text-[0.65rem] font-medium uppercase tracking-[0.3em] text-rosegold">
                Est. 2014
              </span>
              <span className="h-[1px] w-10 bg-ink/20" />
              <span className="font-body text-[0.65rem] font-medium uppercase tracking-[0.3em] text-taupe">
                Muratpaşa · Antalya
              </span>
            </motion.div>

            {/* Kinetic headline */}
            <motion.h1
              variants={container}
              initial="hidden"
              animate="visible"
              className="order-2 flex flex-wrap items-baseline font-heading font-normal leading-[0.88] tracking-[-0.015em] text-ink md:col-span-6 md:col-start-1 text-[clamp(3rem,7.8vw,6.5rem)]"
            >
              {LINES.map((line, li) => (
                <Fragment key={li}>
                  {line.words.map((w, wi) => {
                    const isAccent = w === ACCENT_WORD;
                    return (
                      <motion.span
                        key={`${li}-${wi}`}
                        variants={word}
                        className={`relative mr-[0.2em] inline-block ${line.cls} ${
                          isAccent ? "font-medium text-rosegold" : ""
                        }`}
                      >
                        {w}
                        {isAccent && (
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 300 30"
                            fill="none"
                            preserveAspectRatio="none"
                            className="pointer-events-none absolute -bottom-[0.04em] left-[-3%] h-[0.28em] w-[106%] overflow-visible"
                          >
                            <motion.path
                              d="M4 22 C 72 31, 150 28, 220 18 C 256 13, 282 12, 296 6"
                              stroke="#B8956A"
                              strokeWidth={2.5}
                              strokeLinecap="round"
                              vectorEffect="non-scaling-stroke"
                              initial={{
                                pathLength: reduceMotion ? 1 : 0,
                                opacity: reduceMotion ? 1 : 0,
                              }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              transition={{
                                duration: 0.9,
                                delay: reduceMotion ? 0 : 1.3,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                            />
                          </svg>
                        )}
                      </motion.span>
                    );
                  })}
                  {li < LINES.length - 1 && (
                    <span aria-hidden className="basis-full" />
                  )}
                </Fragment>
              ))}
            </motion.h1>

            {/* ── Layered image cluster ── */}
            <motion.div
              style={{ y: reduceMotion ? 0 : imageY }}
              className="order-3 md:col-start-7 md:col-span-6 md:row-start-1 md:row-span-5 md:self-center"
            >
              <motion.div
                initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto w-[78%] max-w-[300px] sm:w-[62%] md:mr-0 md:w-[86%] md:max-w-none"
              >
                {/* Warm putty backing block — adds depth + breaks the ivory */}
                <span
                  aria-hidden="true"
                  className="absolute -right-4 -top-4 h-full w-full bg-putty md:-right-7 md:-top-7"
                />

                {/* Vertical editorial label (desktop) */}
                <span
                  aria-hidden="true"
                  className="absolute -right-3 top-1/2 hidden origin-center -translate-y-1/2 rotate-90 font-body text-[0.6rem] font-medium uppercase tracking-[0.35em] text-taupe md:block lg:-right-2"
                >
                  Saç Tasarım Atölyesi
                </span>

                {/* Main image */}
                <div className="relative aspect-[4/5] w-full overflow-hidden border border-ink/80">
                  <Image
                    src={IMAGES.hero}
                    alt="X3 Kuaför'de stilist tarafından şekillendirilen saç — fön ve stil"
                    fill
                    priority
                    sizes="(max-width: 768px) 78vw, 42vw"
                    className="object-cover object-center"
                  />
                  <figcaption className="absolute bottom-0 right-0 flex items-center gap-2 bg-canvas px-3 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-rosegold" />
                    <span className="font-body text-[0.58rem] font-medium uppercase tracking-[0.2em] text-ink">
                      Balayage &amp; Fön
                    </span>
                  </figcaption>
                </div>

                {/* Overlapping detail image */}
                <motion.div
                  style={{ y: reduceMotion ? 0 : detailY }}
                  className="absolute -bottom-7 -left-5 w-[46%] overflow-hidden border-[5px] border-canvas md:-bottom-10 md:-left-10 md:w-[44%] md:border-[7px]"
                >
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={IMAGES.heroDetail}
                      alt="Yakın çekim: fön fırçasıyla saç şekillendirme detayı"
                      fill
                      sizes="(max-width: 768px) 36vw, 18vw"
                      className="object-cover object-center"
                    />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Subline */}
            <motion.p
              {...fadeUp(0.95)}
              className="order-4 max-w-md font-body text-base font-light leading-relaxed text-taupe md:col-span-6 md:col-start-1 md:text-lg"
            >
              {SITE.taglineTr} Kesim, renk ve stil; tek bir imzada buluşuyor.
            </motion.p>

            {/* CTA row */}
            <motion.div
              {...fadeUp(1.1)}
              className="order-5 flex flex-col gap-4 sm:flex-row sm:items-center md:col-span-6 md:col-start-1"
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
                href={SITE.phoneHref}
                className="group inline-flex min-h-[44px] items-center gap-2.5 font-body text-sm font-light text-ink transition-colors hover:text-rosegold"
              >
                <Phone size={16} strokeWidth={1.5} className="text-rosegold" />
                <span className="border-b border-ink/15 pb-0.5 transition-colors duration-300 group-hover:border-rosegold">
                  Bizi Arayın
                </span>
              </a>
            </motion.div>

            {/* Rating */}
            <motion.div
              {...fadeUp(1.25)}
              className="order-6 flex items-center gap-3 md:col-span-6 md:col-start-1"
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
        </div>
      </div>

      {/* ───── Services marquee (full-bleed bottom band) ───── */}
      <div className="relative z-10 mt-12 overflow-hidden border-y border-black/[0.08] bg-canvas py-4 md:mt-0">
        <motion.div
          className="flex w-max items-center whitespace-nowrap"
          animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        >
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} className="flex items-center">
              <span className="mx-6 font-heading text-2xl italic text-ink/80 md:text-3xl">
                {item}
              </span>
              <span className="text-rosegold">✦</span>
            </span>
          ))}
        </motion.div>
      </div>
    </header>
  );
}
