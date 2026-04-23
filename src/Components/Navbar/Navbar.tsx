import "./Navbar.scss";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { MenuIcon, type MenuIconHandle } from "./Hamburger";

const NAV_LINKS = [
  { label: "About", href: "https://designatucsd.com/about" },
  { label: "Events", href: "https://designatucsd.com/events" },
  { label: "Community", href: "https://designatucsd.com/community" },
  { label: "Contact", href: "https://designatucsd.com/contact" },
] as const;

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuIconRef = useRef<MenuIconHandle | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [navHeight, setNavHeight] = useState(0);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    if (isMenuOpen) menuIconRef.current?.startAnimation();
    else menuIconRef.current?.stopAnimation();
  }, [isMenuOpen]);

  useLayoutEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const measure = () => setNavHeight(el.offsetHeight || 0);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    // Keep navbar visible while menu is open.
    if (isMenuOpen) {
      setIsNavVisible(true);
      return;
    }

    lastScrollYRef.current = window.scrollY ?? 0;
    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY ?? 0;
        const last = lastScrollYRef.current;
        const delta = y - last;
        lastScrollYRef.current = y;

        // Always show near the top.
        if (y < 24) {
          setIsNavVisible(true);
          return;
        }

        // Small deadzone to avoid flicker from tiny scroll updates.
        if (Math.abs(delta) < 6) return;

        if (delta > 0) setIsNavVisible(false); // scrolling down
        else setIsNavVisible(true); // scrolling up
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  return (
    <>
      {/* Preserve layout so fixed navbar doesn't cover content */}
      <div className="navbar-spacer" aria-hidden style={{ height: navHeight }} />

      <div
        ref={navRef}
        className={`navbar-container ${isNavVisible ? "" : "navbar-container--hidden"}`}
      >
        <span className="navbar-logo">
          <Logo />
          <a href="https://designatucsd.com/" className="navbar-logo-text">
            Design Co
          </a>
        </span>

        <ul className="span-navbar" aria-label="Primary navigation">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="hamburger-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((o) => !o)}
        >
          <MenuIcon ref={menuIconRef} size={25} />
        </button>

        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.button
                type="button"
                className="navbar-drawer-overlay"
                aria-label="Close menu"
                onClick={() => setIsMenuOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              />

              <motion.aside
                className="navbar-drawer"
                role="dialog"
                aria-label="Menu"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 340, damping: 34 }}
              >
                <nav className="navbar-drawer__nav" aria-label="Mobile navigation">
                  <ul className="navbar-drawer__list">
                    {NAV_LINKS.map((l) => (
                      <li key={l.href}>
                        <a href={l.href} onClick={() => setIsMenuOpen(false)}>
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};