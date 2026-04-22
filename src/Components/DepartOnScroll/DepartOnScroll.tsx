import './DepartOnScroll.scss'
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";

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
  if (width <= 743) return 0.38;  // Mobile
  if (width <= 1279) return 0.38; // Tablet
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
    
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  useEffect(() => {
    if (!containerRef.current) return;

    // Define trigger point
    const topMarginOffset = `-${marginPercentage * 100}%`;

    // Configure observer
    const options: IntersectionObserverInit = {
      root: null, 
      rootMargin: `${topMarginOffset} 0px 0px 0px`, 
      threshold: 0, 
    };

    // Define behavior after crossing trigger point
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        isIntersectingRef.current = entry.isIntersecting;

        if (entry.isIntersecting) {
          // Train scrolled into view
          setTrainState((prev) => {
            if (prev === "gone") return "arriving";
            return prev;
          });
        } else {
          // Train scrolled out of view
          setTrainState((prev) => {
            if (prev === "parked" || prev === "entering" || prev === "arriving") return "leaving";
            return prev;
          });
        }
      });
    };

    // Init observer
    const observer = new IntersectionObserver(callback, options);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [windowSize.width, marginPercentage]);


  const getResponsivePositions = (width: number) => {
    let parkedPosition = "-98%"; // Default Desktop
    let offscreenPosition = "-160%"; // Default Desktop

    if (width <= 743) {
      // Mobile: As window grows from 390 to 743, smoothly scale x from -35% to -50%
      const fluidPark = mapRange(width, 390, 743, -197, -103);
      const fluidOff = mapRange(width, 390, 743, -270, -155)
      parkedPosition = `${fluidPark}%`;
      offscreenPosition = `${fluidOff}%`;
    } else if (width <= 1279) {
      // Tablet: As window grows from 744 to 1279, smoothly scale x from -50% to -75%
      const fluidPark = mapRange(width, 744, 1279, -142, -83);
      const fluidOff = mapRange(width, 744, 1279, -200, -125);
      parkedPosition = `${fluidPark}%`;
      offscreenPosition = `${fluidOff}%`;
    }

    return { parkedPosition, offscreenPosition };
  }
  // Train Keyframes
  const trainVariants : Variants = {
    offscreen: (width: number) => ({
      x: getResponsivePositions(width).offscreenPosition,
    }),
    entering: (width: number) => ({ // On webpage reload
      x: getResponsivePositions(width).parkedPosition,
      transition: { type:"spring", delay: 1, stiffness: 75, damping: 13, mass: 1.0, velocity: 0},  
    }),
    parked: (width: number) => ({
      x: getResponsivePositions(width).parkedPosition,
    }),
    leaving: {
      x: '120%',
      transition: { duration: 1.5, ease: "easeInOut" },
    },
    gone: (width: number) => ({
      x: getResponsivePositions(width).offscreenPosition,
      transition: { duration: 0 },
    }),
    arriving: (width: number) => ({ // On scroll backup
      x: getResponsivePositions(width).parkedPosition,
      transition: { type:"spring", delay: 1, stiffness: 75, damping: 13, mass: 1.0, velocity: 0},  
    }),
  };

  return (
    <div ref={containerRef} className='motion'>
      <motion.div style={{ x: parallaxX }}>
        <motion.div
          variants={trainVariants}
          initial="offscreen"
          animate={trainState}
          custom={windowSize.width}
          style={{ willChange: "transform", pointerEvents: "none" }}
          onAnimationComplete={(completedVariant) => {
            if (completedVariant === "entering" || completedVariant === "arriving") {
              setTrainState("parked");
            }
            if (completedVariant === "leaving") {
              setTrainState("gone");
              if (isIntersectingRef.current) {
                setTimeout(() => {
                  // Double check they didn't scroll away again during this 50ms window
                  if (isIntersectingRef.current) { 
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