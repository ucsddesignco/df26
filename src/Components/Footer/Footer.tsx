import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import "./Footer.scss";
// import Button from "../Button/Button";
// import DCoArrow from "../../SVGS/DCoArrow";
import type { ThemeType } from "../../types/theme";
import {
  ResponsiveBackdrop,
  ResponsiveFooterButton,
  ResponsiveLeftDoor,
  ResponsiveRightDoor,
  ResponsiveTrainWall,
  type FooterBreakpoint,
} from "./assets/FooterResponsiveAssets";

const footerButtonVariants: Variants = {
  hidden: { opacity: 0, x: "-50%", y: "-50%" },
  visible: {
    opacity: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.35, delay: 0.45, ease: [0.65, 0, 0.35, 1] },
  },
  exit: {
    opacity: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.3, ease: [0.65, 0, 0.35, 1] },
  },
};

const MOBILE_BREAKPOINT = 392;
const TABLET_BREAKPOINT = 744;

type LayoutPreset = {
  doors: {
    width: number;
    height: number;
    top: number;
    scale: number;
  };
  walls: {
    left: {
      width: number;
      height: number;
      top: string;
      offset: number;
      scale: number;
    };
    right: {
      width: number;
      height: number;
      top: string;
      offset: number;
      scale: number;
    };
  };
};

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme] = useState<ThemeType>("night");
  const [breakpoint, setBreakpoint] = useState<FooterBreakpoint>("desktop");
  const bannerRef = useRef<HTMLDivElement>(null);
  /** Pixel `x` for Framer (closed matches prior ~0.5% of door width; open = peek past wall inner edges). */
  const [doorMotionPx, setDoorMotionPx] = useState({
    leftClosed: 0,
    leftOpen: 0,
    rightClosed: 0,
    rightOpen: 0,
  });

  const updateDoorMotionPx = useCallback(() => {
    const banner = bannerRef.current;
    if (!banner) return;
    const container = banner.querySelector(".container") as HTMLElement | null;
    const leftWall = banner.querySelector(".wall--left") as HTMLElement | null;
    const rightWall = banner.querySelector(".wall--right") as HTMLElement | null;
    const leftDoor = banner.querySelector(".door-wrapper.left") as HTMLElement | null;
    const rightDoor = banner.querySelector(".door-wrapper.right") as HTMLElement | null;
    if (!container || !leftWall || !rightWall || !leftDoor || !rightDoor) return;

    const cr = container.getBoundingClientRect();
    const centerX = cr.width / 2;
    const leftWallInnerRight = leftWall.getBoundingClientRect().right - cr.left;
    const rightWallInnerLeft = rightWall.getBoundingClientRect().left - cr.left;

    const peekPx = Math.min(52, Math.max(12, cr.width * 0.02));

    const leftW = leftDoor.offsetWidth;
    const rightW = rightDoor.offsetWidth;
    const leftClosed = leftW * 0.005;
    const rightClosed = -rightW * 0.005;

    const leftOpen = leftWallInnerRight + peekPx - centerX;
    const rightOpen = rightWallInnerLeft - peekPx - centerX;

    setDoorMotionPx((prev) => {
      if (
        prev.leftClosed === leftClosed &&
        prev.leftOpen === leftOpen &&
        prev.rightClosed === rightClosed &&
        prev.rightOpen === rightOpen
      ) {
        return prev;
      }
      return { leftClosed, leftOpen, rightClosed, rightOpen };
    });
  }, []);

  useLayoutEffect(() => {
    updateDoorMotionPx();
    const banner = bannerRef.current;
    if (!banner) return;
    const ro = new ResizeObserver(() => updateDoorMotionPx());
    ro.observe(banner);
    window.addEventListener("resize", updateDoorMotionPx);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateDoorMotionPx);
    };
  }, [updateDoorMotionPx, breakpoint]);

  useEffect(() => {
    const updateBreakpoint = () => {
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        setBreakpoint("mobile");
        return;
      }
      if (window.innerWidth <= TABLET_BREAKPOINT) {
        setBreakpoint("tablet");
        return;
      }
      setBreakpoint("desktop");
    };

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  const layoutByBreakpoint: Partial<Record<FooterBreakpoint, LayoutPreset>> = {
    tablet: {
      doors: { width: 321, height: 715, top: -130, scale: 1 },
      walls: {
        left: { width: 644, height: 317, top: "50%", offset: -660, scale: 1.5 },
        right: { width: 644, height: 317, top: "50%", offset: -660, scale: 1.5 },
      },
    },
    mobile: {
      doors: { width: 169, height: 375, top: -76, scale: 1 },
      walls: {
        left: { width: 346, height: 224, top: "50%", offset: -385, scale: 1.5 },
        right: { width: 346, height: 224, top: "50%", offset: -385, scale: 1.5 },
      },
    },
  };
  const activeLayout = layoutByBreakpoint[breakpoint];
  const doorScale = activeLayout?.doors.scale ?? 1;
  const doorStyle: CSSProperties | undefined = activeLayout
    ? {
        width: activeLayout.doors.width,
        height: activeLayout.doors.height,
        top: activeLayout.doors.top,
      }
    : undefined;
  const wallStyleBySide: Record<"left" | "right", CSSProperties | undefined> = {
    left: activeLayout
      ? {
          width: activeLayout.walls.left.width,
          height: activeLayout.walls.left.height,
          top: activeLayout.walls.left.top,
          left: activeLayout.walls.left.offset,
          transform: `translateY(-50%) scale(${activeLayout.walls.left.scale})`,
        }
      : undefined,
    right: activeLayout
      ? {
          width: activeLayout.walls.right.width,
          height: activeLayout.walls.right.height,
          top: activeLayout.walls.right.top,
          right: activeLayout.walls.right.offset,
          transform: `translateY(-50%) scale(${activeLayout.walls.right.scale})`,
        }
      : undefined,
  };

  return (
    <footer>
      <div className="banner-wrapper">
        <div
          ref={bannerRef}
          className={`banner banner--${breakpoint}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <ResponsiveTrainWall
            side="left"
            theme={currentTheme}
            breakpoint={breakpoint}
            style={wallStyleBySide.left}
          />
          <ResponsiveTrainWall
            side="right"
            theme={currentTheme}
            breakpoint={breakpoint}
            style={wallStyleBySide.right}
          />
          <div className="container">
            {/* Left Door Wrapper */}
            <motion.div
              className="door-wrapper left"
              initial={false}
              style={doorStyle}
              animate={{
                x: isOpen ? doorMotionPx.leftOpen : doorMotionPx.leftClosed,
                scale: doorScale,
              }}
              transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
            >
              <ResponsiveLeftDoor theme={currentTheme} breakpoint={breakpoint} />
            </motion.div>

            {/* RIGHT DOOR */}
            <motion.div
              className="door-wrapper right"
              initial={false}
              style={doorStyle}
              animate={{
                x: isOpen ? doorMotionPx.rightOpen : doorMotionPx.rightClosed,
                scale: doorScale,
              }}
              transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
            >
              <ResponsiveRightDoor theme={currentTheme} breakpoint={breakpoint} />
            </motion.div>

            <div className="backdrop">
              <ResponsiveBackdrop theme={currentTheme} breakpoint={breakpoint} />
            </div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.button
                type="button"
                className="footer-banner-button"
                key="footer-button"
                variants={footerButtonVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
              >
                <ResponsiveFooterButton breakpoint={breakpoint} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="footer-text">
        <p>Made with &lt;3 by Design Co</p>
        <p>Winter 2026</p>
      </div>
    </footer>
  );
}
