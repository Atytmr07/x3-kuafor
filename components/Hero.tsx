"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Instagram } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { IMAGES, SITE } from "@/lib/site";

const HEADLINE = "Antalya'nın En Seçkin Saç Deneyimi.";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  // Parallax: the hero image drifts at ~0.25x scroll speed.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const words = HEADLINE.split(" ");

  // Kinetic headline — staggered word entrance.
  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.08, delayChildren: 0.1 },
    },
  };
  const word = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <header
      ref={heroRef}
      className="relative w-full overflow-hidden bg-canvas md:min-h-screen"
    >
      {/* Desktop image column — absolute right 45%, full height */}
      <div className="absolute right-0 top-0 hidden h-full w-[45%] overflow-hidden md:block">
        <motion.div
          style={{ y: reduceMotion ? 0 : imageY }}
          className="absolute inset-x-0 -top-[10%] h-[120%]"
        >
          <Image
            src={IMAGES.hero}
            alt="X3 Kuaför stilisti tarafından şekillendirilmiş zarif saç tasarımı"
            fill
            priority
            sizes="45vw"
            className="object-cover object-top"
          />
        </motion.div>
        {/* Left-edge gradient fade blending photo into the ivory canvas */}
        <div className="absolute inset-y-0 left-0 w-[35%] bg-gradient-to-r from-canvas to-transparent" />
      </div>

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

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-center px-6 pb-16 pt-24 md:min-h-screen md:px-10 md:pb-0 md:pt-0">
        {/* Mobile banner image */}
        <div className="relative mb-8 h-[60vw] w-full overflow-hidden md:hidden">
          <Image
            src={IMAGES.hero}
            alt="X3 Kuaför stilisti tarafından şekillendirilmiş zarif saç tasarımı"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-canvas to-transparent" />
        </div>

        <div className="md:max-w-[58%] md:pr-8">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6 font-body text-xs font-medium uppercase tracking-[0.28em] text-rosegold"
          >
            Antalya · Muratpaşa
          </motion.p>

          {/* Kinetic headline */}
          <motion.h1
            variants={container}
            initial="hidden"
            animate="visible"
            className="font-heading text-[clamp(3rem,7vw,7.5rem)] font-normal italic leading-[0.92] tracking-[-0.02em] text-ink"
          >
            {words.map((w, i) => (
              <motion.span
                key={`${w}-${i}`}
                variants={word}
                className="mr-[0.22em] inline-block"
              >
                {w}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
            className="mt-7 max-w-md font-body text-lg font-light leading-relaxed text-taupe"
          >
            {SITE.taglineTr}
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease: "easeOut" }}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            <motion.a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="border border-rosegold px-8 py-4 font-body text-xs font-medium uppercase tracking-[0.18em] text-rosegold transition-colors duration-[250ms] ease-out hover:bg-rosegold hover:text-canvas"
            >
              WhatsApp&apos;tan Randevu Al
            </motion.a>

            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-[44px] items-center gap-2.5 text-ink transition-colors hover:text-rosegold"
            >
              <Instagram size={20} strokeWidth={1.5} />
              <span className="font-body text-sm font-light tracking-wide">
                {SITE.instagramHandle}
              </span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={26} strokeWidth={1.25} className="text-rosegold" />
        </motion.div>
      </motion.div>
    </header>
  );
}
