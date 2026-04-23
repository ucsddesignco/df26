import './DepartOnScroll.scss'
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, type Variants } from "framer-motion";

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
  return 0.38;                   // Desktop Default
};

export default function DepartOnScroll({ children }: DepartOnScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isIntersectingRef = useRef(true);

  const [trainState, setTrainState] = useState<TrainState>("entering");

  const isBrowser = typeof window !== "undefined";
  const [windowSize, setWindowSize] = useState({
    width: isBrowser ? window.innerWidth : 1280,
    height: isBrowser ? window.innerHeight : 800,
  });

  const [exactTriggerPoint, setExactTriggerPoint] = useState(
    isBrowser ? window.innerHeight * 0.386 : 300
  );

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
  const parallaxX = useTransform(scrollY, [0, exactTriggerPoint], [0, parallaxAmount]); // Scroll Parallax

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
  }

  // Train Keyframes
  const trainVariants : Variants = {
    offscreen: { 
      x: "calc(-100vw - 100%)",
    },
    entering: (width: number) => ({ // On webpage reload
      x: getResponsiveParkedPosition(width),
      transition: { type:"spring", delay: 0.5, stiffness: 75, damping: 13, mass: 1.0, velocity: 0},  
    }),
    parked: (width: number) => ({
      x: getResponsiveParkedPosition(width),
    }),
    leaving: {
      x: "calc(100vw + 100%)",
      transition: { duration: 1.5, ease: "easeInOut" },
    },
    gone: {
      x: "calc(-100vw - 100%)",
      transition: { duration: 0 },
    },
    arriving: (width: number) => ({ // On scroll backup
      x: getResponsiveParkedPosition(width),
      transition: { type:"spring", delay: 1, stiffness: 75, damping: 13, mass: 1.0, velocity: 0},  
    }),
  };

  return (
    <div ref={containerRef} className='motion'>
      <motion.div style={{ x: parallaxX, z: 0 }}>
        <motion.div
          variants={trainVariants}
          initial="offscreen"
          animate={trainState}
          custom={windowSize.width}
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