"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ZoomIn } from "lucide-react";
import Reveal from "./Reveal";
import { IMAGES } from "@/lib/site";

// Varied aspect ratios give the masonry wall its editorial rhythm.
const ASPECTS = [
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-[4/5]",
  "aspect-square",
];

function GalleryItem({
  src,
  alt,
  aspect,
}: {
  src: string;
  alt: string;
  aspect: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="group relative mb-3 break-inside-avoid overflow-hidden border border-black/[0.06]">
      <div className={`relative w-full ${aspect}`}>
        {/* Shimmer skeleton — visible until the image finishes loading */}
        {!loaded && (
          <div className="shimmer absolute inset-0 animate-shimmer bg-[#DDD8D0]" />
        )}
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onLoad={() => setLoaded(true)}
          className={`object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Hover overlay: ivory gradient + zoom affordance */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-t from-canvas/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <ZoomIn size={28} strokeWidth={1.25} className="text-ink" />
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <section
      id="galeri"
      aria-label="Galeri"
      className="relative overflow-hidden bg-putty px-6 py-24 md:px-10 md:py-32"
    >
      {/* Decorative botanical line — draws itself on scroll-in */}
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        fill="none"
        className="pointer-events-none absolute -right-6 -top-6 h-48 w-48 md:h-72 md:w-72"
      >
        <motion.path
          d="M20 180 C 40 120, 10 80, 70 70 S 120 30, 110 10 C 150 40, 190 30, 180 90 S 130 140, 180 180"
          stroke="#B8956A"
          strokeOpacity={0.4}
          strokeWidth={1.5}
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
      </motion.svg>

      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 md:text-right">
          <p className="mb-4 font-body text-xs font-medium uppercase tracking-[0.28em] text-rosegold">
            Galeri
          </p>
          <h2 className="font-heading text-5xl font-medium italic text-ink md:text-6xl">
            Dönüşüm Hikayeleri
          </h2>
        </Reveal>

        <Reveal className="columns-1 gap-3 sm:columns-2 lg:columns-3">
          {IMAGES.gallery.map((img, i) => (
            <GalleryItem
              key={img.src}
              src={img.src}
              alt={img.alt}
              aspect={ASPECTS[i % ASPECTS.length]}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
