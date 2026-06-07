"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/",          label: "Home"     },
  { href: "/#services", label: "Services" },
  { href: "/#rates",    label: "Rates"    },
  { href: "/about",     label: "About"    },
  { href: "/#contact",  label: "Contact"  },
];

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      // Change style when scrolled past roughly the hero section height (e.g. 80vh)
      const heroHeight = window.innerHeight * 0.8;
      setIsScrolled(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCloseMobileMenu = () => setIsMobileMenuOpen(false);

  // Determine nav style based on scroll position and current page
  // On home page: transparent -> white on scroll
  // On other pages: always 'scrolled' style (white bg, black text) OR transparent if at top but with black text?
  // User request: "about pages top portion is alos white so we need black font color from the top of the page"
  // Simplest approach: Treat non-home pages as "scrolled" style always, or at least force the dark text/white bg look.
  const useDarkNav = !isHome || isScrolled;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 h-16 sm:h-20 pointer-events-none"
    >
      <nav
        className="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-full pointer-events-auto"
        aria-label="Main navigation"
      >
        <div className="w-10 shrink-0" aria-hidden />

        {/* Centered floating pill with glassmorphism */}
        <ul
          className={`hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full px-5 py-2 transition-all duration-300 ${useDarkNav
            ? "bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-charcoal/5"
            : "bg-white/[0.04] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-white/10"
            }`}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${useDarkNav
                  ? "text-charcoal hover:text-[#f72a42] hover:bg-black/5"
                  : "text-white/95 hover:text-white hover:bg-white/5"
                  }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className={`ml-1 pl-4 border-l ${useDarkNav ? "border-charcoal/10" : "border-white/10"}`}>
            <Link
              href="/track"
              className="track-button"
            >
              <span>Track</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
            </Link>
          </li>
          <li>
            <Link
              href="/#rates"
              className="ml-1 px-4 py-2 rounded-full text-sm font-bold text-white bg-brand-grad shadow-[0_2px_14px_rgba(247,42,66,0.35)] hover:shadow-[0_4px_20px_rgba(255,106,19,0.45)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 whitespace-nowrap"
            >
              Get a Quote
            </Link>
          </li>
        </ul>

        <div className="flex shrink-0 w-10 justify-end">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent ${useDarkNav
              ? "text-charcoal hover:bg-black/5 focus:ring-charcoal"
              : "text-white hover:bg-white/10 focus:ring-white"
              }`}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white/98 backdrop-blur-xl border-t border-charcoal/10"
          >
            <ul className="flex flex-col px-4 py-4 gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={handleCloseMobileMenu}
                    className="block py-3 text-charcoal hover:text-[#f72a42] font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-gray-100 mt-2 flex flex-col gap-2">
                <Link
                  href="/track"
                  onClick={handleCloseMobileMenu}
                  className="flex justify-center items-center gap-2 w-full py-3 rounded-xl bg-primary text-white font-bold"
                >
                  Track Shipment
                </Link>
                <Link
                  href="/#rates"
                  onClick={handleCloseMobileMenu}
                  className="flex justify-center items-center gap-2 w-full py-3 rounded-xl border-2 border-accent text-accent font-bold hover:bg-accent hover:text-white transition-all duration-200"
                >
                  Get a Quote
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navigation;
