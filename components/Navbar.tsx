"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { NAV_LINKS, SITE } from "@/lib/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Transparent → ivory glass after 80px of scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <motion.nav
      aria-label="Main navigation"
      initial={false}
      animate={{
        backgroundColor: scrolled ? "rgba(250,248,245,0.9)" : "rgba(250,248,245,0)",
        borderColor: scrolled ? "rgba(26,23,20,0.07)" : "rgba(26,23,20,0)",
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md ${
        scrolled ? "backdrop-blur-md" : "backdrop-blur-0"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        {/* Brand */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-ink"
          aria-label="X3 Kuaför — ana sayfa"
        >
          <Logo size={30} className="text-ink" />
          <span className="font-body text-xs font-medium uppercase tracking-[0.3em] text-ink">
            Kuaför
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-flex min-h-[44px] items-center font-body text-xs font-medium uppercase tracking-[0.2em] text-ink transition-colors duration-200 hover:text-rosegold"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <motion.a
          href={SITE.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="hidden border border-rosegold px-5 py-2.5 font-body text-[0.7rem] font-medium uppercase tracking-[0.18em] text-rosegold transition-colors duration-[250ms] ease-out hover:bg-rosegold hover:text-canvas md:inline-block"
        >
          WhatsApp&apos;tan Randevu Al
        </motion.a>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Menüyü aç"
          className="flex h-11 w-11 items-center justify-center text-ink md:hidden"
        >
          <Menu size={24} strokeWidth={1.5} />
        </button>
      </div>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col bg-canvas md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-2.5">
                <Logo size={30} className="text-ink" />
                <span className="font-body text-xs font-medium uppercase tracking-[0.3em] text-ink">
                  Kuaför
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Menüyü kapat"
                className="flex h-11 w-11 items-center justify-center text-ink"
              >
                <X size={26} strokeWidth={1.5} />
              </button>
            </div>

            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
              }}
              className="flex flex-1 flex-col justify-center gap-8 px-8"
            >
              {NAV_LINKS.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, x: 40 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-heading text-3xl italic text-ink transition-colors hover:text-rosegold"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  hidden: { opacity: 0, x: 40 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="pt-4"
              >
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="inline-block border border-rosegold px-6 py-3 font-body text-xs font-medium uppercase tracking-[0.18em] text-rosegold transition-colors hover:bg-rosegold hover:text-canvas"
                >
                  WhatsApp&apos;tan Randevu Al
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
