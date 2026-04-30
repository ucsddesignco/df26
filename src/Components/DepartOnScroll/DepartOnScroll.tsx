import './DepartOnScroll.scss'
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import {
  motion,
  useScroll,
  useReducedMotion,
  useInView,
  useSpring,
  useTransform, 
  type Variants,
} from "framer-motion";

interface DepartOnScrollProps {
  children: React.ReactNode;
}

type TrainState = "offscreen" | "entering" | "parked" | "leaving" | "gone" | "arriving";

/** Helper function that uses Linear Interpolation (lerp) to continuously map
 * the window width to a percentage */
function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  const clampedValue = Math.min(Math.max(value, inMin), inMax);
  return ((clampedValue - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/** Helper function that calculates a single trigger threshold across the component */
const getResponsiveTriggerPercentage = (width: number) => {
  if (width <= 743) return 0.3;  // Mobile
  if (width <= 1279) return 0.4; // Tablet
  return 0.42;                   // Desktop Default
};

const getResponsiveParkedPosition = (width: number) => {
  let parkedPosition = "-98%";

  if (width <= 743) {
    const fluidPark = mapRange(width, 390, 743, -197, -103);
    parkedPosition = `${fluidPark}%`;
  } else if (width <= 1279) {
    const fluidPark = mapRange(width, 744, 1279, -142, -83);
    parkedPosition = `${fluidPark}%`;
  }

  return parkedPosition;
};

/**
 * Fully off-screen left, expressed as % of the animated element width, so Framer/CSS
 * always matches layout without depending on stale width state before measurement.
 *
 * Mirrors: parked_px - (viewport + elementWidth) → parked_% - (ratio)*100%.
 */
function getOffscreenLeftAsPercent(winWidth: number, elementWidth: number) {
  const parkedPct = parseFloat(getResponsiveParkedPosition(winWidth));
  const w = Math.max(1, elementWidth);
  const deltaPct = ((winWidth + w) / w) * 100;
  return `${parkedPct - deltaPct}%`;
}

export default function DepartOnScroll({ children }: DepartOnScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trainRef = useRef<HTMLDivElement>(null);
  const isIntersectingRef = useRef(true);

  const [trainState, setTrainState] = useState<TrainState>("entering");
  const reduceMotion = useReducedMotion();

  const isBrowser = typeof window !== "undefined";
  const [windowSize, setWindowSize] = useState({
    width: isBrowser ? window.innerWidth : 1280,
    height: isBrowser ? window.innerHeight : 800,
  });
  const [trainWidth, setTrainWidth] = useState<number | null>(null);

  const [exactTriggerPoint, setExactTriggerPoint] = useState(
    isBrowser ? window.innerHeight * 0.386 : 300
  );

  const bumpTrainWidthMeasure = () => {
    const el = trainRef.current;
    if (!el) return;
    const next = el.offsetWidth;
    setTrainWidth((prev) => (prev === next ? prev : next));
  };

  useLayoutEffect(() => {
    if (!isBrowser) return;
    bumpTrainWidthMeasure();
    if (typeof ResizeObserver === "undefined") return;
    const el = trainRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => bumpTrainWidthMeasure());
    ro.observe(el);
    return () => ro.disconnect();
  }, [isBrowser, windowSize.width, windowSize.height, trainState]);

  // Handles updating the window width state when the screen size changes
  useEffect(() => {
    if (!isBrowser) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [isBrowser]);


  const marginPercentage = getResponsiveTriggerPercentage(windowSize.width);
  const parallaxAmount = isBrowser ? windowSize.width * 0.2 : 50;

  useEffect(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const absoluteTop = rect.top + window.scrollY;
    const absoluteBottom = absoluteTop + rect.height;

    const triggerLineY = windowSize.height * marginPercentage; // Distance to trigger line
    const scrollDistanceToTrigger = absoluteBottom - triggerLineY; 

    // Prevent negative ranges which break Framer Motion
    if (scrollDistanceToTrigger > 0) {
      setExactTriggerPoint(scrollDistanceToTrigger);
    }
  }, [windowSize.width, windowSize.height, marginPercentage]);


  const { scrollY } = useScroll(); // Scroll sensor

  const rawParallaxX = useTransform(
    scrollY, 
    [0, exactTriggerPoint], 
    [0, parallaxAmount],
    { clamp: true }
  );
  
  const springParallaxX = useSpring(rawParallaxX, { 
    stiffness: 220, 
    damping: 40, 
    mass: 0.35 
  });

  const parallaxX = reduceMotion ? rawParallaxX : springParallaxX;

  const topMarginOffset = `-${marginPercentage * 100}%`;
  const isInView = useInView(containerRef, {
    margin: `${topMarginOffset} 0px 0px 0px` as `${number}% 0px 0px 0px`,
    amount: 0 // Equivalent to threshold: 0
  });

  useEffect(() => {
    isIntersectingRef.current = isInView;

    const stateTimer = setTimeout(() => {
      if (isInView) {
        setTrainState((prev) => {
          if (prev === "gone") return "arriving";
          return prev;
        });
      } else {
        setTrainState((prev) => {
        if (prev === "parked" || prev === "arriving") return "leaving";
          return prev;
        });
      }
    }, 0);

    return () => clearTimeout(stateTimer);
  }, [isInView]);

  type VariantCustom = { winWidth: number; trainWidth: number };

  const measuredOrFallbackW = trainWidth ?? windowSize.width;

  // Train Keyframes
  const trainVariants : Variants = {
    offscreen: ({ winWidth, trainWidth }: VariantCustom) => ({
      x: getOffscreenLeftAsPercent(winWidth, trainWidth),
    }),
    entering: ({ winWidth }: VariantCustom) => ({
      x: getResponsiveParkedPosition(winWidth),
      transition: { type:"spring", delay: 0.5, stiffness: 75, damping: 14, mass: 1.0, velocity: 0},
    }),
    parked: ({ winWidth }: VariantCustom) => ({
      x: getResponsiveParkedPosition(winWidth),
    }),
    leaving: ({ winWidth, trainWidth }: VariantCustom) => ({
      x: winWidth + trainWidth,
      transition: { duration: 1.5, ease: "easeInOut" },
    }),
    gone: ({ winWidth, trainWidth }: VariantCustom) => ({
      x: getOffscreenLeftAsPercent(winWidth, trainWidth),
      transition: { duration: 0 },
    }),
    arriving: ({ winWidth }: VariantCustom) => ({
      x: getResponsiveParkedPosition(winWidth),
      transition: { type:"spring", delay: 1, stiffness: 75, damping: 14, mass: 1.0, velocity: 0},
    }),
  };

  return (
    <div ref={containerRef} className='motion'>
      <motion.div style={{ x: parallaxX, z: 0 }}>
        <motion.div
          ref={trainRef}
          variants={trainVariants}
          initial="offscreen"
          animate={trainState}
          custom={{ winWidth: windowSize.width, trainWidth: measuredOrFallbackW }}
          style={{ willChange: "transform", pointerEvents: "none", z: 0 }}
          onAnimationComplete={(completedVariant) => {
            if (completedVariant === "entering" || completedVariant === "arriving") {
              if (isIntersectingRef.current) {
                setTrainState("parked");
              } else {
                setTrainState("leaving");
              }
            }
            if (completedVariant === "leaving") {
              setTrainState("gone");
              if (isIntersectingRef.current) {
                setTimeout(() => {
                  if (isIntersectingRef.current) { // Double Check Scroll
                    setTrainState("arriving");
                  }
                }, 50);
              }
            }
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}