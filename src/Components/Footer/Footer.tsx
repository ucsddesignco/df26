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
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  const [breakpoint, setBreakpoint] = useState<FooterBreakpoint>("desktop");
  const bannerRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const isButtonVisibleRef = useRef(false);
  /** Pixel `x` for Framer (closed matches prior ~0.5% of door width; open = peek past wall inner edges). */
  const [doorMotionPx, setDoorMotionPx] = useState<DoorMotionPx>({
    leftClosed: 0,
    leftOpen: 0,
    rightClosed: 0,
    rightOpen: 0,
  });
  /** After at least one good layout measure; avoids locking motion at 0 if Safari opens before first measure. */
  const doorMotionTrustRef = useRef(false);
  const useSimpleDoorOpenMotion = isLikelyAppleSafari();

  const updateDoorMotionPx = useCallback(() => {
    const banner = bannerRef.current;
    if (!banner) return;
    // Once we have a good measure, avoid thrashing state on every ResizeObserver tick.
    if (doorMotionTrustRef.current) return;
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

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const banner = bannerRef.current;
    const leftEl = leftDoorRef.current;
    const rightEl = rightDoorRef.current;
    if (!banner || !leftEl || !rightEl) return;

    // Ensure initial state is "closed" before ScrollTrigger starts.
    gsap.set(leftEl, { x: doorMotionPx.leftClosed, scale: 1, force3D: true });
    gsap.set(rightEl, { x: doorMotionPx.rightClosed, scale: 1, force3D: true });

    const setDoorPosition = (open01: number) => {
      const t = Math.min(1, Math.max(0, open01));
      const doorScale = (layoutByBreakpoint[breakpoint]?.doors.scale ?? 1) as number;

      if (useSimpleDoorOpenMotion) {
        const lx = doorMotionPx.leftClosed + (doorMotionPx.leftOpen - doorMotionPx.leftClosed) * t;
        const rx =
          doorMotionPx.rightClosed + (doorMotionPx.rightOpen - doorMotionPx.rightClosed) * t;
        gsap.set(leftEl, { x: lx, scale: doorScale });
        gsap.set(rightEl, { x: rx, scale: doorScale });
      } else {
        // Keep the same subtle "bounce" feel, but driven by scroll progress.
        const lKeys = withOpenBounce(doorMotionPx.leftClosed, doorMotionPx.leftOpen);
        const rKeys = withOpenBounce(doorMotionPx.rightClosed, doorMotionPx.rightOpen);
        const lIdx = Math.min(lKeys.length - 1, Math.floor(t * (lKeys.length - 1)));
        const rIdx = Math.min(rKeys.length - 1, Math.floor(t * (rKeys.length - 1)));
        const lLocalT = (t * (lKeys.length - 1)) - lIdx;
        const rLocalT = (t * (rKeys.length - 1)) - rIdx;
        const lx = lKeys[lIdx] + (lKeys[lIdx + 1] - lKeys[lIdx]) * (isFinite(lLocalT) ? lLocalT : 0);
        const rx = rKeys[rIdx] + (rKeys[rIdx + 1] - rKeys[rIdx]) * (isFinite(rLocalT) ? rLocalT : 0);
        gsap.set(leftEl, { x: lx, scale: doorScale });
        gsap.set(rightEl, { x: rx, scale: doorScale });
      }

      const nextButtonVisible = t > 0.82;
      if (nextButtonVisible !== isButtonVisibleRef.current) {
        isButtonVisibleRef.current = nextButtonVisible;
        setIsButtonVisible(nextButtonVisible);
      }
    };

    const trigger = ScrollTrigger.create({
      trigger: banner,
      // More scroll distance => slower open/close.
      start: "top 75%",
      end: "bottom 5%",
      // Add a bit of smoothing so motion feels heavier/slower.
      scrub: 3,
      onUpdate: (self) => {
        // Open as we approach center, then close as we leave (door "breathes" with scroll).
        const p = self.progress; // 0..1
        const open01 = p <= 0.5 ? p * 2 : (1 - p) * 2; // 0..1..0
        setDoorPosition(open01);
      },
      onRefresh: () => {
        // Keep visuals in sync after layout refresh.
        setDoorPosition(isButtonVisibleRef.current ? 1 : 0);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [breakpoint, doorMotionPx, useSimpleDoorOpenMotion]);

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

  const layoutBreakpoint: FooterBreakpoint =
    breakpoint === "tablet" ? "tablet-custom" : breakpoint;
  const activeLayout = layoutByBreakpoint[layoutBreakpoint];
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
          delay: FOOTER_BUTTON_ENTER_DELAY_S,
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
    [],
  );

  return (
    <footer>
      <div className="banner-wrapper">
        <div
          ref={bannerRef}
          className={`banner banner--${breakpoint}`}
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
            <div
              ref={leftDoorRef}
              className="door-wrapper left"
              style={doorStyle}
            >
              <ResponsiveLeftDoor theme={theme} breakpoint={breakpoint} />
            </div>

            {/* RIGHT DOOR */}
            <div
              ref={rightDoorRef}
              className="door-wrapper right"
              style={doorStyle}
            >
              <ResponsiveRightDoor theme={theme} breakpoint={breakpoint} />
            </div>

            <div className="backdrop">
              <ResponsiveBackdrop theme={theme} breakpoint={breakpoint} />
            </div>
          </div>

          <AnimatePresence>
            {isButtonVisible && (
              <motion.button
                type="button"
                className="footer-banner-button"
                key="footer-button"
                variants={footerButtonVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
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
