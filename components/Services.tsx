"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { useCountUp } from "@/hooks/useCountUp";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface Service {
  index: string;
  title: string;
  description: string;
  /** Tailwind grid-placement classes for the asymmetric desktop layout. */
  area: string;
  featured?: boolean;
}

const SERVICES: Service[] = [
  {
    index: "01",
    title: "Saç Kesimi",
    description:
      "Yüz hatlarınıza ve yaşam tarzınıza özel tasarlanan hassas kesim ve şekillendirme.",
    area: "md:col-start-1 md:row-start-1 md:row-span-2",
  },
  {
    index: "02",
    title: "Balayage & Ombre",
    description:
      "Doğal geçişlerle ışıltılı, bakımlı ve modern renk geçişleri.",
    area: "md:col-start-2 md:row-start-1",
    featured: true,
  },
  {
    index: "03",
    title: "Saç Boyama",
    description: "Sağlıklı saçlar için profesyonel renklendirme ve bakım.",
    area: "md:col-start-2 md:row-start-2",
  },
  {
    index: "04",
    title: "Makyaj & Stil",
    description:
      "Özel günler ve davetler için bütünleyici makyaj ve stil danışmanlığı.",
    area: "md:col-span-2 md:row-start-3",
  },
];

function ServiceTile({ service }: { service: Service }) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className={`group relative flex min-h-[200px] flex-col justify-between border border-black/[0.08] bg-linen p-7 transition-colors duration-500 hover:bg-[#EFEAE3] ${service.area} ${
        service.featured ? "border-t-2 border-t-rosegold" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <span className="font-heading text-2xl italic text-rosegold/70">
          {service.index}
        </span>
        {service.featured && (
          <span className="font-body text-[0.6rem] font-medium uppercase tracking-[0.2em] text-rosegold">
            Öne Çıkan
          </span>
        )}
      </div>

      <div>
        <h3 className="font-heading text-3xl font-medium text-ink md:text-4xl">
          {service.title}
        </h3>
        <p className="mt-3 max-w-sm font-body text-sm font-light leading-relaxed text-taupe">
          {service.description}
        </p>
        {/* Gold underline that expands edge-to-edge on hover */}
        <div className="mt-5 h-[1px] w-12 bg-rosegold transition-all duration-500 ease-out group-hover:w-full" />
      </div>
    </motion.article>
  );
}

export default function Services() {
  const reduceMotion = usePrefersReducedMotion();
  const { count, ref } = useCountUp({ end: 124, duration: 1800 });

  return (
    <section
      id="hizmetler"
      aria-label="Hizmetlerimiz"
      className="relative bg-canvas px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading row */}
        <Reveal className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 font-body text-xs font-medium uppercase tracking-[0.28em] text-rosegold">
              Hizmetlerimiz
            </p>
            <h2 className="font-heading text-5xl font-medium italic leading-[0.95] text-ink md:text-6xl">
              Sanatımız, Hizmetimiz
            </h2>
          </div>

          <div className="text-left md:text-right">
            <span
              ref={ref as React.RefObject<HTMLSpanElement>}
              className="block font-heading text-5xl italic text-ink md:text-6xl"
            >
              {count}+
            </span>
            <span className="font-body text-xs font-medium uppercase tracking-[0.2em] text-taupe">
              Mutlu Müşteri
            </span>
          </div>
        </Reveal>

        {/* Asymmetric editorial grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.12 } },
          }}
          className="grid grid-cols-1 gap-3 md:grid-cols-2 md:grid-rows-[220px_220px_220px]"
        >
          {SERVICES.map((service) => (
            <ServiceTile key={service.index} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
