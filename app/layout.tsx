import type { Metadata, Viewport } from "next";
import { Cormorant, Montserrat } from "next/font/google";
import "./globals.css";

const SITE_URL = "https://x3kuafor.com";

// Self-hosted via next/font — no render-blocking external request, no layout
// shift. latin-ext is required for Turkish glyphs (ş, ğ, ı, İ, ç, ö, ü).
const cormorant = Cormorant({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "X3 Kuaför | Antalya'nın Premium Saç Tasarım Salonu",
  description:
    "Antalya Muratpaşa'da lüks saç kesimi, balayage, ombre ve makyaj. Randevu için WhatsApp: +90 (242) 323 23 14",
  keywords: [
    "Antalya kuaför",
    "Muratpaşa saç tasarım",
    "balayage Antalya",
    "ombre saç",
    "lüks kuaför",
    "saç kesimi Antalya",
    "makyaj Antalya",
    "X3 Kuaför",
  ],
  authors: [{ name: "X3 Kuaför" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "X3 Kuaför | Antalya'nın Premium Saç Tasarım Salonu",
    description:
      "Antalya Muratpaşa'da lüks saç kesimi, balayage, ombre ve makyaj. Randevu için WhatsApp: +90 (242) 323 23 14",
    url: SITE_URL,
    siteName: "X3 Kuaför",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "X3 Kuaför — Antalya Premium Saç Tasarım Salonu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "X3 Kuaför | Antalya'nın Premium Saç Tasarım Salonu",
    description:
      "Antalya Muratpaşa'da lüks saç kesimi, balayage, ombre ve makyaj. Randevu için WhatsApp: +90 (242) 323 23 14",
    images: [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  // OpenGraph protocol has no "local.business" type; we declare the
  // business intent explicitly and pair it with JSON-LD below.
  other: {
    "og:type": "business.business",
    "business:contact_data:locality": "Antalya",
    "business:contact_data:region": "Muratpaşa",
    "business:contact_data:country_name": "Türkiye",
    "business:contact_data:phone_number": "+902423232314",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF8F5",
  width: "device-width",
  initialScale: 1,
};

// Schema.org LocalBusiness / HairSalon — the correct, machine-readable
// way to express a local business to search engines.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "X3 Kuaför",
  image:
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
  "@id": SITE_URL,
  url: SITE_URL,
  telephone: "+902423232314",
  priceRange: "₺₺₺",
  slogan: "Exquisite Hair, Exclusive You.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Çağlayan Mah. Barınaklar Blv. No:18/A",
    addressLocality: "Muratpaşa",
    addressRegion: "Antalya",
    postalCode: "07230",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 36.8841,
    longitude: 30.7056,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "19:30",
    },
  ],
  sameAs: ["https://www.instagram.com/x3kuafor/"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "124",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
