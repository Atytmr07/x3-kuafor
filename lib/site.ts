/**
 * Single source of truth for all of X3 Kuaför's real contact details and
 * shared media. Every component imports from here so a number or handle is
 * only ever written once.
 */

export const SITE = {
  name: "X3 Kuaför",
  tagline: "Exquisite Hair, Exclusive You.",
  taglineTr: "Mükemmel saç, sadece bir randevu uzağınızda.",

  phoneDisplay: "(0242) 323 23 14",
  phoneHref: "tel:+902423232314",

  whatsapp: "https://wa.me/902423232314",

  instagramHandle: "@x3kuafor",
  instagram: "https://www.instagram.com/x3kuafor/",
  facebook: "https://www.facebook.com/",

  addressShort: "Çağlayan, Barınaklar Blv. No:18/A",
  addressFull: "Çağlayan, Barınaklar Blv. No:18/A, 07230 Muratpaşa/Antalya",
  hours: "Pazartesi–Cumartesi: 09:00–19:30",

  rating: "4.8",
  reviewCount: 124,

  // Google Maps embed for the salon location (Muratpaşa, Antalya).
  mapEmbed:
    "https://www.google.com/maps?q=Çağlayan,%20Barınaklar%20Blv.%20No:18/A,%2007230%20Muratpaşa/Antalya&output=embed",
} as const;

export const NAV_LINKS = [
  { label: "Hizmetler", href: "#hizmetler" },
  { label: "Galeri", href: "#galeri" },
  { label: "Yorumlar", href: "#yorumlar" },
  { label: "İletişim", href: "#iletisim" },
] as const;

/**
 * Editorial hair/salon photography (Unsplash) used as production-quality
 * placeholders. Swap the URLs for the studio's own shots when available.
 */
export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1100&q=80",
  gallery: [
    {
      src: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80",
      alt: "Balayage saç rengi — X3 Kuaför Antalya",
    },
    {
      src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=80",
      alt: "Precision saç kesimi ve fön — X3 Kuaför Antalya",
    },
    {
      src: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80",
      alt: "Ombre saç boyama dönüşümü — X3 Kuaför Antalya",
    },
    {
      src: "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?auto=format&fit=crop&w=800&q=80",
      alt: "Gelin saçı ve makyaj uygulaması — X3 Kuaför Antalya",
    },
    {
      src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=800&q=80",
      alt: "Doğal dalgalı saç stili — X3 Kuaför Antalya",
    },
    {
      src: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=800&q=80",
      alt: "Modern saç tasarımı portresi — X3 Kuaför Antalya",
    },
  ],
} as const;
