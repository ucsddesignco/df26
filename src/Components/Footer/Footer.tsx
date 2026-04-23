import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import "./Footer.scss";
import { useSiteTheme } from "../../context/SiteThemeContext";
import {
  ResponsiveBackdrop,
  ResponsiveFooterButton,
  ResponsiveLeftDoor,
  ResponsiveRightDoor,
  ResponsiveTrainWall,
  type FooterBreakpoint,
} from "./assets/FooterResponsiveAssets";

const FOOTER_BUTTON_ENTER_DELAY_S = 0.24;

const MOBILE_BREAKPOINT = 440;
const TABLET_CUSTOM_BREAKPOINT = 712;
const TABLET_BREAKPOINT = 744;
const DESKTOP_EDGE_BREAKPOINT = 1280;
const DOOR_MOTION_EASE: [number, number, number, number] = [0.45, 0, 0.35, 1];
const DOOR_MOTION_TRANSITION = { duration: 0.95, ease: DOOR_MOTION_EASE };
/** Delay door open only when opened by scrolling into view; click-to-open stays immediate. */
const DOOR_VIEWPORT_OPEN_DELAY_S = 0.42;

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

type WallLayout = LayoutPreset["walls"]["left"];
type DoorMotionPx = {
  leftClosed: number;
  leftOpen: number;
  rightClosed: number;
  rightOpen: number;
};

function withOpenBounce(fromX: number, targetX: number): number[] {
  const direction = targetX === 0 ? 1 : Math.sign(targetX);
  const overshoot = Math.max(6, Math.abs(targetX) * 0.035);
  return [fromX, targetX + direction * overshoot, targetX];
}

/** True Safari (not Chrome/Edge on macOS): multi-keyframe `x` + heavy SVG filters often glitch on WebKit. */
function isLikelyAppleSafari(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /AppleWebKit/i.test(ua) && !/(Chrome|Chromium|CriOS|Edg)/i.test(ua);
}

const layoutByBreakpoint: Partial<Record<FooterBreakpoint, LayoutPreset>> = {
  tablet: {
    doors: { width: 321, height: 715, top: -130, scale: 1 },
    walls: {
      left: { width: 644, height: 317, top: "50%", offset: -660, scale: 1.5 },
      right: { width: 644, height: 317, top: "50%", offset: -660, scale: 1.5 },
    },
  },
  "tablet-custom": {
    // Custom 441-712 range: tune these values independently.
    doors: { width: 306, height: 680, top: -118, scale: 1 },
    walls: {
      left: { width: 644, height: 317, top: "50%", offset: -720, scale: 1.5 },
      right: { width: 644, height: 317, top: "50%", offset: -716, scale: 1.5 },
    },
  },
  mobile: {
    doors: { width: 182, height: 402, top: -87, scale: 1 },
    walls: {
      left: { width: 346, height: 224, top: "50%", offset: -387, scale: 1.5 },
      right: { width: 346, height: 224, top: "50%", offset: -387, scale: 1.5 },
    },
  },
};

function toWallStyle(side: "left" | "right", wall: WallLayout): CSSProperties {
  return {
    width: wall.width,
    height: wall.height,
    top: wall.top,
    transform: `translateY(-50%) scale(${wall.scale})`,
    ...(side === "left" ? { left: wall.offset } : { right: wall.offset }),
  };
}

export default function Footer() {
  const { theme } = useSiteTheme();
  const [isOpen, setIsOpen] = useState(false);
  /** When true, the door reached open state via IntersectionObserver (not banner click). */
  const [doorOpenViaViewport, setDoorOpenViaViewport] = useState(false);
  const [breakpoint, setBreakpoint] = useState<FooterBreakpoint>("desktop");
  const bannerRef = useRef<HTMLDivElement>(null);
  /** Tracks last observed intersection so we only react to enter/leave, not spurious IO callbacks (common on Safari). */
  const wasIntersectingRef = useRef(false);
  /** Pixel `x` for Framer (closed matches prior ~0.5% of door width; open = peek past wall inner edges). */
  const [doorMotionPx, setDoorMotionPx] = useState<DoorMotionPx>({
    leftClosed: 0,
    leftOpen: 0,
    rightClosed: 0,
    rightOpen: 0,
  });
  const isOpenRef = useRef(isOpen);
  /** After at least one good layout measure; avoids locking motion at 0 if Safari opens before first measure. */
  const doorMotionTrustRef = useRef(false);
  const useSimpleDoorOpenMotion = isLikelyAppleSafari();

  const updateDoorMotionPx = useCallback(() => {
    const banner = bannerRef.current;
    if (!banner) return;
    // Re-measuring while open retargets Framer mid-animation — skip only once layout is trusted.
    if (isOpenRef.current && doorMotionTrustRef.current) return;
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
    if (leftW < 2 || rightW < 2 || cr.width < 2) return;

    const leftClosed = leftW * 0.005;
    const rightClosed = -rightW * 0.005;

    const leftOpen = leftWallInnerRight + peekPx - centerX;
    const rightOpen = rightWallInnerLeft - peekPx - centerX;

    doorMotionTrustRef.current = true;

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

  const scheduleRemeasureDoorMotion = useCallback(() => {
    updateDoorMotionPx();
    requestAnimationFrame(() => {
      updateDoorMotionPx();
      requestAnimationFrame(updateDoorMotionPx);
    });
  }, [updateDoorMotionPx]);

  useLayoutEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useLayoutEffect(() => {
    if (!isOpen) {
      scheduleRemeasureDoorMotion();
    }
  }, [isOpen, scheduleRemeasureDoorMotion]);

  useLayoutEffect(() => {
    doorMotionTrustRef.current = false;
    scheduleRemeasureDoorMotion();
    const banner = bannerRef.current;
    if (!banner) return;
    const ro = new ResizeObserver(() => scheduleRemeasureDoorMotion());
    ro.observe(banner);
    window.addEventListener("resize", scheduleRemeasureDoorMotion);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", scheduleRemeasureDoorMotion);
    };
  }, [scheduleRemeasureDoorMotion, breakpoint]);

  useEffect(() => {
    const onLoad = () => scheduleRemeasureDoorMotion();
    window.addEventListener("load", onLoad);
    if (document.readyState === "complete") onLoad();
    return () => window.removeEventListener("load", onLoad);
  }, [scheduleRemeasureDoorMotion]);

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width <= MOBILE_BREAKPOINT) {
        setBreakpoint("mobile");
        return;
      }
      if (width <= TABLET_CUSTOM_BREAKPOINT) {
        setBreakpoint("tablet-custom");
        return;
      }
      if (width <= TABLET_BREAKPOINT) {
        setBreakpoint("tablet");
        return;
      }
      if (width <= DESKTOP_EDGE_BREAKPOINT) {
        setBreakpoint("desktop-edge");
        return;
      }
      setBreakpoint("desktop");
    };

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const intersecting = entry.isIntersecting;
        const wasIntersecting = wasIntersectingRef.current;
        wasIntersectingRef.current = intersecting;

        if (intersecting && !wasIntersecting) {
          setDoorOpenViaViewport(true);
          setIsOpen(true);
        } else if (!intersecting && wasIntersecting) {
          setDoorOpenViaViewport(false);
          setIsOpen(false);
        }
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(banner);
    return () => observer.disconnect();
  }, []);

  const layoutBreakpoint: FooterBreakpoint =
    breakpoint === "tablet" ? "tablet-custom" : breakpoint;
  const activeLayout = layoutByBreakpoint[layoutBreakpoint];
  const doorScale = activeLayout?.doors.scale ?? 1;
  const doorStyle: CSSProperties | undefined = activeLayout
    ? {
        width: activeLayout.doors.width,
        height: activeLayout.doors.height,
        top: activeLayout.doors.top,
      }
    : undefined;
  const wallStyleBySide: Record<"left" | "right", CSSProperties | undefined> = {
    left: activeLayout ? toWallStyle("left", activeLayout.walls.left) : undefined,
    right: activeLayout ? toWallStyle("right", activeLayout.walls.right) : undefined,
  };

  const doorTransition = {
    ...DOOR_MOTION_TRANSITION,
    delay: isOpen && doorOpenViaViewport ? DOOR_VIEWPORT_OPEN_DELAY_S : 0,
  };

  const footerButtonVariants = useMemo(
    (): Variants => ({
      hidden: { opacity: 0, x: "-50%", y: "-50%", scale: 0.97 },
      visible: {
        opacity: 1,
        x: "-50%",
        y: "-50%",
        scale: 1,
        transition: {
          duration: 0.34,
          delay:
            FOOTER_BUTTON_ENTER_DELAY_S +
            (doorOpenViaViewport ? DOOR_VIEWPORT_OPEN_DELAY_S : 0),
          ease: [0.65, 0, 0.35, 1],
        },
      },
      exit: {
        opacity: 0,
        x: "-50%",
        y: "-50%",
        scale: 0.985,
        transition: { duration: 0.36, ease: [0.65, 0, 1, 1] },
      },
    }),
    [doorOpenViaViewport],
  );

  return (
    <footer>
      <div className="banner-wrapper">
        <div
          ref={bannerRef}
          className={`banner banner--${breakpoint}`}
          onClick={() => {
            setDoorOpenViaViewport(false);
            setIsOpen((prev) => !prev);
          }}
        >
          <ResponsiveTrainWall
            side="left"
            theme={theme}
            breakpoint={breakpoint}
            style={wallStyleBySide.left}
          />
          <ResponsiveTrainWall
            side="right"
            theme={theme}
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
                x: isOpen
                  ? useSimpleDoorOpenMotion
                    ? doorMotionPx.leftOpen
                    : withOpenBounce(doorMotionPx.leftClosed, doorMotionPx.leftOpen)
                  : doorMotionPx.leftClosed,
                scale: doorScale,
              }}
              transition={doorTransition}
            >
              <ResponsiveLeftDoor theme={theme} breakpoint={breakpoint} />
            </motion.div>

            {/* RIGHT DOOR */}
            <motion.div
              className="door-wrapper right"
              initial={false}
              style={doorStyle}
              animate={{
                x: isOpen
                  ? useSimpleDoorOpenMotion
                    ? doorMotionPx.rightOpen
                    : withOpenBounce(doorMotionPx.rightClosed, doorMotionPx.rightOpen)
                  : doorMotionPx.rightClosed,
                scale: doorScale,
              }}
              transition={doorTransition}
            >
              <ResponsiveRightDoor theme={theme} breakpoint={breakpoint} />
            </motion.div>

            <div className="backdrop">
              <ResponsiveBackdrop theme={theme} breakpoint={breakpoint} />
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
        <p>Spring 2026</p>
      </div>
    </footer>
  );
}
