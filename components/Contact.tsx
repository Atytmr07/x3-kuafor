"use client";

import { motion } from "framer-motion";
import { Clock, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Reveal from "./Reveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { SITE } from "@/lib/site";

interface ContactInfo {
  Icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

const INFO: ContactInfo[] = [
  {
    Icon: MapPin,
    label: "Adres",
    value: SITE.addressFull,
    href: "https://www.google.com/maps?q=Çağlayan,%20Barınaklar%20Blv.%20No:18/A,%20Muratpaşa/Antalya",
  },
  { Icon: Phone, label: "Telefon", value: SITE.phoneDisplay, href: SITE.phoneHref },
  { Icon: Clock, label: "Çalışma Saatleri", value: SITE.hours },
  {
    Icon: Instagram,
    label: "Instagram",
    value: SITE.instagramHandle,
    href: SITE.instagram,
  },
];

export default function Contact() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section
      id="iletisim"
      aria-label="İletişim ve randevu"
      className="relative bg-canvas px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Left: contact info + map */}
        <Reveal>
          <p className="mb-4 font-body text-xs font-medium uppercase tracking-[0.28em] text-rosegold">
            İletişim
          </p>
          <h2 className="mb-10 font-heading text-5xl font-medium italic text-ink md:text-6xl">
            Bize Ulaşın
          </h2>

          <ul className="space-y-6">
            {INFO.map(({ Icon, label, value, href }) => {
              const content = (
                <div className="flex items-start gap-4">
                  <Icon
                    size={20}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0 text-rosegold"
                  />
                  <div>
                    <p className="font-body text-[0.65rem] font-medium uppercase tracking-[0.2em] text-taupe">
                      {label}
                    </p>
                    <p className="mt-1 font-body text-base font-light text-ink">
                      {value}
                    </p>
                  </div>
                </div>
              );
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="group block transition-opacity hover:opacity-70"
                    >
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </li>
              );
            })}
          </ul>

          {/* Map embed, warmed to match the ivory palette */}
          <div className="mt-10 overflow-hidden border border-black/[0.08]">
            <iframe
              src={SITE.mapEmbed}
              title="X3 Kuaför konum haritası"
              width="100%"
              height="280"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="map-ivory block w-full"
            />
          </div>
        </Reveal>

        {/* Right: CTA block */}
        <Reveal
          delay={0.1}
          className="flex flex-col justify-center border border-black/[0.08] bg-linen p-10 md:p-14"
        >
          <span className="grain-layer" aria-hidden="true" />
          <div className="relative">
            <h3 className="font-heading text-5xl font-medium italic text-ink md:text-6xl">
              Randevunuzu Alın
            </h3>
            <p className="mt-5 max-w-sm font-body text-base font-light leading-relaxed text-taupe">
              WhatsApp üzerinden hızlıca randevu oluşturun. Size en uygun saati
              birlikte belirleyelim.
            </p>

            <motion.a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="mt-9 flex w-full items-center justify-center gap-3 border border-rosegold px-8 py-4 font-body text-xs font-medium uppercase tracking-[0.18em] text-rosegold transition-colors duration-[250ms] ease-out hover:bg-rosegold hover:text-canvas"
            >
              <MessageCircle size={18} strokeWidth={1.75} />
              WhatsApp&apos;tan Yaz
            </motion.a>

            <a
              href={SITE.phoneHref}
              className="mt-4 inline-flex min-h-[44px] items-center font-body text-sm font-light text-taupe underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              Bizi Arayın
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
