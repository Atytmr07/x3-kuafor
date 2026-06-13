import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "X3 Kuaför | Antalya Premium Saç Tasarım Salonu",
    short_name: "X3 Kuaför",
    description:
      "Antalya Muratpaşa'da lüks saç kesimi, balayage, ombre ve makyaj.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF8F5",
    theme_color: "#FAF8F5",
    lang: "tr",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
