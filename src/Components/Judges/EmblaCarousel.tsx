import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import "./Caraousel.scss";
import { Judge1 } from "./../../SVGS/Judges/Judge1";
import { Judge2 } from "./../../SVGS/Judges/Judge2";
import { Judge3 } from "./../../SVGS/Judges/Judge3";
import { Judge4 } from "./../../SVGS/Judges/Judge4";
import { Judge5 } from "./../../SVGS/Judges/Judge5";
import { BigFlower } from "./Themes/BigFlower";
import { BigLeaf } from "./Themes/Bigleaf";
import { BigStar } from "./Themes/BigStar";
import { themeIllustrationCrossfadeTransition } from "../../context/SiteThemeContext";

type EmblaCarouselTheme = "day" | "evening" | "night";

type EmblaCarouselProps = {
  theme?: EmblaCarouselTheme;
};

function EmblaSlideThemeDecor({
  theme,
  themeClassName,
}: {
  theme: EmblaCarouselTheme;
  themeClassName: string;
}) {
  const reduceMotion = useReducedMotion();
  const t = themeIllustrationCrossfadeTransition(reduceMotion);
  const decor =
    theme === "day" ? (
      <BigFlower className={themeClassName} />
    ) : theme === "evening" ? (
      <BigLeaf className={themeClassName} />
    ) : (
      <BigStar className={themeClassName} />
    );

  return (
    <div className="embla__slideThemeDecorMount">
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={theme}
          className="embla__slideThemeDecorMotion"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={t}
        >
          {decor}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export const EmblaCarousel = ({ theme = "day" }: EmblaCarouselProps) => {
  const reduceMotion = useReducedMotion();

  const themeClassName =
    theme === "day"
      ? "embla__themeIcon--day"
      : theme === "evening"
        ? "embla__themeIcon--evening"
        : "embla__themeIcon--night";

  const slides = useMemo(
    () => [
      <Judge1 key="j1" href="https://www.linkedin.com/in/jiamingjessyli/" ariaLabel="Jessy Li Profile" />,
      <Judge2 key="j2" href="https://www.linkedin.com/in/wyemunchin/" ariaLabel="Wye Mun Chin Profile" />,
      <Judge3 key="j3" href="https://www.linkedin.com/in/rheaacharyadesign/" ariaLabel="Rhea Acharya Profile" />,
      <Judge4 key="j4" href="https://www.linkedin.com/in/rinatakikawa/" ariaLabel="Rina Takikawa Profile" />,
      <Judge5 key="j5" href="https://www.linkedin.com/in/jarenz/" ariaLabel="Jarenz Castillo Profile" />,
    ],
    [],
  );

  const setARef = useRef<HTMLDivElement | null>(null);
  const setBRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const loopWidthRef = useRef(0);
  const isDraggingRef = useRef(false);
  const speedRef = useRef(1);       // 1 = full speed, 0 = fully stopped
  const easeRafRef = useRef<number | null>(null); // tracks in-flight ease rAF
  const x = useMotionValue(0);

  // Tune speed here (px/sec)
  const AUTO_PX_PER_SEC = reduceMotion ? 0 : 32;

  useLayoutEffect(() => {
    const measure = () => {
      const setA = setARef.current;
      const setB = setBRef.current;
      const track = trackRef.current;
      if (!setA || !setB || !track) return;

      // The start-to-start distance between duplicated sets is the true loop size.
      const startToStart = setB.offsetLeft - setA.offsetLeft;
      // Safari can occasionally report unstable offset positions; scrollWidth/2 is
      // a reliable fallback because track contains exactly two identical sets.
      const halfTrackWidth = track.scrollWidth / 2;
      const measured = halfTrackWidth > 0 ? halfTrackWidth : startToStart;

      if (measured > 0) {
        loopWidthRef.current = measured;
      }
    };

    measure();

    // iOS Safari can finalize layout after first paint; re-measure again.
    const rafId = requestAnimationFrame(measure);
    const timeoutId = window.setTimeout(measure, 180);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && setARef.current) {
      resizeObserver = new ResizeObserver(measure);
      resizeObserver.observe(setARef.current);
    }

    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, []);

  // Cancel any in-flight ease rAF before starting a new one
  const cancelEase = () => {
    if (easeRafRef.current !== null) {
      cancelAnimationFrame(easeRafRef.current);
      easeRafRef.current = null;
    }
  };

  const wrapToLoopRange = (value: number) => {
    const loopW = loopWidthRef.current;
    if (!loopW) return value;

    let wrapped = value;
    while (wrapped <= -loopW) wrapped += loopW;
    while (wrapped > 0) wrapped -= loopW;
    return wrapped;
  };

  const handleMouseEnter = () => {
    cancelEase();
    // Exponential decay toward 0 — lower = slower/smoother stop (try 0.80–0.92)
    const ease = () => {
      speedRef.current = speedRef.current * 0.85;
      if (speedRef.current > 0.01) {
        easeRafRef.current = requestAnimationFrame(ease);
      } else {
        speedRef.current = 0;
        easeRafRef.current = null;
      }
    };
    easeRafRef.current = requestAnimationFrame(ease);
  };

  const handleMouseLeave = () => {
    cancelEase();
    // Lerp back to 1 — lower = slower ramp-up (try 0.05–0.12)
    const ease = () => {
      speedRef.current = speedRef.current + (1 - speedRef.current) * 0.08;
      if (speedRef.current < 0.99) {
        easeRafRef.current = requestAnimationFrame(ease);
      } else {
        speedRef.current = 1;
        easeRafRef.current = null;
      }
    };
    easeRafRef.current = requestAnimationFrame(ease);
  };

  useAnimationFrame((_, deltaMs) => {
    if (isDraggingRef.current) return;
    const loopW = loopWidthRef.current;
    if (!loopW || speedRef.current === 0) return;

    const deltaPx = (AUTO_PX_PER_SEC * deltaMs * speedRef.current) / 1000;
    const next = x.get() - deltaPx;

    // Wrap into [-loopW, 0)
    x.set(wrapToLoopRange(next));
  });

  return (
    <div className="embla" data-theme={theme}>
      <div
        className="judges-loop"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onWheel={(event) => {
          const loopW = loopWidthRef.current;
          if (!loopW) return;

          // Only react to explicit horizontal wheel/trackpad movement.
          if (event.deltaX === 0) return;

          event.preventDefault();
          isDraggingRef.current = false;
          const WHEEL_SCROLL_MULTIPLIER = 0.65;
          x.set(wrapToLoopRange(x.get() - event.deltaX * WHEEL_SCROLL_MULTIPLIER));
        }}
      >
        <motion.div
          ref={trackRef}
          className="judges-loop__track"
          style={{ x }}
          drag="x"
          dragElastic={0.08}
          dragMomentum={true}
          onDragStart={() => {
            isDraggingRef.current = true;
          }}
          onDragEnd={() => {
            isDraggingRef.current = false;
            x.set(wrapToLoopRange(x.get()));
          }}
        >
          {/* Set A — measured for loop math */}
          <div ref={setARef} className="judges-loop__set" aria-hidden="false">
            {slides.map((judge, idx) => (
              <div key={`a-${idx}`} className="embla__slide">
                {judge}
                <EmblaSlideThemeDecor theme={theme} themeClassName={themeClassName} />
              </div>
            ))}
          </div>

          {/* Set B — aria-hidden duplicate */}
          <div ref={setBRef} className="judges-loop__set" aria-hidden="true">
            {slides.map((judge, idx) => (
              <div key={`b-${idx}`} className="embla__slide">
                {judge}
                <EmblaSlideThemeDecor theme={theme} themeClassName={themeClassName} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};