import { Facebook, Instagram } from "lucide-react";
import Logo from "./Logo";
import { NAV_LINKS, SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-black/[0.08] bg-linen">
      {/* Massive outlined ghost wordmark — purely decorative */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none px-6 pt-10 md:px-10"
      >
        <span
          className="block font-heading font-semibold italic leading-none"
          style={{
            fontSize: "15vw",
            color: "transparent",
            WebkitTextStroke: "1px rgba(184,149,106,0.18)",
          }}
        >
          X3
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-10 md:px-10">
        {/* Three-column grid */}
        <div className="grid grid-cols-1 gap-10 border-t border-black/[0.08] pt-12 md:grid-cols-3">
          {/* Logo + tagline */}
          <div>
            <div className="flex items-center gap-2.5">
              <Logo size={34} className="text-ink" />
              <span className="font-body text-xs font-medium uppercase tracking-[0.3em] text-ink">
                Kuaför
              </span>
            </div>
            <p className="mt-5 max-w-xs font-body text-sm font-light italic text-taupe">
              {SITE.tagline}
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Alt menü">
            <p className="mb-5 font-body text-[0.65rem] font-medium uppercase tracking-[0.2em] text-taupe">
              Keşfet
            </p>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-[40px] items-center font-body text-sm font-light text-ink transition-colors hover:text-rosegold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div>
            <p className="mb-5 font-body text-[0.65rem] font-medium uppercase tracking-[0.2em] text-taupe">
              Takip Edin
            </p>
            <div className="-ml-3 flex items-center gap-1">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-rosegold"
              >
                <Instagram size={22} strokeWidth={1.5} />
              </a>
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-rosegold"
              >
                <Facebook size={22} strokeWidth={1.5} />
              </a>
            </div>
            <p className="mt-6 font-body text-sm font-light text-taupe">
              {SITE.phoneDisplay}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-black/[0.08] pt-6">
          <p className="font-body text-xs font-light text-taupe">
            © {new Date().getFullYear()} X3 Kuaför. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
