"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { SITE } from "@/lib/site";

interface Testimonial {
  name: string;
  text: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sema T.",
    text: "7 yıldır yaşadığım Antalya'da ilk defa mutlu ayrıldığım kuaför salonu. İlker Bey'e iletişimi ve yaptığı saç kesimi için teşekkür ederim.",
  },
  {
    name: "Merve A.",
    text: "X3 ekibi, güler yüzlü personel, kalite hizmet, temiz ve elegant bir ortam. Bugün çok memnun kaldım, emeğinize sağlık.",
  },
  {
    name: "Seval K.",
    text: "İstanbul'dan gelip bu kadar harika bir işletmeyle karşılaşacağımı sanmıyordum. Sibel Hanım'ın makyajı ve Vedat Bey'in saç çalışması harikaydı.",
  },
];

function Stars() {
  return (
    <div className="flex gap-1" aria-label="5 üzerinden 5 yıldız">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={16} className="fill-rosegold text-rosegold" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="yorumlar"
      aria-label="Müşteri yorumları"
      className="relative bg-canvas px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading + rating badge */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-14 flex flex-col items-center text-center"
        >
          <p className="mb-4 font-body text-xs font-medium uppercase tracking-[0.28em] text-rosegold">
            Yorumlar
          </p>
          <h2 className="font-heading text-[2.75rem] font-medium italic leading-[1] text-ink md:text-6xl">
            Müşterilerimiz Ne Diyor?
          </h2>
          <p className="mt-6 font-heading text-2xl italic text-ink">
            <span className="text-rosegold">★</span> {SITE.rating} / 5
            <span className="ml-3 font-body text-xs font-medium uppercase tracking-[0.2em] text-taupe">
              {SITE.reviewCount} Google Yorumu
            </span>
          </p>
        </motion.div>

        {/* Cards: snap-scroll row on mobile, 3-col grid on desktop */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="snap-x-row -mx-6 flex gap-4 overflow-x-auto px-6 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0"
        >
          {TESTIMONIALS.map((t) => (
            <motion.article
              key={t.name}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex min-w-[82%] snap-start flex-col rounded-none border border-black/[0.08] bg-linen p-8 sm:min-w-[60%] md:min-w-0"
            >
              <Stars />
              <p className="mt-6 flex-1 font-heading text-xl font-normal italic leading-snug text-ink">
                “{t.text}”
              </p>
              <div className="mt-8 border-t border-black/[0.08] pt-5">
                <p className="font-body text-sm font-semibold text-ink">
                  {t.name}
                </p>
                <p className="mt-1 font-body text-xs font-light text-taupe">
                  Google Yorumu
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
